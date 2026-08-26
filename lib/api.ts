export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  // Placeholders for future NestJS integration
  auth: {
    login: () => {},
    register: () => {},
  },
  students: {
    getProfile: () => {},
  },
  universities: {
    list: () => {},
  },
  applications: {
    list: () => {},
  },
  documents: {
    list: () => {},
  },
  payments: {
    list: () => {},
  },
  notifications: {
    list: () => {},
  },
};
