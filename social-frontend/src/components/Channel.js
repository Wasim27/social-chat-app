import React from "react";
import styled from "styled-components";

const Channel = ({ handleChannelClick, name, id, currentChannel }) => {
  return currentChannel === id ? (
    <CurrentChannelButton onClick={() => handleChannelClick(id)}>
      # {name}
    </CurrentChannelButton>
  ) : (
    <ChannelButton onClick={() => handleChannelClick(id)}>
      # {name}
    </ChannelButton>
  );
};

export default Channel;

const ChannelButton = styled.button`
  border: none;
  text-align: left;
  background: none;
  color: white;
  font-family: "Lato", sans-serif;
  padding: 1px;
  font-size: 0.7rem;
  font-weight: 100;
  cursor: pointer;

  &:hover {
    background: rgba(62, 49, 60, 1);
  }
`;

const CurrentChannelButton = styled.button`
  border: none;
  text-align: left;
  background-color: gray;
  color: white;
  font-family: "Lato", sans-serif;
  padding: 1px;
  font-size: 0.7rem;
  font-weight: 100;

  &:hover {
    background: rgba(62, 49, 60, 1);
  }
`;
