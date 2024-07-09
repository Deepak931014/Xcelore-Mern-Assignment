import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import config from '../config.js';

const adminUser = {
    email: 'adminUser@gmail.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin'
}
const seedAdmin = async () => {
    const hashPass = await bcrypt.hash(adminUser.password, config.saltRounds);

    UserModel.findOne({ email: adminUser.email }).then((user) => {
        if (!user) {
            UserModel.create({ ...adminUser, password: hashPass }).then(() => {
                console.log('Admin User Created');
            });
        }
    }).catch((error) => {
        console.log('Error ', error);
    });
}

export default seedAdmin;
