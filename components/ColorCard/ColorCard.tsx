import { NextPage } from "next";
import { useLayoutEffect, useState } from "react";
import { Color } from "../../constants/Color";
import { mode } from "../../constants/types";

type Props = {
  color1: { color: Color; type: mode };
  color2: { color: Color; type: mode };
  className?: string;
};

export const ColorCard: NextPage<Props> = ({ color1, color2, className }) => {
  const [hex, setHex] = useState({ color1: "", color2: "" });
  const [useLight, setUseLight] = useState({ color1: true, color2: true });

  useLayoutEffect(() => {
    const color1_hex = color1.color.toHexString();
    const color2_hex = color2.color.toHexString();
    setHex({ color1: color1_hex, color2: color2_hex });
    setUseLight({
      color1: Color.useLight(color1.color),
      color2: Color.useLight(color2.color),
    });
  }, []);

  return (
    <div
      className={[
        "w-60 h-40 flex justify-between flex-col rounded-xl border-white border-solid border-4",
        className,
      ].join(" ")}
      style={{
        backgroundImage: `linear-gradient(45deg, ${hex.color1} 50%, ${hex.color2} 50%)`,
      }}
    >
      <p
        className={`${
          useLight.color2 ? "text-white" : "text-gray-900"
        } text-white text-lg font-bold w-full text-right p-4`}
      >
        {color2.type === "hex" ? hex.color2 : color2.color.toRGBString()}
      </p>
      <p
        className={`${
          useLight.color1 ? "text-white" : "text-gray-900"
        } text-lg font-bold w-full p-4`}
      >
        {color1.type === "hex" ? hex.color1 : color1.color.toRGBString()}
      </p>
    </div>
  );
};
