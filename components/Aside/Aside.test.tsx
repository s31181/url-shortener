import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Aside from './Aside';

describe('Aside Component', () => {
    it('renders the menu button', () => {
        render(<Aside />);
        const button = screen.getByTitle('Open Sidebar');
        expect(button).toBeInTheDocument();
    });

    it('opens the drawer when the menu button is clicked', () => {
        render(<Aside />);
        const button = screen.getByTitle('Open Sidebar');
        fireEvent.click(button);
        const drawer = screen.getByRole('presentation');
        expect(drawer).toBeInTheDocument();
    });
});