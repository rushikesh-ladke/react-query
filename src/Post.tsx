import React from 'react';
import { useQuery } from 'react-query';

const fetcher: any = (url: any) => fetch(url).then(res => res.json());

interface Post {
  id: number;
  goBack: Function;
}

const Post = ({ id, goBack }: Post) => {
  const { isLoading, data: post } = useQuery(['post', id], () =>
    fetcher(`https://jsonplaceholder.typicode.com/posts/${id}`)
  );

  if (isLoading) return <h1> Loading Post....</h1>;

  return (
    <div>
      <div onClick={() => goBack()} className='pointer'>
        Go Back
      </div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
