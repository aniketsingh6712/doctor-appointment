import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EditableTable = ({Userdata,UserUpdate}) => {
  const [data, setData] = useState(Userdata);

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEdit = (key, value) => {
    setEditField(key);
    setTempValue(value);
  };

  const handleChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleBlur = () => {
    if (editField) {
      setData({ ...data, [editField]: tempValue });
      const newData={...data,[editField]: tempValue};
      setEditField(null);
      console.log(newData);
      UserUpdate(newData);
    }
  };

  return (
     <>
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">User Details</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <tbody>
            {Object.entries(data).map(([key, value]) => {
              if (key !== "__v" && key !== "userId" && key !== "_id") {
                return (
                  <tr key={key} className="border-b border-gray-700 hover:bg-gray-700 transition">
                    <td className="p-3 text-gray-300 font-medium bg-gray-700">{key.replace(/_/g, ' ').toUpperCase()}</td>
                    <td
                      onClick={() => handleEdit(key, value)}
                      className="p-3 text-white bg-gray-600 cursor-pointer hover:bg-gray-500 transition"
                    >
                      {editField === key ? (
                        <input
                          type="text"
                          className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded-md focus:ring focus:ring-blue-400"
                          value={tempValue}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoFocus
                        />
                      ) : (
                        <span className="block truncate">{value}</span>
                      )}
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
      </>
    
  );
};

export default EditableTable;
