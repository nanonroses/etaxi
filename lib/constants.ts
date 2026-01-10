// URLs de las aplicaciones ETAXI

// App de Pasajeros
export const PASSENGER_APP_URLS = {
  android: 'https://play.google.com/store/apps/details?id=com.eTaxiChile&hl=es_CL',
  ios: 'https://apps.apple.com/es/app/etaxi-cliente/id550431345',
} as const;

// App de Conductores/Taxistas (solo Android)
export const DRIVER_APP_URLS = {
  android: 'https://play.google.com/store/apps/details?id=com.liberty.driver.etaxichile',
} as const;

// URLs combinadas para fácil acceso
export const APP_DOWNLOAD_URLS = {
  passenger: PASSENGER_APP_URLS,
  driver: DRIVER_APP_URLS,
} as const;
