import { NextPage } from "next";
import { MouseEventHandler } from "react";

type Props = {
  label: string;
  onClick?: MouseEventHandler<HTMLElement>;
  link?: string;
  className?: string;
};

export const Button: NextPage<Props> = ({
  label,
  onClick,
  link,
  className,
}) => {
  return (
    // conditionals for onclick and link
    <>
      {/* fix conditionals and utilize all props */}
      {onClick && (
        <button
          className={["btn-primary-light", className].join(" ")}
          onClick={onClick}
        >
          <p>{label}</p>
        </button>
      )}
    </>
  );
};
