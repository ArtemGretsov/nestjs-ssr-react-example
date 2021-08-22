export const SECRET_KEY_HEADER = 'x-secret-key';
export const API_KEY_HEADER = 'x-api-key';

export const PUBLIC_HEADERS = [
  {
    name: API_KEY_HEADER,
    description: 'API public key for public api authentication',
  },
  {
    name: SECRET_KEY_HEADER,
    description: 'API secret key for public api authentication',
  },
];
