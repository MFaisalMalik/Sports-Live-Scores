import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

const {
  PORT,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  PAYPAL_CLIENT_ID,
  PAYPAL_SECRET_KEY,
  PAYPAL_MONTHLY_PLAN_ID,
  PAYPAL_ANNUAL_PLAN_ID,
} = process.env;

assert(PORT, 'Port is required');

export default {
  port: PORT,
  hostUrl: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
  },
  paypaClientId: PAYPAL_CLIENT_ID,
  paypalSecretKey: PAYPAL_SECRET_KEY,
  paypalMonthlyPlanId: PAYPAL_MONTHLY_PLAN_ID,
  paypalAnnualPlanId: PAYPAL_ANNUAL_PLAN_ID,

};