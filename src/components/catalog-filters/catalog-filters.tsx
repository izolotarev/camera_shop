import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { CameraCategory, CameraLevel, CameraType, FilterNames, MapFilterNameToParam, SearchParams } from '../../const/const';
import { getFilterSettings } from '../../store/reducers/products/products-selectors';
import { appendParamWithValue, removeParamWithValue } from '../../utils/utils';

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

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if (evt.target.checked) {
      setFormState({...formState, [evt.target.name]: true});
      const paramValue = MapFilterNameToParam[evt.target.name];
      setSearchParams(appendParamWithValue(searchParams, paramValue.param, paramValue.value));
    } else {
      setFormState({...formState, [evt.target.name]: false});
      const paramValue = MapFilterNameToParam[evt.target.name];
      setSearchParams(removeParamWithValue(searchParams, paramValue.param, paramValue.value));
    }
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
                <input type="number" name={FilterNames.PriceMin} placeholder={ filterSettings?.minPrice.toString()} />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name={FilterNames.PriceMax} placeholder={ filterSettings?.maxPrice.toString()} />
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
              <input type="checkbox" name={FilterNames.Film} checked={formState[FilterNames.Film]} onChange={ handleFormChange } /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name={FilterNames.Snapshot} checked={formState[FilterNames.Snapshot]} onChange={ handleFormChange }/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
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
        <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default CatalogFilters;
