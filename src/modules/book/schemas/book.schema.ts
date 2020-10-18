import { Schema } from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc-fix';
import { BookTypes, BOOK_MODEL_NAME } from '../../../common/constants';


export const BookSchema: Schema = new Schema({
	_id: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: true
	},
	author: {
		type: String,
		trim: true,
		required: true
	},
	publicationDate: {
		type: Date
	},
	type: {
		type: String,
		enum: [BookTypes.PRIVATE, BookTypes.PUBLIC],
		default: BookTypes.PUBLIC
	},
	cover: {
		type: String,
	}
}, { timestamps: true }

);

BookSchema.plugin(autoIncrement, {
	model: BOOK_MODEL_NAME,
	field: '_id',
	startAt: 1,
});


BookSchema.set('toJSON', {
	transform: (doc, ret, options) => {
		ret.id = ret._id;
		delete ret.deleted;
		delete ret._id;
		delete ret.__v;
	},
});
