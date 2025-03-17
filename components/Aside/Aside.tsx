'use client'

import React, { useState } from 'react';
import { SwipeableDrawer, List, ListItem, ListItemText } from '@mui/material';

const Aside: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    return (
        <>
            <button className="menu-button" onClick={toggleDrawer(true)} title="Open Sidebar"><line></line><line></line><line></line></button>
            <SwipeableDrawer
                anchor="left"
                open={isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <List>
                    <ListItem component="a" href="/">
                        <ListItemText primary="URL Shortner" />
                    </ListItem>
                    <ListItem component="a" href="/dashboard">
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </>
    );
};

export default Aside;
