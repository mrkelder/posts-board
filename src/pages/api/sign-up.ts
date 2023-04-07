import { env } from "@/lib/env";
import { Common, SignUpErrors } from "@/lib/errors";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData {
  message: string;
}

interface GetErrorArguments {
  error: Error;
  client: CognitoIdentityProvider;
  email: string;
}

interface GetErrorReturnType {
  status: number;
  message: string;
}

async function isUserConfirmed(
  client: CognitoIdentityProvider,
  email: string
): Promise<boolean> {
  const { UserAttributes } = await client.adminGetUser({
    Username: email,
    UserPoolId: env.cognito_user_pool_id,
  });

  const emailVerificationStatus = UserAttributes?.find(
    (i) => i.Name === "email_verified"
  );

  return JSON.parse(emailVerificationStatus?.Value ?? "false");
}

async function getUserError(client: CognitoIdentityProvider, email: string) {
  if (await isUserConfirmed(client, email))
    return { message: SignUpErrors.UserExists, status: 400 };
  else return { message: SignUpErrors.UnconfirmedUser, status: 401 };
}

async function getError({
  email,
  client,
  error,
}: GetErrorArguments): Promise<GetErrorReturnType> {
  try {
    console.log(error.message);
    if (error.message === SignUpErrors.InvalidPassowrd)
      return { message: SignUpErrors.InvalidPassowrd, status: 403 };
    else if (error.message === SignUpErrors.UserExists)
      return getUserError(client, email);
    else throw new Error(Common.ServerError);
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: Common.ServerError,
    };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { email, password } = req.body;
  const client = new CognitoIdentityProvider({
    region: "us-east-1",
    credentials: {
      accessKeyId: env.aws_access_key,
      secretAccessKey: env.aws_secret_key,
    },
  });

  try {
    if (req.method?.toLocaleLowerCase() !== "post") {
      res.status(405).json({ message: Common.POST });
      return;
    }

    if (
      email &&
      password &&
      typeof email === "string" &&
      typeof password === "string"
    ) {
      await client.signUp({
        Username: email,
        Password: password,
        ClientId: env.congito_client_id,
        UserAttributes: [
          {
            Name: "email",
            Value: email,
          },
        ],
      });

      res.send({ message: "Account created successfully" });
    } else res.status(403).json({ message: SignUpErrors.Credentials });
  } catch (error) {
    const validError = error as Error;
    const { status, message } = await getError({
      client,
      email,
      error: validError,
    });
    res.status(status).json({ message });
  }
}
