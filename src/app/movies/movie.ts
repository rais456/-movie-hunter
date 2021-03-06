/* Defines the movie entity */
export interface Movie {
  id?: string;
  approvalRating: number | null;
  description: string;
  director: string;
  imageurl: string;
  mpaa: string;
  price: number | null;
  releaseDate: string;
  starRating: number | null;
  title: string;
  category: string;
  tags?: string[];
}
