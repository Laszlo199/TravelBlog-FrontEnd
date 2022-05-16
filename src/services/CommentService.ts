import axios from "axios";
import type { CreateCommentDto } from "@/Dtos/create.comment.dto";

export class CommentService {
  http = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "content-type": "application/json",
    },
  });

  async createComment(comment: CreateCommentDto): Promise<any> {
    const result = await this.http.post<any>("/comments", comment);
    return result.data;
  }
}
