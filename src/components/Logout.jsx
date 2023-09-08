function Logout({ logout }) {
  return (
    <div>
      <div className="text-3xl font-bold">登出</div>
      <div className="flex mt-4">
        <div>
          <button
            onClick={logout}
            className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            登出
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
