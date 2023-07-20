import { getSession } from "@/lib/supabase/supabaseServer";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">2Main Home {session ? <div>LOGGED IN</div>: <div>LOGGED OUT</div> }</h1>
    </div>
  );
}