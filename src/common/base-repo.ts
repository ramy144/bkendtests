import { Document, Model } from "mongoose";

export abstract class BaseRepo<T> {
    constructor(private _model: Model<T & Document>) { }

    get model() {
        return this._model;
    }

    public async create(createData: T | any): Promise<T> {
        return await this._model.create(createData);
    }

    public async findById(id: number): Promise<T> {
        return await this._model.findById(id);
    }

    public async findOne(query: any): Promise<T> {
        return await this._model.findOne(query);
    }

    public async findOneAndUpdate(findQuery: any, updateQuery: any): Promise<T> {
        return await this._model.findOneAndUpdate(findQuery, updateQuery, { new: true });
    }

    public async findAll(query: any = {}) {
        return await this._model.find(query);
    }
}