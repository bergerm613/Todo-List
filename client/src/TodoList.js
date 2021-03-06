import { useState } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import NewItemModal from "./NewItemModal";
import { useQuery } from "react-query";

const TodoContainer = styled.div`
  background-color: #d76261;
  flex-grow: 1;
  padding: 80px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AddItemButton = styled.button`
  color: white;
  background: none;
  border-radius: 62px;
  border: 1px solid white;
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  padding: 18px 28px;
  align-self: center;
  margin-top: 18px;
`;

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);

  const { data: todos, isSuccess } = useQuery("todos", async () => {
    return await fetch("http://localhost:5000/todos").then((response) =>
      response.json()
    );
  });

  return (
    <TodoContainer>
      {isSuccess && (
        <>
          <div style={{ overflow: "scroll" }}>
            {todos.map((todo) => {
              return <TodoItem todo={todo} key={`item_${todo.todo_id}`} />;
            })}
          </div>

          <AddItemButton onClick={() => setShowModal(true)}>
            ADD ANOTHER ITEM
          </AddItemButton>
          {showModal && (
            <NewItemModal handleClose={() => setShowModal(false)} />
          )}
        </>
      )}
    </TodoContainer>
  );
};

export default TodoList;
