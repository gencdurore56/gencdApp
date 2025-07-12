import { hasProperty, isObject } from '@gencdapp/utils';
import {
  NetworkConfiguration,
  RpcEndpointType,
} from '@gencdapp/network-controller';
import {
  BlockExplorerUrl,
  BUILT_IN_CUSTOM_NETWORKS_RPC,
  ChainId,
  NetworkNickname,
  NetworksTicker,
} from '@gencdapp/controller-utils';
import { cloneDeep } from 'lodash';

type VersionedData = {
  meta: { version: number };
  data: Record<string, unknown>;
};

export const version = 146;

export async function migrate(originalVersionedData: VersionedData) {
  const versionedData = cloneDeep(originalVersionedData);
  versionedData.meta.version = version;
  transformState(versionedData.data);
}

function transformState(state: Record<string, unknown>) {
  if (
    hasProperty(state, 'NetworkController') &&
    isObject(state.NetworkController) &&
    isObject(state.NetworkController.networkConfigurationsByChainId)
  ) {
    const megaethTestnet = 'megaeth-testnet';
    const megaethTestnetChainId = ChainId[megaethTestnet];
    const megaethTestnetConfiguration: NetworkConfiguration = {
      chainId: megaethTestnetChainId,
      name: NetworkNickname[megaethTestnet],
      nativeCurrency: NetworksTicker[megaethTestnet],
      blockExplorerUrls: [BlockExplorerUrl[megaethTestnet]],
      defaultRpcEndpointIndex: 0,
      defaultBlockExplorerUrlIndex: 0,
      rpcEndpoints: [
        {
          networkClientId: megaethTestnet,
          type: RpcEndpointType.Custom,
          url:
            BUILT_IN_CUSTOM_NETWORKS_RPC[MegaEthNetworkConstants.MEGAETH_TESTNET],
        },
      ],
    };

    state.NetworkController.networkConfigurationsByChainId[
      megaethTestnetChainId
    ] = megaethTestnetConfiguration;
    
   // Add a check to ensure the migration only runs once
   if (!hasProperty(state.NetworkController, 'migratedToMegaEth')) {
     state.NetworkController.migratedToMegaEth = true;
   }
   
   // Consider adding a function to save the updated state back to disk
   // This might not be necessary depending on your application's architecture
   // saveUpdatedState(versionedData.data);
 }
}

// Assuming MegaEthNetworkConstants is defined elsewhere in your codebase
// If not, define it here or import it as needed

const MegaEthNetworkConstants = {
 MEGAETH_TESTNET : "https://rpc.megathereum.test"
};
