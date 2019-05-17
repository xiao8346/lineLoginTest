import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

export interface IAppConfig {
  apiBaseUrl: string;
  lineLoginCallBackURL: string;
}

export const AppConfig: IAppConfig = {
  apiBaseUrl: 'http://localhost:3300',
  lineLoginCallBackURL: 'http://localhost:3000/get-code',
};
