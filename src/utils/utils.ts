import { FilterSettingsType, ProductType } from '../types/types';

export const extractFilterSettings = (data: ProductType[]) : FilterSettingsType => {
  const productsSortedByPrice = data.slice().sort((a, b) => a.price - b.price);

  return {
    minPrice: productsSortedByPrice[0].price,
    maxPrice: productsSortedByPrice[productsSortedByPrice.length - 1].price,
  };
};
