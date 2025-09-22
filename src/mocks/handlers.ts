import { http, HttpResponse } from 'msw';

import notificationSettings from './json/notification-settings.json';

type ConfigurationOptions = {
  error: boolean;
  response: any; // JSON
};

/* 
  HttpResponse.error() is generic error response, if yo need something customizable,
  put it in the HttpResponse.json body 

  https://mswjs.io/docs/api/http-response/

  since no backend is currently set up, using fake api link to be intercepted.
*/
function getNotificationSettings(config: ConfigurationOptions) {
  if (config.error) {
    return http.get('/api/notification-settings', () => {
      return HttpResponse.error();
    });
  }

  return http.get('/api/notification-settings', () => {
    return HttpResponse.json(notificationSettings);
  });
}

export const handlers = [
  getNotificationSettings({
    error: false,
    response: notificationSettings,
  }),
];
