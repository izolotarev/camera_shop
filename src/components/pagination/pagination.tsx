import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, NUMBER_OF_ELEMENTS_PER_PAGE } from '../../const/const';

type PaginationProps = {
  numberOfElements: number;
  initPage: number;
}

function Pagination({numberOfElements, initPage}:PaginationProps):JSX.Element {
  const numberOfPages = Math.ceil(numberOfElements / NUMBER_OF_ELEMENTS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(initPage);

  const pages = [];

  for (let i = 1; i < numberOfPages + 1; i++) {
    pages.push(
      <li key={i} className="pagination__item"><Link className={`pagination__link ${i === currentPage ? 'pagination__link--active' : ''}`} to={`${AppRoute.CATALOG}/page_${i}`}>{i}</Link>
      </li>
    );
  }

  const handlePaginationClick = (evt: MouseEvent<HTMLUListElement>) => {
    evt.preventDefault();
    const page = (evt.target as HTMLAnchorElement).href?.split('_').reverse()[0];
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
  };

  return (
    <div className="pagination">
      {
        numberOfPages > 1
          ?
          <ul className="pagination__list" onClick={handlePaginationClick}>
            {
              currentPage !== 1
                ?
                <li className="pagination__item"><Link className="pagination__link pagination__link--text" to={`${AppRoute.CATALOG}/page_${currentPage - 1}`}>Назад</Link>
                </li>
                :
                null
            }
            {
              pages
            }
            {
              currentPage !== numberOfPages
                ?
                <li className="pagination__item"><Link className="pagination__link pagination__link--text" to={`${AppRoute.CATALOG}/page_${currentPage + 1}`}>Далее</Link>
                </li>
                :
                null
            }
          </ul>
          :
          null
      }
    </div>
  );
}

export default Pagination;
