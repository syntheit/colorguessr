import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { Button } from "../components/Button/Button";
import { four04 } from "../constants/metadata";

type Props = {};

const Four04: NextPage<Props> = () => {
  return (
    <div className="flex text-white items-center justify-center flex-col h-full gradientAnimation">
      <NextSeo {...four04} />
      <div className="flex flex-col items-center justify-center bg-black/60 p-10 md:p-16 rounded-lg">
        <h1 className="text-8xl font-bold mb-4 text-center w-10/12">404</h1>
        <h2 className="text-2xl mb-4 text-center w-10/12">
          The page you are looking for wasn't found
        </h2>
        <Button label="Go Home" className="m-4 rounded-full" href="/" />
      </div>
    </div>
  );
};

export default Four04;
