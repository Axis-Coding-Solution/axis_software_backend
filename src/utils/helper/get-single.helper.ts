import { Model, Types } from 'mongoose';
import { CustomBadRequestException, CustomNotFoundException } from '../custom-exception';
import { isValidMongoId } from '../common-functions';
/**
 * To get single document from db
 * @param {Types.ObjectId} id Id comes from frontend
 * @param {String} MODEL Model name to generate dynamic message
 * @param {String} modelName Model to query with
 * @param {String} populate Fields to populate
 * @param {String} fieldsToIncludeInPopulate Fields to include in populate
 * @param {String} message Error message
 * @returns {Object} Single document from db
 */
export const getSingleHelper = async <T>(
  id: Types.ObjectId,
  MODEL: string,
  modelName: Model<any>,
  populate: string = '',
  fieldsToIncludeInPopulate: string = '',
  message: string = `${MODEL} not found`,
) => {
  if (!isValidMongoId(id)) {
    throw CustomBadRequestException('Id is not valid');
  }

  const singleDocument = await modelName
    .findById(id)
    .populate(populate, fieldsToIncludeInPopulate)
    .lean();
  if (!singleDocument) {
    throw CustomNotFoundException(message);
  }

  return singleDocument as T;
};
