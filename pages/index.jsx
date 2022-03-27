import { useCallback, useEffect, useState } from 'react';

export default function Index({ posts }) {
  if (!posts) return <div>Loading...</div>;

  const [value, setValue] = useState('');
  const [postsList, setPostsList] = useState([]);

  const fetchPosts = useCallback(async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_POSTS);
    const newPosts = await res.json();
    setPostsList(newPosts);
  }, [setPostsList]);

  const addPost = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch(process.env.NEXT_PUBLIC_API_POSTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: value }),
      });
      setValue('');
      await fetchPosts();
    },
    [value, setValue, fetchPosts]
  );

  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  const runDelete = useCallback(
    async (id) => {
      await fetch(`${process.env.NEXT_PUBLIC_API_POSTS}/${id}`, {
        method: 'DELETE',
      });
      await fetchPosts();
    },
    [fetchPosts]
  );

  useEffect(() => {
    setPostsList(posts);
  }, [setPostsList, posts]);

  return (
    <>
      <div>
        <form onSubmit={addPost}>
          <input type="text" placeholder="add title" value={value} onChange={(e) => handleChange(e)} />
          <button onClick={addPost}>submit</button>
        </form>
      </div>

      <ul>
        {postsList.map((d) => (
          <li key={d.id}>
            {d.title}
            <button style={{ cursor: 'pointer' }} onClick={() => runDelete(d.id)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.HOST}/api/posts`);
  const posts = await res.json();

  return {
    props: { posts },
  };
}
