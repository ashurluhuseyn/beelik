const bcrypt = require('bcrypt');
const User = require('../models/auth');

const createSuperUser = async () => {
  try {
    const existingUser = await User.findOne({ where: { email: 'superadmin@narmina.com' } });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('narmina123!', 10);
      
      await User.create({
        email: 'superadmin@narmina.com',
        password: hashedPassword,
        role: 'superAdmin',
      });

      console.log('Superuser yaradıldı: superadmin@narmina.com');
    } else {
      console.log('Superuser artıq mövcuddur');
    }
  } catch (error) {
    console.error('Superuser yaratmaq mümkün olmadı:', error.message);
  }
};

module.exports = {createSuperUser};
