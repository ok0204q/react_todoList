import { useState } from "react";
import { NavLink } from "react-router-dom";

function Login({ signIn }) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const doSign = () => {
    signIn(loginForm);
  };

  return (
    <div className="flex-1 flex items-center container mx-auto">
      <div className="w-1/2 h-4/5 flex justify-center items-center ">
        <img src="public/LoginIcon.png" alt="Todologo" className="w-3/5" />
      </div>
      <div className="w-1/4">
        <form className=" flex flex-col justify-center ">
          <div className="text-3xl font-bold mb-6">最實用的線上代辦事項</div>
          <label htmlFor="email" className="font-bold text-sm mb-1">
            Email
          </label>
          <input
            id="email"
            className="outline-none py-3 pl-4 w-full mb-4 text-xs border-none text-gray-900 border border-gray-300 rounded-xl bg-gray-50 "
            type="email"
            name="email"
            value={loginForm.email}
            placeholder="請輸入 email"
            onChange={(e) =>
              setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
            }
          />
          <label htmlFor="password" className="font-bold text-sm mb-1">
            密碼
          </label>
          <input
            className="outline-none py-3 pl-4 w-full mb-4 text-xs border-none text-gray-900 border border-gray-300 rounded-xl bg-gray-50 "
            id="password"
            type="password"
            name="password"
            value={loginForm.password}
            placeholder="•••••••••"
            autoComplete="on"
            onChange={(e) =>
              setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
            }
          />
          <button
            type="button"
            onClick={doSign}
            className=" text-white bg-[#333333] hover:bg-[#252525]  font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center "
          >
            登入
          </button>
          <NavLink
            className="mt-4 text-white font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center hover:text-[#d87355] "
            to="/signUp"
          >
            註冊帳號
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default Login;
