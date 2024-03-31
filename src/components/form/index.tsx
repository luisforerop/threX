import { FC, useMemo, useRef } from "react";
import { usePostContext } from "../../providers/post-provider";
import "../../App.css";
import { Close, Remove } from "../icons";

export const Form: FC = () => {
  const {
    currentThreadId,
    setCurrentThreadId,
    currentPostId,
    formIsOpen,
    closeForm,
    currentThreads,
    setCurrentThreads,
    savePost,
  } = usePostContext();
  const mainContainer = useRef(null);
  const charactersRemaining = useMemo(
    () => 280 - (currentThreads[currentThreadId]?.length ?? 0),
    [currentThreadId, currentThreads]
  );

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
          {currentThreads.map((value, index) => {
            if (index === currentThreadId) {
              return (
                <div className="flex gap-2" key={index}>
                  <textarea
                    name=""
                    id=""
                    className="text-white bg-neutral-700 area-auto py-2 w-full"
                    rows={6}
                    value={currentThreads[currentThreadId]}
                    onChange={(e) => {
                      setCurrentThreads((curr) =>
                        curr.map((value, index) =>
                          index === currentThreadId ? e.target.value : value
                        )
                      );
                    }}
                  />
                  <button className="p-0 h-fit bg-transparent mt-2">
                    <Remove />
                  </button>
                </div>
              );
            }

            return (
              <p key={index} onClick={() => setCurrentThreadId(index)}>
                {value}
              </p>
            );
          })}
        </div>
        <div className="flex justify-end items-center gap-4 mt-4">
          <span>{charactersRemaining}</span>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-xl"
            onClick={() => {
              if (currentThreads[currentThreadId] === "") return;

              setCurrentThreads((curr) => curr.concat(""));
              setCurrentThreadId((curr) => curr + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
