import dayjs from 'dayjs';

export enum Season {
	NONE = 'none',
	CHRISTMAS = 'christmas'
}

export const getSeason = (): Season => {
	if (dayjs().month() === 11) {
		return Season.CHRISTMAS;
	}

	return Season.NONE;
};
