export interface User {
  user: {
    createdAt: number;
    email: string;
    issuer: string;
    maxAge: number;
    oauthProvider?: string;
    phoneNumber?: number;
    publicAddress: string;
  };
}
