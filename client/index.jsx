import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Frontpage } from "./pages/frontPage";
import { ReadingsPage } from "./pages/readingsPage";
import { Login } from "./pages/login";

function Application() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Frontpage />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/readings"} element={<ReadingsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById("app")).render(<Application />);