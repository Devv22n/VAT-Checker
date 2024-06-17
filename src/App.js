import "./App.css";
import { VATChecker } from "./VATChecker";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas); // Add FontAwesome icons to the library

function App() {
  return (
    <div className="app">
      <div className="app-content">
        <VATChecker />
      </div>
    </div>
  );
}

export default App;
