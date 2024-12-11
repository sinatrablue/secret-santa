import {useCallback, useEffect, useState} from "react";
import {Xmark} from "iconoir-react";


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
        "Al|ex|is 🌱",
        "Stéphanie 🦘",
        "Laure 😾",
        "Paul 🐐",
        "Marie G 🐨",
        "Emilie D 🦁"];
    const [resultsVisible, setResultsVisible] = useState(false);
    const [players, setPlayers] = useState<string[]>([]);
    const [results, setResults] = useState<string[]>([])
    const [inputValue, setInputValue] = useState("")
    const generateResults = useCallback(() => {
        function shuffle(array: string[]) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function isValidPairing(array1: string[], array2: string[]) {
            const pairingMap = new Map(); // Map to track bidirectional constraints
            for (let i = 0; i < array1.length; i++) {
                if (array1[i] === array2[i]) return false; // Same index conflict
                if (
                    pairingMap.get(array2[i]) === array1[i] || // Bidirectional conflict
                    pairingMap.get(array1[i]) === array2[i]
                ) {
                    return false;
                }
                pairingMap.set(array1[i], array2[i]); // Record the pairing
                pairingMap.set(array2[i], array1[i]); // Record the reverse pairing
            }
            return true;
        }
        const array = [...players];

        // Shuffle and validate the pairing
        let isValid = false;
        while (!isValid) {
            shuffle(array);
            isValid = isValidPairing(players, array);
        }
        setResults(array);
    }, [players]);

    useEffect(() => {
        if(results.length > 0) setResultsVisible(true);
    }, [results]);

  return (
      <div className={"flex flex-col gap-20 h-screen items-center text-white py-10 w-screen bg-red-800"}>
          <h1 className={"text-6xl font-christmas"}>
              SECRET SANTA
          </h1>

          {!resultsVisible && <div className={"flex flex-col items-center gap-12 w-1/2"}>
                <div className={"flex flex-col items-center gap-4 w-full"}>
                    <div className={"flex items-center w-full justify-between gap-4"}>
                        <input
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            className={" text-slate-800 py-2 w-1/2 px-4 rounded bg-slate-200 hover:bg-slate-300 focus:outline-none focus:shadow-outline focus:bg-slate-100"}/>
                        <button
                            className={'px-4 py-2 bg-green-800 hover:bg-green-700 active:bg-green-900 rounded tracking-wider'}
                            onClick={() => {
                                setPlayers(prev => prev.concat(inputValue));
                                setInputValue("")
                            }}>Ajouter à la liste
                        </button>
                    </div>
                    {players.length > 0 && <div className={"flex rounded bg-red-600/80 p-6 w-full min-h-40 flex-wrap gap-2 text-slate-800"}>
                        {players.map(value => (
                            <span className={"px-2 py-1 bg-slate-200 h-fit rounded-lg flex items-center gap-2"}>
                                {value}
                                <button className={"rounded-full p-1 hover:bg-slate-300 active:bg-slate-400"} onClick={() => setPlayers(prev => prev.filter(player => player !== value))}><Xmark/></button>
                            </span>
                        ))}
                    </div>}
                    <button className={"text-slate-200 underline tracking-wider text-sm self-start"} onClick={() => setPlayers(setAssia2024)}>Utiliser la liste "Assia 2024"</button>
                </div>
              <button className={'px-4 py-2 bg-green-800 hover:bg-green-700 active:bg-green-900 rounded tracking-wider disabled:bg-green-950/20 disabled:cursor-not-allowed'} disabled={players.length === 0}
                      onClick={generateResults}>Afficher les résultats
              </button>
          </div>}
          {resultsVisible && <div className={"flex flex-col gap-4 bg-red-600 shadow-2xl  py-2 px-4 rounded-2xl w-1/2 max-h-[800px] overflow-auto"}>
              <h2 className={"mb-2 text-2xl font-bold underline tracking-wider"}>Résultats :</h2>
              {players.map((player, index) => (
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
