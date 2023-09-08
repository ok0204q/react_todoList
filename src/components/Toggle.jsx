import { useState } from "react";
const { VITE_APP_SITE } = import.meta.env;
import axios from "axios";
const Toggle = ({ id, token, getTodo }) => {
  const [value, setValue] = useState("");

  const handleUpdate = async () => {
    await axios.put(
      `${VITE_APP_SITE}/todos/${id}`,
      { content: value },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    getTodo();
  };
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-25 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <button
        onClick={handleUpdate}
        className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-25 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        更新
      </button>
    </>
  );
};

export default Toggle;
