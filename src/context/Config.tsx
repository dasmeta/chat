import React, { createContext } from 'react';
import moment from 'moment';
import translations from '../translations.json';

export type ConfigProps = {
  translate?: (
    key: string,
    params?: { [key: string]: any },
    editable?: boolean,
  ) => string;
  locale?: string;
  momentLocale?: string;
  moment?: any;
};

export type withLocalizationProps = {
  moment?: (date?: string) => moment.Moment;
  momentLocale?: string;
};

const defaultProps: ConfigProps = {
  translate: (key: string) => translations[key] || key,
  locale: 'en',
  momentLocale: 'en',
};
export const ConfigContext = createContext(defaultProps);

const TProvider = ({ children, momentLocale, ...props }) => {
  moment.locale(momentLocale);

  return (
    <ConfigContext.Provider
      value={{ ...defaultProps, ...props, momentLocale, moment }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

const withLocalization = <P extends object>(
  Component: React.ComponentType<P>,
): React.FC<P & withLocalizationProps> => (props) => (
  <ConfigContext.Consumer>
    {(context) => {
      return (
        <Component
          {...props}
          momentLocale={context.momentLocale}
          moment={context.moment}
        />
      );
    }}
  </ConfigContext.Consumer>
);

export { withLocalization };

export default TProvider;
