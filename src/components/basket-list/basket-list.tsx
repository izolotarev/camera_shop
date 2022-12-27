import { BasketItemType } from '../../types/types';
import BasketItem from '../basket-item/basket-item';

type BasketListProps = {
  items: BasketItemType[]
}

function BasketList({items}: BasketListProps):JSX.Element {
  return (
    <ul className="basket__list">
      {
        items.map((item) =>
          <BasketItem basketItem={item} key={item.product.id}/>)
      }
    </ul>
  );
}

export default BasketList;
