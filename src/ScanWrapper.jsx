import React, { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const ScannerWrapper = ({ onScan, isActive }) => {
  const [activeStatus, setActiveStatus] = useState(isActive);

  useEffect(() => {
    return () => {
        setActiveStatus(isActive);
      if (!isActive) {
        console.log("Scanner unmounted or inactive.");
        
      }
    };
  }, [isActive]);

  return activeStatus ? <Scanner onScan={onScan} /> : null;
};

export default ScannerWrapper;
