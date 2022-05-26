export interface CreateCommentDto {
  userId: string;
  postId: string;
  date: Date;
  text: string;
}
