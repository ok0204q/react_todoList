import { useState, useEffect, useRef, useCallback } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
const { VITE_APP_SITE } = import.meta.env;
import axios from "axios";
// import Toggle from "./Toggle";

const Todo = ({ checkOut }) => {
  const [todos, setTodos] = useState([]);
  const [finishState, setFinishState] = useState("all");
  const input = useRef();

  const cookieToken = document.cookie
    .split("; ")
    .find((row) => {
      return row.startsWith("hexschoolTodo");
    })
    ?.split("=")[1];

  useEffect(() => {
    checkOut(cookieToken);
    getTodo();
  }, []);

  const List_todo = () => {
    let filterTodo = [];
    switch (finishState) {
      case "unfinish": {
        filterTodo = todos.filter((todo) => !todo.status);
        break;
      }
      case "finish": {
        filterTodo = todos.filter((todo) => todo.status);
        break;
      }
      default: {
        filterTodo = [...todos];
        break;
      }
    }
    const newTodo = filterTodo.map((item) => {
      return (
        <li className="flex items-center mb-[17px]" key={item.id}>
          <label className="w-full flex pb-[15px] text-[#333333] leading-[20.27px] border-b border-solid border-[#e5e5e5]">
            <input
              checked={item.status}
              type="checkbox"
              onChange={() => toggleStatus(item.id)}
              className="w-[20px] h-[20px] border border-solid border-[#959A91] rounded-[5px] mr-[16px] peer"
            />
            <span className="peer-checked:text-[#9F9A91] peer-checked:line-through peer-checked:transition-all peer-checked:duration-500 peer-checked:ease-in-out">
              {item.content}
            </span>
          </label>
          <a
            href="#"
            className="ml-[17px] block text-[14px] text-[#333333] opacity-0 hover:opacity-100"
            onClick={(e) => {
              delTodo(e, item.id);
            }}
          >
            <FaTimes />
          </a>
        </li>
      );
    });

    return newTodo.length > 0 ? (
      newTodo
    ) : (
      <div className="flex justify-center">
        <p>
          {finishState === "all"
            ? "目前尚無代辦事項"
            : finishState === "unfinish"
            ? "目前尚未有未完成代辦事項"
            : "目前尚未完成代辦事項"}
        </p>
      </div>
    );
  };

  const getTodo = async () => {
    const res = await axios.get(`${VITE_APP_SITE}/todos`, {
      headers: { Authorization: cookieToken },
    });
    setTodos(res.data.data);
  };

  const addTodo = async () => {
    await axios.post(
      `${VITE_APP_SITE}/todos`,
      { content: input.current.value },
      {
        headers: {
          Authorization: cookieToken,
        },
      }
    );
    input.current.value = "";
    getTodo();
  };

  const delTodo = (e, id) => {
    e.preventDefault();
    axios
      .delete(`${VITE_APP_SITE}/todos/${id}`, {
        headers: { Authorization: cookieToken },
      })
      .then((res) => {
        console.log(res);
        getTodo();
      })
      .catch((err) => console.log(err.response.data.message));
  };

  const toggleStatus = async (id) => {
    console.log(id);
    try {
      await axios.patch(
        `${VITE_APP_SITE}/todos/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: cookieToken,
          },
        }
      );
      getTodo();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const clearTodo = (e) => {
    e.preventDefault();
    const delDatas = todos.filter((todo) => todo.status);
    let promises = [];
    delDatas.forEach((data) => {
      const promise = axios.delete(`${VITE_APP_SITE}/todos/${data.id}`, {
        headers: { Authorization: cookieToken },
      });
      promises.push(promise);
    });

    Promise.all(promises)
      .then(() => {
        getTodo();
      })
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-1/3 flex flex-col h-full justify-start items-center">
        <div className="w-full relative mb-4 drop-shadow-lg">
          <input
            type="text"
            className="w-full py-3 pl-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-lg mt-14 "
            placeholder="新增代辦事項"
            ref={input}
          />
          <div
            onClick={addTodo}
            className="bg-[#333333] rounded-[10px] p-[10px] absolute right-2 top-16 cursor-pointer "
          >
            <FaPlus className="text-xl text-white" />
          </div>
        </div>
        <div className="w-full bg-[#fff] rounded-[10px] shadow-xl">
          <ul className="flex justify-evenly bg-[#fff] rounded-md w-full m-0 p-0">
            <li className="w-full m-0 p-0 ">
              <a
                id="all"
                href="#"
                className={`block text-[#9f9a91] leading-5 p-[16px] text-center border-b-2 border-solid border-[#efefef] font-bold ${
                  finishState === "all" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setFinishState(e.target.id);
                }}
              >
                全部
              </a>
            </li>
            <li className="w-full">
              <a
                id="unfinish"
                href="#"
                className={`block text-[#9f9a91] leading-5 p-[16px] text-center border-b-2 border-solid border-[#efefef] font-bold ${
                  finishState === "unfinish" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setFinishState(e.target.id);
                }}
              >
                待完成
              </a>
            </li>
            <li className="w-full ">
              <a
                id="finish"
                href="#"
                className={`block text-[#9f9a91] leading-5 p-[16px] text-center border-b-2 border-solid border-[#efefef] font-bold ${
                  finishState === "finish" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setFinishState(e.target.id);
                }}
              >
                已完成
              </a>
            </li>
          </ul>
          <div className="pt-[23px] pl-[24px] pr-[17px] pb-[32px]">
            <ul className="mb-[8px]">
              <List_todo />
            </ul>
            <div className="flex justify-between">
              <p className="text-[#333333] text-sm">
                {" "}
                {todos.filter((todo) => todo.status).length}個已完成項目
              </p>
              <a
                href="#"
                className="text-[#9F9A91] text-sm no-underline"
                onClick={(e) => {
                  clearTodo(e);
                }}
              >
                清除已完成項目
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
