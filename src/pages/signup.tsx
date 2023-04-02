import { signUp } from "@/lib/queries/signUp";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

const TITLE = "Signup";

export default function Signup() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [responseError, setResponseError] = useState<null | string>(null);
  const router = useRouter();

  const inputChangeHandler =
    (setter: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setResponseError(null);
      setter(event.target.value);
    };

  const submitSignUp = async () => {
    const { ok, message } = await signUp({ login, password });

    if (ok) router.push("/login");
    else setResponseError(message);
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>

      <Stack justifyContent="center" alignItems="center" height="100vh">
        <Paper sx={{ p: 2, m: 2 }} elevation={4}>
          <Stack gap={2}>
            <Typography variant="h5" component="h1">
              {TITLE}
            </Typography>
            <TextField
              onChange={inputChangeHandler(setLogin)}
              value={login}
              label="Username"
              name="login"
            />
            <TextField
              onChange={inputChangeHandler(setPassword)}
              value={password}
              label="Password"
              type="password"
              name="password"
            />
            <Button variant="contained" onClick={submitSignUp}>
              Sign Up
            </Button>
            <Typography color="red" display={responseError ? "inline" : "none"}>
              {responseError}
            </Typography>
            <Link href="/login">Already have an account?</Link>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
