import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="pageNotFoundPage">
      <div className="InnerpageNotFoundPage">
        <TbError404 className="iconDiv" />
        <h2 className="pageNotFoundText">PAGE NOT FOUND</h2>
        <Link to={"/"} className="">
          Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
