import { NextPage } from "next";
import { useLayoutEffect, useState } from "react";
import { Color } from "../../constants/Color";

type Props = {
  color: Color;
  type: "hex" | "RGB";
  className?: string;
};

// use diagonal design

export const ColorCard: NextPage<Props> = ({ color, type, className }) => {
  const [hex, setHex] = useState<string>();

  useLayoutEffect(() => {
    setHex(color.toHexString());
  }, []);

  return (
    <div className={["w-36 rounded-xl border-white border-solid border-4", className].join(" ")}>
      <div
        className={`w-full h-28 rounded-t-xl`}
        style={{
          backgroundColor: `rgb(${color?.r}, ${color?.g}, ${color?.b})`,
        }}
      ></div>
      <div className="w-full h-12 flex items-center justify-center px-3 rounded-b-xl border-gray-900 border-solid border-2 bg-gray-900">
        <p className="text-white text-lg font-bold">
          {type === "hex" ? hex : color.toRGBString()}
        </p>
      </div>
    </div>
  );
};
