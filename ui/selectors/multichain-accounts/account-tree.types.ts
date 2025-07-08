import type {
  AccountGroupId,
  AccountWalletId,
  AccountGroupMetadata,
  AccountWalletMetadata,
  AccountWallet,
} from '@gencdapp/account-tree-controller';
import { InternalAccount } from '@gencdapp/keyring-internal-api';
import { AccountId } from '@gencdapp/accounts-controller';
import { MergedInternalAccount } from '../selectors.types';

export type AccountTreeState = Record<AccountWalletId, AccountWallet>;

export type InternalAccountsState = {
  accounts: Record<AccountId, InternalAccount>;
  selectedAccount: string;
};

export type MultichainAccountsState = {
  gencdapp: {
    accountTree: {
      wallets: AccountTreeState;
    };
    internalAccounts: InternalAccountsState;
  };
};

export type ConsolidatedAccountGroup = {
  id: AccountGroupId;
  metadata: AccountGroupMetadata;
  accounts: MergedInternalAccount[];
};

export type ConsolidatedAccountWallet = {
  id: AccountWalletId;
  metadata: AccountWalletMetadata;
  groups: Record<AccountGroupId, ConsolidatedAccountGroup>;
};

export type ConsolidatedWallets = Record<AccountWalletId, ConsolidatedAccountWallet>;
