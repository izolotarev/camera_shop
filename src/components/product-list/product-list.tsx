import { ProductType } from '../../types/types';
import ProductCard from '../product-card/product-card';
import ProductListEmpty from '../product-list-empty/product-list-empty';

type ProductListProps = {
  products: ProductType[];
}

function ProductList({products}:ProductListProps): JSX.Element {
  if (products.length === 0) {
    return <ProductListEmpty/>;
  }

  return (
    <div className="cards catalog__cards">
      {
        products.map((product) => <ProductCard product={product} key={product.id}/>)
      }
    </div>
  );
}

export default ProductList;
