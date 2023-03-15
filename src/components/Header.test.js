import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { PictureContext } from '../service'

test('it renders the search form', () => {
    render(
        <Router>
            <Header />
        </Router>,
    );

    expect(screen.getByPlaceholderText('search movies')).toBeInTheDocument();
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
});

test('it accepts search input properly', async () => {
    render(
        <Router>
            <Header />
        </Router>,
    );
    const name = screen.getByPlaceholderText('search movies');
    await userEvent.type(name, 'out');
    expect(name).toHaveValue('out');
});
test('it passes the forms values on submit', async () => {
    const getSearchMoviesList = jest.fn();
    const { getByTestId } = render(
        <PictureContext.Provider value={{ getSearchMoviesList }}><Router>
            <Header />
        </Router></PictureContext.Provider>

    );
    const name = screen.getByPlaceholderText('search movies');
    await userEvent.type(name, 'out');
    const button = getByTestId('button');
    fireEvent.click(button);
    expect(getSearchMoviesList).toHaveBeenCalledWith('out'
    );
});
