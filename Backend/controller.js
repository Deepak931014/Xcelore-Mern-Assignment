import UserModel from './models/userModel.js';
import jwt from 'jsonwebtoken';
import config from './config.js';
import bcrypt from 'bcrypt';

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.send({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send({ message: 'Password is incorrect' });
        }
        const { firstName, lastName, role } = user;

        // Expire token in 5 minutes
        const token = jwt.sign({ email, firstName, lastName, role }, config.tokenSecret, { expiresIn: 300 });
        res.send({ message: 'Logged In successfully', data: token });

    } catch (err) {
        console.log({ message: 'Login failed', error: err });
    }
    
}

export const registerController = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    console.log('User Register Data ', { firstName, lastName, email, password });

    let result = {};
    try {
        const hashPass = await bcrypt.hash(password, config.saltRounds);
        result = await UserModel.create({ firstName, lastName, email, password: hashPass });
        console.log('User Register Result ', result);
        res.send({ message: 'Registration successfully', data: result });
    } catch (error) {
        console.log({ message: 'Registration failed', error });
    }
};

export const listingController = async (req, res, next) => {
    try {
        const users = await UserModel.find({ role: 'user' });
        res.send({ message: 'Listing successfully', data: users });
    } catch (error) {
        console.log({ message: 'Listing failed', error });
    }
};

export const deleteController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await UserModel.findByIdAndDelete(id);
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        console.log({ message: 'User delete failed', error });
    }
};


export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        const user = await UserModel.findById(id);
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        await user.save();
        res.send({ message: 'User updated successfully' });
    } catch (error) {
        console.log({ message: 'User update failed', error });
    }
};
