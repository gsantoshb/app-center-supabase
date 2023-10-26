"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormData from "@/lib/models";
import Link from "next/link";

export default function Confirmation({ params }: { params: { applicationId: string } }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [data, setData] = useState<Database["public"]["Tables"]["applications"]["Row"]>();

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const { data: applicationData, error } = await supabase
          .from('applications')
          .select('*')
          .eq('application_id', params.applicationId)
          .single();

        if (error) {
          throw error;
        }

        setData(applicationData);
      } catch (error) {
        console.error('Error fetching application data:', error);
      }
    };

    if (params.applicationId) {
      fetchApplicationData();
    }
  }, [params.applicationId]);

  // const name = "John Doe";
  // const address = "123 Main St, Cityville";
  // const certificate = "Certificate File";
   const isCertificateValid = data?.certificate_uuid?true:false; // Set to true or false as needed

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold mb-4">Confirmation</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Name</label>
        <div className="border p-2 bg-gray-700">{data?.name}</div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Address</label>
        <div className="border p-2 bg-gray-700">{data?.address}</div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Certificate</label>
        <div className="border p-2 bg-gray-700">{data?.certificate_uuid}</div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Certificate Validity</label>
        <div className={`border p-2 ${isCertificateValid ? 'bg-green-500' : 'bg-red-500'}`}>
          {isCertificateValid ? 'Valid' : 'Invalid'}
        </div>
      </div>
      <Link href="/landing">
        <div className="flex justify-center">
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Go to Applications
          </div>
        </div>
      </Link>
    </div>
  );
}
