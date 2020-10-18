import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepo } from 'src/common/base-repo';
import { USER_MODEL_NAME } from '../../../common/constants';
import { UserInterface } from '../interfaces/user.interface';


@Injectable()
export class UserRepo extends BaseRepo<UserInterface> {
	constructor(@InjectModel(USER_MODEL_NAME) private readonly _userModel: Model<UserInterface>) {
		super(_userModel);
	}

}
