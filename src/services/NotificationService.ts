import { io } from "socket.io-client";
import type { PostNotificationDto } from "@/Dtos/notification/PostNotificationDto";


export class NotificationService{
  socket = io("localhost:3001");

  constructor() {
    this.socket.connect();
    this.socket.on("connect", () => {
      console.log(this.socket.id);

    });
  }

  createNotification(notification: PostNotificationDto) {
    this.socket.emit("createNotification", notification);
  }

  /**
   * user should receive only their notifications
   * @param userId
   * @param notificationListener
   */
  listenToNotifications(userId: string, notificationListener: (chat: PostNotificationDto) => void) {
    this.socket.on(userId, (chat: PostNotificationDto) => {
      notificationListener(chat);
    });
  }

  disconnect(userId: string) {
    this.socket.off(userId);
  }

}