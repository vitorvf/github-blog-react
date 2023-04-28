import { useCallback, useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner";
import { api } from "../../lib/axios";
import { Post } from "./components/Post";
import { Profile } from "./components/Profile";
import { SearchInput } from "./components/SearchInput";
import { PostsListContainer } from "./styles";

export interface PostsUsuario {
  title: string;
  body: string;
  created_at: string;
  number: number;
  html_url: string;
  comments: string; // alterado para uma string
  user: {
    login: string;
  };
}




export function Blog() {
  const [isLoading, setIsLoading] = useState(true);

  const username = 'gw-rodrigues'
  const repo = 'ignite-react-2022-github-blog'

  const [posts, setPosts] = useState<PostsUsuario[]>([]);


const getPosts = async (query: string = "") => {
  try {
    setIsLoading(true);
    const response = await api.get(
      `/search/issues?q=${query}%20repo:${username}/${repo}`
      

      
    );

    setPosts(response.data.items);
    console.log(response.data)
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  getPosts();
}, []);


  // useEffect(() => {
  //   api.get(`/repos/${username}/${repo}/issues`)
    
  //     .then(response => {
  //       setPosts(response.data);
  //       setIsLoading(false);

       
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <>
      <Profile />
      <SearchInput postsLength={posts.length}  getPosts={getPosts} />
      {isLoading ? (
        <Spinner />
      ) : (
        <PostsListContainer>
         {posts.map((post) => (
            <Post key={post.number} post={post} />
          ))} 
        </PostsListContainer>
       )}  
    </>
  );
}






