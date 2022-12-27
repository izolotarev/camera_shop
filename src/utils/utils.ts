import { SCROLL_LOCK_BODY_CLASS } from '../const/const';
import { FilterSettingsType, ProductType } from '../types/types';

export const extractFilterSettings = (data: ProductType[]) : FilterSettingsType => {
  const productsSortedByPrice = data.slice().sort((a, b) => a.price - b.price);
  const prices = productsSortedByPrice.slice().map((p) => p.price);

  return {
    minPrice: productsSortedByPrice[0].price,
    maxPrice: productsSortedByPrice[productsSortedByPrice.length - 1].price,
    productsPrices: prices,
  };
};

export const appendParamWithValue = (searchParams: URLSearchParams, keyToAppend: string, valueToAppend: string) : URLSearchParams => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.append(keyToAppend, valueToAppend);
  return newSearchParams;
};

export const removeParam = (searchParams: URLSearchParams, keyToDelete: string) : URLSearchParams => {
  const newSearchParams = new URLSearchParams([...searchParams.entries()]);
  newSearchParams.delete(keyToDelete);
  return newSearchParams;
};

export const removeParamWithValue = (searchParams: URLSearchParams, keyToDelete: string, valueToDelete: string) : URLSearchParams => {
  const newSearchParams = new URLSearchParams([...searchParams.entries()].filter(([key, value]) =>
    (key === keyToDelete && value !== valueToDelete) ||
    (key !== keyToDelete && value !== valueToDelete)
  ));
  return newSearchParams;
};

export const updateParamsWithValues = (searchParams: URLSearchParams, keyValuePairs: { [s: string]: string; }) : URLSearchParams => {
  const newSearchParams = new URLSearchParams(searchParams);
  Object.entries(keyValuePairs).forEach(([key,value]) => {
    newSearchParams.set(key,value);
  });
  return newSearchParams;
};

export const closestPrice = (price: number, prices: number[]): number =>
  prices.reduce((a, b) => Math.abs(b - price) < Math.abs(a - price) ? b : a);

export const toggleBodyScroll = (isPopupActive: boolean) => {
  if (isPopupActive) {
    document.body.classList.add(SCROLL_LOCK_BODY_CLASS);
  } else {
    document.body.classList.remove(SCROLL_LOCK_BODY_CLASS);
  }
};
