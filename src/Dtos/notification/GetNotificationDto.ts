/**
 * here is a problem
 */
export interface GetNotificationDto{
  postName: string;
  // ownerProfile: Profile; we will pass owner id as a key
  userId: string;
  userName: string;

  notificationType: string;
  date: Date;

  text: string;
}