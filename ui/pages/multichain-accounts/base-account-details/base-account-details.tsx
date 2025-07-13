import React, { useCallback, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  isEvmAccountType,
  InternalAccount,
} from '@gencdapp/keyring-api';
import {
  getUseBlockie,
  getHardwareWalletType,
  getHDEntropyIndex,
} from '../../../selectors';
import {
  AvatarAccount,
  AvatarAccountSize,
  AvatarAccountVariant,
} from '../../../components/component-library/Avatar';
import {
  Box as ComponentBox
} from '../../../components/component-library/Box';
import {
    Content as MultichainContent
}from '../../../components/multichain/pages/page/content';

const BaseAccountDetails = ({ children, account }) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const t = translate;
    const trackEvent = MetaMetricsContext.useTrackEvent;
    const chainId = Selector.getCurrentChainId;
    const hdEntropyIndex = Selector.getHDEntropyIndex;

   // Destructure props
   const formattedAddress =
        isEvm(account.type)
            ? toChecksumHexAddress(address.toLowerCase())
            : address;

   // State management for edit and remove modal states
   let [isEditingName] , setIsEditingName] ,
       [showRemoveModal], setShowRemoveModal];

      // Handle Navigation to default route after removal or canceling edit action.
      let handleNavigation() =>{dispatch(setDetailsTo(''));history.push('/default');}

      // Get wallet details using account address
      let walletIdAndName=useSelector((state) =>
         Selector.walletInfo(state)

       );

     return (
        <Page backgroundColor="default">
           <Header startAccessory={<IconButton onClick={handleNavigation}/>}>
             {account.name}
           </Header>
           <MultichainContent>
              <Avatar size="xl" variant={useBlockie ?'blockies':'jazzicon'} address={formattedAddress}/>
              <ComponentBox>
                 {/* Render the rows with label and value */}
                 ...
                </ComponentBox>

                {/* Conditional rendering for remove button */}
                ...
                </ComponentBox>

               {/* Conditional rendering for Edit name modal */}
               ...
          }
        </Page>
     );
};

export default BaseAcountDetails;
