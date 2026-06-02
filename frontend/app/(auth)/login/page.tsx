import "@/app/auth_init/auth.css";
import GlassContainer from "@/app/components/GlassContainer";
import { AuthInput } from "@/app/(auth)/login/components/AuthInput";

export default function LoginPage()
{
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="runekeeper-logo-container">
        <h1 className="runekeeper-title">Runekeeper</h1>
      </div>

      <GlassContainer className="w-fit h-fit p-5">
        <AuthInput inputLabel="Email" type="email"></AuthInput>
        <AuthInput inputLabel="Password" type="password"></AuthInput>
      </GlassContainer>
    </div>
  );
}