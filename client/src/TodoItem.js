import { Icon } from "@iconify/react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";

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
  width: 75%;

  :focus-visible {
    outline: none;
    border-radius: 62px;
    background: #bcbcbc;
  }
`;

const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async () => {
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: () => {
        queryClient.setQueryData("todos", (oldTodos) =>
          oldTodos.filter((t) => t.todo_id !== todo.todo_id)
        );
      },
    }
  );

  const editMutation = useMutation(
    async (newDescription) => {
      const body = { description: newDescription };
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },
    {
      onSuccess: async (_, newDescription) => {
        queryClient.setQueryData("todos", (todos) => {
          const indexOfItem = todos.findIndex(
            (t) => t.todo_id === todo.todo_id
          );
          todos[indexOfItem].description = newDescription;
          return todos;
        });
      },
    }
  );

  return (
    <ItemContainer>
      <ItemInput
        type="text"
        defaultValue={todo.description}
        onBlur={(e) => editMutation.mutate(e.target.value)}
      />
      <Icon
        icon="ph:x-circle-thin"
        color="white"
        height="38"
        style={{ cursor: "pointer" }}
        onClick={() => deleteMutation.mutate()}
      />
    </ItemContainer>
  );
};

export default TodoItem;
