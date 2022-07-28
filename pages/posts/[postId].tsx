import {API_HOST} from '../../common';
import {marked} from 'marked';
import {GetServerSideProps, NextPage} from 'next';
import {PostData} from '../../@types';

interface PostDetailPageProps {
  postData: PostData;
}

const PostDetailPage: NextPage<PostDetailPageProps> = ({postData}) => {
  const {id, title, content} = postData;

  return (
    <article id={id}>
      <h1>{title}</h1>
      <section dangerouslySetInnerHTML={{__html: marked.parse(content)}} />
    </article>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const {postId} = context.query;
  const response = await fetch(`${API_HOST}/posts?postId=${postId}`);
  const postData = await response.json();

  return {
    props: {
      postData,
    },
  };
};

export default PostDetailPage;
