import { LoginData, SignupData } from "@/DataTypes/Auth";
import { api } from "./Api";

export async function Signup(params: SignupData) {
  try {
    const response = await api.post("/api/users/signup", params);

    // Handle backend response
    if (response.data && response.data.success) {
      // console.log("Signup successful:", response.data);
      return response.data; // Return the API response for further handling
    }
    else {
      throw new Error(response.data?.message || "Signup failed");
    }
  } catch (error: any) {
    console.error("Signup API error:", error);
    throw new Error(error|| "Signup failed");
  }
};

export async function Login(params: LoginData){
  try{
    const response = await api.post("/api/users/signin", params);
    if (response.data && response.data.success) {
      // console.log("Signup successful:", response.data);
      return response.data; // Return the API response for further handling
    }
    else {
      throw new Error(response.data?.message || "Login failed");
    }
  }
  catch(error:any){
    throw new Error(error|| "Login failed");

  }
}
