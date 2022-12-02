import { FilterSettingsType, ProductType } from '../types/types';

export const extractFilterSettings = (data: ProductType[]) : FilterSettingsType => {
  const productsSortedByPrice = data.slice().sort((a, b) => a.price - b.price);

  return {
    minPrice: productsSortedByPrice[0].price,
    maxPrice: productsSortedByPrice[productsSortedByPrice.length - 1].price,
  };
};

export const searhParamsToString = (searchParams: URLSearchParams) : string => {
  const paramsObject = Object.fromEntries([...searchParams]);
  let str = '';
  for (const [key, value] of Object.entries(paramsObject)) {
    str = `${str}${key}=${value}&`;
  }
  return str.slice(0, -1);
};
