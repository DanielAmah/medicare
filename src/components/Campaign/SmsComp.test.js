import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SmsComp from './SmsComp';
import { toast } from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  toast: {
    error: jest.fn()
  }
}));

describe('SmsComp', () => {
  const mockData = {
    id: 1,
    title: 'Welcome SMS',
    sendTo: 'NHCF Patients',
    action: {
      message: 'Welcome to our service!'
    }
  };

  it('renders correctly with initial data', () => {
    render(<SmsComp data={mockData} />);

    expect(screen.getByPlaceholderText('Welcome SMS')).toBeInTheDocument();
    expect(screen.getByText('NHCF Patients')).toBeInTheDocument();
  });

  it('updates sendTo when selecting a different option', () => {
    render(<SmsComp data={mockData} />);
    userEvent.click(screen.getByText('NHCF Patients'));

    expect(screen.getByText('NHCF Patients')).toBeInTheDocument();
  });


  it('does not show the send campaign button when data.id is present', () => {
    render(<SmsComp data={mockData} />);
    expect(screen.queryByText('Send Campaign')).toBeNull();
  });
});
