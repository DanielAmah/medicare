// __mocks__/react-modern-drawer.js
import React from 'react';

// Export a mocked version of the Drawer
const MockDrawer = ({ open, onClose, children, ...props }) => {
  // You can simulate open/close behavior or add buttons to interact in tests if needed
  return (
    <div {...props} style={{ display: open ? 'block' : 'none' }}>
      {children}
      <button onClick={onClose} data-testid="drawer-close">Close Drawer</button>
    </div>
  );
};

export default MockDrawer;
