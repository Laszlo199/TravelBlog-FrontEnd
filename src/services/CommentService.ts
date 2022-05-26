import axios from "axios";
import type { CreateCommentDto } from "@/Dtos/create.comment.dto";
import http from "./http.client";

export class CommentService {
  async createComment(comment: CreateCommentDto): Promise<any> {
    const result = await http.post<any>("/comments", comment);
    return result.data;
  }
}
