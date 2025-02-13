import { Model } from 'mongoose';
/**
 * @param page page no
 * @param limit limit no
 * @param modelName model to query with
 * @param search i don't know what is this for
 * @param searchField field to search
 * @param populate fields to populate
 */
export const getPagination = async (
  page: string,
  limit: string,
  modelName: Model<any>,
  search: string,
  searchField: string,
  populate: string = '',
) => {
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  let filters = {};
  if (search && searchField !== null) {
    filters = {
      [searchField]: { $regex: search, $options: 'i' },
    };
  }

  const [items, totalItems] = await Promise.all([
    modelName
      .find(filters)
      .sort('-createdAt')
      .skip(skip)
      .limit(limitNumber)
      .populate(populate)
      .lean()
      .exec(),
    modelName.countDocuments(filters).exec(),
  ]);
  const totalPages = Math.ceil(totalItems / limitNumber);

  return {
    items,
    totalItems,
    totalPages,
    itemsPerPage: limitNumber,
    currentPage: pageNumber,
  };
};
