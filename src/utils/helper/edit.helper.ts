import { Model, Types } from 'mongoose';
import { CustomBadRequestException, CustomNotFoundException } from '../custom-exception';
import { isValidMongoId } from '../common-functions';

/**
 * To edit existing document
 * @param {Types.ObjectId} id Id comes from client
 * @param {Object} dto Body comes from client
 * @param {String} MODEL Model name to generate dynamic message
 * @param {String} modelName Model to query with
 * @returns {Object} Updated document from db
 */
export const editHelper = async <T>(
  id: Types.ObjectId,
  dto: any,
  MODEL: string,
  modelName: Model<any>,
) => {
  if (!isValidMongoId(id)) {
    throw CustomBadRequestException('Id is not valid');
  }

  const updateDocument = await modelName.findByIdAndUpdate(id, dto, { new: true }).lean();
  if (!updateDocument) {
    throw CustomNotFoundException(`${MODEL} not found`);
  }

  return updateDocument as T;
};
