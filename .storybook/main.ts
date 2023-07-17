import * as path from 'path';
import * as fs from 'fs';
import lessToJS from 'less-vars-to-js';
import type { StorybookConfig } from '@storybook/react-webpack5';
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@etchteam/storybook-addon-css-variables-theme'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    config.module?.rules?.push({
      loader: 'babel-loader',
      exclude: /node_modules/,
      test: /\.(js|jsx|ts|tsx)$/,
      options: {
        presets: ['@babel/react', '@babel/preset-flow', '@babel/preset-env'],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          [
            'import',
            {
              libraryName: 'antd',
              style: true,
            },
          ],
        ],
      },
    });

    const themeVars = lessToJS(
      fs.readFileSync(path.resolve(__dirname, '../src/theme.less'), 'utf8'),
    );

    config.module?.rules?.push({
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              // modifyVars: themeVars,
              javascriptEnabled: true,
            },
          },
        }
      ],
      include: [/[\\/]node_modules[\\/].*antd/],
    });
    
    config.module?.rules?.push({
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              // modifyVars: themeVars,
              javascriptEnabled: true,
            },
          },
        }
      ],
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../'),
      ],
    });

    // config.module.rules.push({
    //   test: /\.(ts|tsx)$/,
    //   use: [
    //     {
    //       loader: require.resolve('ts-loader'),
    //     },
    //   ],
    // });

    // config.resolve.extensions.push('.ts', '.tsx');

    config.devtool = 'eval-source-map';
    return config;
  }
};
export default config;
