<<<<<<< HEAD
import { getSession } from "@/lib/supabase/supabaseServer";

export default async function Home() {
  const session = await getSession();
=======
import { cookies } from "next/headers";

import { Database } from "@/types/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";


export default async function Home() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();
>>>>>>> d4a4b9e6e4907aa21c1ac3408ccf82f29ae72f15

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">2Main Home {session ? <div>LOGGED IN</div>: <div>LOGGED OUT</div> }</h1>
    </div>
  );
}