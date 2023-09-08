import { useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

function Signup({ signUp, message }) {
  const [isDisabled, setDisabled] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    password2: "",
    nickname: "",
  });
  const onSign = () => {
    setDisabled(true);
    if (form.password !== form.password2) {
      Swal.fire({
        icon: "error",
        title: `確認密碼不符合！`,
        text: "請重新輸入確認密碼",
        showConfirmButton: false,
      });
    } else {
      signUp(form);
    }
    setDisabled(false);
  };

  return (
    <div className="flex-1 flex items-center container mx-auto">
      <div className="w-1/2 h-4/5 flex justify-center items-center ">
        <img src="public/LoginIcon.png" alt="Todologo" className="w-3/5" />
      </div>
      <div className="w-1/4">
        <form className="flex flex-col justify-center">
          <div className="text-3xl font-bold mb-6">註冊帳號</div>
          <label htmlFor="email" className="font-bold text-sm mb-1">
            Email
          </label>
          <input
            className="outline-none py-3 pl-4 mb-4 w-full text-xs border-none text-gray-900 border border-gray-300 rounded-xl bg-gray-50 "
            id="email"
            type="email"
            name="email"
            value={form.email}
            placeholder="請輸入 email"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />

          <label htmlFor="nickname" className="font-bold text-sm mb-1">
            您的暱稱
          </label>
          <input
            className="outline-none py-3 pl-4 mb-4 w-full text-xs border-none text-gray-900 border border-gray-300 rounded-xl bg-gray-50 "
            type="text"
            id="nickname"
            name="nickname"
            value={form.nickname}
            placeholder="請輸入您的暱稱"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />

          <label htmlFor="password" className="font-bold text-sm mb-1">
            密碼
          </label>
          <input
            className="outline-none py-3 pl-4 mb-4 w-full text-xs border-none text-gray-900 border border-gray-300 rounded-xl bg-gray-50 "
            id="password"
            type="password"
            name="password"
            value={form.password}
            placeholder="•••••••••"
            autoComplete="on"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />

          <label htmlFor="password2" className="font-bold text-sm mb-1">
            再次輸入密碼
          </label>
          <input
            className="outline-none py-3 pl-4 mb-4 w-full text-xs border-none text-gray-900 border border-gray-300 rounded-xl bg-gray-50 "
            id="password2"
            type="password"
            name="password2"
            value={form.password2}
            placeholder="•••••••••"
            autoComplete="on"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />

          <button
            type="button"
            onClick={onSign}
            className=" text-white bg-[#333333] hover:bg-[#252525]   font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center "
            disabled={isDisabled}
          >
            註冊
          </button>
          <NavLink
            className="mt-4 text-white   font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center hover:text-[#d87355]"
            to="/"
          >
            登入
          </NavLink>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Signup;
