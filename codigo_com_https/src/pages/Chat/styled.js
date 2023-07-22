import styled from 'styled-components';

const Section = styled.section`
  max-width: 600px;
  margin: 35px auto;
  padding: 20px;

  h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .chatContainer {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    min-height: 300px;
    max-height: 400px;
    overflow-y: auto;
    .message {
      margin: 10px 0;
      display: flex;
      align-items: center;
      .user {
        font-weight: bold;
        margin-right: 5px;
      }
			p{
				margin: 2px;
				word-break: break-all;
			}
    }
  }

  form {
    display: flex;
    margin-top: 20px;
		height: 3.5rem;

    textarea {
      flex: 1;
      resize: none;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
      outline: none;
			width: 85%;
    }

    button {
      padding: 4px;
      margin-left: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
			width: 15%;

      &:hover {
        background-color: #0056b3;
      }
			&:active {
				background-color: #abc2da;
			}
    }
  }

  .deleteButton {
    display: block;
    margin-top: 20px;
    padding: 8px 16px;
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
		position: absolute;
		top: 0;
		right: 20px;

    &:hover {
      background-color: #b30000;
    }
		&:active {
				background-color: #abc2da;
			}
  }

  @media (max-width: 768px) {
    padding: 10px;

    .chatContainer {
     height: 100%;
    }
    form {
      textarea {
      }
    }
  }
`;

export default Section;
