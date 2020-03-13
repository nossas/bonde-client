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

export { Button } from './components/content/Button/Button';
export { Icon } from './components/content/Icon/Icon';
export { IconColorful } from './components/content/IconColorful/IconColorful';
export { Image } from './components/content/Image/Image';
export { Link } from './components/content/Link/Link';
export { LinkShowAll } from './components/content/LinkShowAll/LinkShowAll';
export { Number } from './components/content/Number/Number';
export { Text } from './components/content/Text/Text';
export { Title } from './components/content/Title/Title';
export { SwitchSlider } from './components/content/SwitchSlider/SwitchSlider';

export * from './components/form';
export * from './components/layout';
export * from './components/list';

export { Dropdown } from './components/navigation/Dropdown/Dropdown';
export { DropdownHeader } from './components/navigation/DropdownHeader/DropdownHeader';
export { DropdownItem } from './components/navigation/DropdownItem/DropdownItem';
export { Navbar } from './components/navigation/Navbar/Navbar';
export { Pagination } from './components/navigation/Pagination/Pagination';
export { Tab } from './components/navigation/Tab/Tab';
export { TabItem } from './components/navigation/TabItem/TabItem';

export * from './components/progress';
