import { Button, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Head from "next/head";
import Link from "next/link";

const TITLE = "Signup";

export default function Signup() {
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
            <TextField label="Password" />
            <Button variant="contained">Sign Up</Button>
            <Link href="/login">Already have an account?</Link>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
