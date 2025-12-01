export interface Novel {
  __typename?: "Novel" | undefined;
  id: string;
  title: string;
  description?: string | null | undefined;
  image?: string | null | undefined;
  rating?: number | null | undefined;
  reads?: number | null | undefined;
  user?: User | null | undefined;
}

interface User {
  id: string;
  name: string;
}

export interface NovelCardListProps {
  heading: string;
  novels: Novel[];
}
