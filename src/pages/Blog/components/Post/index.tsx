import { PostsUsuario } from "../..";
import { relativeDateFormatter } from "../../../../utils/formatter";
import { PostContainer } from "./styles";

interface PostProps {
  post: PostsUsuario;
}

export function Post({ post }: PostProps) {
  
  const formattedDate = relativeDateFormatter(post.created_at);

  return (
    <PostContainer to={`/post/${post.number}`}>
      <div>
        <strong>{post.title}</strong>
        <span>{formattedDate}</span>
      </div>
      <p>{post.body}</p>
    </PostContainer>
  );
}
