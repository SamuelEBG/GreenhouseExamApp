import { DisplayReadings } from "../components/displayReadings";

export function ReadingsPage(props){

    return (
        <>
            <div>
                <h1>Here are the readings from the elevators</h1>
            </div>
            <div>
                <DisplayReadings />
            </div>
        </>
    );
}