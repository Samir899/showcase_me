import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import App from '../App';
test('renders welcome message', () => {
    render(_jsx(App, {}));
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});
