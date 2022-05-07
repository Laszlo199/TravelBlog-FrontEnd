import axios from "axios";
import type {CreatePostDto} from "@/Dtos/create.post.dto";

export class PostService {
    http = axios.create({
        baseURL: "http://localhost:3001",
        headers: {
            "content-type": "application/json",
        },
    });

    getAllPosts(id: string) {
        return this.http.get("/posts/userId/"+id);
    }

    async createPost(post: CreatePostDto): Promise<any> {
        const result = await this.http.post<any>("/posts", post);
        return result.data;
    }

}