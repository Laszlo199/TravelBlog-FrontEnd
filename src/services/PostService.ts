import axios from "axios";
import type { CreatePostDto } from "@/Dtos/create.post.dto";
import type { LikePostDto } from "@/Dtos/like.post.dto";
import type { GetPostDto } from "@/Dtos/get.post.dto";

export class PostService {
  http = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "content-type": "application/json",
    },
  });

  getAllPosts(id: string) {
    return this.http.get("/posts/own/userId/" + id);
  }

  getAllFavouritePosts(id: string) {
    return this.http.get("/posts/liked/userId/" + id);
  }

  async createPost(post: CreatePostDto, file: FormData) {
    const createdPost = await this.http.post<string>("/posts", post);
    const result = await this.http.post<string>(
          "/posts/file/" + createdPost.data,
          file
    );
    return result.data;
  }

  getPost(id: string): Promise<GetPostDto> {
    return this.http.get("/posts/" + id);
  }

  //adds to favourites
  async savePost(like: LikePostDto) {
    await this.http.post<boolean>("/posts/like", like);
  }

  async deletePost(postId: string) {
    return await this.http.delete<boolean>("/posts/" + postId);
  }

  async thumbsUp(action: LikePostDto) {
    return await this.http.post<boolean>("/posts/up", action);
  }

  async thumbsDown(action: LikePostDto) {
    return await this.http.post<boolean>("/posts/down", action);
  }

  async isFavourite(dto: LikePostDto) {
    const res = await this.http.post<boolean>("/posts/isfavourite", dto);
    return res.data;
  }
}
