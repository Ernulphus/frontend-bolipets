import { SessionData } from "@auth0/nextjs-auth0/types";
import { auth0 } from "./auth0";

export default async function StrangerRedirect(session: SessionData | null) {  
  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">Sign up</a>
        <a href="/auth/login">Log in</a>
      </main>
    );
  }
}