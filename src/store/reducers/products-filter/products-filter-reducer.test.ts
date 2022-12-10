import { FilterNames } from '../../../const/const';
import { clearProductFilters } from '../../actions/actions';
import { productsFilter } from './products-filter-reducer';

describe('Function: productsFilter', () => {

  it('should reset filter state', () => {
    const state = {
      [FilterNames.PriceMin] : '',
      [FilterNames.PriceMax] : '',
      [FilterNames.Photocamera] : true,
      [FilterNames.Videocamera] : false,
      [FilterNames.Digital] : true,
      [FilterNames.Film] : false,
      [FilterNames.Snapshot] : true,
      [FilterNames.Collection] : false,
      [FilterNames.Zero] : true,
      [FilterNames.NonProfessional] : true,
      [FilterNames.Professional] : true,
    };

    expect(productsFilter(state, clearProductFilters()))
      .toEqual({
        [FilterNames.PriceMin] : '',
        [FilterNames.PriceMax] : '',
        [FilterNames.Photocamera] : false,
        [FilterNames.Videocamera] : false,
        [FilterNames.Digital] : false,
        [FilterNames.Film] : false,
        [FilterNames.Snapshot] : false,
        [FilterNames.Collection] : false,
        [FilterNames.Zero] : false,
        [FilterNames.NonProfessional] : false,
        [FilterNames.Professional] : false,
      });
  });
});
