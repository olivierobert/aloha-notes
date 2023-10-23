import { Polly } from '@pollyjs/core';
import FsPersister from '@pollyjs/persister-fs';
import { PlaywrightAdapter } from 'polly-adapter-playwright';
import { Page } from '@playwright/test';

Polly.register(PlaywrightAdapter);
Polly.register(FsPersister);

const setupPolly = (
	page: Page,
	cassetteName: string,
  recordIfMissing: boolean = false,
) => {
  const polly = new Polly(cassetteName, {
    adapters: ['playwright'],
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: 'test/fixtures/cassettes',
      },
    },
    flushRequestsOnStop: true,
    recordIfMissing: recordIfMissing,
    recordFailedRequests: true,
    adapterOptions: {
			playwright: {
				context: page,
			},
		},
  });

  return polly;
};

export { setupPolly };
