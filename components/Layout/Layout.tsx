'use client';

import React from 'react';
import { Container } from '@mui/material';
import Aside from '../Aside/Aside';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Container maxWidth="lg">
            <Aside />
            <main>{children}</main>
        </Container>
    );
};

export default Layout;