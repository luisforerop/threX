import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { FormStatesType, SavedPostType } from "../models";
import {
  getPost,
  getPosts,
  removePost,
  savePost as savePostService,
} from "../services";

export interface PostContextType {
  currentThreads: string[];
  currentThreadId: number;
  currentPostId: string | null;
  posts: SavedPostType[];
  formIsOpen: boolean;
  createPost: () => void;
  editPost: (postId: string) => void;
  savePost: (post: SavedPostType) => void;
  deletePost: (postId: string) => void;
  closeForm: () => void;
  setCurrentThreadId: Dispatch<SetStateAction<number>>;
  setCurrentThreads: Dispatch<SetStateAction<string[]>>;
}

const PostContext = createContext({} as PostContextType);

export const usePostContext = () => useContext(PostContext);

export const CreatePostProvider: FC<PropsWithChildren> = ({ children }) => {
  const { Provider } = PostContext;

  const [currentThreads, setCurrentThreads] = useState<string[]>([""]);
  const [currentThreadId, setCurrentThreadId] = useState(0);
  const [currentPostId, setCurrentPostId] = useState<null | string>(null);
  const [posts, setPosts] = useState<SavedPostType[]>([]);
  const [formIsOpen, setFormIsOpen] = useState(false);

  const manupulateForm = ({
    formState,
    postId,
    threadId,
    threads,
  }: FormStatesType) => {
    setCurrentPostId(postId);
    setCurrentThreadId(threadId);
    setCurrentThreads(threads);
    setFormIsOpen(formState);
  };

  const createPost = () => {
    manupulateForm({
      formState: true,
      postId: `${Date.now()}`,
      threadId: 0,
      threads: [""],
    });
  };

  const editPost = (postId: string) => {
    const { threads } = getPost(postId) ?? {};

    if (!threads) return;

    manupulateForm({
      formState: true,
      postId,
      threadId: 0,
      threads,
    });
  };

  const deletePost = (postId: string) => {
    removePost(postId);
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId)
    );
  };

  const closeForm = () => {
    manupulateForm({
      formState: false,
      postId: null,
      threadId: 0,
      threads: [],
    });
  };

  const savePost = (post: SavedPostType) => {
    // Remove empty string
    const cleanedPost = {
      ...post,
      threads: post.threads.filter((thread) => Boolean(thread)),
    };

    savePostService(cleanedPost);
    setPosts((curr) => curr.concat(cleanedPost));
    closeForm();
  };

  useEffect(() => {
    const localPosts = getPosts();

    setPosts(localPosts);
  }, []);

  const context: PostContextType = {
    currentThreads,
    currentThreadId,
    currentPostId,
    posts,
    formIsOpen,
    createPost,
    editPost,
    deletePost,
    closeForm,
    savePost,
    setCurrentThreadId,
    setCurrentThreads,
  };

  return <Provider value={context}>{children}</Provider>;
};
