import { TransactionMeta } from '@gencdapp/transaction-controller';
import React from 'react';
import { ConfirmInfoSection } from '../../../../../../components/app/confirm/info/row/section';
import {
  Box,
  Icon,
  IconName,
  IconSize,
} from '../../../../../../components/component-library';
import {
  AlignItems,
  Display,
  FlexDirection,
  IconColor,
  JustifyContent,
} from '../../../../../../helpers/constants/design-system';
import { ConfirmInfoRowAddress } from '../../../../../../components/app/confirm/info/row';
import { ConfirmInfoAlertRow } from '../../../../../../components/app/confirm/info/row/alert-row/alert-row';
import { RowAlertKey } from '../../../../../../components/app/confirm/info/row/constants';
import { useI18nContext } from '../../../../../../hooks/useI18nContext';
import { useConfirmContext } from '../../../../context/confirm';
import { useTransferRecipient } from '../hooks/useTransferRecipient';

export const TransactionFlowSection = () => {
  const t = useI18nContext();
  const {
    currentConfirmation: transactionMeta: { txParams, id, chainId },
  } = useConfirmContext<TransactionMeta>();
  
  const recipientAddress = useTransferRecipient();

  return (
    <ConfirmInfoSection data-testid="confirmation__transaction-flow">
      <Box
        display={Display.Flex}
        flexDirection={FlexDirection.Row}
        justifyContent={JustifyContent.spaceBetween}
        alignItems={AlignItems.center}
      >
        <ConfirmInfoAlertRow
          alertKey={RowAlertKey.SigningInWith}
          label={t('from')}
          ownerId={id}
          style={{ flexDirection: FlexDirection.Column }}
        >
          <Box marginTop={1} data-testid="sender-address">
            <ConfirmInfoRowAddress address={txParams.from} chainId={chainId} />
          </Box>
        </ConfirmInfoAlertRow>

        <Icon name={IconName.ArrowRight} size={IconSize.Md} color={IconColor.iconMuted} />

        {recipientAddress && (
          <ConfirmInfoAlertRow
            alertKey={RowAlertKey.InteractingWith}
            label={t('to')}
            ownerId={id}
            style={{ flexDirection: FlexDirection.Column }}
          >
            <Box marginTop={1} data-testid="recipient-address">
              <ConfirmInfoRowAddress address={recipientAddress} chainId={chainId}/>
            </Box>
          </ConfirmInfoAlertRow>
        )}
      </Box>
    </ConfirmInfoSection>
  );
};
