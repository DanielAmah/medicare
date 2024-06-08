import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AddAppointmentModal from './AddApointmentModal';
import appointmentReducer from '../../redux/services/appointment';
import userReducer from '../../redux/services/user';
import serviceReducer from '../../redux/services/service';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
import { api } from '../../redux/services/api';

const mockStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


const props = {
  closeModal: jest.fn(),
  isOpen: true,
  datas: {},
};

jest.mock("react-apexcharts", () =>
  jest.fn(() => {
    return null;
  })
);
jest.mock("apexcharts", () => ({
  exec: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve("uri");
    });
  }),
}));



describe('AddAppointmentModal', () => {

  test('renders the component correctly', () => {

    render(
      <Provider store={mockStore}>
        <AddAppointmentModal {...props} />
      </Provider>
    );
    expect(screen.getByText(/New Appointment/i)).toBeInTheDocument();
  });
});
