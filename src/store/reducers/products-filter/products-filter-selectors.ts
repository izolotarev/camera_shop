import { ProductsFilterState, State } from '../../../types/types';
import { NameSpace } from '../root-reducer';

export const getFilterState = (state: State): ProductsFilterState => state[NameSpace.filterProducts];
