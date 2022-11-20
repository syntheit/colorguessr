import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../components/Button/Button";
import { Game } from "../components/Game/Game";
import { NextSeo } from "next-seo";
import { index } from "../constants/metadata";

type Props = {};

const Home: NextPage<Props> = () => {
  const [selectedMode, setSelectedMode] = useState<string>();

  return (
    <div className="flex items-center justify-center h-full gradientAnimation">
      <NextSeo {...index} />
      {selectedMode && <Game selected_mode={selectedMode} />}
      {!selectedMode && (
        <div className="flex items-center flex-col text-white bg-black/60 p-10 md:p-16 rounded-lg mx-10">
          <h1 className="text-fluid-lg font-bold mb-3">ColorGuessr</h1>
          <p className="text-2xl mb-8 text-center w-10/12">
            Can you the guess hex/rgb of a color just by looking at it?
          </p>
          <div className="flex flex-wrap items-center justify-center mb-12">
            <Button
              label="Guess the hex"
              onClick={() => setSelectedMode("hex")}
              className="m-4"
            />
            <Button
              label="Guess the RGB"
              onClick={() => setSelectedMode("RGB")}
              className="m-4"
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
