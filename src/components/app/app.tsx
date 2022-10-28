import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import Basket from '../basket/basket';
import Catalog from '../catalog/catalog';
import Product from '../product/product';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<Catalog products={[]}/>}/>
      <Route path={`${AppRoute.PRODUCTS}/:id`} element={<Product/>}/>
      <Route path={AppRoute.BASKET} element={<Basket/>}/>
    </Routes>
  );
}

export default App;
