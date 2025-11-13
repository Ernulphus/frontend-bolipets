import { auth0 } from "../lib/auth0";
import StrangerRedirect from '../lib/StrangerRedirect';

export default async function Home() {
  const session = await auth0.getSession()
  const res = await StrangerRedirect(session)
  if (res) return res;
  if (!session) return res;

  return (
    <main>
      <h1>Welcome, {session.user.name}!</h1>
    </main>
  );
}