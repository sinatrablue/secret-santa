import React, {useEffect} from "react";

function App() {
    const setAssia2024 = ["Assia 🕷️",
        "Aéla 🐸",
        "Baptiste 🦊",
        "Dorothée 🐎",
        "Christophe M 🦙",
        "Marie-Pierre 💎",
        "Céline 🌰",
        "Alex 🐗",
        "Philippe 🌳",
        "Laurence 🫏",
        "Sarah 🦒",
        "Aurélien 🪼",
        "Léa  🐈‍⬛",
        "Charlotte V 🫎👑",
        "Valantin :)",
        "Al|ex|is 🌱",
        "Stéphanie 🦘",
        "Laure 😾",
        "Paul 🐐",
        "Marie G 🐨",
        "Emilie D 🦁"];
    const [visible, setVisible] = React.useState(false);
    const [results, setResults] = React.useState<string[]>([])
    useEffect(() => {
        // Copy and shuffle array1 to create array
        const array = [...setAssia2024];
        // Helper function to shuffle an array
        function shuffle(array: string[]) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        // Ensure no value in array is at the same index as array1
        let isValid = false;
        while (!isValid) {
            shuffle(array);
            isValid = setAssia2024.every((value, index) => value !== array[index]);
        }
        setResults(array);
    }, []);

  return (
      <div className={"flex flex-col gap-20 h-screen items-center text-white py-10 w-screen bg-red-800"}>
          <h1 className={"text-6xl font-christmas"}>
              SECRET SANTA
          </h1>

          {!visible && <button className={'px-4 py-2 bg-green-800 hover:bg-green-700 active:bg-green-900 rounded tracking-wider'}
                   onClick={() => setVisible(true)}>Afficher les résultats</button>}
          {visible && <div className={"flex flex-col gap-4 bg-red-600 shadow-2xl  py-2 px-4 rounded-2xl w-1/2 max-h-[800px] overflow-auto"}>
              <h2 className={"mb-2 text-2xl font-bold underline tracking-wider"}>Résultats :</h2>
              {setAssia2024.map((player, index) => (
                  <div className={"flex items-center gap-8"} key={player}>
                      <span className={"flex-1"}>{player}</span>
                      <svg className={"flex-1"} width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#FFFFF"><path d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#FFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                      <span className={"flex-1"}>{results[index]}</span>
                  </div>
              ))}
          </div>}
      </div>
  )
}

export default App
