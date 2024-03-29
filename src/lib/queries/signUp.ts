import { env } from "@/lib/env";

interface Arguments {
  email: string;
  password: string;
}

interface ReturnData {
  message: string;
  ok: boolean;
}

export const signUp = async ({
  email,
  password,
}: Arguments): Promise<ReturnData> => {
  try {
    const response = await fetch(`${env.hostname}/api/sign-up`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { ok } = response;

    const jsonData = await response.json();

    return { ...jsonData, ok };
  } catch {
    return { message: "Unexpected error, please try again", ok: false };
  }
};
