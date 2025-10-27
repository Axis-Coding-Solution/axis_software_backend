import { Model, Types } from 'mongoose';
import { CustomConflictException } from '../custom-exception';
/**
 *To check if the value is already exists in the database
 * @param {String} fieldValue What needs to be compared
 * @param {String} fieldName Value in db
 * @param {String} modelName Model to query with
 * @param {String | Types.ObjectId} id If passed then current document will be excluded
 * @returns
 */
export const existsHelper = async (
  fieldValue: any,
  fieldName: string,
  modelName: Model<any>,
  id?: string | Types.ObjectId,
) => {
  const query: any = { [fieldName]: fieldValue };
  if (id) {
    query._id = { $ne: id };
  }

  const documentExists = await modelName.exists(query);
  if (documentExists) {
    throw CustomConflictException(`${fieldValue} already exists`);
  }
  return;
};
