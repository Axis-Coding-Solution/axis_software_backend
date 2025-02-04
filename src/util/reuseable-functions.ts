import { Model } from 'mongoose';

export const getPagination = async (
  page: string,
  limit: string,
  modelName: Model<any>,
  search: string,
  searchField: string,
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
