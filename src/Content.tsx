import { useEffect, useState } from "preact/hooks";

const API_BASE = 'https://jsonplaceholder.typicode.com';

function Content() {
  const [data, setData] = useState({ posts: [], albums: [] });

  useEffect(() => {
    (async () => {
      const [posts, albums] = await Promise.all([
        fetch(`${API_BASE}/posts?_limit=2`).then(r => r.json()),
        fetch(`${API_BASE}/albums?_limit=2`).then(r => r.json())
      ]);
      setData({ posts, albums });
    })();
  }, []);

  return (
    <div>
      {[...data.posts, ...data.albums].map((item: any) => 
        <p key={item.id}>{item.title}</p>
      )}
    </div>
  );
}

export default Content;