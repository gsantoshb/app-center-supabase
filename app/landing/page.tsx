"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CardSection from "@/components/CardSection";
import Table from "@/components/Table";
import Link from "next/link";

interface MockData {
    id: number;
    name: string;
  }

export default async function Landing() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  // const { data: countries } = await supabase.from("countries").select();

  
  const mockData: MockData[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    // Add more mock data as needed
  ];

  useEffect(() => {
    // const { data: authListener } = supabase.auth.onAuthStateChange(
    //   (event: AuthChangeEvent) => {
    //     if (event === "SIGNED_IN") {
    //       router.push("/countries");
    //     }
    //   }
    // );
    // return () => authListener.subscription.unsubscribe();
  });

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white">
      <CardSection heading="My Applications">
        <Table data={mockData} />
      </CardSection>
      <CardSection>
      <Link href="/application">
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Apply for eamcet
          </button>
        </div>
        </Link>
      </CardSection>
    </div>
  );
}
