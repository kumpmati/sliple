import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export function match(value) {
	return dayjs(value, 'YYYY-MM-DD', true).isValid();
}
