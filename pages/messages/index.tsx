import {ChangeEventHandler, FormEventHandler, useState} from 'react';
import {API_HOST} from '../../common';
import {NextPage} from 'next';

interface MessageData {
  message: string;
}
interface MessagePageProps {
  data: MessageData[];
}

const MessagePage: NextPage<MessagePageProps> = ({data}) => {
  const [message, setMessage] = useState('');

  const handleMessageInput: ChangeEventHandler<HTMLInputElement> = e => {
    setMessage(e.target.value);
  };

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();
    fetch(`${API_HOST}/message?message=${message}`, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };
  return (
    <div>
      {data.map((messageData, index) => {
        return <div key={`message-${index}`}>{messageData.message}</div>;
      })}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleMessageInput}
          title="메시지 작성하기"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default MessagePage;

export async function getServerSideProps() {
  const res = await fetch(`${API_HOST}/message`, {method: 'GET'});
  const data = await res.json();

  return {props: {data}};
}
