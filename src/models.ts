export type SavedPostType = {
  threads: string[];
  id: string;
};

export type FormStatesType = {
  postId: string | null;
  threadId: number;
  threads: string[];
  formState: boolean;
};
