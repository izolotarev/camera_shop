import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import Basket from '../basket/basket';
import Catalog from '../catalog/catalog';
import NotFound from '../not-found/not-found';
import Product from '../product/product';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={`${AppRoute.ROOT}`} element={<Navigate to={`${AppRoute.CATALOG}/page_1`}/>}/>
      <Route path={`${AppRoute.CATALOG}/page_:id`} element={<Catalog />}/>
      <Route path={`${AppRoute.PRODUCTS}/:id`} element={<Product/>}/>
      <Route path={AppRoute.BASKET} element={<Basket/>}/>
      <Route path={'*'} element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
