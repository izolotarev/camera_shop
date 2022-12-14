import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FilterNames, MapFilterNameToParam, SearchParams } from '../../const/const';
import { useAppDispatch } from '../../hooks/hooks';
import { applyProductsFilter, clearProductFilters } from '../../store/actions/actions';
import { getFilterState } from '../../store/reducers/products-filter/products-filter-selectors';
import { getFilterSettings } from '../../store/reducers/products/products-selectors';
import { appendParamWithValue, closestPrice, removeParam, removeParamWithValue, updateParamsWithValues } from '../../utils/utils';

function CatalogFilters(): JSX.Element {

  const filterSettings = useSelector(getFilterSettings);
  const productsPrices = filterSettings?.productsPrices;
  const [searchParams, setSearchParams] = useSearchParams();
  const filterState = useSelector(getFilterState);
  const dispatch = useAppDispatch();

  const [disabledCameraType, setDisabledCameraType] = useState({
    [FilterNames.Snapshot]: false,
    [FilterNames.Film]: false,
  });

  useEffect(() => {
    setDisabledCameraType({
      [FilterNames.Snapshot]: filterState[FilterNames.Videocamera] ,
      [FilterNames.Film]: filterState[FilterNames.Videocamera] ,
    });
  }, [filterState]);

  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if(evt.target.name === FilterNames.PriceMin) {
      let minPriceValue = '';
      if (evt.target.value) {
        parseInt(evt.target.value, 10) < 0
          ?
          minPriceValue = '0'
          :
          minPriceValue = evt.target.value;
      }
      dispatch(applyProductsFilter({...filterState, [FilterNames.PriceMin]: minPriceValue}));
    }

    if (evt.target.name === FilterNames.PriceMax) {
      let maxPriceValue = '';
      if (evt.target.value) {
        parseInt(evt.target.value, 10) < 0
          ?
          maxPriceValue = '0'
          :
          maxPriceValue = evt.target.value;
      }
      dispatch(applyProductsFilter({...filterState, [FilterNames.PriceMax]: maxPriceValue}));
    }
  };

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if(evt.target.name === FilterNames.PriceMin) {
      let minValue = evt.target.value;
      if (filterSettings?.minPrice && parseInt(minValue, 10) < filterSettings.minPrice) {
        minValue = filterSettings.minPrice.toString();
      }
      if (filterSettings?.maxPrice && parseInt(minValue, 10) > filterSettings.maxPrice) {
        minValue = filterSettings.maxPrice.toString();
      }
      if (parseInt(minValue, 10) > parseInt(filterState.priceMax, 10)) {
        minValue = filterState.priceMax;
      }
      if (productsPrices && minValue !== '') {
        minValue = closestPrice(parseInt(minValue, 10), productsPrices).toString();
      }
      dispatch(applyProductsFilter({...filterState, [FilterNames.PriceMin]: minValue}));

      if (minValue === '') {
        setSearchParams(removeParam(searchParams, SearchParams.PriceMin));
      } else if (searchParams.get(SearchParams.PriceMin)) {
        setSearchParams(updateParamsWithValues(searchParams, {
          [SearchParams.PriceMin] : minValue,
        }));
      } else {
        setSearchParams(appendParamWithValue(searchParams, SearchParams.PriceMin, minValue));
      }
      return;
    }

    if (evt.target.name === FilterNames.PriceMax) {
      let maxValue = evt.target.value;
      if (filterSettings?.maxPrice && parseInt(maxValue, 10) > filterSettings.maxPrice) {
        maxValue = filterSettings.maxPrice.toString();
      }
      if (filterSettings?.minPrice && parseInt(maxValue, 10) < filterSettings.minPrice) {
        maxValue = filterSettings.minPrice.toString();
      }
      if (parseInt(maxValue, 10) < parseInt(filterState.priceMin, 10)) {
        maxValue = filterState.priceMin;
      }
      if (productsPrices && maxValue !== '') {
        maxValue = closestPrice(parseInt(maxValue, 10), productsPrices).toString();
      }
      dispatch(applyProductsFilter({...filterState, [FilterNames.PriceMax]: maxValue}));

      if (maxValue === '') {
        setSearchParams(removeParam(searchParams, SearchParams.PriceMax));
      } else if (searchParams.get(SearchParams.PriceMax)) {
        setSearchParams(updateParamsWithValues(searchParams, {
          [SearchParams.PriceMax] : maxValue,
        }));
      } else {
        setSearchParams(appendParamWithValue(searchParams, SearchParams.PriceMax, maxValue));
      }
      return;
    }

    if (evt.target.checked && evt.target.name === FilterNames.Videocamera &&
        (filterState[FilterNames.Film] || filterState[FilterNames.Snapshot])) {
      dispatch(applyProductsFilter({...filterState, [FilterNames.Film]: false, [FilterNames.Snapshot]: false, [FilterNames.Videocamera]: true,}));
      const filmParam = MapFilterNameToParam[FilterNames.Film];
      const snapParam = MapFilterNameToParam[FilterNames.Snapshot];
      const videoParam = MapFilterNameToParam[FilterNames.Videocamera];
      let params = searchParams;
      params = removeParamWithValue(params, filmParam.param, filmParam.value);
      params = removeParamWithValue(params, snapParam.param, snapParam.value);
      params = appendParamWithValue(params, videoParam.param, videoParam.value);
      setSearchParams(params);
      return;
    }

    if (evt.target.checked) {
      dispatch(applyProductsFilter({...filterState, [evt.target.name]: true}));
      const paramValue = MapFilterNameToParam[evt.target.name];
      setSearchParams(appendParamWithValue(searchParams, paramValue.param, paramValue.value));
    } else {
      dispatch(applyProductsFilter({...filterState, [evt.target.name]: false}));
      const paramValue = MapFilterNameToParam[evt.target.name];
      setSearchParams(removeParamWithValue(searchParams, paramValue.param, paramValue.value));
    }
  };

  const handleResetFilters = () => {
    dispatch(clearProductFilters());

    const sortType = searchParams.get(SearchParams.SortType);
    const sortOrder = searchParams.get(SearchParams.SortOrder);

    sortType && sortOrder
      ?
      setSearchParams({
        [SearchParams.SortType] : sortType,
        [SearchParams.SortOrder] : sortOrder
      })
      :
      setSearchParams({});
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">????????????</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">????????, ???</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name={FilterNames.PriceMin} placeholder={ filterSettings?.minPrice.toString()} value={filterState.priceMin} onChange={handlePriceChange} onBlur={ handleFormChange }/>
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name={FilterNames.PriceMax} placeholder={ filterSettings?.maxPrice.toString()} value={filterState.priceMax} onChange={handlePriceChange} onBlur={ handleFormChange }/>
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">??????????????????</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Photocamera} checked={filterState[FilterNames.Photocamera]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">????????????????????</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Videocamera} checked={filterState[FilterNames.Videocamera]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">??????????????????????</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">?????? ????????????</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Digital} checked={filterState[FilterNames.Digital]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">????????????????</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Film} checked={filterState[FilterNames.Film]} onChange={ handleFormChange } disabled={disabledCameraType[FilterNames.Film]} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">??????????????????</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Snapshot} checked={filterState[FilterNames.Snapshot]} onChange={ handleFormChange } disabled={disabledCameraType[FilterNames.Snapshot]} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">????????????????????????</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Collection} checked={filterState[FilterNames.Collection]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">??????????????????????????</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">??????????????</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Zero} checked={filterState[FilterNames.Zero]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">??????????????</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.NonProfessional} checked={filterState[FilterNames.NonProfessional]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">????????????????????????</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Professional} checked={filterState[FilterNames.Professional]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">????????????????????????????????</span>
            </label>
          </div>
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset" onClick={ handleResetFilters }>???????????????? ??????????????
        </button>
      </form>
    </div>
  );
}

export default CatalogFilters;
