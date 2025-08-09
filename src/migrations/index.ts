import * as migration_20250809_182905_init from './20250809_182905_init';

export const migrations = [
  {
    up: migration_20250809_182905_init.up,
    down: migration_20250809_182905_init.down,
    name: '20250809_182905_init'
  },
];
