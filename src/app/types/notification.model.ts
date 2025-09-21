export type Notification = {
  id: string;
  type: string;
  isActive: boolean;
};

export type NotificationType = 'Push' | 'Email' | 'SMS';
