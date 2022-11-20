import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchSimilarProducts } from '../../store/actions/api.actions';
import { getSimilarProducts } from '../../store/reducers/products/products-selectors';
import ProductCard from '../product-card/product-card';

type SimilarProductSliderProps = {
  id: number;
}

function SimilarProductSlider({id}: SimilarProductSliderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSimilarProducts(id));
  }, [dispatch, id]);

  const similarProducts = useSelector(getSimilarProducts);
  const similarProductsIds = similarProducts.slice().map((p) => p.id);

  const [activeSimilarProductsIds, setActiveSimilarProductsIds] = useState<number[]>([]);
  const [activeSimilarProductsIndexes, setActiveSimilarProductsIndexes] = useState([0,1,2]);

  useEffect(() => {
    setActiveSimilarProductsIds(similarProductsIds.slice(0,3));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [similarProducts]);

  const handleNextSlideClick = () => {
    if (activeSimilarProductsIds.includes(similarProductsIds[similarProductsIds.length - 1])) {return;}
    const nextIndexes = activeSimilarProductsIndexes.slice().map((i) => i + 1);
    setActiveSimilarProductsIndexes(nextIndexes);
    setActiveSimilarProductsIds(nextIndexes.map((i) => similarProductsIds[i]));
  };

  const handlePrevSlideClick = () => {
    if (activeSimilarProductsIds.includes(similarProductsIds[0])) {return;}
    const prevIndexes = activeSimilarProductsIndexes.slice().map((i) => i - 1);
    setActiveSimilarProductsIndexes(prevIndexes);
    setActiveSimilarProductsIds(prevIndexes.map((i) => similarProductsIds[i]));
  };

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        {
          similarProducts.length > 0
            ?
            <div className="product-similar__slider">
              <div className="product-similar__slider-list">
                {
                  similarProducts.map((similarProduct) => <ProductCard product={similarProduct} key={similarProduct.id} isActive={activeSimilarProductsIds.includes(similarProduct.id)}/>)
                }
              </div>
              <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled={activeSimilarProductsIds.includes(similarProductsIds[0])} onClick={handlePrevSlideClick}>
                <svg width="7" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
              <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled={activeSimilarProductsIds.includes(similarProductsIds[similarProductsIds.length - 1])} onClick={handleNextSlideClick}>
                <svg width="7" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
            </div>
            :
            ''
        }
      </div>
    </section>
  );
}

export default SimilarProductSlider;
