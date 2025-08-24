import * as migration_20250809_182905_init from './20250809_182905_init';
import * as migration_20250810_113709_create_users_sessions from './20250810_113709_create_users_sessions';
import * as migration_20250823_150138 from './20250823_150138';
import * as migration_20250824_143924 from './20250824_143924';

export const migrations = [
  {
    up: migration_20250809_182905_init.up,
    down: migration_20250809_182905_init.down,
    name: '20250809_182905_init',
  },
  {
    up: migration_20250810_113709_create_users_sessions.up,
    down: migration_20250810_113709_create_users_sessions.down,
    name: '20250810_113709_create_users_sessions',
  },
  {
    up: migration_20250823_150138.up,
    down: migration_20250823_150138.down,
    name: '20250823_150138',
  },
  {
    up: migration_20250824_143924.up,
    down: migration_20250824_143924.down,
    name: '20250824_143924'
  },
];
