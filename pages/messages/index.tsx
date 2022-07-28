import { useState } from 'react';
import {API_HOST} from '../../common';

export default function MessagePage ({ data }) {
  const [message, setMessage] = useState('');

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_HOST}/message?message=${message}`, {
      method: 'POST'
    }).then(res => res.json()).then(data => console.log(data))
  }
  return (
    <div>
      {data.map((messageData, index) => {
        return (
          <div key={`message-${index}`}>
            {messageData.message}
          </div>
        )
      })}
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleMessageInput} />
        <input type="submit" />
      </form>
    </div>
  )
}

export async function getServerSideProps () {
  const res = await fetch(`${API_HOST}/message`, {method: 'GET'})
  const data = await res.json()

  return { props: {data} }
}