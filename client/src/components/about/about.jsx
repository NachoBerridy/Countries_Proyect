import React from "react";
import gitHubLink from "../../assets/github-icon.svg";
import linkedInLink from "../../assets/linkedin-icon.svg";
import style from "./about.module.css";

export default function About() {
    return (
        <div className={style.about}>
            <div className={style.links}>
                <a href="https://github.com/NachoBerridy" target="_blank" rel="noreferrer">
                    <img src={gitHubLink} alt="github" />
                </a>
                <a href="https://www.linkedin.com/in/ignacioberridy" target="_blank" rel="noreferrer">
                    <img src={linkedInLink} alt="linkedin" />
                </a>
            </div>
            <h4>Created By: Ignacio Berridy</h4>
        </div>
    );
}