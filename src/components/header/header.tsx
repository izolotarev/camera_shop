import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { getProductsInSearch } from '../../store/reducers/products/products-selectors';
import { State } from '../../types/types';

function Header() : JSX.Element {
  const [search, setSearch] = useState('');
  const productsInSearch = useSelector((state: State) => getProductsInSearch(state, search));

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  };

  const handleResetSearch = () => {
    setSearch('');
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.ROOT} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={`${AppRoute.CATALOG}/page_1`}>Каталог</Link>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="/#">Гарантии</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="/#">Доставка</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="/#">О компании</a>
            </li>
          </ul>
        </nav>
        <div className={`form-search ${search ? 'list-opened' : ''}`}>
          <form>
            <label>
              <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" onChange={handleSearchChange} value={search}/>
            </label>
            <ul className="form-search__select-list">
              {
                productsInSearch.length > 0
                  ?
                  productsInSearch.map((product, index) =>
                    (
                      <Link key={product.id} to={{pathname: `${AppRoute.PRODUCTS}/${product.id}`}}>
                        <li className="form-search__select-item" tabIndex={index}>{product.name}</li>
                      </Link>
                    )
                  )
                  :
                  ''
              }
            </ul>
          </form>
          <button className="form-search__reset" type="reset" onClick={handleResetSearch}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__basket-link" to={AppRoute.BASKET}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default Header;
