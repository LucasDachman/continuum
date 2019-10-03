import { createSlice } from 'redux-starter-kit';
import { numSteps } from '../redux/config-creators/compositionReducerConfig';
import { range } from 'lodash';
import { createCompositionSliceConfig } from '../redux/config-creators/compositionReducerConfig';

import kick from '../audio-files/kicks/kick_01.wav';
import snare from '../audio-files/snares/snare_01.wav'
import rim from '../audio-files/rims/rim_01.wav';
import shakerSnap from '../audio-files/shaker_snaps/shaker_snap_01.wav';
import clap from '../audio-files/claps/clap_01.wav';
import shortCymbal from '../audio-files/short_cymbals/short_cymbal_01.wav';
import longCymbal from '../audio-files/long_cymbals/long_cymbal_01.wav';

const files = [kick, snare, rim, shakerSnap, clap, shortCymbal, longCymbal]
  .map((path, i) => ({
    path,
    name: path.match(/\w*_\d\d(?=\.)/)[0] || 'default',
    index: String(i)
  }));

// const kicksContext = require.context('../audio-files/kicks/', true, /01\.wav$/);
// const snaresContext = require.context('../audio-files/snares', true, /01\.wav$/);
// const rimsContext = require.context('../audio-files/rims', true, /01\.wav$/);
// const shakerSnapsContext = require.context('../audio-files/shaker_snaps', true, /01\.wav$/);
// const clapsContext = require.context('../audio-files/claps', true, /01\.wav$/);
// const shortCymbalsContext = require.context('../audio-files/short_cymbals', true, /01\.wav$/);
// const longCymbalsContext = require.context('../audio-files/long_cymbals', true, /01\.wav$/);

// resolve file paths
// for (let [key, context] of Object.entries(files)) {
//   files[key] = context.keys().map(k => {
//     const file = context(k)
//     const name = file.match(/\w*_\d\d(?=\.)/)[0] || 'default';
//     return { file, name };
//   });
// }

const compositionSliceConfig = createCompositionSliceConfig();

const drummerSlice = createSlice({
  slice: 'drummer',
  initialState: {
    files,
    filterFreq: 1,
    composition: compositionSliceConfig.initialState,
  },
  reducers: {
    ...compositionSliceConfig.reducers,
    setFilterFreq(state, action) {
      state.filterFreq = action.payload;
    }
  }
});

export const {
  setCompositionCell,
  toggleCompositionCell,
  setFilterFreq
} = drummerSlice.actions;
export default drummerSlice.reducer;