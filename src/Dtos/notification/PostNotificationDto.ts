export interface PostNotificationDto{
  postName: string;
 // ownerProfile: Profile; we will pass owner id as a key
  eventInvokerId: string; //we need to send it

  notificationType: string;
  date: Date;

  text: string;
}