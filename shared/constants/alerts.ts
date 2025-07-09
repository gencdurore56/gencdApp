export enum AlertTypes {
  unconnectedAccount = 'unconnectedAccount',
  web3ShimUsage = 'web3ShimUsage',
  invalidCustomNetwork = 'invalidCustomNetwork',
  smartTransactionsMigration = 'smartTransactionsMigration',
}

export const TOGGLEABLE_ALERT_TYPES = [
  AlertTypes.unconnectedAccount,
  AlertTypes.web3ShimUsage,
  AlertTypes.smartTransactionsMigration,
];

export enum Web3ShimUsageAlertStates {
  recorded = 'recorded',
  dismissed = 'dismissed',
}
