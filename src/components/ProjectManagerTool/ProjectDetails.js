import { styled, keyframes } from "styled-components";
import Header from "../Checklist/Header";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const taskStatus = {
  requested: {
    name: "Requested",
    items: [],
  },
  toDo: {
    name: "To do",
    items: [],
  },
  inProgress: {
    name: "In Progress",
    items: [],
  },
  done: {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const ProjectDetails = () => {
  const { user } = useAuth0();
  const [columns, setColumns] = useState(taskStatus);
  const [formData, setFormData] = useState({});
  const [addTask, setAddTask] = useState({});
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/getProject/${user.email}/${projectId}`)
        .then((response) => response.json())
        .then((parsed) => {
          // console.log(parsed.data);
          setFormData(parsed.data);
          setColumns(parsed.data.taskStatus);
        });
      fetch("/getUser")
        .then((response) => response.json())
        .then((parsed) => {
          setUserList(parsed.data);
        });
    }
  }, [user, projectId]);
  const addTaskhandleChange = (event) => {
    setAddTask({
      ...addTask,
      [event.target.id]: event.target.value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAddTask = (id) => {
    const name = columns[id].name;
    const newArray = [...columns[id].items];
    newArray.push({ id: newArray.length + 1, content: addTask[id] });
    setColumns({ ...columns, [id]: { name: name, items: newArray } });
    setAddTask({});
  };

  const handleDelete = (columnId, index) => {
    const name = columns[columnId].name;
    const newArray = [...columns[columnId].items];

    newArray.splice(index, 1);
    setColumns({ ...columns, [columnId]: { name: name, items: newArray } });
    setAddTask({});
  };
  const handleSubmit = (e) => {
    console.log(formData);
    fetch("/updateProject", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: projectId,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        taskStatus: columns,
        user: user.email,
        status: formData.status,
        member: formData.member,
      }),
    })
      .then((res) => res.json())
      .then((parsed) => {
        if (parsed.status === 200) {
          console.log(parsed.data);
          navigate("/projects");
        } else {
          alert(parsed.error);
        }
      });
  };

  return (
    <Main>
      <div>
        <Header />
        <Body>
          {formData && (
            <SideBar>
              <FormContainer>
                <Form onSubmit={handleSubmit}>
                  <label>Project Title</label>
                  <FormInput
                    id="title"
                    name="projectTitle"
                    type="text"
                    onChange={handleChange}
                    value={formData.title}
                  />
                  <label>Members Names</label>
                  <select
                    id="member"
                    name="member"
                    type="text"
                    onChange={handleChange}
                    style={{
                      padding: "1.5%",
                      fontSize: "1rem",
                      borderRadius: "0.5rem",
                      border: "none",
                      boxShadow:
                        "0 0.1rem 0.2rem 0 #808080, 0 0.1rem 0.2rem #808080",
                    }}
                  >
                    {userList?.map((member) => {
                      return <option value={member}>{member}</option>;
                    })}
                  </select>

                  <label>Project Description</label>
                  <FormInput
                    id="description"
                    name="projectDescription"
                    type="text"
                    onChange={handleChange}
                    value={formData.description}
                  />
                  <label>Project Status</label>
                  <select
                    id="status"
                    name="projectStatus"
                    type="text"
                    onChange={handleChange}
                    style={{
                      padding: "2%",
                      fontSize: "1rem",
                      borderRadius: "0.5rem",
                      border: "none",
                      boxShadow:
                        "0 0.1rem 0.2rem 0 #808080, 0 0.1rem 0.2rem #808080",
                    }}
                  >
                    <option value="">In Progress</option>
                    <option value="">Done </option>
                  </select>
                  <label for="start">Project Due Date</label>
                  <FormInput
                    type="date"
                    id="dueDate"
                    name="start"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </Form>
              </FormContainer>
              <SaveLink type="submit" onClick={handleSubmit}>
                Update
              </SaveLink>
            </SideBar>
          )}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                width: "60rem",
              }}
            >
              <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
              >
                {Object.entries(columns).map(([columnId, column], index) => (
                  <div
                    key={columnId}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "250px",
                    }}
                  >
                    <BoardHeader>{column.name}</BoardHeader>

                    <Droppable droppableId={columnId}>
                      {(provided) => (
                        <ItemList
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {column.items.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <Item
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {item.content}
                                  <Delete
                                    onClick={() =>
                                      handleDelete(columnId, index)
                                    }
                                  >
                                    delete
                                  </Delete>
                                </Item>
                              )}
                            </Draggable>
                          ))}
                          <NewTaskContainer>
                            <NewTaskInput
                              type="text"
                              id={columnId}
                              value={addTask[columnId]}
                              onChange={addTaskhandleChange}
                            />
                            <NewTask onClick={() => handleAddTask(columnId)}>
                              {" "}
                              New Task{" "}
                            </NewTask>
                          </NewTaskContainer>
                          {provided.placeholder}
                        </ItemList>
                      )}
                    </Droppable>
                  </div>
                ))}
              </DragDropContext>
            </div>
          </div>
        </Body>
      </div>
      <GradientBox></GradientBox>
    </Main>
  );
};
export default ProjectDetails;

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 10%;
  align-items: center;
  margin: 5%;
`;
const gradientAnimation = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`;
const GradientBox = styled.div`
  background-image: linear-gradient(40deg, #00c4cc, #ff66c4, #ffa53b);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 5s linear infinite;
  transform: skewY(-10deg);
  position: absolute;
  width: 100%;
  height: 70%;
  z-index: -1;
  bottom: 0;
`;
const FormFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }`;
const SideBar = styled.div`
  width: 25%;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${FormFadeIn} 1s ease-in-out;
`;

const FormContainer = styled.div`
  display: flex;
  background-color: #86c5d8;
  border: none;
  flex-direction: column;
  align-items: center;
  padding: 7%;
  border-radius: 0.5rem;
`;
const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  font-size: 1rem;
  gap: 2rem;
  color: black;
  width: 100%;
  padding: 2%;
`;
const FormInput = styled.input`
  padding: 2%;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 0.1rem 0.2rem 0 #808080, 0 0.1rem 0.2rem #808080;
  width: 100%;
`;

const SaveLink = styled.button`
  font-size: 1rem;
  padding: 2% 10%;
  margin: 5%;
  background-color: #20cd8d;
  border: none;
  border-radius: 0.5rem;
  &:hover {
    background-color: yellow;
    color: black;
  }

  &:active {
    scale: 0.9;
  }
`;
const BoradFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
  
`;

const BoardHeader = styled.div`
  font-size: 1.25rem;
  padding: 2%;
  font-weight: bold;
  text-align: center;
`;
const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 35rem;
  background-color: #86c5d8;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.2rem 0 #808080, 0 0.1rem 0.2rem #808080;
  animation: ${BoradFadeIn} 1s ease-in-out;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  padding: 5%;
  background-color: #ffe6f5;
  color: black;
  border: none;
  margin: 2%;
  border-radius: 0.5rem;
`;

const Delete = styled.button`
  font-size: 1rem;
  padding: 2%;
  height: 100%;
  background-color: #20cd8d;
  color: black;
  border: none;
  border-radius: 0.5rem;
  &:hover {
    background-color: yellow;
    color: black;
  }
  &:active {
    scale: 0.9;
  }
`;
const NewTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 15%;
  margin: 2%;
  border-radius: 0.5rem;
`;
const NewTask = styled.button`
  font-size: 1rem;
  padding: 2%;
  height: 100%;
  background-color: #20cd8d;
  color: black;
  border: none;
  &:hover {
    background-color: yellow;
    color: black;
  }
  border-radius: 0.5rem;
`;
const NewTaskInput = styled.input`
  font-size: 1rem;
  padding: 1.5%;
  height: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.2rem 0 #808080, 0 0.1rem 0.2rem #808080;
  border: none;
`;
