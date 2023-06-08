import AppRouter from "./components/AppRouter";
import NavBar from "./components/ui/NavBar";

import "./App.css";

function App() {
    return (
        <div className="App">
            <NavBar
                bg={"dark"}
                variant={"dark"}
            />
            <AppRouter />
        </div>
    );
}

export default App;
