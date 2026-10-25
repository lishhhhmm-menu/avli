import configData from './config.json';
import { AppConfig } from '../types';

/**
 * Global application configuration.
 *
 * To adjust settings for a restaurant deployment, edit `src/data/config.json`.
 */
export const appConfig: AppConfig = {
    enableBasket: configData.enableBasket,
};

export const config = appConfig;
