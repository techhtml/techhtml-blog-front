const PostDetailPage = ({postId}) => {
  return (
    <div>
      <h1>상세 페이지 ~</h1>
      <p>안녕~ 나는 조은이야~</p>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const {postId} = context.query;

  return {
    props: {
      postId
    }
  }
}

export default PostDetailPage;