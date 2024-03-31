import { FC, useMemo, useRef } from "react";
import { usePostContext } from "../../providers/post-provider";
import "../../App.css";
import { Close, Remove } from "../icons";
import { getNewThread } from "../../utils";

export const Form: FC = () => {
  const {
    currentPostId,
    formIsOpen,
    closeForm,
    currentThreads,
    setCurrentThreads,
    savePost,
    selectedThread,
    setSelectedThread,
  } = usePostContext();
  const mainContainer = useRef(null);
  const charactersRemaining = useMemo(() => {
    return 280 - (selectedThread?.value?.length ?? 0);
  }, [selectedThread, currentThreads]);

  return (
    <div
      ref={mainContainer}
      className="absolute h-full w-full flex justify-center items-center overlay-blur"
      style={{ display: formIsOpen ? "flex" : "none" }}
      onClick={(e) => {
        if (e.target == mainContainer.current) {
          closeForm();
        }
      }}
    >
      <div
        className="card p-4 w-[90vw] h-[80vh] rounded-lg flex flex-col gap-4  bg-neutral-800"
        id="update-post-form"
      >
        <div className="form-header flex justify-between border-b pb-2 border-sky-500">
          <button onClick={closeForm}>
            <Close size={24} />
          </button>
          <button
            onClick={() => {
              if (!currentPostId) return;

              savePost({
                threads: currentThreads,
                id: currentPostId,
              });
            }}
          >
            Save
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {currentThreads.map((thread) => {
            const { value, id } = thread;
            if (id === selectedThread?.id) {
              return (
                <div className="flex gap-2" key={id}>
                  <textarea
                    name=""
                    id=""
                    className="text-white bg-neutral-700 area-auto py-2 w-full"
                    rows={6}
                    value={selectedThread.value}
                    onChange={(e) => {
                      setSelectedThread((curr) =>
                        curr
                          ? {
                              ...curr,
                              value: e.target.value,
                            }
                          : null
                      );
                    }}
                  />
                  <button
                    className="p-0 h-fit bg-transparent mt-2"
                    onClick={() => {
                      setCurrentThreads((curr) => {
                        const updatedThreads = curr.filter(
                          ({ id }) => thread.id !== id
                        );
                        setSelectedThread(updatedThreads[0]);
                        return updatedThreads;
                      });
                    }}
                  >
                    <Remove />
                  </button>
                </div>
              );
            }

            return (
              <p key={id} onClick={() => setSelectedThread(thread)}>
                {value}
              </p>
            );
          })}
        </div>
        <div className="flex justify-end items-center gap-4 mt-4">
          <span className={charactersRemaining < 0 ? "text-red-600" : ""}>
            {charactersRemaining}
          </span>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-xl"
            onClick={() => {
              if (selectedThread?.value === "") return;

              const newThread = getNewThread();
              setCurrentThreads((curr) => curr.concat(newThread));
              setSelectedThread(newThread);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
