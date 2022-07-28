import {API_HOST} from '../../common';
import Link from 'next/link';
import {NextPage} from 'next';
import {PostData} from '../../@types';

interface PostListPageProps {
  postListData: PostData[];
}

const PostListPage: NextPage<PostListPageProps> = ({postListData}) => {
  return (
    <main>
      <h1>Techhtml Blog</h1>
      {postListData.length === 0 ? (
        <div>데이터가 없습니다</div>
      ) : (
        <ul>
          {postListData.map(postData => (
            <li key={postData.id}>
              <Link href={`/posts/${postData.id}`}>
                <a>
                  <h2>{postData.title}</h2>
                  <p>{postData.content}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(`${API_HOST}/posts`);
  const postListData = await res.json();

  return {
    props: {
      postListData,
    },
  };
};

export default PostListPage;
