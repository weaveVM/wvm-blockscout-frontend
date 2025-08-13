import { getEnvValue } from './utils';

const s3 = Object.freeze({
  region: getEnvValue('NEXT_PUBLIC_S3_REGION'),
  endpoint: getEnvValue('NEXT_PUBLIC_S3_ENDPOINT'),
  accessKeyId: getEnvValue('NEXT_PUBLIC_S3_ACCESS_KEY_ID'),
  secretAccessKey: getEnvValue('NEXT_PUBLIC_S3_SECRET_ACCESS_KEY'),
});

export default s3;
