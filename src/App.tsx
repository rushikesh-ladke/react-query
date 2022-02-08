import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Post from './Post';

const fetcher: any = (url: any) => fetch(url).then(res => res.json());

const App = () => {
  const [post, setPost] = useState(null);

  const { isLoading, data: posts } = useQuery('posts', () =>
    fetcher('https://jsonplaceholder.typicode.com/posts')
  );

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className='App'>
      {post === null ? (
        posts &&
        posts.length > 0 &&
        posts.map((post: any) => (
          <div className='padding-class' key={post.id}>
            <div onClick={() => setPost(post.id)} className='pointer'>
              {post.id} - {post.title}
            </div>
          </div>
        ))
      ) : (
        <Post
          id={post}
          goBack={() => {
            setPost(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
