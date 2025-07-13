import { Request, Response } from 'express';
import { User } from './User'
import { OAuth2Client } from 'google-auth-library';

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

export const getUserDetails = async (_req: Request, res: Response) => {
  console.log('getuser');
  try { 
  const authHeader = _req.headers.authorization;
  const client = new OAuth2Client('657032691252-6d3uvir16pu0k46lvbv5u481qi02aafl.apps.googleusercontent.com');

  if (!authHeader?.startsWith('Bearer ')) {
    console.log('s');
     res.status(401).json({ message: 'Unauthorized - No token' });
  }
  const idToken = authHeader?.split(' ')[1] ||'';
   console.log(idToken);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: '657032691252-6d3uvir16pu0k46lvbv5u481qi02aafl.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
  
    const email = payload?.email;
    const users = await User.find();
    console.log('U' + users);
    const user = users.find((u:any) => u.email === email);
   
    if (!user) {
       res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  }
  catch(err){
       res.status(404).json({ message: 'User not found' });
  }
};
