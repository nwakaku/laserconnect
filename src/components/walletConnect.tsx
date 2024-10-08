import { useState } from "react";

import WalletDetails from "./walletdetails";
import ConnectWallet from "./connectWallet";
import { useLaserEyes } from "@omnisat/lasereyes";


export const WalletConnect = () => {
  const {
    connected,
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
