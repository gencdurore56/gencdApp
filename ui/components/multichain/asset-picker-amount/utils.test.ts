import configureStore from '../../../store/store';
import mockSendState from '../../../../test/data/mock-send-state.json';
import { getIsFiatPrimary } from './utils';

const createStore = ({ sendInputCurrencySwitched }: { sendInputCurrencySwitched: boolean }) =>
  configureStore({
    ...mockSendState,
    gencdapp: {
      ...mockSendState.gencdapp,
    },
    appState: { ...mockSendState.appState, sendInputCurrencySwitched },
  });

describe('getIsFiatPrimary selector', () => {
  it('returns true when sendInputCurrencySwitched is true', () => {
    const store = createStore({ sendInputCurrencySwitched: true });
    expect(getIsFiatPrimary(store.getState() as never)).toBe(true);
  });

  it('returns false when sendInputCurrencySwitched is false', () => {
    const store = createStore({ sendInputCurrencySwitched: false });
    expect(getIsFiatPrimary(store.getState() as never)).toBe(false);
  });
});
