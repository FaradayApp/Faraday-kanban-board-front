export class AuthError extends Error {}
export class WrongCredentialsError extends AuthError {}
export class WrongResponseError extends AuthError {}
export class RefreshTokenError extends AuthError {}
