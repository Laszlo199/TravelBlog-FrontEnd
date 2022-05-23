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
    photo: string;
    likes: number;
    dislikes: number;
    comments: any[];

}