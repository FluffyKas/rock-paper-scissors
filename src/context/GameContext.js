import { useState, useEffect, useContext, createContext } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {

  const [game, setGame] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [houseChoice, setHouseChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);

  const choices = (game === "Rock, Paper, Scissors, Lizard, Spock" ? ["rock", "paper", "scissors", "lizard", "spock"] : ["rock", "paper", "scissors"]);

  const getHouseChoice = () => {
    setHouseChoice(choices[Math.floor(Math.random() * (choices.length))])
  }

  useEffect(() => {
    switch (userChoice + houseChoice) {
      case "rockrock":
      case "paperpaper":
      case "scissorsscissors":
      case "lizardlizard":
      case "spockpock":
        setResult("DRAW");
        break;
      case "rockpaper":
      case "rockspock":
      case "paperscissors":
      case "paperlizard":
      case "scissorsrock":
      case "scissorspock":
      case "lizardrock":
      case "lizardscissors":
      case "spocklizard":
      case "spockpaper":
        setResult("HOUSE WINS");
        break;
      case "rockscissors":
      case "rocklizard":
      case "paperrock":
      case "paperspock":
      case "scissorspaper":
      case "scissorslizard":
      case "lizardspock":
      case "lizardpaper":
      case "spockscissors":
      case "spockrock":
        setResult("USER WINS");
        setScore(score + 1);
        break;
      default:
        console.log("Something went wrong.")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userChoice, houseChoice]);

  return (
    <GameContext.Provider value={{ game, setGame, score, setScore, userChoice, setUserChoice, getHouseChoice, houseChoice, result }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}