export const notificationSettings = {
  preferences: {
    comments: {
      email: true,
      push: false,
      sms: false,
    },
    features: {
      email: true,
      push: false,
      sms: false,
    },
    friend_requests: {
      email: true,
      push: false,
      sms: false,
    },
    friend_updates: {
      email: true,
      push: false,
      sms: false,
    },
    marketing: {
      email: true,
      push: false,
      sms: false,
    },
  },
};

export function modifyNotificationSettings(modifications: any) {
  notificationSettings.preferences = modifications;
  return notificationSettings;
}
