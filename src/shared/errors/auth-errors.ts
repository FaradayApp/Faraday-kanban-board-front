export class AuthError extends Error {}
export class WrongCredentialsError extends AuthError {}
export class RefreshTokenError extends AuthError {}
export class AccessDeniedError extends AuthError {}
