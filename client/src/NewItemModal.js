import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

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
        queryClient.setQueryData("todos", (todos) => todos.push(newItem));
      },
    }
  );

  //   const addNewItem = async () => {
  //     try {
  //       const body = { description };
  //       const newItem = await fetch("http://localhost:5000/todos", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(body),
  //       }).then((response) => response.json());

  //       handleClose();
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Add a New Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" onBlur={(e) => setDescription(e.target.value)} />
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
