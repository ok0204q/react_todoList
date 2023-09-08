import { useState } from "react";

function Checkout({ checkout, message }) {
  const [token, setToken] = useState("");

  const doCheck = () => {
    checkout(token);
  };

  return (
    <div>
      <div className="text-3xl font-bold">驗證</div>
      <div className="flex mt-4">
        <input
          className="block w-50 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          name="token"
          value={token}
          placeholder="token"
          onChange={(e) => setToken(e.target.value)}
        />
        <div>
          <button
            onClick={doCheck}
            className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            驗證
          </button>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Checkout;
