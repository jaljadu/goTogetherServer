import { Request, Response } from 'express';
import { User } from './User'

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const { name, email,gender,imageUrl, phoneNumber, userType } = req.body;
    const newUser = new User({ name, email,gender,imageUrl, phoneNumber, userType });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    console.log('users');
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};
