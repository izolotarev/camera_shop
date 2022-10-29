import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { getProducts, getProductsLoadingStatus } from '../../store/reducers/products/products-selector';
import Basket from '../basket/basket';
import Catalog from '../catalog/catalog';
import LoadingScreen from '../loading-screen/loading-screen';
import Product from '../product/product';

function App(): JSX.Element {
  const products = useSelector(getProducts);
  const productsLoaded = useSelector(getProductsLoadingStatus);

  if (!productsLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<Catalog products={products}/>}/>
      <Route path={`${AppRoute.PRODUCTS}/:id`} element={<Product/>}/>
      <Route path={AppRoute.BASKET} element={<Basket/>}/>
    </Routes>
  );
}

export default App;
