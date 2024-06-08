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

    expect(getByText('Drawer Content')).toBeInTheDocument();
  });
});
