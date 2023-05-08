import { Link } from "react-router-dom";
export function NotLoggedInUsers() {
  return (
       <div className="container">
        <Link className={"button"} to={"/login"}>
          Login
        </Link>
      </div>
  );
}
