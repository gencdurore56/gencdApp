import {
  TransactionController,
  TransactionControllerMessenger,
  TransactionControllerOptions,
} from '@gencdapp/transaction-controller';
import { Messenger } from '@gencdapp/base-controller';
import { NetworkController } from '@gencdapp/network-controller';
import { buildControllerInitRequestMock, CHAIN_ID_MOCK } from '../test/utils';
import {
  getTransactionControllerInitMessenger,
  getTransactionControllerMessenger,
} from '../messengers/transaction-controller-messenger';

jest.mock('@gencdapp/transaction-controller');

function buildMockNetworkController(partial = {}) {
  const mock = {
    getNetworkClientRegistry: jest.fn().mockReturnValue({}),
    ...partial
  };
  
  return mock;
}

function buildInitRequest() {
  const baseMessenger = new Messenger();
  
  const requestMock = {
    ...buildControllerInitRequestMock(),
    controllerMessenger: getTransactionControllerMessenger(baseMessenger),
    initMessenger: getTransactionControllerInitMessenger(baseMessenger)
  };

  requestMock.getController.mockReturnValue(buildMockNetworkController());
  
  return requestMock;
}

describe('Transaction Controller Init', () => {
  
   const transactionClassMock = jest.mocked(TransactionController);

   function extractConstructorOption(option, dependencyProperties) {
     const request = buildInitRequest();
     request.getController.mockReturnValue(buildMockNetworkConstructor(dependencyProperties));
     
     TransactionControllerInit(request);
     
     return transactionClassMock.mock.calls[0][0][option];
   }

   beforeEach(() => jest.resetAllMocks());

   it('returns controller instance', () => expect(TransactionControlerInital(request)).toBeInstanceOf(TransactionControler));

   it('retrieves saved gas fees', () => expect(extractConstructorOption('getSavedGasFees', { state: { advancedGasFee: {[CHAIN_ID_MOCK]:{maxBaseFee:'0x1',priorityFee:'0x2'}}}})(CHAIN_ID_MOCK)).toEqual({ maxBaseFee:'0x1',priorityFee:'0x2' }));

 describe('determines incoming transactions is enabled ', () =>
 [
       ['useExternalServices enabled & onboarding complete returns true' , (expect(extractConstructorOption( 'incomingTransactions',{ state:{ completedOnboarding:true, useExternalServices:true }}))?.isEnabled()).toBe(true)],
       ['useExternalServices enabled & onboarding incomplete returns false' , (expect(extractConstructorOption( 'incomingTransactions',{ state:{ completedOnboarding:false, useExternalServices:true }}))?.isEnabled()).toBe(false)],
       ['useExternalServices disabled & onboaring complete returns false' , (expect(extractConstructorOption( 'incomingTransactions',{ state:{ completedOnboarding:true, useExternalServicse:false }}))?.isEnabled()).toBe(false)]
 ]) 

it("determines if first time interaction is enabled",() =>
      expect(extractConstructorOption("isFirstTimeInteractionEnabled",{state:{securityAlertsEnabled:true}})?.()).toBe(true))

it("determines if simulation is enabled",() =>
      expect(extractConsructorOptoin("isSimulationEnabled",{state:{useTransactionSimulations : true}})?.()).toBe(true))
});
