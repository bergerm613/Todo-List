import TodoList from "./TodoList";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const TextContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-size: 35px;
`;

const TitleText = styled.div`
  padding-top: 108px;
  padding-left: 58px;
  font-weight: 600;
`;

const ToolsText = styled.div`
  padding-bottom: 68px;
  padding-right: 38px;
  text-align: right;
`;

const App = () => {
  return (
    <AppContainer>
      <TodoList />
      <TextContainer>
        <TitleText>
          a <span style={{ color: "#d76261" }}>todo list</span> for the ages
        </TitleText>
        <ToolsText>
          <span style={{ color: "#d76261" }}>built in</span> postgresql
          <br />
          express
          <br />
          react
          <br />
          node
        </ToolsText>
      </TextContainer>
    </AppContainer>
  );
};

export default App;
