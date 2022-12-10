import { CatalogSortOrder, CatalogSortType } from '../../../const/const';
import { applySortOrder, applySortType } from '../../actions/actions';
import { productsSort } from './products-sorting-reducer';

describe('Function: productsSort', () => {

  it('should update sortType', () => {
    const state = {
      catalogSortType: CatalogSortType.None,
      catalogSortOrder: CatalogSortOrder.None,
    };
    expect(productsSort(state, applySortType(CatalogSortType.Price)))
      .toEqual({
        catalogSortType: CatalogSortType.Price,
        catalogSortOrder: CatalogSortOrder.None,
      });
  });

  it('should update sortOrder', () => {
    const state = {
      catalogSortType: CatalogSortType.None,
      catalogSortOrder: CatalogSortOrder.None,
    };
    expect(productsSort(state, applySortOrder(CatalogSortOrder.Descending)))
      .toEqual({
        catalogSortType: CatalogSortType.None,
        catalogSortOrder: CatalogSortOrder.Descending,
      });
  });

});
