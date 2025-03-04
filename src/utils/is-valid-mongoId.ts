import { isValidObjectId, Types } from 'mongoose';
/**
 *
 * @param {Types.ObjectId} id id comes from client
 * @returns {Boolean} true or false
 */
export const isValidMongoId = (id: Types.ObjectId) => {
  return isValidObjectId(id);
};
