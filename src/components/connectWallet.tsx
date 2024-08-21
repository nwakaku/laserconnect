import React, { FC, useCallback, useMemo } from "react";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { HeartFilledIcon } from "@/components/icons";
import { Chip } from "@nextui-org/chip";
import { LuDownload } from "react-icons/lu";
import {
  useLaserEyes,
  XVERSE,
  UNISAT,
  UnisatLogo,
  OKX,
  LEATHER,
  MAGIC_EDEN,
  OYL,
  PHANTOM,
  WIZZ,
  XverseLogo,
  LeatherLogo,
  MagicEdenLogo,
  OylLogo,
  PhantomLogo,
  WizzLogo,
  OkxLogo,
} from "@omnisat/lasereyes";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

interface WalletItemProps {
  wallet: {
    name: string;
    icon: string | React.FC;
    connectMethod: any;
    hasWallet: boolean;
  };
  onConnect: (wallet: WalletItemProps["wallet"]) => void;
  isSelected: boolean;
}

const WalletItem: React.FC<WalletItemProps> = React.memo(
  ({ wallet, onConnect, isSelected }) => {
    const renderIcon = (icon: string | React.FC) => {
      return typeof icon === "string" ? (
        <Image src={icon} alt="wallet icon" width={15} />
      ) : (
        React.createElement(icon)
      );
    };

    return (
      <li
        onClick={() => onConnect(wallet)}
        className={`flex justify-between items-center font-medium p-2 shadow-sm rounded-lg cursor-pointer hover:ring-1 transition-transform duration-200 ease-in-out transform ${
          isSelected ? "scale-95" : "hover:scale-105"
        }`}>
        <div className="flex justify-start items-center gap-2">
          {renderIcon(wallet.icon)} {wallet.name}
        </div>
        {!wallet.hasWallet && (
          <Chip
            color="default"
            variant="shadow"
            className="text-sm p-2"
            endContent={<LuDownload />}>
            Get Wallet
          </Chip>
        )}
      </li>
    );
  }
);

interface ConnectWalletProps {
  activeWallet: string | null;
  setActiveWallet: (wallet: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({
  activeWallet,
  setActiveWallet,
}) => {
  const {
    connect,
    hasXverse,
    hasUnisat,
    hasLeather,
    hasMagicEden,
    hasOkx,
    hasOyl,
    hasPhantom,
    hasWizz,
  } = useLaserEyes();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const wallets = useMemo(
    () => [
      {
        name: "Xverse",
        icon: XverseLogo,
        connectMethod: XVERSE,
        hasWallet: hasXverse,
      },
      {
        name: "Unisat",
        icon: UnisatLogo,
        connectMethod: UNISAT,
        hasWallet: hasUnisat,
      },
      
      {
        name: "Magic Eden",
        icon: MagicEdenLogo,
        connectMethod: MAGIC_EDEN,
        hasWallet: hasMagicEden,
      },
      { name: "OKX", icon: OkxLogo, connectMethod: OKX, hasWallet: hasOkx },
      { name: "OYL", icon: OylLogo, connectMethod: OYL, hasWallet: hasOyl },
      {
        name: "Phantom",
        icon: PhantomLogo,
        connectMethod: PHANTOM,
        hasWallet: hasPhantom,
      },
      { name: "Wizz", icon: WizzLogo, connectMethod: WIZZ, hasWallet: hasWizz },
    ],
    [
      hasXverse,
      hasUnisat,
      hasLeather,
      hasMagicEden,
      hasOkx,
      hasOyl,
      hasPhantom,
      hasWizz,
    ]
  );

  const { availableWallets, otherWallets } = useMemo(() => {
    const available = wallets.filter((wallet) => wallet.hasWallet);
    const other = wallets.filter((wallet) => !wallet.hasWallet);
    return { availableWallets: available, otherWallets: other };
  }, [wallets]);

  const handleConnect = useCallback(
    (wallet: WalletItemProps["wallet"]) => {
      setActiveWallet(wallet.name);
      connect(wallet.connectMethod);
    },
    [connect, setActiveWallet]
  );

  return (
    <div>
      <Button
        startContent={<HeartFilledIcon className="text-danger" />}
        onPress={onOpen}>
        Connect Wallet
      </Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Choose a wallet
              </ModalHeader>
              <ModalBody>
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-4">
                    {availableWallets.length > 0 && (
                      <>
                        <p className="font-light text-primary text-sm">
                          Available Wallets
                        </p>
                        <ul className="space-y-2">
                          {availableWallets.map((wallet) => (
                            <WalletItem
                              key={wallet.name}
                              wallet={wallet}
                              onConnect={handleConnect}
                              isSelected={activeWallet === wallet.name}
                            />
                          ))}
                        </ul>
                      </>
                    )}
                    {otherWallets.length > 0 && (
                      <>
                        <p className="font-light text-primary text-sm">
                          Other Wallets
                        </p>
                        <ul className="space-y-2">
                          {otherWallets.map((wallet) => (
                            <WalletItem
                              key={wallet.name}
                              wallet={wallet}
                              onConnect={handleConnect}
                              isSelected={activeWallet === wallet.name}
                            />
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <h3 className="font-semibold">About Wallets</h3>
                    <div>
                      <div className="flex items-center py-4 gap-2">
                        <Image src="/Icon.svg" alt="login" width={100} />
                        <div className="flex flex-col ">
                          <p className="font-semibold text-sm">
                            A New Way to Log In
                          </p>
                          <span className="text-sm">
                            Simple-to-use wallet connection library to foster
                            greater developer adoption, which is crucial for the
                            ecosystem's success.
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center py-4 gap-2">
                        <Image src="/btc.svg" alt="wallet" width={100} />
                        <div className="flex flex-col ">
                          <p className="font-semibold text-sm">
                            A New Way to Log In
                          </p>
                          <span className="text-sm">
                            Instead of creating new accounts and passwords on
                            every website, just connect your wallet instead.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConnectWallet;
