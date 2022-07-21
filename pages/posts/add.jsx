import { useState } from "react";
import { API_HOST } from "../../common";
import {useRouter} from 'next/router';

const PostAddPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  
  const handleTitle = e => {
    setTitle(e.target.value)
  }

  const handleContent = e => {
    setContent(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault();

    await fetch(`${API_HOST}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify({
        title,
        content
      })
    })

    alert('게시글 작성 성공~');
    router.push('/posts')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">제목</label>
        <input type="text" id="title" value={title} onChange={handleTitle} />
      </div>
      <div>
        <label htmlFor="content">본문</label>
        <textarea id="content" cols="30" rows="10" onChange={handleContent} defaultValue={content}></textarea>
      </div>
      <button>게시글 작성</button>
    </form>
  )
}

export default PostAddPage;