import { DisplayReadings } from "../components/displayReadings";
import { LogOut } from "../components/logout";

export function ReadingsPage(props){

    return (
        <>
            <div>
                <h1>Here are the readings the greenhouse monitor</h1>
                <h1>
                    Welcome, {props.user.username}
                </h1>
                <LogOut reload={props.reload} />
            </div>
            <div>
                <DisplayReadings />
            </div>
        </>
    );
}