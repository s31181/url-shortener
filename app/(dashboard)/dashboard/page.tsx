import React from 'react';
import { setupDb } from '../../../lib/db.mjs';
import { Container, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Image from 'next/image';
export const revalidate = 10;

interface UrlProps {
    id: number;
    shortId: string;
    originalUrl: string;
    metaOgTitle: string;
    metaOgDescription: string;
    metaOgImage: string;
}


const DashboardPage: React.FC = async () => {
    const db = await setupDb();
    const urls = await db.all('SELECT * FROM urls');
    console.log(urls);
    await db.close();

    return (
        <Container >
            <Typography variant="h4" component="h1" gutterBottom>
                URL Dashboard
            </Typography>
            <Box sx={{ overflowX: "scroll" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Short ID</TableCell>
                            <TableCell>Original URL</TableCell>
                            <TableCell>Meta OG Title</TableCell>
                            <TableCell>Meta OG Description</TableCell>
                            <TableCell>Meta OG Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {urls.map((url: UrlProps) => (
                            <TableRow key={url.id}>
                                <TableCell>{url.id}</TableCell>
                                <TableCell>{url.shortId}</TableCell>
                                <TableCell>{url.originalUrl}</TableCell>
                                <TableCell>{url.metaOgTitle}</TableCell>
                                <TableCell>{url.metaOgDescription}</TableCell>
                                {url.metaOgImage && (
                                    <TableCell style={{ position: 'relative', width: '100px', height: '100px' }}><Image src={url.metaOgImage} alt="OG Image" objectFit="contain" fill /></TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Container>
    );
};

export default DashboardPage;