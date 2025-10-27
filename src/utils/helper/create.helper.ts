import { Model } from 'mongoose';
import { CustomBadRequestException } from '../custom-exception';

/**
 * To create a new document in db
 * @param {Class} dto Body comes from client
 * @param {String} MODEL Model name to generate dynamic message
 * @param {String} modelName Model to query with
 * @returns {Object} Created document from db
 */
export const createHelper = async (dto: any, MODEL: string, modelName: Model<any>) => {
  const createDocument = await modelName.create(dto);
  if (!createDocument) {
    throw CustomBadRequestException(`${MODEL} not created`);
  }

  return createDocument;
};
