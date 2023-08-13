import React, { useState, useEffect } from "react";
import TabSwitch from "./TabSwitch";
import BalancerTab from "./BalancerTab";
import CashflowerTab from "./CashflowerTab";
import RecorderTab from "./RecorderTab";
import SetterTab from "./SetterTab";
import TrackerTab from "./TrackerTab";
import BudgeterTab from "./BudgeterTab";

import styles from "./App.module.css";

export default function App() {
  // All cashflow data
  const [data, setData] = useState({});

  // All accounts
  const [accounts, setAccounts] = useState([]);

  // Current tab
  const [currentTab, setCurrentTab] = useState("SetterTab");

  // Listen for init data load
  window.fileSystem.onInitDataLoad((result) => {
    if (result.success && result.hasData) {
      setData(result.data);
    }
  });

  // Listen for init accounts load
  window.fileSystem.onInitAccountsLoad((result) => {
    if (result.success && result.hasData) {
      setAccounts(data);
    }
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(accounts);
  }, [accounts]);

  return (
    <>
      <section className={styles.tabSwitch}>
        <TabSwitch />
      </section>
      <section className={styles.mainSection}>
        <SetterTab show={currentTab === "SetterTab"} />
        <RecorderTab show={currentTab === "RecorderTab"} />
        <CashflowerTab show={currentTab === "CashflowerTab"} />
        <BalancerTab show={currentTab === "BalancerTab"} />
        <TrackerTab show={currentTab === "TrackerTab"} />
        <BudgeterTab show={currentTab === "BudgeterTab"} />
      </section>
    </>
  );
}
