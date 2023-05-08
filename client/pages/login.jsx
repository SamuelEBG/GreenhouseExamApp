import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorView } from "../components/error";
import { Usercontext } from "../lib/userContext";

export function Login() {
    const navigate = useNavigate();
    /*
    const { handleSubmit, submitting, error } = useSubmit(async () => {
        await postJSON("/api/login", { username, password });
        navigate("/");
    });
     */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);
    const { loginUser } = useContext(Usercontext);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await loginUser({ username, password });
            navigate("/");
        } catch (e) {
            setError(e);
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <h1>Log in</h1>
                {error && <ErrorView error={error} />}
                <div>
                    Username:{" "}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    Password:{" "}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button>Log in</button>
                </div>
            </form>
        </div>
    );
}