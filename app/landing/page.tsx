"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CardSection from "@/components/CardSection";
import Table from "@/components/Table";
import Link from "next/link";

export default function Landing() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  // const { data: countries } = await supabase.from("countries").select();  

  const [appData, setAppData] = useState<Database["public"]["Tables"]["applications"]["Row"][]|undefined>();

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const { data: applicationData, error } = await supabase
          .from('applications')
          .select('*');

        if (error) {
          throw error;
        }
        setAppData(applicationData);
      } catch (error) {
        console.error('Error fetching application data:', error);
      }
    };

      fetchApplicationData();
  
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white">
      <CardSection heading="My Applications">
        <Table data={appData} />
      </CardSection>
      <CardSection>
      <Link href="/application">
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Apply for Exam
          </button>
        </div>
        </Link>
      </CardSection>
    </div>
  );
}
