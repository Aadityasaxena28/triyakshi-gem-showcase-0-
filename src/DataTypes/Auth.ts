export interface SignupData {
  username: string;                // Required
  phonenumber: string;             // Required 
  email: string;                   // Required
  password: string;                // Required
}

export interface LoginData{
  phonenumber: string;
  email?: string //optional
  password: string
}