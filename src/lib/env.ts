type EnvFields =
  | "hostname"
  | "aws_access_key"
  | "aws_secret_key"
  | "cognito_user_pool_id"
  | "congito_client_id";

export const env: Record<EnvFields, string> = {
  hostname: process.env.NEXT_PUBLIC_HOSTNAME ?? "http://localhost:3000",
  aws_access_key: process.env.AWS_ACCESS_KEY ?? "invalid_credential",
  aws_secret_key: process.env.AWS_SECRET_KEY ?? "invalid_credential",
  cognito_user_pool_id: process.env.COGNITO_USER_POOL_ID ?? "invalid_user_pool",
  congito_client_id: process.env.COGNITO_CLIENT_ID ?? "invalid_client_id",
};
