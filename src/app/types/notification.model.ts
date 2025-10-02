export type Notification = {
  email: boolean;
  push: boolean;
  sms: boolean;
};

export type NotificationSettings = {
  [type: string]: Notification;
};
