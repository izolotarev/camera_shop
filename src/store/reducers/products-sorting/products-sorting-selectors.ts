import { CatalogSortOrder, CatalogSortType } from '../../../const/const';
import { State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getCatalogSortType = (state: State): CatalogSortType => state[NameSpace.sortProducts].catalogSortType;
export const getCatalogSortOrder = (state: State): CatalogSortOrder => state[NameSpace.sortProducts].catalogSortOrder;
