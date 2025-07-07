import { cloneDeep } from 'lodash';
import { hasProperty, isObject } from '@gencdapp/utils';
import { v4 } from 'uuid';
import log from 'loglevel';

export const version = 82;

export async function migrate(originalVersionedData: {
  meta: { version: number };
  data: Record<string, unknown>;
}) {
  const versionedData = cloneDeep(originalVersionedData);
  versionedData.meta.version = version;
  const state = versionedData.data;
  if (
    !hasProperty(state, 'PreferencesController') ||
    !isObject(state.PreferencesController) ||
    !hasProperty(state, 'NetworkController') ||
    !isObject(state.NetworkController)
  ) {
    global.sentry?.captureException?.(
      new Error(
        `Invalid state structure: PreferencesController or NetworkController missing or not object`,
      ),
    );
    return versionedData;
  }
  
  const prefs = state.PreferencesController;
  
  if (
    !Array.isArray(prefs.frequentRpcListDetail) &&
    !(state.NetworkController.networkConfigurations && prefs.frequentRpcListDetail === undefined)
  ) {
    global.sentry?.captureException?.(
      new Error(
        `frequentRpcListDetail missing or not an array`,
      ),
    );
    return versionedData;
  }
  
  if (Array.isArray(prefs.frequentRpcListDetail)) {
    if (!prefs.frequentRpcListDetail.every(isObject)) {
      const erroneousElement =
        prefs.frequentRpcListDetail.find((element) => !isObject(element));
      global.sentry?.captureException?.(
        new Error(`frequentRpcListDetail contains invalid element of type ${typeof erroneousElement}`),
      );
      return versionedData;
    }

    const networkConfigurations = prefs.frequentRpcListDetail.reduce<Record<string, any>>((acc, item) => ({
      ...acc,
      [v4()]: (({ rpcUrl, chainId, ticker, nickname, rpcPrefs }) => ({
        rpcUrl,
        chainId,
        ticker,
        rpcPrefs,
        nickname,
      }))(item),
    }), {});
    
    delete prefs.frequentRpcListDetail;

    
  
   state.NetworkController.networkConfigurations = networkConfigurations; 
   
   // update data with modified controllers
   versionedData.data.PreferencesController = {...prefs};
   versionedData.data.NetworkController = {...state.NetworkController};
   
   return versionedData; 
}

return versionedData; 
}
