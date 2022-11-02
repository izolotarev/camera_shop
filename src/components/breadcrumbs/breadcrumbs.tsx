import { Link } from 'react-router-dom';
import { BreadcrumbsType } from '../../types/types';

type BreadcrumbsProps = {
  crumbs: BreadcrumbsType[];
}

function Breadcrumbs({crumbs}:BreadcrumbsProps):JSX.Element {
  const lastIndex = crumbs.length - 1;

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {
            crumbs.length > 1
              ?
              crumbs.map((crumb, index) => {
                if (index !== lastIndex) {
                  return (
                    <li key={crumb.name} className="breadcrumbs__item">
                      <Link className="breadcrumbs__link" to={crumb.url ?? '#'}>{crumb.name}
                        <svg width="5" height="8" aria-hidden="true">
                          <use xlinkHref="#icon-arrow-mini"></use>
                        </svg>
                      </Link>
                    </li>
                  );
                }
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
