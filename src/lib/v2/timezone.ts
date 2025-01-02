/**
 * Cloudflare workers get additional access to a `cf` object that contains lots of information (e.g. request timezone).
 */
type CloudflareRequest = Request & {
	cf?: {
		country: string;
		timezone: string;
	};
};

export const getTimeZone = (req: Request): string | undefined => {
	return (req as CloudflareRequest).cf?.timezone;
};
