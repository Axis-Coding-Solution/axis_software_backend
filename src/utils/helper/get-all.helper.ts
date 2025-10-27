import { Model } from 'mongoose';
import { CustomNotFoundException } from '../custom-exception';
/**
 * To get all documents from db with pagination
 * @param {Number} page Page no comes form query
 * @param {Number} limit Limit no comes form query
 * @param {String} modelName Model to query with
 * @param {String} search Search come from user default will be null
 * @param {String} searchField Field to search default will be null
 * @param {Array} populate Populate array of objects containing path and select fields
 * @param {Object} filters Fields to filter documents default will be empty object
 * @returns {Array & Object} Array of documents and pagination data
 */
export const getAllHelper = async (
  page: string,
  limit: string,
  modelName: Model<any>,
  search: string = null,
  searchField: string = null,
  populate: Array<{ path: string; select?: string }> = [],
  filters: object = {},
) => {
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  if (search && searchField !== null) {
    filters[searchField] = { $regex: search, $options: 'i' };
  }

  let query = modelName.find(filters).sort('-createdAt').skip(skip).limit(limitNumber).lean();
  if (populate.length > 0) query = query.populate(populate);

  const [items, totalItems] = await Promise.all([
    query.exec(),
    modelName.countDocuments(filters).exec(),
  ]);

  if (items.length === 0) {
    throw CustomNotFoundException(`${modelName.modelName} not found`);
  }

  const totalPages = Math.ceil(totalItems / limitNumber);

  return {
    items,
    totalItems,
    totalPages,
    itemsPerPage: limitNumber,
    currentPage: pageNumber,
  };
};
