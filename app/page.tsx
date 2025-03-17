'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, TextField, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/Theme/Theme';

interface Item {
  shortId: string;
  originalUrl: string;
  metaOgTitle: string;
  metaOgDescription: string;
  metaOgImage: string;
  ip: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [item, setitem] = useState<Item | null>(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('loading');
    try {
      const res = await fetch(`/api/shorten/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error(`Failed to shorten URL: ${res.statusText}`);
      }

      const data = await res.json();
      setitem({ ...data });
      setStatus('success');
    } catch (err) {
      console.log(err);
      setError(err.message);
      setStatus('error');
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            <strong>GENISIS</strong> - URL Shortener
          </Typography>
          <form className="url-shortener-form" onSubmit={handleSubmit}>
            <TextField
              label="Enter URL"
              variant="outlined"
              fullWidth
              margin="normal"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Shorten
            </Button>
          </form>
          {status === "loading" && (
            <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
              Shortening...
            </Typography>
          )}
          {(status === "success" && item) && (
            <>
              <Card
                sx={{
                  marginTop: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={item.metaOgImage}
                  alt={item.metaOgTitle}
                />
                <CardContent>
                  <CardHeader
                    title={item.metaOgTitle}
                    subheader={<div dangerouslySetInnerHTML={{ __html: item.metaOgDescription }} />}
                  />
                  <CardActions>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      Short URL: <Link href={`https://${item.ip}:3000/${item.shortId}`}>{`https://${item.ip}:3000/${item.shortId}`}</Link>
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => navigator.clipboard.writeText(`https://${item.ip}:3000/${item.shortId}`)} style={{ marginLeft: '16px' }}>Copy Link</Button>
                  </CardActions>
                </CardContent>
              </Card>
            </>
          )}
          {status === "error" && (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              Error: {error}
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
