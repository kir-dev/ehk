import * as migration_20250809_182905_init from './20250809_182905_init';
import * as migration_20250810_113709_create_users_sessions from './20250810_113709_create_users_sessions';

export const migrations = [
  {
    up: migration_20250809_182905_init.up,
    down: migration_20250809_182905_init.down,
    name: '20250809_182905_init',
  },
  {
    up: migration_20250810_113709_create_users_sessions.up,
    down: migration_20250810_113709_create_users_sessions.down,
    name: '20250810_113709_create_users_sessions'
  },
];
