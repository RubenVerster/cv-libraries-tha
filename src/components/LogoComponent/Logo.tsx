import React from "react";
import Image from "next/image";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="CV-Library"
      className={styles.logo}
      width={500}
      height={200}
      priority
    />
  );
};

export default Logo;
