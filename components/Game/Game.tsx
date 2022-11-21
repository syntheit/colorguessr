import { NextPage } from "next";
import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { difficulties } from "../../constants/difficulties";
import { Color } from "../../constants/Color";
import {
  modeDisplayNames,
  modeDisplayNamesType,
} from "../../constants/modeDisplayNames";
import { ColorCard } from "../ColorCard/ColorCard";
import { mode } from "../../constants/types";
import { NextSeo } from "next-seo";
import { game_hex, game_rgb } from "../../constants/metadata";

type Props = {
  selected_mode: mode;
};

// add multiple choice
// consider making game (and mode) a separate page
// would be nice if people want to send a direct gamemode to somebody,
// and would be good for SEO too

export const Game: NextPage<Props> = ({ selected_mode }) => {
  const [color, setColor] = useState<Color>(new Color(-1)),
    [streak, setStreak] = useState(0),
    [previousStreak, setPreviousStreak] = useState(0),
    [guessedCorrectly, setGuessedCorrectly] = useState<number>(),
    [percentError, setPercentError] = useState<number>(),
    [error, setError] = useState<string>(),
    [marginOfError, setMarginOfError] = useState(-1), // percent error
    [difficultyName, setDifficultyName] = useState<string>(),
    [useLight, setUseLight] = useState({ ui: true, card: true }),
    [totalInaccuracy, setTotalInaccuracy] = useState(0),
    [mode, setMode] = useState<mode>(),
    guess_r = useRef<HTMLInputElement>(null),
    guess_g = useRef<HTMLInputElement>(null),
    guess_b = useRef<HTMLInputElement>(null),
    guess_hex = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    setRandomColor();
    setMode(selected_mode);
  }, []);

  useLayoutEffect(() => {
    const keyDownHandler = (event: {
      key: string;
      preventDefault: () => void;
    }) => {
      if (event.key === "Enter" && guessedCorrectly !== -1) {
        event.preventDefault();
        setRandomColor();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => document.removeEventListener("keydown", keyDownHandler);
  });

  const setRandomColor = () => {
    if (streak === 0) setPreviousStreak(0);
    setGuessedCorrectly(-1);
    const c = new Color();
    setColor(c);
    const useLightUI = Color.useLight(c);
    const useLightCard = Color.useLight(Color.applyOpacity(c, 0.6));
    setUseLight({ ui: useLightUI, card: useLightCard });
  };

  // make sure it is a valid hex, and not just a bunch of random characters
  const checkIfGuessIsValid = () => {
    if (
      mode === "RGB" &&
      (!guess_r.current?.value ||
        !guess_g.current?.value ||
        !guess_b.current?.value)
    ) {
      setError("Enter a valid RGB value");
      return;
    } else if (
      mode === "hex" &&
      (!guess_hex.current?.value || guess_hex.current.value.length !== 7)
    ) {
      setError("Enter a valid hex value");
      return;
    }
    return true;
  };

  const submitGuess = (event?: FormEvent<HTMLFormElement>) => {
    // add checks to make sure that it is a valid rgb value
    event?.preventDefault();
    if (!checkIfGuessIsValid()) return;
    if (!color) {
      setError("Problem with color generation");
      return;
    }
    setError("");
    const guessed_color_1 = getGuessedColor();
    if (!guessed_color_1) {
      setError("Error getting guessed color");
      return;
    }
    const errorPercentage = color.percentDifference(guessed_color_1);
    if (errorPercentage <= marginOfError) {
      setGuessedCorrectly(1);
      setPreviousStreak(streak + 1);
      setStreak((currentStreak) => currentStreak + 1);
    } else {
      setGuessedCorrectly(0);
      setStreak(0);
    }
    setPercentError(Math.round(errorPercentage));
    setTotalInaccuracy(
      (currentSum) => currentSum + Math.round(errorPercentage)
    );
  };

  const getGuessedColor = () => {
    if (mode === "RGB")
      return !guess_r.current?.value ||
        !guess_g.current?.value ||
        !guess_b.current?.value
        ? undefined
        : new Color({
            r: +guess_r.current.value,
            g: +guess_g.current.value,
            b: +guess_b.current.value,
          });
    else if (mode === "hex")
      return !guess_hex.current?.value || guess_hex.current.value.length !== 7
        ? undefined
        : new Color(Color.hexToRGB(guess_hex.current.value));
    return undefined;
  };

  const renderGuessedColor = () => {
    const guessedColor = getGuessedColor();
    return (
      guessedColor &&
      mode && (
        <ColorCard
          color1={{ color, type: mode }}
          color2={{ color: guessedColor, type: mode }}
        />
      )
    );
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      {mode && mode === "hex" ? (
        <NextSeo {...game_hex} />
      ) : (
        <NextSeo {...game_rgb} />
      )}
      <div className="absolute top-5">
        <Button
          label="Go Home"
          className={`${
            useLight.ui || marginOfError === -1
              ? "btn-primary-light"
              : "btn-primary-dark"
          } rounded-full`}
          href="/"
        />
      </div>
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
              className="mr-3 ml-3 mb-6 rounded-full"
            />
            <Button
              label="Medium"
              onClick={() => {
                setMarginOfError(difficulties.medium);
                setDifficultyName("Medium");
              }}
              className="mr-3 ml-3 mb-6 rounded-full"
            />
            <Button
              label="Hard"
              onClick={() => {
                setMarginOfError(difficulties.hard);
                setDifficultyName("Hard");
              }}
              className="mr-3 ml-3 mb-6 rounded-full"
            />
            <Button
              label="Impossible"
              onClick={() => {
                setMarginOfError(difficulties.impossible);
                setDifficultyName("Impossible");
              }}
              className="mr-3 ml-3 mb-6 rounded-full"
            />
          </div>
        </div>
      ) : (
        <div
          className={"flex items-center justify-center flex-col h-full w-full "}
          style={{
            backgroundColor: `rgb(${color?.r}, ${color?.g}, ${color?.b})`,
          }}
        >
          {guessedCorrectly == -1 && (
            <div
              style={{
                color: useLight.card ? "#fff" : "#111827",
              }}
              className={`bg-black/60 p-10 md:p-16 rounded-lg`}
            >
              <h1 className="text-4xl font-bold mb-5 text-center">
                What is the {mode} value?
              </h1>
              {mode === "RGB" && (
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
                    className={`${
                      useLight.card ? "btn-primary-light" : "btn-primary-dark"
                    } mt-3 sm:mt-0`}
                  />
                </form>
              )}
              {mode === "hex" && (
                <form
                  className="flex items-center justify-center mb-3 flex-wrap"
                  onSubmit={(e) => submitGuess(e)}
                >
                  <input
                    type="text"
                    placeholder="#"
                    defaultValue="#"
                    className="input-primary w-40"
                    maxLength={7}
                    pattern="[a-zA-Z0-9#]+"
                    ref={guess_hex}
                    autoFocus
                  />
                  <Button
                    label="Guess"
                    onClick={() => submitGuess}
                    className={`${
                      useLight.card ? "btn-primary-light" : "btn-primary-dark"
                    } mt-3 sm:mt-0`}
                  />
                </form>
              )}
              {error && (
                <h3 className="text-2xl font-bold text-center">{error}</h3>
              )}
            </div>
          )}
          {guessedCorrectly !== -1 && (
            <div
              className={`flex flex-col items-center mb-3 p-10 md:p-16 rounded-lg bg-black/60`}
              style={{
                color: useLight.card ? "#fff" : "#111827",
              }}
            >
              <h2 className="text-5xl font-bold mb-5">
                {guessedCorrectly === 1 ? "Correct!" : "Wrong!"}
              </h2>
              <h3 className="text-2xl mb-3">
                You were off by&nbsp;
                <span className="font-bold">{percentError}%</span>
              </h3>
              <h3 className="text-2xl mb-3">
                The color was&nbsp;
                <span className="font-bold">
                  {mode === "RGB" && color?.toRGBString()}
                  {mode === "hex" && color?.toHexString()}
                </span>
              </h3>
              <h3 className="text-2xl mb-3">
                You guessed&nbsp;
                <span className="font-bold">
                  {mode === "RGB" && getGuessedColor()?.toRGBString()}
                  {mode === "hex" && getGuessedColor()?.toHexString()}
                </span>
              </h3>
              {percentError !== 0 && (
                <div className="flex my-4">{renderGuessedColor()}</div>
              )}
              {guessedCorrectly === 0 && previousStreak > 0 && (
                <>
                  <h3 className="text-2xl mb-3">
                    You lost your streak of&nbsp;
                    <span className="font-bold">{previousStreak}</span>
                  </h3>
                  <h3 className="text-2xl mb-3">
                    Average inaccuracy:&nbsp;
                    <span className="font-bold">
                      {Math.round(totalInaccuracy / (previousStreak + 1))}%
                    </span>
                  </h3>
                </>
              )}
              <Button
                label="Next Color"
                onClick={setRandomColor}
                className={`${
                  useLight.card ? "btn-primary-light" : "btn-primary-dark"
                } rounded-full mt-4`}
              />
            </div>
          )}
          <div
            className="absolute bottom-10 flex flex-col items-center"
            style={{
              color: useLight.ui ? "#fff" : "#111827",
            }}
          >
            <h2 className="text-3xl font-bold mb-1">Streak: {streak}</h2>
            <h2 className="text-2xl mb-1">Difficulty: {difficultyName}</h2>
            <h4 className="text-xl font-light">
              Mode: {modeDisplayNames[mode as keyof modeDisplayNamesType]}
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};
