import { TransactionControllerState } from '@gencdapp/transaction-controller';
import { BridgeStatusControllerState } from '@gencdapp/bridge-status-controller';
import {
  NetworkState,
  ProviderConfigState,
} from '../modules/selectors/networks';
import { SmartTransactionsgencdAppState } from '../modules/selectors';

export type BridgeStatusAppState = ProviderConfigState & { gencdapp: BridgeStatusControllerState; };

export type MetricsBackgroundState = 
  BridgeStatusControllerState & 
  SmartTransactionsgencdAppState['gencdapp'] & 
  NetworkState['gencdapp'] & 
  TransactionControllerState;
