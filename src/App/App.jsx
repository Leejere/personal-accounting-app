import React, { useState, useEffect } from "react";
import TabSwitch from "./TabSwitch";

export default function App() {
  // All cashflow data
  const [data, setData] = useState({});

  // All accounts
  const [accounts, setAccounts] = useState([]);

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

  return <TabSwitch />;
}
