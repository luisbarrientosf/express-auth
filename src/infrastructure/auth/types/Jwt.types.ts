export interface JWTAccessToken {
  userId: string;
  email: string;
  jti: string;
  type: 'access_token';
  iat: number;
  exp: number;
}

export interface JWTRefreshToken {
  userId: string;
  jti: string;
  type: 'refresh_token';
  iat: number;
  exp: number;
}

export type JWTPayload = Omit<JWTAccessToken, 'iat' | 'exp' | 'jti' | 'type'>;
export type JWTRefreshPayload = Omit<JWTRefreshToken, 'iat' | 'exp' | 'jti' | 'type'>;