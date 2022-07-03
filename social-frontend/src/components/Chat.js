import React, { useState } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import Message from "./Message";

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

  if (!currentChannel) return <ChatContainer>Select Channel</ChatContainer>;

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  const submit = (e) => {
    e.preventDefault();
    const currentTimeInSeconds = new Date().getTime();

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
        <Message key={m.id} body={m.body} />
      ))}
      <ChatBox>
        <ChatMessage>
          <form onSubmit={submit}>
            <textarea
              type="text"
              value={body}
              onChange={({ target }) => setBody(target.value)}
              placeholder="Enter Message"
            />
            <button type="submit">Send</button>
          </form>
        </ChatMessage>
      </ChatBox>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  color: white;
  margin-top: 35px;
  background-color: #323236;
  flex: 1;
`;

const ChatBox = styled.div`
  display: flex;
  color: red;
`;

const ChatMessage = styled.div`
  margin-right: 10px;
  padding: 30px;
  position: fixed;
  right: 10px;
  bottom: 5px;

  textarea {
    width: 100%;
    border: none;
    padding: 10px 20px;
    font: 14px/22px "Lato", Arial, sans-serif;
    margin-bottom: 10px;
    border-radius: 5px;
    resize: none;
  }

  button {
    position: absolute;
    right: 5px;
    color: green;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    font-weight: bold;
    background: none;
    padding: 5px;
  }
`;
