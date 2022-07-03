import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Channel from "./Channel";
import { gql, useQuery } from "@apollo/client";

const ALL_CHANNELS = gql`
  query {
    allChannels {
      name
      id
    }
  }
`;

const Sidebar = ({ handleChannelClick, currentChannel }) => {
  const [channels, setChannels] = useState([]);

  const channelResult = useQuery(ALL_CHANNELS, {
    pollInterval: 2000,
  });

  useEffect(() => {
    if (channelResult.data) {
      setChannels(channelResult.data.allChannels);
    }
  }, [channelResult]);

  return (
    <SidebarContainer>
      <SidebarUserInfo>CHANNELS</SidebarUserInfo>
      <SidebarChannels>
        {channels.map((c) => (
          <Channel
            handleChannelClick={handleChannelClick}
            name={c.name}
            id={c.id}
            key={c.id}
            currentChannel={currentChannel}
          />
        ))}
      </SidebarChannels>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: #403f47;
  margin-top: 35px;
  max-width: 260px;
  flex: 0.2;
  color: white;
  font-family: 'Lato', sans-serif;
`;

const SidebarUserInfo = styled.div`
  padding: 1rem 1rem;
  font-size: 0.7em;
  font-weight: 400;

  &:hover {
    color: white;
  }
`;

const SidebarChannels = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;
