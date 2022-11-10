import { AppRoute } from '../../const/const';
import { BreadcrumbsType } from '../../types/types';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Header from '../header/header';

function NotFound():JSX.Element {
  const breadcrumbs: BreadcrumbsType[] =
  [
    {name: 'Главная', url: AppRoute.ROOT},
    {name: 'Не найдено'}
  ];

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs crumbs={breadcrumbs}/>
          <h1 style={{textAlign: 'center'}}>404 Страница не найдена</h1>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
