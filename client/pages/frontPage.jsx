import { Link } from "react-router-dom";
import { useLoader } from "../lib/useLoader";
import { fetchJSON } from "../lib/http";
import { ErrorMessage } from "./errorPage";
import { NotLoggedInUsers } from "./notLoggedIn";
import { ReadingsPage } from "./readingsPage";

export function Frontpage(){    
    const { loading, error, data, reload } = useLoader(
        async () => await fetchJSON("/api/login")
    );
    const user = data;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        //return <div>Error: {error.toString()}</div>;
        return <ErrorMessage error={error} />;
    }
    console.log(user);

    return (
        <div>
          {user ? (
                user.role == "employee" ? (
                <EmployeeDashboard user={user} reload={reload} />
            ) : (
            <ReadingsPage user={user} reload={reload}/>
            )
            ) : (
                <NotLoggedInUsers/>
            )}
        </div>
    );
}