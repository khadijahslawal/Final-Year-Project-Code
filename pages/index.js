import React, { Component, useEffect, useState } from "react";
import styles from "../components/index.module.css";
import logo from "../public/icons/mozy.png";
import { Router } from "../routes";

class Index extends Component{
  render(){

    return(
      <div>
      <div className={styles.body}>
        <div className={styles.header}>
          <img src={logo} onClick={()=>{Router.pushRoute(`/signup`)}}/>
          <p>Reats</p>
        </div>
      </div>
    </div>
    );
  }
}

export default Index;
  