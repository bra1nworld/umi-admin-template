import { defineConfig } from 'umi';

export default defineConfig({
  history: {
    type: 'hash',
  },
  favicon: './favicon.ico',
  title: '后台项目模版',
  publicPath: './',
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: 'Umi Template',
    locale: true,
    layout: 'side',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/template',
      menu: { name: '首页', icon: 'bank' },
    },
    {
      path: '/template',
      component: '@/pages/template',
      menu: { name: 'template', icon: 'antDesign' },
    },
  ],
  fastRefresh: {},
  dva: {},
  antd: {},
  theme: {
    '@primary-color': '#fe6f3d',
    '@success-color': '#52c41a',
    '@info-color': '#fa541b',
    '@warning-color': '#faad14',
    '@error-color': '#ff4d4f',
    '@processing-color': '#FE6F3D',
    '@body-background': '#eff3f4',
    '@border-radius-base': '4px',
    '@btn-border-radius-base': '4px',
    '@tabs-title-font-size': '16px',
    '@tabs-bar-margin': '0 0 0 0',
    '@tabs-horizontal-margin': '0 40px 0 0',
    '@tabs-horizontal-padding': '14px 16px',
    '@text-color': 'rgba(0, 0, 0, 0.65)',
  },
});
