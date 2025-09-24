export type Notification = {
  id: string;
  group: string;
  type: string;
  isActive: boolean;
};

export type NotificationSettings = {
  comments: Notification[];
  ['featureUpdates']: Notification[];
  ['friendsRequests']: Notification[];
  ['marketingAndPromotionalContent']: Notification[];
  ['updatesFromFriends']: Notification[];
};

export type NotificationType = 'Push' | 'Email' | 'SMS';
