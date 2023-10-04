import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data: movies } = await supabase.from("movies").select();

  return (
    <ul className="my-auto text-foreground">
      {movies?.map((movie) => (
        <li key={movie.id}>{movie.name}</li>
      ))}
    </ul>
  );
}