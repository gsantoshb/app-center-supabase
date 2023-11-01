"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FormData from "@/lib/models";

export default function Application() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    certificate: null,
  });

  useEffect(() => {

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        certificate: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

      // Validate name and address
  if (formData.name.trim() === '' || formData.address.trim() === '') {
    alert('Please fill out both Name and Address fields.');
    return;
  }


    const {
      data: { user },
    } = await supabase.auth.getUser();
  

    try {

      const certificateUuid = uuidv4();

      // Upload certificate to Supabase Storage
      const { data: certificateData, error: certificateError } = await supabase.storage
        .from('certificates')
        .upload('public/certificates/' + certificateUuid, formData.certificate);

      if (certificateError) {
        console.log("Certificate error thrown..."+JSON.stringify(certificateError));
        throw certificateError;
      }

      // Insert application record into the applications table
      const { data, error } = await supabase
        .from('applications')
        .insert([
          { name: formData.name, 
            address: formData.address, 
            certificate_uuid: certificateUuid,
            created_user_id: user?.id },
        ]).select('*');

      if (error) {
        throw error;
      }
      if(data){
        alert('Application submitted successfully!');
        console.log("Id from db:"+JSON.stringify(data[0].application_id));
        router.push(`/confirmation/${data[0].application_id}`); // Redirect to home page
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again later.');
    }
  };


  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold mb-4">Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border bg-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-bold mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 rounded border bg-gray-700 focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="certificate" className="block text-sm font-bold mb-2">
            Upload your certificate
          </label>
          <input
            type="file"
            id="certificate"
            name="certificate"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full px-3 py-2 rounded border bg-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};


