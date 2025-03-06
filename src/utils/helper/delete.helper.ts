import { Model, Types } from 'mongoose';
import { badRequestException, notFoundException } from '../custom-exception';
import { isValidMongoId } from '../is-valid-mongoId';
/**
 * @param {Types.ObjectId} id id comes from frontend
 * @param {String} MODEL model name to generate dynamic message
 * @param {String} modelName model to query with
 * @returns {Object} deleted document
 */
export const deleteHelper = async (id: Types.ObjectId, MODEL: string, modelName: Model<any>) => {
  if (!isValidMongoId(id)) {
    throw badRequestException('Id is not valid');
  }

  const deleteDocument = await modelName.findByIdAndDelete(id);
  if (!deleteDocument) {
    throw notFoundException(`${MODEL} not found`);
  }

  return deleteDocument;
};
