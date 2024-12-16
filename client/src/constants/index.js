export const jobTypes = ['full-time', 'part-time', 'intern', 'remote'];

export const userRoles = ['admin', 'super admin', 'user']

export const menuItems = [
    {
      key: 'academy',
      title: 'Akademiya',
      subItems: [
        { title: 'Tədbirlər', path: '/events' },
        { title: 'Blog', path: '/blogs' },
        { title: 'Məzunlar', path: '/alumni' },
      ],
    },
    {
      key: 'about',
      title: 'Haqqımızda',
      subItems: [
        { title: 'Bizimlə tanış olun', path: '/about' },
      ],
    }
  ];