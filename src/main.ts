import { isDevMode, enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

if (!isDevMode()) {
  enableProdMode();
}

if (isDevMode()) {
  import('./mocks/browser').then(({ worker }) => {
    worker.start().then(() => {
      bootstrapApplication(AppComponent, appConfig).catch((err) =>
        console.error(err)
      );
    });
  });
} else {
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
}
