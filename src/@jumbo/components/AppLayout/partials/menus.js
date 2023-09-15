import React from 'react';
import { PostAdd } from '@material-ui/icons';
import IntlMessages from '../../../utils/IntlMessages';
import {
  Settings,
  Person,
  Edit,
  EditAttributes,
  Search,
  House,
  CloudUpload,
  Inbox,
  AddToHomeScreen,
  Folder,
  LibraryBooks,
  Functions,
  Grain,
  PieChart,
  LibraryAdd,
  HomeWork,
} from '@material-ui/icons';

const homeMenu = {
  name: <IntlMessages id={'sidebar.appModule.homePage'} />,
  icon: <HomeWork />,
  link: '/',
};

const adminMenu = {
  name: <IntlMessages id={'sidebar.appModule.admin'} />,
  icon: <Settings />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.appModule.admin.users'} />,
      icon: <Person />,
      type: 'item',
      link: '/admin/users',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.admin.roles'} />,
      icon: <Search />,
      type: 'item',
      link: '/admin/roles',
    },
  ],
};

const guidesMenu = {
  name: <IntlMessages id={'sidebar.appModule.guides'} />,
  icon: <Edit />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.appModule.guides.list'} />,
      icon: <House />,
      type: 'item',
      link: '/Pages/guides',
    },
  ],
};

const samsungMenu = {
  name: <IntlMessages id={'sidebar.appModule.samsungGuides'} />,
  icon: <Edit />,
  type: 'collapse',
  children: [
    {
      name: <IntlMessages id={'sidebar.appModule.guides.scan'} />,
      icon: <Search />,
      type: 'item',
      link: '/guides/scan',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.guides.scanNoMatch'} />,
      icon: <Search />,
      type: 'item',
      link: '/guides/scanNoMatch',
    },
    {
      name: <IntlMessages id={'sidebar.appModule.guides.beetrack'} />,
      icon: <CloudUpload />,
      type: 'item',
      link: '/guides/beetrack',
    },
  ],
};
export const sidebarNavs = [
  {
    name: <IntlMessages id={'sidebar.modules'} />,
    type: 'section',
    children: [homeMenu, adminMenu, guidesMenu, samsungMenu],
  },
];

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
];

export const sidebarNavsUserRolesAplications = authUser => {
  // const { authUser } = useSelector(({ auth }) => auth);
  const childrenSidebarNavs = [];
  childrenSidebarNavs.push(homeMenu);

  for (let i = 0; i < authUser.roles.userRoles.length; i++) {
    switch (authUser.roles.userRoles[i].usroRoleName) {
      case 'ROLE_ADMIN': {
        // ADMINISTRADOR
        childrenSidebarNavs.push(adminMenu);
        break;
      }
      case 'WAREHOUSE': {
        // BODEGUERO
        childrenSidebarNavs.push(guidesMenu);
        childrenSidebarNavs.push(samsungMenu);
        break;
      }
      default: {
        break;
      }
    }
  }

  return [
    {
      name: <IntlMessages id={'sidebar.modules'} />,
      type: 'section',
      children: childrenSidebarNavs,
      // children: [homeMenu, adminMenu, provedorMenu, categoryManagerMenu],
    },
  ];
};

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
]; 
