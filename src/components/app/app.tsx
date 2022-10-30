import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { getProducts, getProductsLoadingStatus, getPromoLoadingStatus } from '../../store/reducers/products/products-selectors';
import Basket from '../basket/basket';
import Catalog from '../catalog/catalog';
import LoadingScreen from '../loading-screen/loading-screen';
import Product from '../product/product';

function App(): JSX.Element {
  const products = useSelector(getProducts);
  const productsLoaded = useSelector(getProductsLoadingStatus);
  const isPromoLoaded = useSelector(getPromoLoadingStatus);

  if (!isPromoLoaded || !productsLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route path={`${AppRoute.ROOT}`} element={<Catalog products={products}/>}/>
      <Route path={`${AppRoute.CATALOG}/page_:id`} element={<Catalog products={products}/>}/>
      <Route path={`${AppRoute.PRODUCTS}/:id`} element={<Product/>}/>
      <Route path={AppRoute.BASKET} element={<Basket/>}/>
    </Routes>
  );
}

export default App;
