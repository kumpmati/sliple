import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Cloudflare workers get additional access to a `cf` object that contains lots of information (e.g. request timezone).
 */
type CloudflareRequest = Request & {
	cf?: {
		country: string;
		timezone: string;
	};
};

const getTimeZone = (req: Request): string | undefined => {
	return (req as CloudflareRequest).cf?.timezone;
};

/**
 * Returns a date string (YYYY-MM-DD) that represents the user's current date,
 * factoring in their current timezone.
 */
export const getLocalDate = (req: Request) => {
	return dayjs().tz(getTimeZone(req)).format('YYYY-MM-DD');
};
