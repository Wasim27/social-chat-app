import React, { useState } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_CHANNEL_MESSAGES = gql`
  query FindChannel($id: String!) {
    findChannel(id: $id) {
      name
      id
      messages {
        body
        id
      }
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation createMessage($body: String!, $published: Date!, $channel: String!) {
    createMessage(body: $body, published: $published, channel: $channel) {
      body
      published
    }
  }
`;

const Chat = ({ currentChannel }) => {
  const [body, setBody] = useState("");

  const { data, loading, error } = useQuery(GET_CHANNEL_MESSAGES, {
    variables: { id: currentChannel },
    pollInterval: 2000,
  });

  const [createMessage, result] = useMutation(CREATE_MESSAGE);

  if (!currentChannel) return <div>chat</div>;

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  const submit = (e) => {
    e.preventDefault();
    const currentTimeInSeconds = new Date().getTime();;

    createMessage({
      variables: {
        body,
        published: currentTimeInSeconds,
        channel: currentChannel,
      },
    });
    setBody("");
  };

  return (
    <ChatContainer>
      {data.findChannel.messages.map((m) => (
        <div key={m.id}>{m.body}</div>
      ))}
      <form onSubmit={submit}>
        <input
          type="text"
          value={body}
          onChange={({ target }) => setBody(target.value)}
          placeholder="Enter Message"
        />
        <button type="submit">Send</button>
      </form>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  color: white;
  margin-top: 35px;
  background-color: red;
  flex: 1;
`;
