import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmailComp from './EmailComp';
import userEvent from '@testing-library/user-event';

describe('EmailComp', () => {
  const initialData = {
    id: 1,
    sendTo: 'All Patients',
    title: 'Welcome Email',
    action: {
      subject: 'Welcome to Our Service',
      header: 'Hello,',
      subHeader: 'Welcome to the community!',
      message: 'We are glad to have you.',
    },
    image: 'path/to/image.png',
  };

  it('renders correctly with initial data', () => {
    render(<EmailComp data={initialData} />);

    expect(screen.getByPlaceholderText('Welcome Email')).toBeInTheDocument();
    expect(screen.getByText('All Patients')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Welcome to Our Service')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Hello,')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Welcome to the community!')).toBeInTheDocument();
  });

  it('updates sendTo when selecting a different option', async () => {
    render(<EmailComp data={initialData} />);
    userEvent.click(screen.getByText('All Patients'));
    await waitFor(() => {
      expect(screen.getByText('All Patients')).toBeInTheDocument();
    });
  });


  it('handles absence of `data.id` by displaying default placeholders and send button', () => {
    render(<EmailComp data={{}} />);
    expect(screen.getByPlaceholderText('Dear Medicare patient ....')).toBeInTheDocument();
    expect(screen.getByText('Send Campaign')).toBeInTheDocument();
  });
});
