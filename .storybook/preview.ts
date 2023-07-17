import type { Preview } from '@storybook/react';
import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'
import main from '!!style-loader?injectType=lazyStyleTag!css-loader!../themes/main.css'
import custom from '!!style-loader?injectType=lazyStyleTag!css-loader!../themes/custom.css'

const preview: Preview = {
  decorators: [
    cssVariablesTheme
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    cssVariables: {
      files: {
        'Main Theme': main,
        'Custom Theme': custom
      },
      defaultTheme: 'Main Theme'
    }
  },
};

export default preview;
