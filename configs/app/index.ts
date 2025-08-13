import api from './api';
import app from './app';
import chain from './chain';
import * as features from './features';
import googleCloud from './gcp';
import meta from './meta';
import s3 from './s3';
import services from './services';
import UI from './ui';

const config = Object.freeze({
  app,
  chain,
  api,
  UI,
  features,
  services,
  meta,
  googleCloud,
  s3,
});

export default config;
