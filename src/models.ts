export type ThreadType = {
  value: string;
  id: string;
};

export type SavedPostType = {
  threads: ThreadType[];
  id: string;
};

export type FormStatesType = {
  postId: string | null;
  selectedThread: ThreadType | null;
  threads: ThreadType[];
  formState: boolean;
};
