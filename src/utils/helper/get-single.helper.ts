import { Model, Types } from 'mongoose';
import { badRequestException, notFoundException } from '../custom-exception';
import { isValidMongoId } from '../is-valid-mongoId';
/**
 * To get single document from db
 * @param {Types.ObjectId} id id comes from frontend
 * @param {String} MODEL model name to generate dynamic message
 * @param {String} modelName model to query with
 * @param {String} populate fields to populate
 * @param {String} fieldsToIncludeInPopulate fields to include in populate
 * @returns {Object} single document from db
 */
export const getSingleHelper = async <T>(
  id: Types.ObjectId,
  MODEL: string,
  modelName: Model<any>,
  populate: string = '',
  fieldsToIncludeInPopulate: string = '',
) => {
  if (!isValidMongoId(id)) {
    throw badRequestException('Id is not valid');
  }

  const singleDocument = await modelName
    .findById(id)
    .populate(populate, fieldsToIncludeInPopulate)
    .lean();
  if (!singleDocument) {
    throw notFoundException(`${MODEL} not found`);
  }

  return singleDocument as T;
};
