import styled from "styled-components";

const Message = ({ body }) => {
  return <MessageContainer>{body}</MessageContainer>;
};

export default Message;

const MessageContainer = styled.div`
  position: relative;
  clear: both;
  padding: 16px 40px 16px 20px;
  margin: 20px 10px 20px 10px;
  font: 16px/20px "Noto Sans", sans-serif;
  border-radius: 10px;
  background-color: rgba(25, 147, 147, 0.2);
`;
