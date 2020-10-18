import { Document } from 'mongoose';

export interface UserInterface extends Document {
    _id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    verifyCode: string
}