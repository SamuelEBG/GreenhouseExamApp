import { useNavigate } from "react-router-dom";

export function ErrorMessage(props) {
  const navigate = useNavigate();
  return (
    <center>
      <div
        className={"error"}
        style={{ border: "1px solid red", background: "White" }}
      >
        An error occurred: {props.error.toString()}
        <div>
          <button className={"button"} onClick={(e) => navigate("/")}>
            Back to frontpage
          </button>{" "}
          <button className={"button"} onClick={(e) => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </center>
  );
}
