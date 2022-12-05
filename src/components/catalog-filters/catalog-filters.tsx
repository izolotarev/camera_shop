import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { CameraCategory, CameraLevel, CameraType, CatalogSortOrder, CatalogSortType, FilterNames, MapFilterNameToParam, SearchParams } from '../../const/const';
import { getFilterSettings } from '../../store/reducers/products/products-selectors';
import { appendParamWithValue, removeParam, removeParamWithValue, updateParamsWithValues } from '../../utils/utils';

function CatalogFilters(): JSX.Element {

  const filterSettings = useSelector(getFilterSettings);

  const [searchParams, setSearchParams] = useSearchParams();
  const priceMinParam = searchParams.get(SearchParams.PriceMin);
  const priceMaxParam = searchParams.get(SearchParams.PriceMax);
  const categoryParams = searchParams.getAll(SearchParams.Category);
  const typeParams = searchParams.getAll(SearchParams.Type);
  const levelParams = searchParams.getAll(SearchParams.Level);

  const [formState, setFormState] = useState(
    {
      [FilterNames.PriceMin] : priceMinParam,
      [FilterNames.PriceMax] : priceMaxParam,
      [FilterNames.Photocamera] : categoryParams.includes(CameraCategory.Photo),
      [FilterNames.Videocamera] : categoryParams.includes(CameraCategory.Video),
      [FilterNames.Digital] : typeParams.includes(CameraType.Digital),
      [FilterNames.Film] : typeParams.includes(CameraType.Film),
      [FilterNames.Snapshot] : typeParams.includes(CameraType.Snapshot),
      [FilterNames.Collection] : typeParams.includes(CameraType.Collection),
      [FilterNames.Zero] : levelParams.includes(CameraLevel.Zero),
      [FilterNames.NonProfessional] : levelParams.includes(CameraLevel.NonProfessional),
      [FilterNames.Professional] : levelParams.includes(CameraLevel.Professional),
    }
  );

  const [disabledCameraType, setDisabledCameraType] = useState({
    [FilterNames.Snapshot]: false,
    [FilterNames.Film]: false,
  });

  useEffect(() => {
    setDisabledCameraType({
      [FilterNames.Snapshot]: formState[FilterNames.Videocamera] && !formState[FilterNames.Photocamera],
      [FilterNames.Film]: formState[FilterNames.Videocamera] && !formState[FilterNames.Photocamera],
    });
  }, [formState]);

  const [minPrice, setMinPrice] = useState<string>(priceMinParam ?? '');
  const [maxPrice, setMaxPrice] = useState<string>(priceMaxParam ?? '');

  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if(evt.target.name === FilterNames.PriceMin) {
      if (evt.target.value) {
        if (parseInt(evt.target.value, 10) < 0) {
          setMinPrice('0');
        } else {
          setMinPrice(evt.target.value);
        }
      } else {
        setMinPrice('');
      }
    }

    if (evt.target.name === FilterNames.PriceMax) {
      if (evt.target.value) {
        if (parseInt(evt.target.value, 10) < 0) {
          setMaxPrice('0');
        } else {
          setMaxPrice(evt.target.value);
        }
      } else {
        setMaxPrice('');
      }
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
      if (parseInt(minValue, 10) > parseInt(maxPrice, 10)) {
        minValue = maxPrice;
      }
      setMinPrice(minValue);
      setFormState({...formState, [FilterNames.PriceMin]: minValue});
      if (minValue === '') {
        setSearchParams(removeParam(searchParams, SearchParams.PriceMin));
      } else if (searchParams.get(SearchParams.PriceMin)) {
        setSearchParams(updateParamsWithValues(searchParams, {
          [SearchParams.PriceMin] : minValue,
        }));
      } else {
        setSearchParams(appendParamWithValue(searchParams, SearchParams.PriceMin, minValue));
      }
    } else if (evt.target.name === FilterNames.PriceMax) {
      let maxValue = evt.target.value;
      if (filterSettings?.maxPrice && parseInt(maxValue, 10) > filterSettings.maxPrice) {
        maxValue = filterSettings.maxPrice.toString();
      }
      if (filterSettings?.minPrice && parseInt(maxValue, 10) < filterSettings.minPrice) {
        maxValue = filterSettings.minPrice.toString();
      }
      if (parseInt(maxValue, 10) < parseInt(minPrice, 10)) {
        maxValue = minPrice;
      }
      setMaxPrice(maxValue);
      setFormState({...formState, [FilterNames.PriceMax]: maxValue});
      if (maxValue === '') {
        setSearchParams(removeParam(searchParams, SearchParams.PriceMax));
      } else if (searchParams.get(SearchParams.PriceMax)) {
        setSearchParams(updateParamsWithValues(searchParams, {
          [SearchParams.PriceMax] : maxValue,
        }));
      } else {
        setSearchParams(appendParamWithValue(searchParams, SearchParams.PriceMax, maxValue));
      }
    }
    else {
      if (evt.target.checked) {
        setFormState({...formState, [evt.target.name]: true});
        const paramValue = MapFilterNameToParam[evt.target.name];
        setSearchParams(appendParamWithValue(searchParams, paramValue.param, paramValue.value));
      } else {
        setFormState({...formState, [evt.target.name]: false});
        const paramValue = MapFilterNameToParam[evt.target.name];
        setSearchParams(removeParamWithValue(searchParams, paramValue.param, paramValue.value));
      }
    }
  };

  const handleResetFilters = () => {
    setFormState({
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

    const sortType = searchParams.get(SearchParams.SortType) ?? CatalogSortType.Price;
    const sortOrder = searchParams.get(SearchParams.SortOrder) ?? CatalogSortOrder.Ascending;
    setSearchParams({ [SearchParams.SortType] : sortType, [SearchParams.SortOrder] : sortOrder });
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name={FilterNames.PriceMin} placeholder={ filterSettings?.minPrice.toString()} value={minPrice} onChange={handlePriceChange} onBlur={ handleFormChange }/>
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name={FilterNames.PriceMax} placeholder={ filterSettings?.maxPrice.toString()} value={maxPrice} onChange={handlePriceChange} onBlur={ handleFormChange }/>
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Photocamera} checked={formState[FilterNames.Photocamera]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Videocamera} checked={formState[FilterNames.Videocamera]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Digital} checked={formState[FilterNames.Digital]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Film} checked={formState[FilterNames.Film]} onChange={ handleFormChange } disabled={disabledCameraType[FilterNames.Film]} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Snapshot} checked={formState[FilterNames.Snapshot]} onChange={ handleFormChange } disabled={disabledCameraType[FilterNames.Snapshot]} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Collection} checked={formState[FilterNames.Collection]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Zero} checked={formState[FilterNames.Zero]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.NonProfessional} checked={formState[FilterNames.NonProfessional]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Professional} checked={formState[FilterNames.Professional]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset" onClick={ handleResetFilters }>Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default CatalogFilters;
