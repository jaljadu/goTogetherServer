
import { Request, Response } from 'express';
export const getAcsToken = async (req: Request, res: Response) => {
    try {
        const { CommunicationIdentityClient } = require('@azure/communication-identity');
        const connectionString = process.env.ACS_CONNECTION_STRING;
        const identityClient = new CommunicationIdentityClient(connectionString);
         const { userId } = req.body;
        const user = await identityClient.createUser();
        const token = await identityClient.getToken(user, ['chat']);
        res.send({ user, token });
    }
    catch(err){
        res.status(500).json({ message: 'Error creating user', error: err });
    }
}

export const getConversions = async (req: Request, res: Response) => {
    try {
        const { CommunicationIdentityClient } = require('@azure/communication-identity');
        const connectionString = process.env.ACS_CONNECTION_STRING;
        const identityClient = new CommunicationIdentityClient(connectionString);
         const { userId } = req.body;
        const user = await identityClient.createUser();
        const token = await identityClient.getToken(user, ['chat']);
        res.send({ user, token });
    }
    catch(err){
        res.status(500).json({ message: 'Error creating user', error: err });
    }
}