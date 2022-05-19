export interface PostNotificationDto{
  postName: string;
 // ownerProfile: Profile; we will pass owner id as a key
  userId: string; //we need to send it
  userName: string;
  notificationType: string;
  date: Date;

  text: string;
}