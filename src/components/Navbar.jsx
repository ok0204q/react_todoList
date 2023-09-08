import { useNavigate } from "react-router-dom";

const Navbar = ({ nickName, logout, token }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#25A244] p-4">
      <div className="">
        <div className="flex justify-between items-center">
          <img src="/onlinetodolist.png" alt="Todologo" />
          {token && (
            <div className="flex space-x-8 mr-10">
              <div className="font-bold tracking-widest">{nickName}的代辦</div>
              <div
                className="cursor-pointer hover:text-[#d87355]"
                onClick={logout}
              >
                登出
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
