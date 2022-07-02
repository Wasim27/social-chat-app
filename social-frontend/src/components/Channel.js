import React from "react";

const Channel = ({ handleChannelClick, name, id }) => {
  return <button onClick={() => handleChannelClick(id)}>{name}</button>;
};

export default Channel;
