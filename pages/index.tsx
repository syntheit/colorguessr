import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../components/Button/Button";
import { Game_Hex } from "../components/Game/Game_Hex";
import { Game_RGB } from "../components/Game/Game_RGB";

type Props = {};

const Home: NextPage<Props> = () => {
  const [selectedHex, setSelectedHex] = useState(false);
  const [selectedRGB, setSelectedRGB] = useState(false);

  // use zustand to manage game states

  return (
    <div className="flex items-center justify-center h-full gradientAnimation">
      {selectedHex && <Game_Hex />}
      {selectedRGB && <Game_RGB />}
      {!selectedHex && !selectedRGB && (
        <div className="flex items-center flex-col text-white bg-black/60 p-16 rounded-lg">
          <h1 className="text-5xl font-bold mb-3">ColorGuessr</h1>
          <p className="text-2xl mb-8">
            Can you the guess hex/rgb of a color just by seeing it?
          </p>
          <div className="flex mb-12">
            <Button
              label="Guess the hex"
              onClick={() => setSelectedHex(true)}
              className="mr-4"
            />
            <Button
              label="Guess the RGB"
              onClick={() => setSelectedRGB(true)}
              className="ml-4"
            />
          </div>
          <Link href="https://www.github.com/syntheit/colorguessr">
            <svg className="w-14 h-14 text-white hoverOpacity mb-4">
              <use href={`/icons/github.svg#github`} />
            </svg>
          </Link>
          <Link href="https://www.matv.io">
            <h4 className="text-lg hoverOpacity">Made by Daniel Miller</h4>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
