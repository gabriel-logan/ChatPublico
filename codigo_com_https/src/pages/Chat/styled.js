import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  @media (max-width: 500px) {
    margin-top: 30px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;

  @media (max-width: 500px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

export const ChatContainer = styled.div`
  width: 400px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  overflow-y: auto;
  height: 300px;
  word-break: break-all;
  @media (max-width: 500px) {
    width: 280px;
  }
  @media (max-width: 300px) {
    width: 180px;
  }
`;

export const Form = styled.form`
  display: flex;
  height: 40px
`;

export const Message = styled.div`
  margin-bottom: 10px;
`;

export const User = styled.strong`
  color: #333;
`;

export const Input = styled.textarea`
  max-width: 300px;
  min-width: 300px;
  min-height: 40px;
  max-height: 50px;
  padding: 5px;
  margin-right: 10px;
  @media (max-width: 500px) {
    max-width: 200px;
    min-width: 200px;
    margin-bottom: 10px;
  }
  @media (max-width: 300px) {
    max-width: 100px;
    min-width: 100px;
    margin-bottom: 10px;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  width: 30%;
  height: 100%;
`;
