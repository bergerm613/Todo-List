import "./App.css";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <div>
      <div className="container">
        <h1 className="text-center mt-5">My World Class Todo List</h1>
        <InputTodo />
        <ListTodos />
      </div>
    </div>
  );
}

export default App;
