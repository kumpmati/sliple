import mongoose from 'mongoose';
import type { AuthUser } from '.';

/**
 * @see https://lucia-auth.com/adapters/mongoose?sveltekit#authuser
 */
export const UserModel: mongoose.Model<AuthUser> =
	mongoose.models['auth_user'] ??
	mongoose.model(
		'auth_user',
		new mongoose.Schema(
			{
				_id: {
					type: String
				},
				name: String,
				image: String
			},
			{ _id: false }
		)
	);

/**
 * @see https://lucia-auth.com/adapters/mongoose?sveltekit#authsession
 */
export const SessionModel =
	mongoose.models['auth_session'] ??
	mongoose.model(
		'auth_session',
		new mongoose.Schema(
			{
				_id: {
					type: String
				},
				user_id: {
					type: String,
					required: true
				},
				active_expires: {
					type: Number,
					required: true
				},
				idle_expires: {
					type: Number,
					required: true
				}
			},
			{ _id: false }
		)
	);

/**
 * @see https://lucia-auth.com/adapters/mongoose?sveltekit#authkey
 */
export const KeyModel =
	mongoose.models['auth_key'] ??
	mongoose.model(
		'auth_key',
		new mongoose.Schema(
			{
				_id: {
					type: String
				},
				user_id: {
					type: String,
					required: true
				},
				hashed_password: String,
				primary_key: {
					type: Boolean,
					required: true
				},
				expires: Number
			},
			{ _id: false }
		)
	);
