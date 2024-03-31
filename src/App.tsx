import "./App.css";
import { Form } from "./components/form";
import { Copy, Edit, Remove } from "./components/icons";
import { usePostContext } from "./providers/post-provider";

/*
sacar a un archivo todas las operaciones CRUD para los posts
*/

function App() {
  const { posts, deletePost, editPost, createPost } = usePostContext();

  return (
    <>
      <Form />
      <div className="flex flex-col max-h-[100vh] gap-4 justify-center w-full h-full items-center py-8">
        <h1>THREX</h1>
        <div className="flex flex-col gap-1 overflow-y-scroll">
          {posts.map(({ id, threads }) => (
            <section
              className="flex flex-col gap-1 border py-2 px-4 border-transparent bg-neutral-900"
              key={id}
            >
              <article>
                {threads.map((thread) => (
                  <section
                    className="border-l-2 border-dotted p-2"
                    key={thread}
                  >
                    <div className="border-b flex flex-col gap-2 pb-2">
                      <p>{thread}</p>
                      <button
                        className="self-end w-fit p-1"
                        onClick={() => {
                          navigator.clipboard.writeText(thread);
                        }}
                      >
                        <Copy />
                      </button>
                    </div>
                  </section>
                ))}
              </article>
              <div className="flex gap-1 justify-end">
                <button
                  onClick={() => {
                    deletePost(id);
                  }}
                >
                  <Remove />
                </button>
                <button
                  onClick={() => {
                    editPost(id);
                  }}
                >
                  <Edit />
                </button>
              </div>
            </section>
          ))}
        </div>
        <button
          className="w-[calc(100%-32px)]"
          onClick={() => {
            createPost();
          }}
        >
          New post
        </button>
      </div>
    </>
  );
}

export default App;
