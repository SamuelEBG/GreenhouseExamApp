import { Link } from "react-router-dom";
export function NotLoggedInUsers() {
  return (
      <div>
        <Link className={"button"} to={"/login"}>
          Login
        </Link>
      </div>
  );
}
