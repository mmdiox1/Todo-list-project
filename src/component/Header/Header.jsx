import { Link } from "react-router-dom";
import Container from "../Container/Container.jsx";

function Header() {
  return (
    <div className="h-16 border-b shadow flex items-center ">
      <Container>
        <div className="flex justify-between flex-row-reverse">
          <ul className="flex flex-row-reverse">
            <li className="ml-2">
              <Link to={"/"}>خانه</Link>
            </li>
            <li className="ml-2">
              <Link to={"/store"}>فروشگاه</Link>
            </li>
          </ul>

          <div>سبد خرید</div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
