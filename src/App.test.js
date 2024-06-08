import { render, screen } from '@testing-library/react';
import App from './App';
import { getData } from './utils/core';


jest.mock('./utils/core', () => ({
  getData: jest.fn(),
}));


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
test('renders learn react link', () => {
  getData.mockReturnValue({ auth_token: 'valid_token', exp: Date.now() / 1000 + 3600 });
  render(<App />);
  const linkElement = screen.getByText("Patients");
  expect(linkElement).toBeInTheDocument();
});
