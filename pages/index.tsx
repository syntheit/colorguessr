import { NextPage } from "next";
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
    <div className="flex items-center justify-center h-full bg-black">
      {selectedHex && <Game_Hex />}
      {selectedRGB && <Game_RGB />}
      {!selectedHex && !selectedRGB && (
        <div className="flex items-center flex-col text-white">
          <h1 className="text-5xl font-bold mb-3">ColorGuessr</h1>
          <p className="text-2xl mb-8">
            Can you the guess hex/rgb of a color just by seeing it?
          </p>
          {/* buttons for hex, rgb, etc */}
          <div className="flex">
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
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default Home;
