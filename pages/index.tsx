import { NextPage } from "next";
import { useState } from "react";
import { Button } from "../components/Button/Button";
import { Game } from "../components/Game/Game";

type Props = {};

const Home: NextPage<Props> = () => {
  const [startedGame, setStartedGame] = useState(false);

  return (
    <div className="flex items-center justify-center h-full bg-black">
      {startedGame ? (
        <Game />
      ) : (
        <div className="flex items-center flex-col text-white">
          <h1 className="text-5xl font-bold mb-3">ColorGuessr</h1>
          <p className="text-2xl mb-8">
            Can you the guess hex/rgb of a color just by seeing it?
          </p>
          {/* buttons for hex, rgb, etc */}
          <Button label="Guess the hex" onClick={() => setStartedGame(true)} />
        </div>
      )}
    </div>
  );
};

export default Home;
