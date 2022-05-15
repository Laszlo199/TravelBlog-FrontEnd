import axios from "axios";
import type {CreatePostDto} from "@/Dtos/create.post.dto";
import type {LikePostDto} from "@/Dtos/like.post.dto";

export class PostService {
    http = axios.create({
        baseURL: "http://localhost:3001",
        headers: {
            "content-type": "application/json",
        },
    });

    getAllPosts(id: string) {
        return this.http.get("/posts/own/userId/"+id);
    }

    getAllFavouritePosts(id: string) {
        return this.http.get("/posts/liked/userId/"+id);
    }

    async createPost(post: CreatePostDto, file: FormData): Promise<any> {
        const createdPost = await this.http.post<any>("/posts", post);
        const result = await this.http.post<any>("/posts/file/"+createdPost.data._id, file);
        return result.data;
    }

    async likePost(like: LikePostDto) {
        await this.http.post<any>("/posts/like", like);
    }

}