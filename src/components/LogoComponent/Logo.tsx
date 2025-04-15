import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="CV-Library"
      className="logo"
      width={250}
      height={100}
    />
  );
};

export default Logo;
