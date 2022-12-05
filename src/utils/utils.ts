import { FilterSettingsType, ProductType } from '../types/types';

export const extractFilterSettings = (data: ProductType[]) : FilterSettingsType => {
  const productsSortedByPrice = data.slice().sort((a, b) => a.price - b.price);

  return {
    minPrice: productsSortedByPrice[0].price,
    maxPrice: productsSortedByPrice[productsSortedByPrice.length - 1].price,
  };
};

export const appendParamWithValue = (searchParams: URLSearchParams, keyToAppend: string, valueToAppend: string) : URLSearchParams => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.append(keyToAppend, valueToAppend);
  return newSearchParams;
};

export const removeParam = (searchParams: URLSearchParams, keyToDelete: string) : URLSearchParams => {
  const newSearchParams = new URLSearchParams();
  for (const [key, value] of searchParams.entries()) {
    if (key !== keyToDelete) {
      newSearchParams.append(key, value);
    }
  }
  return newSearchParams;
};

export const removeParamWithValue = (searchParams: URLSearchParams, keyToDelete: string, valueToDelete: string) : URLSearchParams => {
  const newSearchParams = new URLSearchParams();
  for (const [key, value] of searchParams.entries()) {
    if ((key === keyToDelete && value !== valueToDelete) ||
        (key !== keyToDelete && value !== valueToDelete)) {
      newSearchParams.append(key, value);
    }
  }
  return newSearchParams;
};


export const updateParamsWithValues = (searchParams: URLSearchParams, keyValuePairs: { [s: string]: string; }) : URLSearchParams => {
  const newSearchParams = new URLSearchParams(searchParams);
  for (const [key, value] of Object.entries(keyValuePairs)) {
    newSearchParams.set(key, value);
  }
  return newSearchParams;
};
