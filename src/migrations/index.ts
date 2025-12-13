import * as migration_20250809_182905_init from './20250809_182905_init';
import * as migration_20250810_113709_create_users_sessions from './20250810_113709_create_users_sessions';
import * as migration_20250823_150138 from './20250823_150138';
import * as migration_20250824_143924 from './20250824_143924';
import * as migration_20250824_190720 from './20250824_190720';
import * as migration_20250826_130659 from './20250826_130659';
import * as migration_20250826_150956 from './20250826_150956';
import * as migration_20250826_161947 from './20250826_161947';
import * as migration_20250826_162750 from './20250826_162750';
import * as migration_20251009_170808 from './20251009_170808';
import * as migration_20251009_170959 from './20251009_170959';
import * as migration_20251009_174520_add_regulations_file_eng from './20251009_174520_add_regulations_file_eng';
import * as migration_20251113_185415 from './20251113_185415';

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
    name: '20250824_143924',
  },
  {
    up: migration_20250824_190720.up,
    down: migration_20250824_190720.down,
    name: '20250824_190720',
  },
  {
    up: migration_20250826_130659.up,
    down: migration_20250826_130659.down,
    name: '20250826_130659',
  },
  {
    up: migration_20250826_150956.up,
    down: migration_20250826_150956.down,
    name: '20250826_150956',
  },
  {
    up: migration_20250826_161947.up,
    down: migration_20250826_161947.down,
    name: '20250826_161947',
  },
  {
    up: migration_20250826_162750.up,
    down: migration_20250826_162750.down,
    name: '20250826_162750',
  },
  {
    up: migration_20251009_170808.up,
    down: migration_20251009_170808.down,
    name: '20251009_170808',
  },
  {
    up: migration_20251009_170959.up,
    down: migration_20251009_170959.down,
    name: '20251009_170959',
  },
  {
    up: migration_20251009_174520_add_regulations_file_eng.up,
    down: migration_20251009_174520_add_regulations_file_eng.down,
    name: '20251009_174520_add_regulations_file_eng',
  },
  {
    up: migration_20251113_185415.up,
    down: migration_20251113_185415.down,
    name: '20251113_185415'
  },
];
