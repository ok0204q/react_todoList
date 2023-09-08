import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Todo from "./components/Todo";
import Navbar from "./components/Navbar";
import Swal from "sweetalert2";

const { VITE_APP_SITE } = import.meta.env;

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [nickname, setNickName] = useState("");

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => {
      return row.startsWith("hexschoolTodo");
    })
    ?.split("=")[1];

  useEffect(() => {
    if (cookieValue) {
      checkOut(cookieValue);
    }
  }, []);

  const signUp = (form) => {
    axios
      .post(`${VITE_APP_SITE}/users/sign_up`, form)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `註冊成功！`,
          text: "轉往登入頁面",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => navigate("/"));
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: `註冊失敗！`,
          text:
            typeof err.response.data.message === "object"
              ? err.response.data.message[0]
              : err.response.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  const login = async (form) => {
    try {
      const res = await axios.post(`${VITE_APP_SITE}/users/sign_in`, form);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      document.cookie = `hexschoolTodo=${
        res.data?.token
      }; expires=${tomorrow.toUTCString()}`;

      checkOut(res.data?.token);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: `登入失敗！`,
        text: e.response.data.message,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => navigate("/"));
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        `${VITE_APP_SITE}/users/sign_out`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.data.status) {
        document.cookie = `hexschoolTodo=;expires=${new Date()}`;
        setToken("");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkOut = async (token) => {
    try {
      const res = await axios.get(`${VITE_APP_SITE}/users/checkout`, {
        headers: { Authorization: token },
      });
      if (res.data.status) {
        setNickName(res.data.nickname);
        setToken(token);
        navigate("/todo");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  return (
    <div className="bg-[#25A244] h-screen w-full flex flex-col">
      <Navbar nickName={nickname} logout={logout} token={token} />
      <Routes>
        <Route path="/" element={<Login signIn={login} />}></Route>
        <Route path="/signUp" element={<Signup signUp={signUp} />}></Route>
        <Route path="/todo" element={<Todo checkOut={checkOut} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
