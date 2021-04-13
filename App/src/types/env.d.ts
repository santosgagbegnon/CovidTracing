declare module '@env' {
    export const {
        API_KEY,
        AUTH_DOMAIN,
        PROJECT_ID,
        STORAGE_BUCKET,
        MESSAGING_SENDER_ID,
        APP_ID,
        MEASUREMENT_ID,
        GOOGLE_PLACES_API_KEY} : string;
    export const ENV: 'dev' | 'prod';
}