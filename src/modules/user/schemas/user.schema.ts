import { Schema } from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc-fix';
import { PASSWORD_PATTERN, USER_MODEL_NAME } from '../../../common/constants';


export const UserSchema: Schema = new Schema({
	_id: {
		type: Number,
		required: true,
	},
	firstName: {
		type: String,
		trim: true,
		required: true
	},
	lastName: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		lowercase: true,
		trim: true,
		unique: [true, 'Duplicated Email'],
		sparse: true,
		index: true,
	},
	password: {
		type: String,
		required: true,
		pattern: PASSWORD_PATTERN

	},
	verifyCode: {
		type: String
	}
}, { timestamps: true }

);

UserSchema.plugin(autoIncrement, {
	model: USER_MODEL_NAME,
	field: '_id',
	startAt: 1,
});


UserSchema.set('toJSON', {
	transform: (doc, ret, options) => {
		ret.id = ret._id;
		delete ret.deleted;
		delete ret.password
		delete ret._id;
		delete ret.__v;
	},
});
