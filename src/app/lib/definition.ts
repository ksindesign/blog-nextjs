export type Post = {
  id?: string;
  title?: string;
  content?: string;
  date?: string;
  author?: string;
};

export type User = {
  name: string | undefined | null;
  email: string | undefined | null;
  image: string | undefined | null;
};
