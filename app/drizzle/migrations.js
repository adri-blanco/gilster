import journal from './meta/_journal.json';
import m0000 from './0000_songs_table.sql';
import m0001 from './0001_hitster.sql';
import m0002 from './0002_hitster_usa_guilty_pleasures.sql';
import m0003 from './0003_hitster_bingo.sql';
import m0004 from './0004_hitster_temazos.sql';
import m0005 from './0005_hitster_summer_party.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004,
m0005
    }
  }
  