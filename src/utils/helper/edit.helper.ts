import { Model, Types } from 'mongoose';
import { badRequestException, notFoundException } from '../custom-exception';
import { isValidMongoId } from '../is-valid-mongoId';

/**
 * To edit existing document
 * @param {Types.ObjectId} id id comes from client
 * @param {Object} dto body comes from client
 * @param {String} MODEL model name to generate dynamic message
 * @param {String} modelName model to query with
 * @returns {Object} updated document
 */
export const editHelper = async <T>(
  id: Types.ObjectId,
  dto: any,
  MODEL: string,
  modelName: Model<any>,
) => {
  if (!isValidMongoId(id)) {
    throw badRequestException('Id is not valid');
  }

  const updateDocument = await modelName.findByIdAndUpdate(id, dto, { new: true }).lean();
  if (!updateDocument) {
    throw notFoundException(`${MODEL} not found`);
  }

  return updateDocument as T;
};
