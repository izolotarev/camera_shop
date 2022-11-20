import { MouseEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, NUMBER_OF_ELEMENTS_PER_PAGE } from '../../const/const';

type PaginationProps = {
  numberOfElements: number;
  initPage: number;
}

function Pagination({numberOfElements, initPage}:PaginationProps):JSX.Element {
  const numberOfPages = Math.ceil(numberOfElements / NUMBER_OF_ELEMENTS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(initPage);

  const navigate = useNavigate();

  useEffect(
    () => {
      if (currentPage > numberOfPages) {
        setCurrentPage(1);
        navigate(`${AppRoute.CATALOG}/page_1`);
      }
    },
    [currentPage, navigate, numberOfPages],
  );

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
                <li className="pagination__item">
                  <Link className="pagination__link pagination__link--text" to={`${AppRoute.CATALOG}/page_${currentPage - 1}`}>Назад</Link>
                </li>
                :
                null
            }
            {
              Array(numberOfPages).fill(null).map((_, index) => {
                const j = index + 1;
                return (
                  <li key={j} className="pagination__item">
                    <Link className={`pagination__link ${j === currentPage ? 'pagination__link--active' : ''}`} to={`${AppRoute.CATALOG}/page_${j}`}>{j}</Link>
                  </li>
                );
              })
            }
            {
              currentPage !== numberOfPages
                ?
                <li className="pagination__item">
                  <Link className="pagination__link pagination__link--text" to={`${AppRoute.CATALOG}/page_${currentPage + 1}`}>Далее</Link>
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
