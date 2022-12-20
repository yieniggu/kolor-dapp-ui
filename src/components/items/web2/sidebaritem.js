import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBarItem = ({ icon, title, link }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { checking, uid, role } = useSelector((state) => state.auth);

  return (
    <>
      {title === "Dashboard" ? (
        !!uid && (
          <div
            className={`flex items-center cursor-pointer ${
              location.pathname === link && "bg-gradient"
            } py-3 px-4 rounded-2xl gap-4 hoverable-item`}
            onClick={() => navigate(link)}
          >
            <img src={icon} alt={title} className="w-6" />
            <div className="">{title}</div>
          </div>
        )
      ) : (
        <div
          className={`flex items-center cursor-pointer ${
            location.pathname === link && "bg-gradient"
          } py-3 px-4 rounded-2xl gap-4 hoverable-item`}
          onClick={() => navigate(link)}
        >
          <img src={icon} alt={title} className="w-6" />
          <div className="">{title}</div>
        </div>
      )}
    </>
  );
};

export default SideBarItem;
