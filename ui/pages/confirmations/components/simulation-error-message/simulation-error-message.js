import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BannerAlert } from '../../../../components/component-library';
import { Severity } from '../../../../helpers/constants/design-system';

import { I18nContext } from '../../../../../.storybook/i18n';
const {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
  MetaMetricsEventUiCustomization,
} = require('../../../../../shared/constants/metametrics');
const { MetaMetricsContext } = require('../../../../contexts/metametrics');

export default function SimulationErrorMessage({ userAcknowledgedGasMissing = false, setUserAcknowledgedGasMissing }) {
  const t = useContext(I18nContext);
  const trackEvent = useContext(MetaMetricsContext);

  useEffect(() => {
    trackEvent({
      category: MetaMetricsEventCategory.Transactions,
      event: MetaMetricsEventName.SimulationFails,
      properties: {
        ui_customizations: [MetaMetricsEventUiCustomization.GasEstimationFailed],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userAcknowledgedGasMissing ? (
    <BannerAlert severity={Severity.Danger}>{t('simulationErrorMessageV2')}</BannerAlert>
  ) : (
    <BannerAlert
      severity={Severity.Danger}
      actionButtonLabel={t('proceedWithTransaction')}
      actionButtonOnClick={setUserAcknowledgedGasMissing}
    >
      {t('simulationErrorMessageV2')}
    </BannerAlert>
  );
}

SimulationErrorMessage.propTypes = {
  userAcknowledgedGasMissing: PropTypes.bool.isRequired,
  setUserAcknowledgedGasMissing: PropTypes.func.isRequired
};
