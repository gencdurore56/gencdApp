import { Action } from 'redux';
import * as actionConstants from '../../store/actionConstants';
import { FALLBACK_LOCALE } from '../../../shared/modules/i18n';
import { createDeepEqualSelector } from '../../../shared/modules/selectors/util';

type LocaleMessagesState = {
  current?: { [key: string]: string };
  currentLocale?: string;
  en?: { [key: string]: string };
};

type SetCurrentLocaleAction = Action & {
  type: typeof actionConstants.SET_CURRENT_LOCALE;
  payload: {
    messages: { [key: string]: string };
    locale: string;
  };
};

type LocaleMessagesActions = SetCurrentLocaleAction;

const initialState: LocaleMessagesState = {};

export default function reduceLocaleMessages(
  state: LocaleMessagesState = initialState,
  action: LocaleMessagesActions,
): LocaleMessagesState {
  switch (action.type) {
    case actionConstants.SET_CURRENT_LOCALE:
      return {
        ...state,
        current: action.payload.messages,
        currentLocale: action.payload.locale,
      };
    default:
      return state;
  }
}

type AppState = {
  localeMessages: LocaleMessagesState;
};

export const getCurrentLocale = (state: AppState): string | undefined =>
  state.localeMessages.currentLocale;

export const getIntlLocale = createDeepEqualSelector(
  getCurrentLocale,
  (locale): string =>
    Intl.getCanonicalLocales(locale ? locale.replace(/_/gu, '-') : FALLBACK_LOCALE)[0],
);

export const getCurrentLocaleMessages = (
  state: AppState,
): Record<string, string> | undefined => state.locale Messages.current;

export const getEnLocaleMessages = (
   stat e : AppState ,
 ): Record<string, s tring> | u n defined => stat e .localeMessage s .en;
