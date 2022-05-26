import axios from "axios";
import type { CreatePostDto } from "@/Dtos/create.post.dto";
import type { LikePostDto } from "@/Dtos/like.post.dto";
import type { GetPostDto } from "@/Dtos/get.post.dto";
import http from "./http.client";

export class PostService {
  getAllPosts(id: string) {
    return http.get("/posts/own/userId/" + id);
  }

  getAllFavouritePosts(id: string) {
    return http.get("/posts/liked/userId/" + id);
  }

  async createPost(post: CreatePostDto, file: FormData) {
    const createdPost = await http.post<string>("/posts", post);
    const result = await http.post<string>(
          "/posts/file/" + createdPost.data,
          file
    );
    return result.data;
  }

  async getPost(id: string): Promise<GetPostDto> {
    const result = await http.get("/posts/getOne/" + id);
    return result.data;
  }

  //adds to favourites
  async savePost(like: LikePostDto) {
    await http.post<boolean>("/posts/like", like);
  }

  async deletePost(postId: string) {
    return await http.delete<boolean>("/posts/" + postId);
  }

  async search(keyword: string, location: string) {
    return await http.get<GetPostDto[]>("/posts/search?keyword=" + keyword + "&location=" + location);
  }

  async thumbsUp(action: LikePostDto) {
    return await http.post<boolean>("/posts/up", action);
  }

  async thumbsDown(action: LikePostDto) {
    return await http.post<boolean>("/posts/down", action);
  }

  async isFavourite(dto: LikePostDto) {
    const res = await http.post<boolean>("/posts/isfavourite", dto);
    return res.data;
  }
}
