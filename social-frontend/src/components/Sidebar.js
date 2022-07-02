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

const Sidebar = ({ handleChannelClick }) => {
  const [channels, setChannels] = useState([]);

  const channelResult = useQuery(ALL_CHANNELS, {
    pollInterval: 2000,
  })

  useEffect(() => {
    if (channelResult.data) {
      setChannels(channelResult.data.allChannels)
    }
  }, [channelResult])

  return (
    <SidebarContainer>
      <SidebarUserInfo>Name</SidebarUserInfo>
      <SidebarChannels>
        {channels.map((c) => (
          <Channel handleChannelClick={handleChannelClick} name={c.name} id={c.id} key={c.id}/>
        ))}
      </SidebarChannels>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: #302f2b;
  margin-top: 35px;
  max-width: 260px;
  flex: 0.2;
  color: white;
`;

const SidebarUserInfo = styled.div``;

const SidebarChannels = styled.div`
  flex: 1;
`;
