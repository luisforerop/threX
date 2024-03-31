import { ThreadType } from "./models";

export const getNewThread = (): ThreadType => {
  return {
    id: Number(Math.random()).toString(16).replace("0.", ""),
    value: "",
  };
};
