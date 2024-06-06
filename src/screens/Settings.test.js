import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Settings from './Settings';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { getData } from '../utils/core';
import { AUTH_TOKEN_KEY } from '../utils/core';

import thunk from 'redux-thunk';

const middlewares = [thunk];
import { api } from '../redux/services/api';

jest.mock('../utils/core', () => ({
  getData: jest.fn(),
}));


const mockStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

describe('Settings Component Tests', () => {

  beforeEach(() => {
    // Mock authentication data
    getData.mockReturnValue({ userId: '123', auth_token: 'valid_token', exp: Date.now() / 1000 + 3600 });

    // Mock user data from the API
    const mockApiData = {
      data: {
        name: 'Dr. Daudi Mburuge',
        email: 'daudimburuge@gmail.com',
        phone: '+254 712 345 678'
      },
      isLoading: false,
    };

    // Mock the query hook
    jest.spyOn(api, 'useGetDoctorQuery').mockReturnValue(mockApiData);
  });

  test('it renders correctly', () => {
    render(<Provider store={mockStore}><MemoryRouter><Settings /></MemoryRouter></Provider>);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
