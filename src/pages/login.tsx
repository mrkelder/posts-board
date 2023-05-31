import { Button, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Head from "next/head";
import Link from "next/link";

const TITLE = "Login";

export default function Login() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>

      <Stack justifyContent="center" alignItems="center" height="100vh">
        <Paper sx={{ p: 2 }} elevation={4}>
          <Stack gap={2}>
            <Typography variant="h5" component="h1">
              {TITLE}
            </Typography>
            <TextField label="Username" />
            <TextField type="password" label="Password" />
            <Button variant="contained">Login</Button>
            <Link href="/signup">{"Don't have an account yet?"}</Link>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
