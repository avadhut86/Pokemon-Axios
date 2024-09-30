import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokieName, setpokieName] = useState("");
  const [choose, setChoose] = useState(false);
  const [pokieInfo, setpokieInfo] = useState({
    Name: "",
    Image: "",
    Species: "",
    Hp: "",
    Attack: "",
    Defense: "",
    Speed: "",
    Type: "",
  });

  const searchPokie = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokieName}`)
      .then((response) => {
        setpokieInfo({
          Name: pokieName,
          Image: response.data.sprites.front_default,
          Species: response.data.species.name,
          Hp: response.data.stats[0].base_stat,
          Attack: response.data.stats[1].base_stat,
          Defense: response.data.stats[2].base_stat,
          Speed: response.data.stats[5].base_stat,
          Type: response.data.types[0].type.name,
        });
        setChoose(true);
      });
  };

  return (
    <>
      <div className="main">
        <div className="title">
          <h1>Pokemon Stats</h1>
          <input
            type="text"
            onChange={(e) => {
              setpokieName(e.target.value);
            }}
          />
          <button onClick={searchPokie}>Search Pokemon</button>
        </div>
        <div className="display">
          {!choose ? (
            <h1>Choose a Pokemon</h1>
          ) : (
            <>
              <div className="card">
              <h1>{pokieInfo.Name}</h1>
              <img src={`${pokieInfo.Image}`} alt="Pokemon" />
              <h4> Species: {pokieInfo.Species} </h4>
              <h4> Type: {pokieInfo.Type} </h4>

              <h4>Hp: {pokieInfo.Hp}</h4> 
              <progress value={pokieInfo.Hp} max="100"></progress>
             

              <h4>Attack: {pokieInfo.Attack}</h4>
              <progress value={pokieInfo.Attack} max="100"></progress>

              <h4>Defense: {pokieInfo.Defense}</h4>
              <progress value={pokieInfo.Defense} max="100"></progress>

              <h4>Speed: {pokieInfo.Speed}</h4>
              <progress value={pokieInfo.Speed} max="100"></progress>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
