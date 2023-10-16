"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React, { useState } from 'react';

export default async function Application() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  // const { data: countries } = await supabase.from("countries").select();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    certificate: '',
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          certificate: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name.trim() === '' || formData.address.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    console.log('Form submitted:', formData);
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
            accept=".pdf, .doc, .docx"
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


