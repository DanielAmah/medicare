import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WhatsappComp from './Whatsapp';
import { toast } from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  toast: {
    error: jest.fn()
  }
}));

describe('WhatsappComp', () => {
  const mockData = {
    id: 1,
    title: 'Welcome WhatsApp Message',
    sendTo: 'NHCF Patients',
    action: {
      message: 'Welcome to our service!'
    }
  };

  it('renders correctly with initial data', () => {
    render(<WhatsappComp data={mockData} />);

    expect(screen.getByPlaceholderText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText(mockData.sendTo)).toBeInTheDocument();
  });


  it('displays the send campaign button when data.id is absent', () => {
    render(<WhatsappComp data={{}} />);
    expect(screen.getByText('Send Campaign')).toBeInTheDocument();
  });

  it('does not show the send campaign button when data.id is present', () => {
    render(<WhatsappComp data={mockData} />);
    expect(screen.queryByText('Send Campaign')).toBeNull();
  });
});
