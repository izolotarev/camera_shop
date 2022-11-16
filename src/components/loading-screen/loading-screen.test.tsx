import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import LoadingScreen from './loading-screen';
import { unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';

describe('Component: LoadingScreen', () => {

  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <LoadingScreen />
      </HistoryRouter>,
    );

    expect(screen.getByText(/The page is loading/i)).toBeInTheDocument();
  });
});
