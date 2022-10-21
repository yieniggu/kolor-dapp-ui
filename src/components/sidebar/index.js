import { useNavigate } from "react-router-dom";
import SideBarItem from "../items/sidebaritem";
import { menuList } from "./menu";
import LogoIcon from "../../assets/logo/logo_icon.png";
import Logo from "../../assets/logo/logo.png";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex flex-col min-w-96 max-w-80 bg-sidebar gap-4 px-6 xl:px-8 text-white">
      <div
        className={`justify-center items-center gap-4 flex cursor-pointer`}
        onClick={() => navigate("/")}
      >
        <img
          src={LogoIcon}
          alt="logo-icon"
          className="py-16 md:py-14 xl:py-12 w-12 md:w-16 xl:w-20"
        />
        <img src={Logo} alt="logo" className="w-16 md:w-20 xl:w-24" />
      </div>
      {menuList.map((menu, idx) => (
        <SideBarItem
          key={idx}
          title={menu.title}
          icon={menu.icon}
          link={menu.link}
        />
      ))}
    </div>
  );
};

export default SideBar;
