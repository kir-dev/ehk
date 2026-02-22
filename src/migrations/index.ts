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
import * as migration_20260210_212659_add_payout_periods from './20260210_212659_add_payout_periods';
import * as migration_20260210_215940_add_payout_periods_and_months from './20260210_215940_add_payout_periods_and_months';
import * as migration_20260222_182719_clubs_collection from './20260222_182719_clubs_collection';
import * as migration_20260222_195349_clubs_opening_hours_richtext from './20260222_195349_clubs_opening_hours_richtext';
import * as migration_20260222_200022_add_link_to_clubs from './20260222_200022_add_link_to_clubs';
import * as migration_20260222_201957_simplify_clubs_image from './20260222_201957_simplify_clubs_image';

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
    name: '20251113_185415',
  },
  {
    up: migration_20260210_212659_add_payout_periods.up,
    down: migration_20260210_212659_add_payout_periods.down,
    name: '20260210_212659_add_payout_periods',
  },
  {
    up: migration_20260210_215940_add_payout_periods_and_months.up,
    down: migration_20260210_215940_add_payout_periods_and_months.down,
    name: '20260210_215940_add_payout_periods_and_months',
  },
  {
    up: migration_20260222_182719_clubs_collection.up,
    down: migration_20260222_182719_clubs_collection.down,
    name: '20260222_182719_clubs_collection',
  },
  {
    up: migration_20260222_195349_clubs_opening_hours_richtext.up,
    down: migration_20260222_195349_clubs_opening_hours_richtext.down,
    name: '20260222_195349_clubs_opening_hours_richtext',
  },
  {
    up: migration_20260222_200022_add_link_to_clubs.up,
    down: migration_20260222_200022_add_link_to_clubs.down,
    name: '20260222_200022_add_link_to_clubs',
  },
  {
    up: migration_20260222_201957_simplify_clubs_image.up,
    down: migration_20260222_201957_simplify_clubs_image.down,
    name: '20260222_201957_simplify_clubs_image'
  },
];
