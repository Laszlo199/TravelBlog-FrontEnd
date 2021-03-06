import { NotificationService } from "@/services/NotificationService";
import { defineStore } from "pinia";
import type { PostNotificationDto } from "@/Dtos/notification/PostNotificationDto";
import type { GetNotificationDto } from "@/Dtos/notification/GetNotificationDto";
import { data } from "autoprefixer";

const notificationService = new NotificationService();

export const NotificationsStore = defineStore({
  id: "NotificationsStore",
  state: () => ({
    notifications: [] as PostNotificationDto[],
    userId: "",
  }),
  actions: {
    createNotification(notificationDto: PostNotificationDto) {
      console.log("and notification created in store");
      notificationService.createNotification(notificationDto);
    },

    setUser(userId: string) {
      console.log("user Id: " + userId);
      console.log("listening to notifications");
      //if (this.userId) notificationService.disconnect(this.userId);
      this.userId = userId;
      this.notifications = [];

      notificationService.listenToNotifications(userId, (notification) => {
        console.log("We got notification!");
        if(!this.notifications.includes(notification))
          this.notifications.push(notification);
      });
    },
  },
});
