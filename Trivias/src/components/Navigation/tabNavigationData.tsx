import HomeScreen from '../../screens/home/HomeViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Calendar',
    component: HomeScreen,
    icon: iconCalendar,
  },
  {
    name: 'Grids',
    component: HomeScreen,
    icon: iconGrids,
  },
  {
    name: 'Pages',
    component: HomeScreen,
    icon: iconPages,
  },
  {
    name: 'Components',
    component: HomeScreen,
    icon: iconComponents,
  },
];

export default tabNavigationData;