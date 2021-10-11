import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";

const NewItemInput = styled.input`
  border-radius: 9px;
  background: #efefef;
  border: none;
  width: 100%;
  padding: 8px 18px;
`;

const NewItemModal = ({ handleClose }) => {
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();

  const addItemMutation = useMutation(
    async () => {
      const body = { description };
      const newItem = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((response) => response.json());

      handleClose();
      return newItem;
    },
    {
      onSuccess: (newItem) => {
        queryClient.setQueryData("todos", (todos) => {
          todos.push(newItem);
          return todos;
        });
      },
    }
  );

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Add a New Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewItemInput
          type="text"
          onBlur={(e) => setDescription(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          close
        </Button>
        <Button
          variant="primary"
          style={{ backgroundColor: "#d76261", border: "none" }}
          onClick={() => addItemMutation.mutate()}
        >
          add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewItemModal;
