import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="w-full md:w-10/12 mx-auto">{children}</div>;
};

export default Container;
