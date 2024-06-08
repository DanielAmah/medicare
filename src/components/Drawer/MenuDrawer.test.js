import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MenuDrawer from './MenuDrawer';
import { MemoryRouter } from 'react-router-dom';
import MainDrawer from './MainDrawer';


const mockUser = { name: 'John Doe', isLoggedIn: true };

jest.mock('./MainDrawer', () => {
  return ({ isOpen, toggleDrawer, children }) => (
    <div data-testid="main-drawer" data-open={isOpen} onClick={toggleDrawer}>
      {children}
    </div>
  );
});

describe('MenuDrawer', () => {
  const mockToggleDrawer = jest.fn();

  it('renders the MenuDrawer with Sidebar within a MainDrawer', () => {
    render(
      <MemoryRouter><MenuDrawer isOpen={true} toggleDrawer={mockToggleDrawer} /></MemoryRouter>);

    const drawerElement = screen.getByTestId('main-drawer');
    expect(drawerElement).toBeInTheDocument();
    expect(drawerElement.getAttribute('data-open')).toBe('true');

    expect(screen.getByText('Patients')).toBeInTheDocument();

    fireEvent.click(drawerElement);
    expect(mockToggleDrawer).toHaveBeenCalled();
  });

  it('closes the MenuDrawer when the drawer is toggled', () => {
    render(<MemoryRouter><MenuDrawer isOpen={false} toggleDrawer={mockToggleDrawer} /></MemoryRouter>);

    const drawerElement = screen.getByTestId('main-drawer');
    expect(drawerElement.getAttribute('data-open')).toBe('false');
  });
});
