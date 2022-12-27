import { AppRoute } from '../../const/const';
import { BreadcrumbsType } from '../../types/types';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Header from '../header/header';

function ErrorPage():JSX.Element {
  const breadcrumbs: BreadcrumbsType[] =
  [
    {name: 'Главная', url: AppRoute.ROOT},
    {name: 'Ошибка'}
  ];

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs crumbs={breadcrumbs}/>
          <h1 style={{textAlign: 'center'}}>Упс. Что-то пошло не так...</h1>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default ErrorPage;
