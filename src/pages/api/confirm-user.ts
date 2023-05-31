import { env } from "@/lib/env";
import { Common } from "@/lib/errors";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, code } = req.body;
    const client = new CognitoIdentityProvider({
      region: "us-east-1",
      credentials: {
        accessKeyId: env.aws_access_key,
        secretAccessKey: env.aws_secret_key,
      },
    });

    await client.confirmSignUp({
      Username: email,
      ConfirmationCode: code,
      ClientId: env.congito_client_id,
    });
    res.json({ message: "Account is confirmed" });
  } catch {
    res.status(500).json({ message: Common.ServerError });
  }
}
