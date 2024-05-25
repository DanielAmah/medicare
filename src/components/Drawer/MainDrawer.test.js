import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MainDrawer from './MainDrawer';

describe('MainDrawer', () => {
  const mockToggleDrawer = jest.fn();

  it('should render the drawer when open', () => {
    const { getByText } = render(
      <MainDrawer isOpen={true} toggleDrawer={mockToggleDrawer}>
        <div>Drawer Content</div>
      </MainDrawer>
    );

    // Check if the drawer is visible and contains the correct content
    expect(getByText('Drawer Content')).toBeInTheDocument();
  });
});
