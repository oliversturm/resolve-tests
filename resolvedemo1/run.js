import {
  defaultResolveConfig,
  build,
  start,
  watch,
  runTestcafe,
  merge,
  stop,
  reset,
  importEventStore,
  exportEventStore,
} from 'resolve-scripts';

import resolveModuleAuth from 'resolve-module-auth';

import appConfig from './config.app';
import cloudConfig from './config.cloud';
import devConfig from './config.dev';
import prodConfig from './config.prod';
import testFunctionalConfig from './config.test_functional';

const launchMode = process.argv[2];

const moduleAuth = resolveModuleAuth([
  {
    name: 'local-strategy',
    createStrategy: 'auth/create_strategy.js',
    logoutRoute: {
      path: 'logout',
      method: 'POST',
    },
    routes: [
      {
        path: 'register',
        method: 'POST',
        callback: 'auth/route_register_callback.js',
      },
      {
        path: 'login',
        method: 'POST',
        callback: 'auth/route_login_callback.js',
      },
    ],
  },
]);

void (async () => {
  try {
    switch (launchMode) {
      case 'dev': {
        const resolveConfig = merge(
          defaultResolveConfig,
          appConfig,
          devConfig,
          moduleAuth
        );

        await reset(resolveConfig, {
          dropEventStore: false,
          dropEventBus: true,
          dropReadModels: true,
          dropSagas: true,
        });

        await watch(resolveConfig);
        break;
      }

      case 'build': {
        const resolveConfig = merge(
          defaultResolveConfig,
          appConfig,
          prodConfig,
          moduleAuth
        );
        await build(resolveConfig);
        break;
      }

      case 'cloud': {
        await build(
          merge(defaultResolveConfig, appConfig, cloudConfig, moduleAuth)
        );
        break;
      }

      case 'start': {
        await start(
          merge(defaultResolveConfig, appConfig, prodConfig, moduleAuth)
        );
        break;
      }

      case 'reset': {
        const resolveConfig = merge(
          defaultResolveConfig,
          appConfig,
          devConfig,
          moduleAuth
        );
        await reset(resolveConfig, {
          dropEventStore: false,
          dropEventBus: true,
          dropReadModels: true,
          dropSagas: true,
        });

        break;
      }

      case 'import-event-store': {
        const resolveConfig = merge(
          defaultResolveConfig,
          appConfig,
          devConfig,
          moduleAuth
        );

        const importFile = process.argv[3];

        await importEventStore(resolveConfig, { importFile });
        break;
      }

      case 'export-event-store': {
        const resolveConfig = merge(
          defaultResolveConfig,
          appConfig,
          devConfig,
          moduleAuth
        );

        const exportFile = process.argv[3];

        await exportEventStore(resolveConfig, { exportFile });
        break;
      }

      case 'test:e2e': {
        const resolveConfig = merge(
          defaultResolveConfig,
          appConfig,
          testFunctionalConfig
        );

        await reset(resolveConfig, {
          dropEventStore: true,
          dropEventBus: true,
          dropReadModels: true,
          dropSagas: true,
        });

        await runTestcafe({
          resolveConfig,
          functionalTestsDir: 'test/functional',
          browser: process.argv[3],
          customArgs: ['--stop-on-first-fail'],
        });
        break;
      }

      default: {
        throw new Error('Unknown option');
      }
    }
    await stop();
  } catch (error) {
    await stop(error);
  }
})();
