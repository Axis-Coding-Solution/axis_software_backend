import { Model, Types } from 'mongoose';
import { badRequestException, notFoundException } from '../custom-exception';
import { isValidMongoId } from '../is-valid-mongoId';
/**
 * @param {Types.ObjectId} id id comes from frontend
 * @param {String} MODEL model name to generate dynamic message
 * @param {String} modelName model to query with
 * @returns {Object} single document from db
 */
export const getSingleHelper = async <T>(
  id: Types.ObjectId,
  MODEL: string,
  modelName: Model<any>,
) => {
  if (!isValidMongoId(id)) {
    throw badRequestException('Id is not valid');
  }

  const singleDocument = await modelName.findById(id).lean();
  if (!singleDocument) {
    throw notFoundException(`${MODEL} not found`);
  }

  return singleDocument as T;
};
