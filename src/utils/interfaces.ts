// Define types for resolver arguments
export interface SignupArgs {
  username: string;
  email: string;
  password: string;
}

export interface LoginArgs {
  email: string;
  password: string;
}

// Define types for resolver return values
export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
}
