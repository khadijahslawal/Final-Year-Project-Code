import React, { Component, useState } from "react";
import styles from "../../components/deployed.module.css";
import propImage from "../../public/images/propertyimage.jpg";
import bedIcon from "../../public/icons/bed.png";
import bathIcon from "../../public/icons/bath.png";
import Avatar from "react-avatar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Router } from "../../routes";
import  Property  from "../../blockchain/property";

export class ShowDeployed extends Component {
  static async getInitialProps(props) {
    const property = Property(props.query.address);
    const summary = await property.methods.getPropertyDetails().call();
    return {
     address: props.query.address,
     symbol : summary[1],
     tokenPrice: summary[2],
     initialSupply: summary[3],
     currentSupply: summary[4],
     valuationPrice: summary[5],
     isRented: summary[6]
   };
}
  render() {
    // const [images, setImages] = useState([]);
    const investPage = () => {
        // Router.pushRoute(`{address/invest`);
    }
    const percentage = 0;
    return (
      <>
        <main className={styles.main} style={{ float: "right", width: "82%" }}>
          <section className={styles.left}>
            <h1>2992, Barnes Avenue</h1>
            {/* Add image sliding component - https://dev.to/jasonmeidev/making-a-simple-image-slider-in-react-js-1gbb*/}
            <img src={propImage} width="500px" height="300px" />
            <h3>Williams bridge, Knox</h3>
            <article className={styles.utilities}>
              <div className={styles.bedroom}>
                <p>Bedrooms</p>
                <div className={styles.utilitiesValue}>
                  <p>3</p>
                  <img src={bedIcon} alt="No of beds" width="20px" />
                </div>
              </div>
              <div className={styles.bathroom}>
                <p>Bathrooms</p>
                <div className={styles.utilitiesValue}>
                  <p>3</p>
                  <img src={bathIcon} alt="No of bath" width="20px" />
                </div>
              </div>
              <div className={styles.area}>
                <p>Area</p>
                <p id={styles.area}>1024ft/sq</p>
              </div>
            </article>
            <div className={styles.description}>
              <p>
                Barnes Apartments is among the best located and best maintained
                properties in Rohnert Park, where a veritable hotbed of
                development is set in a family-oriented, values-focused
                neighborhood community.
              </p>
            </div>
            <div className={styles.actionButtons}>
              <button onClick={investPage}>Invest</button>
              <button>Rent</button>
            </div>
          </section>

          <section className={styles.right}>
            <div className={styles.devProfile}>
              <Avatar
                className={styles.avatar}
                name="Wim Mostmans"
                round={true}
                size="50"
                color="#B198EF"
                fgColor="black"
              />
              <h3>Realington Properties</h3>
              <p>AEX0124013R1A1FAD</p>
              <button>View verification</button>
            </div>
            <section className={styles.analytics}>
              <h3>Property Analytics</h3>
              <div className={styles.analyticsbody}>
              <div className={styles.investmentProgress}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    pathColor: `rgb(177, 152, 239)`,
                    text: {
                      fill: "#f88",
                      textSize: '10px',
                      textAlign: 'center'
                    },
                  })}
                />
              </div>

              <div className={styles.tokenProgress}>
                  <p>Tokens Issued: <span className={styles.value}>200</span></p>
                  <p>Tokens Sold: <span className={styles.value}>1</span></p>
                  <p>Token Price: <span className={styles.value}>12</span></p>
              </div>
              </div>
           
            </section>
          </section>
        </main>
      </>
    );
  }
}

export default ShowDeployed;
