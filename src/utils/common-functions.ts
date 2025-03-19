import { isValidObjectId, Model, Types } from 'mongoose';
import { badRequestException } from './custom-exception';
/**
 * Return true if given parameter is valid mongo id
 * @param {Types.ObjectId} id id comes from client
 * @returns {Boolean} true or false
 */
export const isValidMongoId = (id: Types.ObjectId) => {
  return isValidObjectId(id);
};

/**
 * Return true if given parameter is Array
 * @param {Array} arr array to check
 */
export const checkArray = (arr: any[]) => {
  Array.isArray(arr);
};

/**
 * Function to calculate business hours typically 8
 * @param {Date} startDate Start Date comes from Client
 * @param {Date} endDate End Date comes from Client
 * @returns {Number} Total business hours between Start Date and End Date
 */
export function calculateBusinessHours(startDate: Date, endDate: Date): number {
  let s = new Date(startDate);
  let e = new Date(endDate);

  s.setHours(0, 0, 0, 0);
  e.setHours(0, 0, 0, 0);

  let totalHours = 0;
  const workingHoursPerDay = 8;

  while (s <= e) {
    if (s.getDay() !== 0 && s.getDay() !== 6) {
      totalHours += workingHoursPerDay;
    }
    s.setDate(s.getDate() + 1);
  }

  return totalHours;
}

/**
 * Function to check if first date is smaller than second
 * @param {Date} date1 Date comes from client
 * @param {Date} date2 Date comes from client
 */
export function areDatesValid(date1: Date, date2: Date) {
  // console.log('object', date1, date2);
  if (date1 > date2) {
    throw badRequestException('Dates are not valid!');
  }
}

/**
 * Function to check if Dates are same
 * @param {Date} date1 Date comes from client
 * @param {Date} date2 Date comes from client
 */
export function areDatesSame(date1: Date, date2: Date) {
  if (date1.getTime() === date2.getTime()) {
    throw badRequestException('Dates cannot be same');
  }
}

/**
 * Function to check if date is weekend
 * @param {Date} date Date to check
 * @param {Date} MODEL Model name to generate dynamic message
 */
export function isDateWeekend(date: Date, MODEL: string) {
  if (date.getDay() === 0 || date.getDay() === 6) {
    throw badRequestException(`${MODEL} cannot be created on a weekend`);
  }
}
