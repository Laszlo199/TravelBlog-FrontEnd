/**
 * here is a problem
 */
export interface GetNotificationDto{
  postName: string;
  // ownerProfile: Profile; we will pass owner id as a key
  eventInvokerName: string; //we need to send it

  notificationType: string;
  date: Date;

  text: string;
}