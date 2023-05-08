import { Link } from "react-router-dom";
import { useLoader } from "../lib/useLoader";
import { fetchJSON } from "../lib/http";
import { ErrorMessage } from "./errorPage";
import { NotLoggedInUsers } from "./notLoggedIn";
import { EmployeeDashboard } from "./employeePage";
import { AdminDashboard } from "./adminPage";

export function Frontpage(){    
    const { loading, error, data, reload } = useLoader(
        async () => await fetchJSON("/api/login")
    );

    const user = data;

    if (loading) {
        return <div className="container">Loading...</div>;
    }

    if (error) {
        //return <div>Error: {error.toString()}</div>;
        return <ErrorMessage error={error} />;
    }

    return (
        <div>
          {user ? ( user.role == "employee" ? (
                <EmployeeDashboard user={user} reload={reload} />
            ) : (
            <AdminDashboard user={user} reload={reload}/>
            ) 
            ) : (
                <NotLoggedInUsers/>
            )}
        </div>
    );
}