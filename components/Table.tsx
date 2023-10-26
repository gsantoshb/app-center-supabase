import React from 'react';
import { Database } from "@/types";
import Link from "next/link";

interface TableProps{
  data:Database["public"]["Tables"]["applications"]["Row"][]|undefined;
}

const Table: React.FC<TableProps> = ({data}) => {
  return (
    <table className="w-full border-collapse border border-gray-600 text-white">
      <thead>
        <tr>
          <th className="border border-gray-600 p-2">ID</th>
          <th className="border border-gray-600 p-2">Name of Student</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((item:any) => (
          <tr key={item.application_id}>
            <td className="border border-gray-600 p-2">{item.application_id}</td>
              <td className="border border-gray-600 p-2 text-blue-500">
              <Link href={`/confirmation/${item.application_id}`}>
              {item.name}           
              </Link>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
