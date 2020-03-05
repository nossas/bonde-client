import WebFont from 'webfontloader';
// import './index.css'

WebFont.load({
  google: {
    families: [
      'Nunito Sans:400,600,800',
      'sans-serif',
      'Source Sans Pro:400,700',
    ],
  },
});

export * from './components/assets';
export * from './components/await';
export * from './components/cards';
export * from './components/content';
export * from './components/form';
export * from './components/layout';
export * from './components/list';
export * from './components/navigation';
export * from './components/progress';
