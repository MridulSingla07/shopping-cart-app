import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";

const NavButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="text-3xl absolute top-1 right-12 flex gap-16 text-center text-blue-800">
      <button onClick={() => navigate("/products")}>
        <FontAwesomeIcon className="hover:scale-110 p-1" icon={faBagShopping} />
      </button>
      <button onClick={() => navigate("/shopping-cart")}>
        <FontAwesomeIcon
          className="hover:scale-110 p-1 mt-2"
          icon={faCartShopping}
        />
      </button>
    </div>
  );
};

export default NavButtons;
