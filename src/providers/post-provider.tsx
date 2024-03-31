import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { FormStatesType, SavedPostType, ThreadType } from "../models";
import {
  getPost,
  getPosts,
  removePost,
  savePost as savePostService,
} from "../services";
import { getNewThread } from "../utils";

export interface PostContextType {
  currentThreads: ThreadType[];
  selectedThread: ThreadType | null;
  currentPostId: string | null;
  posts: SavedPostType[];
  formIsOpen: boolean;
  createPost: () => void;
  editPost: (postId: string) => void;
  savePost: (post: SavedPostType) => void;
  deletePost: (postId: string) => void;
  closeForm: () => void;
  setSelectedThread: Dispatch<SetStateAction<ThreadType | null>>;
  setCurrentThreads: Dispatch<SetStateAction<ThreadType[]>>;
}

const PostContext = createContext({} as PostContextType);

export const usePostContext = () => useContext(PostContext);

export const CreatePostProvider: FC<PropsWithChildren> = ({ children }) => {
  const { Provider } = PostContext;

  const [currentThreads, setCurrentThreads] = useState<ThreadType[]>([
    getNewThread(),
  ]);
  const [currentPostId, setCurrentPostId] = useState<null | string>(null);
  const [posts, setPosts] = useState<SavedPostType[]>([]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<null | ThreadType>(null);

  const manupulateForm = ({
    formState,
    postId,
    selectedThread,
    threads,
  }: FormStatesType) => {
    setCurrentPostId(postId);
    setCurrentThreads(threads);
    setFormIsOpen(formState);
    setSelectedThread(selectedThread);
  };

  const createPost = () => {
    const newThread = getNewThread();
    manupulateForm({
      formState: true,
      postId: `${Date.now()}`,
      selectedThread: newThread,
      threads: [newThread],
    });
  };

  const editPost = (postId: string) => {
    const { threads } = getPost(postId) ?? {};

    if (!threads) return;

    manupulateForm({
      formState: true,
      postId,
      selectedThread: threads[0],
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
      selectedThread: null,
      threads: [],
    });
  };

  const savePost = (post: SavedPostType) => {
    // Remove empty string
    const cleanedPost = {
      ...post,
      threads: post.threads.filter((thread) => Boolean(thread.value)),
    };

    const updatedPosts = savePostService(cleanedPost);
    setPosts(updatedPosts);
    closeForm();
  };

  useEffect(() => {
    const localPosts = getPosts();

    setPosts(localPosts);
  }, []);

  useEffect(() => {
    setCurrentThreads((curr) => {
      return curr.map((thread) =>
        thread.id !== selectedThread?.id ? thread : selectedThread
      );
    });
  }, [selectedThread]);

  const context: PostContextType = {
    currentThreads,
    currentPostId,
    posts,
    formIsOpen,
    createPost,
    editPost,
    deletePost,
    closeForm,
    savePost,
    selectedThread,
    setSelectedThread,
    setCurrentThreads,
  };

  return <Provider value={context}>{children}</Provider>;
};
