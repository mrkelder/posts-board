export enum Common {
  ServerError = "Unexpected server error, please try again later",
  POST = "This route accepts POST method",
}

export enum SignUpErrors {
  Credentials = "Either login or password were not passed",
  UnconfirmedUser = "User is not confirmed",
  UserExists = "User already exists",
  InvalidPassowrd = "Password did not conform with policy: Password must have numeric characters",
}
