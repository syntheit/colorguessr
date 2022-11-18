import { NextPage } from "next";
import { MouseEventHandler } from "react";

type Props = {
  label: string;
  onClick?: MouseEventHandler<HTMLElement>;
  link?: string;
  type?: string;
  className?: string;
};

export const Button: NextPage<Props> = ({
  label,
  onClick,
  link,
  type,
  className,
}) => {
  return (
    // conditionals for onclick and link
    <>
      {onClick && type && (
        <button
          className={[className, "btn-primary"].join(" ")}
          onClick={onClick}
        >
          <p>{label}</p>
        </button>
      )}
      {onClick && (
        <button
          className={[className, "btn-primary"].join(" ")}
          onClick={onClick}
        >
          <p>{label}</p>
        </button>
      )}{" "}
    </>
  );
};
