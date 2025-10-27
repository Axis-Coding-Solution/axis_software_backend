import { Model, Types } from 'mongoose';
import { CustomBadRequestException, CustomNotFoundException } from '../custom-exception';
import { isValidMongoId } from '../common-functions';
/**
 * To delete a document from db
 * @param {Types.ObjectId} id Id comes from frontend
 * @param {String} MODEL Model name to generate dynamic message
 * @param {String} modelName Model to query with
 * @returns {Object} Deleted document
 */
export const deleteHelper = async (id: Types.ObjectId, MODEL: string, modelName: Model<any>) => {
  if (!isValidMongoId(id)) {
    throw CustomBadRequestException('Id is not valid');
  }

  const deleteDocument = await modelName.findByIdAndDelete(id);
  if (!deleteDocument) {
    throw CustomNotFoundException(`${MODEL} not found`);
  }

  return deleteDocument;
};
