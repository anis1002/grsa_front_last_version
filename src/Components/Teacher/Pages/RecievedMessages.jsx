import React from "react";

import styles from "../../Styles/RecivedMessages.module.css";
import logo from "../../Img/logo.png";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { MdCancelScheduleSend } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import avatar from "../../Img/teacher.webp";
// import RecievedMessages from './RecievedMessages';

const RecievedMessages = () => {
  const [name, setname] = useState("");
  const [emailSend, setemailSend] = useState("");
  const [available, setavailable] = useState(false);
  const [element, setelement] = useState([]);
  // const [emailRe, setemailRe] = useState("");
  const { t } = useTranslation();

  // let rows = JSON.parse(localStorage.getItem("comments"));
  
  async function comments() {
    const commentNeeds = { emailSend };
    let result = await fetch("http://localhost:8000/api/showmyrecievemessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(commentNeeds),
    });
    result = await result.json();
    // console.log(result);
    // localStorage.setItem("comments", JSON.stringify(result));
    setelement(result);
    
    setavailable(true);
  }
  
  useEffect(() => {
    setemailSend(JSON.parse(localStorage.getItem("userEmail")));
    comments();
    // setavailable(true)
  }, [available]);

  return (
    <div className={`${styles.main_container} `}>
      <div className={styles.top_bar}>
        <div className={styles.group}>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setname(event.target.value);
            }}
            className={styles.input}
          />
          <span className={styles.highlight}></span>
          <span className={styles.bar}></span>
          <label>{t("Last Name")}</label>
        </div>
        <img src={logo} className={styles.logo} />
      </div>
      <div className={styles.content}>
        <div className={styles.table}>
          {available ? (
            element
              .filter(
                (val) =>
                  val.email_sender.toUpperCase().includes(name) ||
                  val.email_sender.toLowerCase().includes(name)
              )
              .map((row, index) => (
                <div className={styles.card} key={index}>
                  <div className={styles.upPart}>
                    <img src={avatar} />
                    <p>{row.email_sender}</p>
                    <p>{row.created_at}</p>
                  </div>
                  <div className={styles.downPart}>
                    <p>{row.message}</p>
                  </div>
                </div>
              ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecievedMessages;