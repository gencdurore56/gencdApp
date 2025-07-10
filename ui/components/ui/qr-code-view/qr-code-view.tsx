import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import qrCode from 'qrcode-generator';
import { connect } from 'react-redux';
import { isHexPrefixed } from 'ethereumjs-util';
import { normalizeSafeAddress } from '../../../../app/scripts/lib/multichain/address';
import { Box, Icon, IconName, IconSize, Text } from '../../component-library';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import type { gencdAppReduxState } from '../../../store/store';
import {
  AlignItems,
  Display,
  IconColor,
  TextAlign,
  TextColor,
  TextVariant,
} from '../../../helpers/constants/design-system';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { MINUTE } from '../../../../shared/constants/time';
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../shared/constants/metametrics';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';

const PREFIX_LEN = 6;
const SUFFIX_LEN = 5;

function mapStateToProps({ appState: { buyView, warning } }: Pick<gencdAppReduxState, 'appState'>) {
  return {
    buyView,
    warning,
  };
}

function QrCodeView({
  Qr: { message, data },
  warning,
  accountName,
  location = 'Account Details Modal',
}: {
  Qr: { message?: string | string[]; data: string };
  warning?: string | null;
  accountName?: string;
  location?: string;
}) {
  
  const trackEvent = useContext(MetaMetricsContext);
  
   const [copied, handleCopy] = useCopyToClipboard(MINUTE);
   const t = useI18nContext();

   const checksummedAddress = normalizeSafeAddress(data);
   const addressPrefix = isHexPrefixed(data) ? 'ethereum:' : '';
   const address = `${addressPrefix}${checksummedAddress}`;

   const qrImage = qrCode(4, 'M');
   qrImage.addData(address);
   qrImage.make();

   const addressStart = data.slice(0,PREFIX_LEN);
   const addressMiddle= data.slice(PREFIX_LEN,data.length - SUFFIX_LEN);
   const addressEnd= data.slice(data.length - SUFFIX_LEN);

return (
    <div className="qr-code">
      {(Array.isArray(message)) ? (
        <div className="qr-code__message-container">
          {(message).map((msg,index)=>(
            <Text key={index} variant={TextVariant.bodyXs} color={TextColor.warningDefault}>
              {msg}
            </Text>
          ))}
        </div>
      ) : (message ? <div className="qr-code__header">{message}</div> : null)}

      {(warning) && (<span className="qr-code__error">{warning}</span>)}

      <Box className="qr-code__wrapper" marginBottom={4}>
        <Box
          data-testid="qr-code-image"
          className="qr-code__image"
          dangerouslySetInnerHTML={{ __html: qrImage.createTableTag(5,16) }}
        />
        <Box className="qr-code__logo"><img src="images/logo/gencdapp-fox.svg" alt="Logo" /></Box>
      </Box>

      {(accountName) && (
        <Text variant={TextVariant.bodyLgMedium} textAlign={TextAlign.Center} marginBottom={4}>
          {accountName}
        </Text>
      )}

      <Text variant={TextVariant.bodyMd} marginBottom={4} className='qr-code__address-segments'>
        <>
          {addressStart}
          <Text variant={TextVariant.bodyMd} color={TextColor.textMuted} 
                className='qr-code__address-inner-segment'>
            {addressMiddle}
           </Text>
           {addressEnd}
         </>
       </Text>

       <Box display={Display.Flex}
         marginBottom ={4}
         gap ={2}
         alignItems ={AlignItems.center }
         color ={ TextColor.primaryDefault }
         onClick={()=>{
           handleCopy(checksummedAddress)
           trackEvent({
             category:MetaMetricsEventCategory.Accounts ,
             event:MetaMetricsEventName.PublicAddressCopied ,
             properties:{location},
           })
         }}
         
       >
         <Icon name={(copied)?IconName.CopySuccess :Icon.Name.Copy }
               size ={IconSize.Sm }
               color= {!!copied?IconColor.primaryDefault:null}/>
               
               {/* Fixed to correct enum usage */}
               
          
             

          
         
           
           
       
       
       
       
       

      


    



   
      
       

    

    





    


     
     
      
      
      
      

    



  


     

    
     
        

    

   

 


    
   




{/* Added missing copy text */}
{t('copyAddressShort')}
</Box></div>);
}

QrCodeView.propTypes={
warning:PropTypes.node ,
Qr :PropTypes.shape({
 message :PropTypes.oneOfType([
 PropTypes.arrayOf(PropTypes.node),
 PropTypes.node]),
data :PropTypes.string.isRequired}).isRequired,

location :PropTypes.string,

};

export default connect(mapStateToProps)(QrCodeView);
