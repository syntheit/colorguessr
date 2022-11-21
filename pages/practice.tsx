import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../components/Button/Button";
import { Color } from "../constants/Color";
import { practice } from "../constants/metadata";
import { modeDisplayNames } from "../constants/modeDisplayNames";
import { mode } from "../constants/types";

type Props = {};

// confetti on 100%?
// timer option?

const Practice: NextPage<Props> = () => {
  const [color, setColor] = useState<Color>(new Color()),
    [guess_hex, setGuess_hex] = useState("#"),
    [guess_r, setGuess_r] = useState(""),
    [guess_g, setGuess_g] = useState(""),
    [guess_b, setGuess_b] = useState(""),
    [accuracy, setAccuracy] = useState<number>(),
    [mode, setMode] = useState<mode>(),
    [useLight_RandColor, setUseLight_RandColor] = useState({
      ui: true,
      card: true,
    }),
    [useLight_GuessedColor, setUseLight_GuessedColor] = useState({
      ui: true,
      card: true,
    }),
    [inputColor, setInputColor] = useState(""),
    [error, setError] = useState<string>();

  useEffect(() => {
    const guessedColor1 = getGuessedColor();
    setError("");
    if (guessedColor1.r === -1) {
      return;
    }
    setAccuracy(+(100 - color.percentDifference(guessedColor1)).toFixed(2));
    if (mode === "RGB") setGuess_hex(guessedColor1.toHexString());
    setUseLightElements(color, guessedColor1);
    if (+guess_r < 0) setGuess_r("");
    if (+guess_g < 0) setGuess_g("");
    if (+guess_b < 0) setGuess_b("");
    const avg = Color.avg(color, guessedColor1);
    setInputColor(`rgba(${avg.r}, ${avg.g}, ${avg.b}, .8)`);
    // check for invalid hex
  }, [guess_hex, guess_r, guess_g, guess_b]);

  const setUseLightElements = (color: Color, guessedColor: Color) => {
    {
      const useLightUI = Color.useLight(color);
      const useLightCard = Color.useLight(Color.applyOpacity(color, 0.6));
      setUseLight_RandColor({ ui: useLightUI, card: useLightCard });
    }
    {
      const useLightUI = Color.useLight(guessedColor);
      const useLightCard = Color.useLight(
        Color.applyOpacity(guessedColor, 0.6)
      );
      setUseLight_GuessedColor({ ui: useLightUI, card: useLightCard });
    }
  };

  const newColor = () => {
    const c = new Color();
    setColor(c);
    setUseLightElements(c, new Color());
    setGuess_r("");
    setGuess_g("");
    setGuess_b("");
    setGuess_hex("#");
    setAccuracy(undefined);
    const avg = Color.avg(c, new Color({ r: 0, g: 0, b: 0 }));
    setInputColor(`rgba(${avg.r}, ${avg.g}, ${avg.b}, .8)`);
  };

  const getGuessedColor = () => {
    if (mode === "RGB")
      return new Color({
        r: +guess_r,
        g: +guess_g,
        b: +guess_b,
      });
    else if (
      (mode === "hex" && guess_hex.length === 7) ||
      guess_hex.length === 4
    )
      return new Color(Color.hexToRGB(guess_hex));
    return new Color(-1);
  };

  // make input box background color the median value of the two colors
  // NaN text shows up when there's a 3 digit hex
  // go home button theme change isn't working for some reason

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <NextSeo {...practice} />
      <div className="absolute top-5">
        <Button
          label="Go Home"
          className={`${
            useLight_GuessedColor.ui ? "btn-primary-light" : "btn-primary-dark"
          } rounded-full`}
          href="/"
        />
      </div>
      {!mode ? (
        <div className="flex flex-col items-center justify-center h-full w-full text-white gradientAnimation">
          <h1 className="text-4xl font-bold mb-6">Select mode</h1>
          <div className="flex flex-wrap items-center justify-center">
            <Button
              label="Hex"
              onClick={() => setMode("hex")}
              className="mr-3 ml-3 mb-6 rounded-full"
            />
            <Button
              label="RGB"
              onClick={() => setMode("RGB")}
              className="mr-3 ml-3 mb-6 rounded-full"
            />
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-center flex-col h-full w-full"
          style={{
            backgroundImage: `linear-gradient(45deg, ${color.toHexString()} 50%, ${
              guess_hex === "#" ? "#000000" : guess_hex
            } 50%)`,
          }}
        >
          <div className="flex items-center justify-center text-white">
            {mode === "hex" && (
              <input
                type="text"
                placeholder="#"
                defaultValue="#"
                className="input-practice"
                maxLength={7}
                pattern="[a-zA-Z0-9#]+"
                autoFocus
                onChange={(e) => setGuess_hex(e.target.value)}
                value={guess_hex}
                style={{
                  backgroundColor: inputColor,
                  backdropFilter: "blur(5px)",
                }}
              />
            )}
            {mode === "RGB" && (
              <>
                <input
                  type="number"
                  placeholder="R"
                  className="input-practice w-40"
                  autoFocus
                  onChange={(e) => setGuess_r(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  value={guess_r}
                  min={0}
                  max={255}
                />
                <input
                  type="number"
                  placeholder="G"
                  className="input-practice w-40"
                  onChange={(e) => setGuess_g(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  value={guess_g}
                  min={0}
                  max={255}
                />
                <input
                  type="number"
                  placeholder="B"
                  className="input-practice w-40"
                  onChange={(e) => setGuess_b(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  value={guess_b}
                  min={0}
                  max={255}
                />
              </>
            )}
            <div
              className="absolute bottom-10 flex flex-col items-center transition ease-in-out duration-300"
              style={{
                color: useLight_RandColor.ui ? "#fff" : "#111827",
              }}
            >
              <h2 className="text-2xl mb-1">Practice</h2>
              <h4 className="text-xl font-light">
                Mode: {modeDisplayNames[mode]}
              </h4>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col absolute mt-96 w-50 rounded-lg p-4 md:p-8 bg-black/60">
            {accuracy && (
              <h3
                className="text-2xl font-bold mb-4 transition ease-in-out duration-300"
                style={{
                  color: useLight_RandColor.card ? "#fff" : "#111827",
                }}
              >
                Accuracy: {accuracy}%
              </h3>
            )}
            {error && (
              <h3
                className="text-2xl font-bold mb-4 transition ease-in-out duration-300"
                style={{
                  color: useLight_RandColor.card ? "#fff" : "#111827",
                }}
              >
                {error}
              </h3>
            )}
            <Button
              label="New Color"
              onClick={newColor}
              className={`${
                useLight_RandColor.card
                  ? "btn-primary-light"
                  : "btn-primary-dark"
              } rounded-full`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;
