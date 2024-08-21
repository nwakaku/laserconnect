import React, { FC, useEffect, useState } from "react";
import { Image } from "@nextui-org/image";

import WalletDetails from "./walletdetails";
import ConnectWallet from "./connectWallet";
import { useLaserEyes } from "@omnisat/lasereyes";

// Define the type for wallet items
type Wallet = {
  name: string;
  icon: string | FC<any>; // icon can be either a string (image path) or a React component
  connectMethod: any;
  hasWallet: boolean;
};

export const WalletConnect = () => {
  const {
    connect,
    connected,
    disconnect,
    address,
    balance,
    
  } = useLaserEyes();

      const [activeWallet, setActiveWallet] = useState<string | null>(null);





  return (
    <div>
      {!connected ? (
        <ConnectWallet
          activeWallet={activeWallet}
          setActiveWallet={setActiveWallet}
        />
      ) : (
        <WalletDetails
          address={address}
          balance={balance}
          activeWallet={activeWallet}
        />
      )}
    </div>
  );
};
