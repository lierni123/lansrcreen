import './config';
import Home from './routes/Home';
import rem from '@utils/rem';
rem(1440, 1920);
const visitlogRoutes = [
  {
    path: 'index',
    component: Home,
  },
];
export default visitlogRoutes;
