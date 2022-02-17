import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Post from './Post';
import queryClient from './react-qurey-client';

const fetcher: any = (url: any) => fetch(url).then(res => res.json());

const App = () => {
  const [post, setPost] = useState(null);

  const { isLoading, data: posts } = useQuery('posts', () =>
    fetcher('https://jsonplaceholder.typicode.com/posts'),
      /**
     * @AdditionalFeature select
     * @objective can transform data after fetch
     * @syntax  , {
     *  select : result => result.splice(0,6)
     *  }
     */
  );

  if (isLoading) return <h1>Loading page...</h1>;

  const mutateTitle = (id : any) => {
    queryClient.setQueryData(['post', id], (oldData : any) => {
      if (oldData) return {
          ...oldData,
          title: 'Hey Title just mutated'
        }
      }
    )
  }

  return (
    <div className='App'>
      <div className='main-image'>
      <img src='https://i.ytimg.com/vi/yq647-WW42s/maxresdefault.jpg' alt='img' height={200}/>
      </div>
      {post === null ? (
        posts &&
        posts.length > 0 &&
        posts.map((post: any) => {
          const cachedPost : any = queryClient.getQueryData(['post', post.id]);
          /**
           * @AdditionalInfo cachedPost
           * @objective to return true/false if the post is present is cache
           */
          return (
            <div className='blog-title' key={post.id}>
              <div onClick={() => setPost(post.id)} className='pointer'>
                {cachedPost ? <b>"Visited"</b> : null} {post.id} - {post.title}{"  "}
              </div>
              <button onClick={() => mutateTitle(post.id)} disabled={!cachedPost}>Mutate the inner post title after Visited</button>
            </div>
          );
        })
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
