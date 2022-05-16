export interface GetPostDto {
    id: string,
    username: string;
    userId: string;
    title: string;
    description: string;
    text: string;
    isPrivate: boolean;
    location: string;
    date: Date;
    likes: number;
    dislikes: number;
    comments: any[];

}