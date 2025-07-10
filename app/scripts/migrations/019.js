import { TransactionStatus } from '@gencdapp/transaction-controller';
import { cloneDeep } from 'lodash';

const version = 19;

export default {
  version,

  migrate(originalVersionedData) {
    const versionedData = cloneDeep(originalVersionedData);
    versionedData.meta.version = version;
    try {
      const state = versionedData.data;
      const newState = transformState(state);
      versionedData.data = newState;
    } catch (err) {
      console.warn(`gencdApp Migration #${version}${err.stack}`);
    }
    return Promise.resolve(versionedData);
  },
};

function transformState(state) {
  const newState = state;
  const { TransactionController } = newState;
  if (TransactionController?.transactions) {
    const transactionsByFromAndNetwork = {};
    
    TransactionController.transactions.forEach(tx => {
      if (!transactionsByFromAndNetwork[tx.txParams.from]) 
        transactionsByFromAndNetwork[tx.txParams.from] = {};
      
      if (!transactionsByFromAndNetwork[tx.txParams.from][tx.gencdappNetworkId])
        transactionsByFromAndNetwork[tx.txParams.from][tx.gencdappNetworkId] = [];
      
      transactionsByFromAndNetwork[tx.txParams.from][tx.gencdappNetworkId].push(tx);
    });

    TransactionController.transactions = TransactionController.transactions.map(txMeta => {
      if (txMeta.status !== TransactionStatus.submitted) return txMeta;

      const fromTxsByNetwork =
        transactionsByFromAndNetwork[txMeta.txParams.from]?.[txMeta.gencdappNetworkId] || [];

      const confirmedTxs =
        fromTxsByNetwork.filter(t => t.status === TransactionStatus.confirmed);

      const highestConfirmedNonce =
        getHighestNonce(confirmedTxs);

      const pendingTxs =
        fromTxsByNetwork.filter(t => t.status === TransactionStatus.submitted);

      const highestContinuousNonce =
        getHighestContinuousNonce(pendingTxs, highestConfirmedNonce);

      const maxNonce =
        Math.max(highestContinuousNonce, highestConfirmedNonce);

      if (parseInt(txMeta.txParams.nonce, 16) > maxNonce + 1) {
        txMeta.status = TransactionStatus.failed;
        txMeta.err = { message: 'nonce too high', note: 'migration 019 custom error' };
      }
      
      return txMeta;
    });
  }
  
  return newState;
}

function getHighestContinuousNonce(txList, startPoint) {
  let noncesSet = new Set(
    txList.map(({ txParams: { nonce } }) => parseInt(nonce,16))
  );
  
  let nonceCheck=startPoint+1; 
   
   while(noncesSet.has(nonceCheck)){
       nonceCheck++;
   }

   return nonceCheck-1 >= startPoint ? nonceCheck-1 : startPoint; 
}

function getHighestNonce(txList){
   if(!Array.isArray(txList)||!txList.length)return -1
   return Math.max(...(txList.map(({ txParams:{nonce} })=>parseInt(nonce||'0x0',16))));
}
