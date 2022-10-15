import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./CardLoader.module.scss"

function CardLoader() {
  return (
    <div className={styles.card}>
      <ContentLoader 
        speed={2}
        width={150}
        height={187}
        viewBox="0 0 150 187"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="150" height="105" /> 
        <rect x="0" y="112" rx="3" ry="3" width="150" height="15" /> 
        <rect x="0" y="132" rx="3" ry="3" width="93" height="15" /> 
        <rect x="0" y="160" rx="8" ry="8" width="90" height="26" /> 
        <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
      </ContentLoader>
    </div>
  );
};

export default CardLoader;

