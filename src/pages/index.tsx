import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
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

      <AppBar position="static">
        <Box p={2} sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            {TITLE}
          </Typography>
        </Box>
      </AppBar>

      <main>
        <Stack alignItems="center" py={2} spacing={2}>
          {new Array(10).fill(null).map((_, index) => (
            <Card
              key={`post_${index}`}
              sx={{ minWidth: 320, maxWidth: 380, width: '100%' }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography variant="h6" component="strong" fontWeight="bold">
                  Card name
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  sequi corrupti accusamus ipsa voluptate enim quia illum
                  tempore eum impedit.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </main>
    </>
  );
}
