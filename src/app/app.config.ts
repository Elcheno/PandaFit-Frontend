import { type ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ModalTemplateComponent } from './components/modal-template/modal-template.component';
import { DynamicModalDirective } from './components/modal-template/dynamic-modal.directive';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    DynamicModalDirective,
    ModalTemplateComponent
  ],
};
