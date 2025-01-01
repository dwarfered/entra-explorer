"use client";

import { makeStyles } from "@fluentui/react-components";
import React from "react";

interface MyComponentProps {
  dates: Date[];
}

const useStyles = makeStyles({
  noBullets: {
    listStyleType: "none",
    paddingLeft: 0,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
  },
});

export const DateList = (props: MyComponentProps) => {
  const styles = useStyles();
  return (
    <ul className={styles.noBullets}>
      {props.dates.map((date, index) => (
        <li key={index}>{date.toLocaleString()}</li>
      ))}
    </ul>
  );
};