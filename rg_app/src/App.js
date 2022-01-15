import "./App.css";
import Header from "./Components/Header";
import CardChoice from "./Components/CardChoice";
import Ou from "./Components/Ou";


function App() {
  return (
    <div className="App">
        <Header name="Phillipe" className="headerClass"></Header>
        <div className="CardChoice-wrapper">
            <CardChoice isBot="true" className="CardChoiceClass"></CardChoice>
            <Ou className="Ouclass"></Ou>
            <CardChoice className="CardChoiceClass"></CardChoice>
        </div>
    </div>
  );
}

export default App;
