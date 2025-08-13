import type CspDev from 'csp-dev';

export function s3(): CspDev.DirectiveDescriptor {
  return {
    'connect-src': [ 'https://s3-hb-test.load.rs' ],
  };
}
