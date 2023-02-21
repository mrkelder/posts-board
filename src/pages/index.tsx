import { AppBar, Box, Typography } from '@mui/material';
import Head from 'next/head';

const TITLE = 'Global Wall';

export default function Home() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content="Wall of posts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <AppBar position="static">
          <Box p={2} sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              {TITLE}
            </Typography>
          </Box>
        </AppBar>
      </header>

      <main></main>
    </>
  );
}
