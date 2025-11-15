import React from "react";

export default async function LoginSignup() {  
  return (
    <main>
      <a href="/auth/login?screen_hint=signup">Sign up</a>
      <a href="/auth/login">Log in</a>
    </main>
  );
}