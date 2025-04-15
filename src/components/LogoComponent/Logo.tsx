import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="CV-Library"
      className="logo"
      width={500}
      height={200}
    />
  );
};

export default Logo;
