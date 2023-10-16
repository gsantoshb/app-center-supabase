import React from 'react';

interface TableProps {
  data: { id: number; name: string }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table className="w-full border-collapse border border-gray-600 text-white">
      <thead>
        <tr>
          <th className="border border-gray-600 p-2">ID</th>
          <th className="border border-gray-600 p-2">Name of Student</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="border border-gray-600 p-2">{item.id}</td>
            <td className="border border-gray-600 p-2">
              <a href="#" className="text-blue-300">
                {item.name}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
