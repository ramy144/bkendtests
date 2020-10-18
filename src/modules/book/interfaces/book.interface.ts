import { Document } from 'mongoose';

export interface BookInterface extends Document {
    _id: number;
    title: string;
    description: string
    author: string
    publicationDate: Date;
    type: string
    cover: string
}