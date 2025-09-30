import { http, HttpResponse } from 'msw';

import { notificationSettings, modifyNotificationSettings } from './mock-db';

type ConfigurationOptions = {
  error: boolean;
  response?: any; // JSON
};

/* 
  HttpResponse.error() is generic error response, if yo need something customizable,
  put it in the HttpResponse.json body 

  https://mswjs.io/docs/api/http-response/

  since no backend is currently set up, using fake api link to be intercepted.
*/
function getNotificationSettings(config: ConfigurationOptions) {
  if (config.error) {
    return http.get(
      'https://www.greatfrontend.com/api/projects/challenges/account/notifications',
      () => {
        return HttpResponse.error();
      },
    );
  }

  return http.get(
    'https://www.greatfrontend.com/api/projects/challenges/account/notifications',
    () => {
      return HttpResponse.json(notificationSettings);
    },
  );
}

function updateNotificationSettings(config: ConfigurationOptions) {
  if (config.error) {
    return http.put(
      'https://www.greatfrontend.com/api/projects/challenges/account/notifications',
      () => {
        return HttpResponse.json({
          error: 'Invalid notifications preferences.',
        });
      },
    );
  }
  return http.put(
    'https://www.greatfrontend.com/api/projects/challenges/account/notifications',
    async ({ request }) => {
      const updatedForm: any = await request.json();
      modifyNotificationSettings(updatedForm);
      return HttpResponse.json(updatedForm, { status: 200 });
    },
  );
}

export const handlers = [
  getNotificationSettings({
    error: false,
    response: notificationSettings,
  }),
  updateNotificationSettings({ error: true }),
];
