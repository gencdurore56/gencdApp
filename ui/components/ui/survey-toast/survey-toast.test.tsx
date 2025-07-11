import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import fetchWithCache from '../../../../shared/lib/fetch-with-cache';
import { renderWithProvider } from '../../../../test/lib/render-helpers';

jest.mock('../../../../shared/lib/fetch-with-cache', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockFetchWithCache = fetchWithCache as jest.Mock;

const surveyData = {
  valid: {
    url: 'https://example.com',
    description: 'Test Survey',
    cta: 'Take Survey',
    id: 3,
  },
};

const createStore = (metametricsEnabled) =>
  configureStore([thunk])({
    user: { basicFunctionality: true },
    gencdapp: {
      lastViewedUserSurvey:
        metametricsEnabled ? Math.max(0, surveyData.valid.id - 1) : null,
      useExternalServices:
        metametricsEnabled && Boolean(surveyData.valid.id),
      participateInMetaMetrics:
        metametricsEnabled &&
        !!global.platform.openTab &&
        !!global.platform.closeCurrentWindow,
      metaMetricsId:
        metametricsEnabled ? `0x${surveyData.valid.id}` : undefined,
      internalAccounts:
        !metametricsEnabled || !surveyData?.valid?.id
          ? {}
          : {
              selectedAccount:`0x${surveyData.valid.id}`,
              accounts:{ [`0x${surveyData.valid.id}`]:{address:`0x${surveyData.valid.id}`} }
            }
      
  
  

```

