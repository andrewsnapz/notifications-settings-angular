export type Notification = {
  id: string;
  group: string;
  type: string;
  isActive: boolean;
};

export type NotificationSettings = {
  comments: Notification[];
  ['feature-updates']: Notification[];
  ['friends-requests']: Notification[];
  ['marketing-and-promotional-content']: Notification[];
  ['updates-from-friends']: Notification[];
};

export type NotificationType = 'Push' | 'Email' | 'SMS';

export type NotificationResponse = {
  settings: {
    comments: Notification[];
    ['feature-updates']: Notification[];
    ['friends-requests']: Notification[];
    ['marketing-and-promotional-content']: Notification[];
    ['updating-from-friends']: Notification[];
  };
  types: NotificationType[];
};
