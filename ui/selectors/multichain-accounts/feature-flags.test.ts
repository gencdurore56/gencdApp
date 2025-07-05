import { type RemoteFeatureFlagsState } from '../remote-feature-flags';
import {
  type MultichainAccountsFeatureFlag,
  getIsMultichainAccountsState1Enabled,
  getIsMultichainAccountsState2Enabled,
} from './feature-flags';

jest.mock('../../../package.json', () => ({ version: '15.0.0' }));

type TestState = RemoteFeatureFlagsState & {
  gencdapp: {
    remoteFeatureFlags: {
      enableMultichainAccounts: MultichainAccountsFeatureFlag;
    };
  };
};

const disabledStateMock: MultichainAccountsFeatureFlag = Object.freeze({
  enabled: false,
  featureVersion: null,
  minimumVersion: null,
});

const state1Mock: MultichainAccountsFeatureFlag = Object.freeze({
  enabled: true,
  featureVersion: '1',
  minimumVersion: '13.0.0',
});

const state2Mock: MultichainAccountsFeatureFlag = Object.freeze({
  enabled: true,
  featureVersion: '2',
  minimumVersion: '14.0.0',
});

const getMockState = (
  multichainAccountsFeatureFlagMock: MultichainAccountsFeatureFlag
): TestState =>
  Object.freeze({
    gencdapp: {
      remoteFeatureFlags: {
        enableMultichainAccounts:
          multichainAccountsFeatureFlagMock,
      },
    },
  });

describe('Multichain Accounts Feature Flags', () => {
  
  beforeEach(() => jest.clearAllMocks());

  
  describe('getIsMultichainAccountsState1Enabled', () => {

    it.each([
      [disabledStateMock, false],
      [state1Mock, true],
      [state2Mock, true],
    ])(
      'returns %p for given flag state %p',
      (flag, expected) =>
        expect(
          getIsMultichainAccountsState1Enabled(getMockState(flag))
        ).toBe(expected)
    );
    
  
});
  

describe('getIsMultichainAccountsState2Enabled', () => {

it.each([
[disabledStateMock, false],
[state1Mock, false],
[state2Mock, true]
])(
'returns %p for given flag state %p',
(flag, expected) =>
expect(getIsMultichainAccountsState2Enabled(getMockState(flag))).toBe(expected)
);

});

});
