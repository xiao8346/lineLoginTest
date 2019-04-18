import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export interface IAppConfig {
  apiBaseUrl: string;
}

export const AppConfig: IAppConfig = {
  apiBaseUrl: 'https://xiao-test-client.herokuapp.com',
};