import { cloneDeep } from 'lodash';

export const version = 106;

export async function migrate(originalVersionedData) {
  const versionedData = cloneDeep(originalVersionedData);
  versionedData.meta.version = version;
  const state = versionedData.data;
  const newState = { ...state, PreferencesController: { ...state?.PreferencesController, securityAlertsEnabled: state?.PreferencesController?.transactionSecurityCheckEnabled !== true } };
  return { ...versionedData, data: newState };
}
