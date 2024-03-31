import { LOCALSTORAGE_POSTS_ID } from "./config";
import { SavedPostType } from "./models";

export const savePosts = (updatedPosts: SavedPostType[]) => {
  localStorage.setItem(LOCALSTORAGE_POSTS_ID, JSON.stringify(updatedPosts));
};

export const savePost = (newPost: SavedPostType) => {
  const { id: postId, threads: newThreads } = newPost;
  const currentPosts = getPosts();

  const updatedPosts = currentPosts
    .filter(({ id }) => id !== postId)
    .concat({
      threads: newThreads,
      id: postId,
    });

  localStorage.setItem(LOCALSTORAGE_POSTS_ID, JSON.stringify(updatedPosts));

  return updatedPosts;
};

export const getPosts = (): SavedPostType[] => {
  try {
    const localPosts = localStorage.getItem(LOCALSTORAGE_POSTS_ID);

    if (!localPosts) return [];

    return JSON.parse(localPosts);
  } catch (error) {
    return [];
  }
};

export const getPost = (postId: string) => {
  const posts = getPosts();
  return posts.find(({ id }) => id === postId);
};

export const removePost = (postId: string) => {
  const posts = getPosts();
  const updatedPosts = posts.filter(({ id }) => id !== postId);
  savePosts(updatedPosts);
};
