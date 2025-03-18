import { isValidObjectId, Types } from 'mongoose';
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
