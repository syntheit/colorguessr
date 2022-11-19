import { NextPage } from "next";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { difficulties } from "../../constants/rgb_difficulties";

type Props = {};

class Color {
  r: number;
  g: number;
  b: number;

  public constructor();

  public constructor(x: number);

  public constructor({ r, g, b }: { r: number; g: number; b: number });

  public constructor(...args: any[]) {
    if (args.length === 0) {
      this.r = this.randomColorVal();
      this.g = this.randomColorVal();
      this.b = this.randomColorVal();
    } else if (args.length === 1 && args[0] === -1) {
      this.r = this.g = this.b = -1;
    } else if (args.length === 1) {
      const { r, g, b } = args[0];
      this.r = r;
      this.g = g;
      this.b = b;
    } else this.r = this.g = this.b = -1;
  }

  randomColorVal = () => {
    return Math.floor(Math.random() * 255);
  };

  toString = () => {
    return `(${this.r}, ${this.g}, ${this.b})`;
  };

  getRGBString = () => {
    return `rgb${toString}`;
  };

  percentDiff = (a: number, b: number) => {
    return 100 * Math.abs((a - b) / ((a + b) / 2));
  };

  equalsWithinError = (c: Color) => {
    const r_diff = this.percentDiff(this.r, c.r);
    const g_diff = this.percentDiff(this.g, c.g);
    const b_diff = this.percentDiff(this.b, c.b);
    // NaN when 0??

    const avg = (r_diff + g_diff + b_diff) / 3;
    return avg;
  };
}

// add multiple choice

export const Game_RGB: NextPage<Props> = () => {
  const [color, setColor] = useState<Color>();
  const [streak, setStreak] = useState(0);
  const [previousStreak, setPreviousStreak] = useState(0);
  const [guessedCorrectly, setGuessedCorrectly] = useState<number>();
  const [percentError, setPercentError] = useState<number>();
  const [error, setError] = useState<string>();
  const [marginOfError, setMarginOfError] = useState(-1); // percent error
  const [difficultyName, setDifficultyName] = useState<string>();
  const [useLight, setUseLight] = useState(true);
  const [totalAccuracy, setTotalAccuracy] = useState(0);

  const guess_r = useRef<HTMLInputElement>(null);
  const guess_g = useRef<HTMLInputElement>(null);
  const guess_b = useRef<HTMLInputElement>(null);

  useEffect(() => {
    !color && setRandomColor();
  });

  const setRandomColor = () => {
    if (streak === 0) setPreviousStreak(0);
    setGuessedCorrectly(-1);
    const c = new Color();
    setColor(c);
    c.r * 0.299 + c.g * 0.587 + c.b * 0.114 < 150
      ? setUseLight(true)
      : setUseLight(false);
  };

  const checkIfGuessIsValid = () => {
    if (
      !guess_r.current?.value ??
      !guess_g.current?.value ??
      !guess_b.current?.value
    ) {
      setError("Enter a valid RGB value");
      return;
    }
    return true;
  };

  const submitGuess = (event?: FormEvent<HTMLFormElement>) => {
    // add checks to make sure that it is a valid rgb value
    event && event.preventDefault();
    if (!checkIfGuessIsValid()) return;
    if (!color) {
      setError("Problem with color generation");
      return;
    }
    setError("");
    const guessed_color_1 = getGuessedColor();
    let guessed_color: Color;
    if (guessed_color_1) {
      guessed_color = guessed_color_1;
    } else {
      setError("Error getting guessed color");
      return;
    }
    const errorPercentage = color.equalsWithinError(guessed_color);
    if (errorPercentage <= marginOfError) {
      setGuessedCorrectly(1);
      setPreviousStreak(streak + 1);
      setStreak((currentStreak) => currentStreak + 1);
    } else {
      setGuessedCorrectly(0);
      setStreak(0);
    }
    setPercentError(Math.round(errorPercentage));
    setTotalAccuracy((currentSum) => currentSum + errorPercentage);
  };

  const getGuessedColor = () => {
    return !guess_r.current?.value ||
      !guess_g.current?.value ||
      !guess_b.current?.value
      ? undefined
      : new Color({
          r: +guess_r.current.value,
          g: +guess_g.current.value,
          b: +guess_b.current.value,
        });
  };

  return (
    <>
      {marginOfError === -1 ? (
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-6">Select difficulty</h1>
          <div className="flex flex-wrap items-center justify-center">
            <Button
              label="Easy"
              onClick={() => {
                setMarginOfError(difficulties.easy);
                setDifficultyName("Easy");
              }}
              className="mr-3 ml-3 mb-6"
            />
            <Button
              label="Medium"
              onClick={() => {
                setMarginOfError(difficulties.medium);
                setDifficultyName("Challenging");
              }}
              className="mr-3 ml-3 mb-6"
            />
            <Button
              label="Hard"
              onClick={() => {
                setMarginOfError(difficulties.hard);
                setDifficultyName("Hard");
              }}
              className="mr-3 ml-3 mb-6"
            />
            <Button
              label="Impossible"
              onClick={() => {
                setMarginOfError(difficulties.impossible);
                setDifficultyName("Impossible");
              }}
              className="mr-3 ml-3 mb-6"
            />
          </div>
        </div>
      ) : (
        <div
          className={"flex items-center justify-center flex-col h-full w-full "}
          style={{
            backgroundColor: `rgb(${color?.r}, ${color?.g}, ${color?.b})`,
            color: useLight ? "#fff" : "#111827",
          }}
        >
          {guessedCorrectly == -1 && (
            <>
              <h1 className="text-4xl font-bold mb-5">
                What is the RGB value?
              </h1>
              <form
                className="flex items-center justify-center mb-3 flex-wrap"
                onSubmit={(e) => submitGuess(e)}
              >
                <input
                  type="number"
                  placeholder="R"
                  min="0"
                  max="255"
                  className="input-primary"
                  ref={guess_r}
                  autoFocus
                />
                <input
                  type="number"
                  placeholder="G"
                  min="0"
                  max="255"
                  className="input-primary"
                  ref={guess_g}
                />
                <input
                  type="number"
                  placeholder="B"
                  min="0"
                  max="255"
                  className="input-primary"
                  ref={guess_b}
                />
                <Button
                  label="Guess"
                  onClick={() => submitGuess}
                  className={
                    useLight ? "btn-primary-light" : "btn-primary-dark"
                  }
                />
              </form>
            </>
          )}
          {guessedCorrectly == 1 && (
            <div className="flex flex-col items-center mb-3">
              <h2 className="text-5xl font-bold mb-5">Correct!</h2>
              <h3 className="text-2xl mb-3">
                You were off by&nbsp;
                <span className="font-bold">{percentError}%</span>
              </h3>
              <h3 className="text-2xl mb-3">
                The color was&nbsp;
                <span className="font-bold">{color?.toString()}</span>
              </h3>
              <h3 className="text-2xl mb-3">
                You guessed&nbsp;
                <span className="font-bold">
                  {getGuessedColor()?.toString()}
                </span>
              </h3>
            </div>
          )}
          {guessedCorrectly == 0 && (
            <div className="flex flex-col items-center mb-3">
              <h2 className="text-5xl font-bold mb-5">Wrong!</h2>
              <h3 className="text-2xl mb-3">
                You were off by&nbsp;
                <span className="font-bold">{percentError}%</span>
              </h3>
              <h3 className="text-2xl mb-3">
                The color was&nbsp;
                <span className="font-bold">{color?.toString()}</span>
              </h3>
              <h3 className="text-2xl mb-3">
                You guessed&nbsp;
                <span className="font-bold">
                  {getGuessedColor()?.toString()}
                </span>
              </h3>
              {previousStreak > 0 && (
                <>
                  <h3 className="text-2xl mb-3">
                    You lost your streak of&nbsp;
                    <span className="font-bold">{previousStreak}</span>
                  </h3>
                  <h3 className="text-2xl mb-3">
                    Average inaccuracy:&nbsp;
                    <span className="font-bold">
                      {Math.round(totalAccuracy / previousStreak + 1)}%
                    </span>
                  </h3>
                </>
              )}
            </div>
          )}
          {error && <h3 className="text-2xl font-bold">{error}</h3>}
          {guessedCorrectly !== -1 && (
            <Button
              label="Next Color"
              onClick={setRandomColor}
              className={useLight ? "btn-primary-light" : "btn-primary-dark"}
            />
          )}
          <div className="absolute bottom-20 flex flex-col items-center">
            <h2 className="text-3xl font-bold">Streak: {streak}</h2>
            <h2 className="text-2xl">Difficulty: {difficultyName}</h2>
          </div>
        </div>
      )}
    </>
  );
};
