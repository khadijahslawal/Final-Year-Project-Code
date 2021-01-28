import React from "react";
import styles from "./singleproperty.module.css";



const Property = (props) => {
  const {
    image,
    buildingNumber,
    buildingName,
    streetName,
    city,
    state,
    country,
    valuationPrice,
  } = props.property;

//   const expandProperty = () => {
//      Router.pushRoute(`/discover/address`)
//   }

  return (
    <article className={styles.property}>
      <img src={image} />
      <div className={styles.detailsSection}>
        <div className={styles.propertyDetails}>
          <h3 id={styles.top}>{buildingName}</h3>
          <h3 id={styles.bottom}>{city}, {country}</h3>
        </div>
        <p>{valuationPrice}</p>
      </div>
    </article>
  );
};

export default Property;