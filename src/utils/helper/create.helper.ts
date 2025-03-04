import { Model } from 'mongoose';
import { badRequestException } from '../custom-exception';

/**
 * @param {Class} dto body comes from client
 * @param {String} MODEL model name to generate dynamic message
 * @param {String} modelName model to query with
 * @returns {Object} created document from db
 */
export const createHelper = async (dto: any, MODEL: string, modelName: Model<any>) => {
  const createDocument = await modelName.create(dto);
  if (!createDocument) {
    throw badRequestException(`${MODEL} not created`);
  }

  return createDocument;
};
