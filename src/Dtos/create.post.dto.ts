export interface CreatePostDto {
  userId: string;
  title: string;
  description: string;
  text: string;
  isPrivate: boolean;
  location: string;
  date: Date;
}
