import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { clearProductFilters, clearProductsSorting } from '../../store/actions/actions';
import { BreadcrumbsType } from '../../types/types';

type BreadcrumbsProps = {
  crumbs: BreadcrumbsType[];
}

function Breadcrumbs({crumbs}:BreadcrumbsProps):JSX.Element {
  const lastIndex = crumbs.length - 1;

  const dispatch = useAppDispatch();

  const handleCrumbClick = () => {
    dispatch(clearProductsSorting());
    dispatch(clearProductFilters());
  };

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {
            crumbs.length > 1
              ?
              crumbs.map((crumb, index) => {
                if (index === lastIndex) { return ''; }
                return (
                  <li key={crumb.name} className="breadcrumbs__item">
                    <Link onClick={handleCrumbClick} className="breadcrumbs__link" to={crumb.url ?? '#'}>{crumb.name}
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link>
                  </li>
                );
              })
              :
              ''
          }
          <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{crumbs[lastIndex].name}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
