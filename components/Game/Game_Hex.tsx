import { NextPage } from "next";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";

type Props = {};

export const Game_Hex: NextPage<Props> = () => {
  const [color, setColor] = useState<string>();
  const [streak, setStreak] = useState(0);
  const [guessedCorrectly, setGuessedCorrectly] = useState<number>();
  const [error, setError] = useState<string>();
  const guess = useRef<HTMLInputElement>(null);

  useEffect(() => {
    !color && setRandomColor();
  });

  const setRandomColor = () => {
    setGuessedCorrectly(-1);
    setColor(Math.floor(Math.random() * 16777215).toString(16));
  };

  const submitGuess = (event?: FormEvent<HTMLFormElement>) => {
    // add checks to make sure that it is a valid hex
    event && event.preventDefault();
    if (!guess.current?.value) {
      setError("Enter a valid hex code");
      return;
    }
    setError("");
    const guessedHex = guess.current?.value.replaceAll("#", "");
    if (guessedHex === color) {
      setGuessedCorrectly(1);
      setStreak((currentStreak) => currentStreak + 1);
    } else {
      setGuessedCorrectly(0);
      setStreak(0);
    }
  };

  return (
    <div
      className="flex items-center justify-center flex-col h-full w-full text-white"
      style={{ backgroundColor: `#${color}` }}
    >
      {guessedCorrectly == -1 && (
        <>
          <h1 className="text-3xl font-bold">What is the hex code?</h1>
          <form
            className="flex items-center justify-center"
            onSubmit={(e) => submitGuess(e)}
          >
            <input
              type="text"
              placeholder=""
              className="text-black text-2xl font-medium m-3 p-2 rounded-md"
              defaultValue="#"
              ref={guess}
              autoFocus
            />
            <Button label="Guess" onClick={() => submitGuess} />
          </form>
        </>
      )}
      {guessedCorrectly == 1 && (
        <div className="flex flex-col items-center mb-3">
          <h2 className="text-5xl font-bold mb-5">Correct!</h2>
          <h3 className="text-2xl">The color was #{color}</h3>
        </div>
      )}
      {guessedCorrectly == 0 && (
        <div className="flex flex-col items-center mb-3">
          <h2 className="text-5xl font-bold mb-5">Wrong!</h2>
          <h3 className="text-2xl">The color was #{color}</h3>
        </div>
      )}
      {error && <h3 className="text-2xl font-bold">{error}</h3>}
      {guessedCorrectly !== -1 && (
        <Button label="Next Color" onClick={setRandomColor} />
      )}
      <h2 className="text-3xl font-bold absolute bottom-20">
        Streak: {streak}
      </h2>
      <p className="text-2xl">#{color}</p>
    </div>
  );
};
