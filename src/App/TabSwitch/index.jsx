import React from "react";
import Button from "../Components/Button";
import ButtonGroup from "../Components/ButtonGroup";
import styles from "./index.module.css";

export default function TabSwitch() {
  return (
    <section className={styles.tabSwitch}>
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>
    </section>
  );
}
