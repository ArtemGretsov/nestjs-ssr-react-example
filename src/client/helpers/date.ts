import moment from 'moment';
import { DATE_CONSTANTS } from '../constants/date';

const toTime = (date: string | Date) => date && moment(date).format(DATE_CONSTANTS.TIME);

export const dateHelper = {
  toTime,
}