import { User } from '../module/user/user.model';

const superUser = {
  email: 'superAdmin@gmail.com',
  password: 'super123',
  role: 'superAdmin',
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: 'superAdmin' });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
