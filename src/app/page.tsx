'use client'

import { auth0 } from "../lib/auth0";
import LoginSignup from '../lib/LoginSignup';
import { SessionData } from "@auth0/nextjs-auth0/types";
import React, { useState } from "react";

export default function Home() {
  const [session, setSession] = useState<SessionData | undefined>()
  
  auth0.getSession()
    .then((sesh) => {
      if (sesh == null) {setSession(undefined)}
      else {setSession(sesh)};
    });
  if (!session) return (
    <LoginSignup />
  );

  return (
    <main>
      <h1>Welcome, {session.user.name}!</h1>
    </main>
  );
}