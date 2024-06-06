import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Services from './Services';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { servicesData } from '../components/Datas';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import thunk from 'redux-thunk';

const middlewares = [thunk];
import { api } from '../redux/services/api';

const mockStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

jest.mock('../Layout', () => ({ children }) => <div>{children}</div>);


describe('Services Component', () => {
  test('handles Services correctly', () => {
    render(<Provider store={mockStore}><MemoryRouter><Services /></MemoryRouter></Provider>);
    expect(screen.getByText('Services')).toBeInTheDocument();
  });
});
