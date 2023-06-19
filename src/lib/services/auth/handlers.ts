import type { AuthUser } from '.';
import { UserModel } from './models';

export const getUserById = async (id: string): Promise<AuthUser | null> => {
	console.log({ id });

	return (await UserModel.findOne({ _id: id }))?.toObject() ?? null;
};
