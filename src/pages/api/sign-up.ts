import { env } from "@/lib/env";
import {
  CognitoIdentityProvider,
  AdminCreateUserCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  data?: AdminCreateUserCommandOutput;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { login, password } = req.body;

    if (req.method?.toLocaleLowerCase() !== "post") {
      res.status(405).json({ message: "This route accepts POST method" });
      return;
    }

    if (
      login &&
      password &&
      typeof login === "string" &&
      typeof password === "string"
    ) {
      const client = new CognitoIdentityProvider({
        region: "us-east-1",
        credentials: {
          accessKeyId: env.aws_access_key,
          secretAccessKey: env.aws_secret_key,
        },
      });

      const result = await client.adminCreateUser({
        Username: login,
        TemporaryPassword: password,
        UserPoolId: env.cognito_user_pool_id,
      });

      res.status(200).json({ message: "Ok", data: result });
    } else
      res
        .status(403)
        .json({ message: "Either login or password were not passed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: (err as Error).message });
  }
}
