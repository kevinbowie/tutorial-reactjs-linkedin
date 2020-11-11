import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";

// ReactDOM.render(
//   React.createElement(
//     "div",
//     { style: { color: "red" } },
//     React.createElement("h1", {}, "Hello!")
//   ),
//   document.getElementById("root")
// );

let city = {
  name: "Madrid",
  country: "Spain",
};

// should uppercase first as Component
// function City(props) {
function FoodList({ food, year, country = city.country }) {
  return (
    <li>
      {/* {props.food} from {city.name} ext. {props.year} */}
      {food} from{" "}
      <span id="country" className="cool-text">
        {country}
      </span>{" "}
      ext. {year} year
    </li>
  );
}

const lakes = [
  { id: "1", name: "Echo", trailHead: "Echo" },
  { id: "2", name: "Maud", trailHead: "Wrights" },
  { id: "3", name: "Velma", trailHead: "Bayview" },
];

function SkiResort() {
  return (
    <>
      <h1>Visit Jackson Hole Mountain Resort!</h1>
    </>
  );
}

const [, , fruit] = ["popcorn", "pretzels", "pineapple"];
// console.log(fruit);

function UseEfectExample() {
  const [checked, setChecked] = useState(false);
  const [val, setVal] = useState("");
  const [val2, setVal2] = useState("");

  useEffect(() => {
    console.log(`checked: ${checked.toString()}`);
  }, [checked]);

  useEffect(() => {
    console.log(`field 1: ${val}`);
    console.log(`field 2: ${val2}`);
  }, [val, val2]);

  return (
    <>
      <h1>Use Effect Example</h1>
      <div>
        <input
          type="checkbox"
          value={checked}
          onChange={() => setChecked(!checked)}
        />
        {checked ? "checked" : "not checked"}
      </div>

      <div>
        <label htmlFor="">Favorite Phrase:</label>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <br />
        <label htmlFor="">Second Favorite Phrase:</label>
        <input
          type="text"
          value={val2}
          onChange={(e) => setVal2(e.target.value)}
        />
      </div>
    </>
  );
}

function GitHubUser({ login }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (data) {
    return (
      <div>
        <h1>{data.login}</h1>
        <img src={data.avatar_url} alt="avatar" width={100} />
      </div>
    );
  }
  return null;
}

function CheckBoxUseReducer() {
  const [checked, toggle] = useReducer((checked) => !checked, false);
  return (
    <>
      <input type="checkbox" value={checked} onChange={toggle} />
      {checked ? "checked" : "not checked"} using UseReducer
    </>
  );
}

function App(props) {
  const [year, setYear] = useState(2020);
  const [manager, setManager] = useState("Alex");
  const [status, setStatus] = useState("Open");

  return (
    <div>
      <h1>Food List</h1>
      <ul>
        <li>Hot Dogs</li>
        <li>Hamburgers</li>
        <FoodList food="Pizza" year={1800} />
        <FoodList food="Donat" year={1890} country="USA" />
        <li>Sushi</li>
      </ul>

      <div className="lakeList">
        <h1>Lake List</h1>
        {props.lakes.map((lake) => (
          <div key={lake.id}>
            <h2>{lake.name}</h2>
            <p>Accessed by: {lake.trailHead}</p>
          </div>
        ))}
      </div>
      {props.season === "summer" ? <SkiResort /> : ""}

      <div>
        <h1>Status: {status}</h1>
        <button onClick={() => setStatus("Open")}>Open</button>
        <button onClick={() => setStatus("Back in 5")}>Break</button>
        <button onClick={() => setStatus("Closed")}>Closed</button>
      </div>

      <div>
        <h1>Manager on Duty: {manager}</h1>
        <button onClick={() => setManager("Rachel")}>New Manager</button>
      </div>

      <div>
        <h1>Year: {year}</h1>
        <button onClick={() => setYear(year + 1)}>New Year</button>
      </div>

      <UseEfectExample />
      <GitHubUser login="moonhighway" />
      <CheckBoxUseReducer />
    </div>
  );
}

ReactDOM.render(
  <App lakes={lakes} season="summer" />,
  document.getElementById("root")
);
