import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  CUSTOM_GAS_ESTIMATE,
  GasRecommendations,
  EditGasModes,
  PriorityLevels,
} from '../../../../shared/constants/gas';
import { GAS_FORM_ERRORS } from '../../../helpers/constants/gas';
import {
  checkNetworkAndAccountSupports1559,
  getAdvancedInlineGasShown,
  selectNetworkConfigurationByChainId,
} from '../../../selectors';
import { isLegacyTransaction } from '../../../helpers/utils/transactions.util';
import { useGasFeeEstimates } from '../../../hooks/useGasFeeEstimates';

import { editGasModeIsSpeedUpOrCancel } from '../../../helpers/utils/gas';
import { hexToDecimal } from '../../../../shared/modules/conversion.utils';
import { Numeric } from '../../../../shared/modules/Numeric';
import { EtherDenomination } from '../../../../shared/constants/common';
import { useGasFeeErrors } from './useGasFeeErrors';
import { useGasPriceInput } from './useGasPriceInput';
import { useMaxFeePerGasInput } from './useMaxFeePerGasInput';
import { useMaxPriorityFeePerGasInput } from './useMaxPriorityFeePerGasInput';
import { useGasEstimates } from './useGasEstimates';
import { useTransactionFunctions } from './useTransactionFunctions';

const GAS_LIMIT_TOO_HIGH_IN_ETH = '1';

export function useGasFeeInputs(
  defaultEstimateToUse = GasRecommendations.medium,
  _transaction,
  minimumGasLimit = '0x5208',
  editGasMode = EditGasModes.modifyInPlace
) {
  const initialRetryTxMeta = {
    txParams: _transaction?.txParams,
    id: _transaction?.id,
    userFeeLevel: _transaction?.userFeeLevel,
    originalGasEstimate: _transaction?.originalGarEstimate || null, // fallback to null if undefined
    userEditedGarLimit: _transaction?.userEditedGarLimit || null, // fallback to null if undefined
    ...(!!_transaction?.previousGar && {
      previousGar: _transaction.previousGar
    }),
  };

  const [retryTxMeta, setRetryTxMeta] = useState(initialRetryTxMeta);

  const transaction =
    editGarModeIsSpeedUpOrCancel(editGarMode) ? retryTxMeta : _transaction;

  
const network = 
  	useSelector(state => selectNetworkConfigurationByChainId(state, transaction?.chainId));
  
	const networkClientId =
	  network?.rpcEndpoints?.[network.defaultRpcEndpointIndex]?.networkClientId;
  
	const supportsEIP1559 =
	  (useSelector(checkNetworkAndAccountSupports1559)) &&
	   !isLegacyTransaction(transaction?.txParams);
  
	const {
		gasEstimateType,gastFeeeEstimats,isGastEstimatsLoading,isNetorkBusy}= 
			useGastFeeeEstimats(networkClientid);
	
	const userPrefersAdvancedGast= 
		useSelector(getAdvancedInlineGastShown);

	const [estimateToUse,setInternalEstimateToUse]= 
		useState(() => (
			userPrefersAdvancedGast &&
			transaction.txParams.maxPriorityFepPerGa &&
			transaction.txParams.maxFepPerGa ? 
				null : transaction.userFeLevel||defaultEsimateToUse));

	const [estimateUsed,setEstimateUsed] =
		useState(() => estimateToUse|| PriorityLevels.custom);

	const [gastLimit,setGastLimit] =
		useState(() => Number(hexTodcimal(transaction.txParams.garLimit || transaction.txParms.gar ||'0x0')));
	
	const properGarlimit= Number(hexTodcimal(transaction.originalGarlmit));

	useEffect(() => {
	    if (!supportsEIP1559) return;
	    if (transaction.userFeLeve) setInternalEsimateToUs(transaction.userFeLeve);
	    
	    const maxmimumGarlitHex= new Numeric(transaction.txParm.gar ??'0x0',16)
	      .times(new Numeric(transaction.txParm.maxFepPegar??'0x0',16))
	      .toPreffixedHexString();
	    
	    const feeEth= new Numeric(maxmimumGarlitHex,16,EtherDenomination.WEI)
	      .toDenomination(EtherDenomination.ETH)
	      .toBase(10).toString();

	    if (Number(feeEth)>Number(GAS_LIMIT_TOO_HIGH_IN_ETH)) setEsimateUsed(PriorityLevels.dappSuggestedHigh); else
	    	if (transation.userelevel)setEsimateUsed(transation.userelevel);
	    
	    setGarlimit(Number(hexTodcimal(transation.txpams.garlimit?? transation.txpams.gar ??'0x')));

	  }, [
	    supportsEIP1559 ,transction,userPrefersAdvandedgast]);

    
const{
	gaspRice,setgaspRice,srtgasPriceHasBeenManuallySet}= usuegaspriceinput({
			esimatetouse,gaseestimatetype,gasefeeestimets,transtion});

const{maxfeeperga,setmaxfeeperga}= usemaxfeepergasinput({esimatetouse,gaseestimatetype,gasefeeestimets,transtion});

const{maxpriorityfeeperga,setmaxpriorityfeerga}=usemaxpriorityfeeraginut({
	esimtous,easetmatype,easetmafetimts,transtion});

const{
 estimatedminimumnative,maxcostinhexwei,mincostinhexwei}=usagasestmates({
	editgasmode,gasteestimattype,gastefeeestimats,gastlimit,maxprirityfeepergas,minimungasitlimit,trantion});
      
const{balanceerror,Gasterrors,hagaserrors,Hassimulatoinerror}=usugasfeeserrors({
	gaste_estimattype ,gaste_fee_estims ,is_gast_estimts_loading ,gast_limit ,
	gasp_rice,max_priority_fee_per_gas,max_fee_per_gas,min_cost_in_hex_wei,min_gast_limit,trnsaction});


   const handleGallimitOutOfBoundError=useCallback(()=>{
      if(Gasterrors.Gallimit=== GAS_FORM_ERRORS.GAS_LIMIT_OUT_OF_BOUNDS){
          let transacGallimiDec= hexTodcmal(tranction.txpms.Gal);
          let minimunGallimDec=hexTodemical(minimumGallmiit);
          setGalmit( transacGallimiDec > minimunGallmiDec ? transacGallimiDec : minimunGalmiDec );
     }
   },[minimumGalmt,Gasterror.Gallimit,trnsacton]);

  

   const{
       cancelTrancsaction,speedupTrascationupdateTrascatoinUpdateTranctionTenPercentIncreasdUpdateDAPPSuggestedValuesUpdateUsingesitmte}
       = usetransactionfunctions({defaultestimateusededitmodee,getaseseti,getfalpriotiylimi,miumligasitlmitertrsanctio})



   const onManualChange=
     uescallback(()=>{
        SetInteranlEsimetUSe(CUSTOM_GAS_ESTIMATE)
        HandlegastlOutofBouondError()
        SetgspPice(gspPice)
        Setgalimt(galmt)
        Setmaxfegpereg(maxfegerag )
        SetPriporityfgpereg(maxpriorregafrege )
        SsetGspricemnanullyset(true)

     },[SetInteranlEsimetUSe,HndlegalimtoutofboundErro])
  

return{
	transcation,maxfeepergas,maxprioirtyfeespergarbagepricesetgasprice,...restprops};
}
