import { Icon } from "@iconify/react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 42px;
  align-items: center;
`;

const ItemInput = styled.input`
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  background: none;
  border: none;
  color: white;
  padding: 18px 28px;

  :focus-visible {
    outline: none;
    border-radius: 62px;
    background: #bcbcbc;
    width: 75%;
  }
`;

const TodoItem = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const deleteItem = async () => {
    try {
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const editItem = async () => {
    try {
      const body = { description };
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // to stop calling on first render
    if (description !== todo.description) {
      //TODO: what happens if you switch and switch back? maybe this is where react-query will rock the boat
      editItem();
    }
  }, [description, todo.description]);

  return (
    <ItemContainer>
      <ItemInput
        type="text"
        defaultValue={description}
        onBlur={(e) => setDescription(e.target.value)}
      />
      <Icon
        icon="ph:x-circle-thin"
        color="white"
        height="38"
        onClick={() => deleteItem()}
      />
    </ItemContainer>
  );
};

export default TodoItem;
