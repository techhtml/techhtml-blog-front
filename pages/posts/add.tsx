import {ChangeEventHandler, FormEventHandler, useEffect, useState} from 'react';
import {API_HOST} from '../../common';
import {useRouter} from 'next/router';
import {marked} from 'marked';
import styled from '@emotion/styled';
import {NextPage} from 'next';
import Head from 'next/head';

const PostAddPage: NextPage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const router = useRouter();

  const handleTitle: ChangeEventHandler<HTMLInputElement> = e => {
    setTitle(e.target.value);
  };

  const handleContent: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setContent(e.target.value);
  };

  const handleFile: ChangeEventHandler<HTMLInputElement> = async e => {
    const {files} = e.target;
    if (!files) {
      return;
    }
    for (const file of files) {
      const result = await fetch(`${API_HOST}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: file,
      });
      const text = await result.text();
      console.log(text);
    }
  };

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault();

    await fetch(`${API_HOST}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    alert('게시글 작성 성공');
    router.push('/posts');
  };

  return (
    <>
      <Head>
        <title>게시글 작성하기</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input type="text" id="title" value={title} onChange={handleTitle} />
        </div>
        <div>
          <label htmlFor="content">본문</label>
          <Container>
            <textarea
              id="content"
              cols={30}
              rows={10}
              onChange={handleContent}
              defaultValue={content}
            />
            <div dangerouslySetInnerHTML={{__html: marked.parse(content)}} />
          </Container>
        </div>
        <div>
          <label htmlFor="file">제목</label>
          <input
            id="file"
            type="file"
            onChange={handleFile}
            multiple
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <button>게시글 작성</button>
      </form>
    </>
  );
};

export default PostAddPage;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
`;
