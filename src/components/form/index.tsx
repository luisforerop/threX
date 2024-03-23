import { FC, useEffect, useState } from "react";

type FormProps = {
  postsId: string | null;
};

export const Form: FC<FormProps> = ({ postsId }) => {
  const [posts, setPosts] = useState<string[]>([""]);
  const [currentPost, setCurrentPost] = useState(0);

  useEffect(() => {
    if (!postsId) return;

    const currentPosts = localStorage.getItem(postsId) ?? '[""]';

    setPosts(JSON.parse(currentPosts));
  }, [postsId]);

  return (
    <div className="card p-2 w-80 flex flex-col gap-4">
      <div className="form-header flex justify-between border-b pb-2 border-sky-500">
        <button>X</button>
        <button
          onClick={() => {
            const savedPosts = localStorage.setItem(
              `${Date.now()}`,
              JSON.stringify(posts)
            );
          }}
        >
          Save
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {posts.map((value, index) => {
          if (index === currentPost) {
            return (
              <textarea
                key={index}
                name=""
                id=""
                className="text-black"
                cols={30}
                rows={10}
                value={posts[currentPost]}
                onChange={(e) => {
                  setPosts((curr) =>
                    curr.map((value, index) =>
                      index === currentPost ? e.target.value : value
                    )
                  );
                  console.log(e);
                }}
              ></textarea>
            );
          }

          return (
            <p key={index} onClick={() => setCurrentPost(index)}>
              {value}
            </p>
          );
        })}
      </div>
      <div className="flex justify-between">
        <span>{posts[currentPost].length - 300}</span>
        <button
          onClick={() => {
            if (posts[currentPost] === "") return;

            setPosts((curr) => curr.concat(""));
            setCurrentPost((curr) => curr + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};
