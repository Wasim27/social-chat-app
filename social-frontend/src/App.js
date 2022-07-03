import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import styled from "styled-components";

const App = () => {
  const [currentChannel, setCurrentChannel] = useState("");

  const handleChannelClick = (e) => {
    setCurrentChannel(e);
  };

  return (
    <div>
      <Header />
      <Main>
        <Sidebar
          handleChannelClick={handleChannelClick}
          currentChannel={currentChannel}
        />
        <Chat currentChannel={currentChannel} />
      </Main>
    </div>
  );
};

export default App;

const Main = styled.div`
  display: flex;
  height: 100vh;
`;
