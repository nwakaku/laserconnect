import { useState } from "react";
import { Button } from "@nextui-org/button";
import { useLaserEyes } from "@omnisat/lasereyes";
import {
  LuAlignJustify,
  LuChevronRight,
  LuCopy,
  LuGem,
  LuLogOut,
} from "react-icons/lu";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Image } from "@nextui-org/image";
import { SiBitcoinsv } from "react-icons/si";
import { FaRandom } from "react-icons/fa";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

// ... (other imports and interface definitions remain the same)
interface WalletDetailsProps {
  balance: number | undefined;
  address: string;
  activeWallet: string | null;
}

const WalletDetails = ({
  balance,
  address,
}: WalletDetailsProps) => {
  const { disconnect, paymentAddress, switchNetwork, network } = useLaserEyes();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [addr, setAddr] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState("main");

  function shortenAddress(address: string) {
    const firstPart = address.slice(0, 6);
    const lastPart = address.slice(-4);
    return `${firstPart}...${lastPart}`;
  }
    
    function copyToClipboard(text: string) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }

  const MainView = () => (
    <div className="flex flex-col items-center space-y-3 p-2 ">
      <div className="p-1 rounded-full bg-violet-500 ">
        <Image
          src="https://avatar.iran.liara.run/public"
          width={70}
          alt="rdm img"
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p>{addr ? "Ordinals Address" : "Payments Address"}</p>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <p className="font-semibold">
            {shortenAddress(addr ? address : paymentAddress)}
          </p>
        </div>

        <p className="text-default-500 text-sm text-center">
          {" "}
          {balance}.00 {network === "mainnet" ?  "BTC" : "tBTC" }
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          startContent={<FaRandom />}
          className="shadow-sm border-1 bg-white font-semibold text-black"
          variant="light"
          onPress={() => {
            setAddr(!addr);
          }}>
          Switch
        </Button>{" "}
        <Button
          startContent={<LuCopy />}
          className="shadow-sm border-1 bg-white font-semibold text-black"
          variant="light"
          onPress={() => copyToClipboard(addr ? address : paymentAddress)}>
          Copy
        </Button>
        <Button
          startContent={<LuLogOut />}
          className="shadow-sm border-1 bg-white text-red-500 font-semibold"
          variant="light"
          onPress={() => {
            disconnect();
          }}>
          Disconnect
        </Button>
      </div>

      <div className="flex flex-col w-full space-y-2 text-black">
        {
          <Dropdown>
            <DropdownTrigger>
              <div className="flex justify-between w-full hover:ring-1 cursor-pointer p-3 shadow-sm bg-white rounded-md">
                <span className="flex items-center gap-4">
                  <SiBitcoinsv size={20} />
                  <p>Bitcoin Mainnet</p>
                </span>

                <LuChevronRight size={20} />
              </div>
            </DropdownTrigger>
            <DropdownMenu className="w-[350px]" aria-label="Static Actions">
              <DropdownItem key="Mainnet">
                <div
                  onClick={async () => {
                    try {
                      await switchNetwork("mainnet"); // or "testnet"
                      // Optionally, add a success alert here
                    } catch (error: any) {
                      alert(`Error switching network: ${error.message}`);
                    }
                  }}
                  className="flex items-center p-2 gap-2">
                  <SiBitcoinsv className="text-[#f7931a]" size={20} />
                  Bitcoin Mainnet
                </div>
              </DropdownItem>
              <DropdownItem key="Testnet ">
                <div
                  onClick={async () => {
                    try {
                      await switchNetwork("testnet"); // or "testnet"
                      // Optionally, add a success alert here
                    } catch (error: any) {
                      alert(`Error switching network: ${error.message}`);
                    }
                  }}
                  className="flex items-center p-2 gap-2 hover:text-default-100">
                  <SiBitcoinsv size={20} />
                  Bitcoin Testnet
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        }
        <div
          className="flex justify-between w-full hover:ring-1 cursor-pointer p-3 shadow-sm bg-white rounded-md"
          onClick={() => setCurrentView("transaction")}>
          <span className="flex items-center gap-4">
            <LuAlignJustify size={20} />
            <p>Transaction</p>
          </span>
          <LuChevronRight size={20} />
        </div>
        <div
          className="flex justify-between w-full hover:ring-1 cursor-pointer p-3 shadow-sm bg-white rounded-md"
          onClick={() => setCurrentView("tokens")}>
          <span className="flex items-center gap-4">
            <LuGem size={20} />
            <p>View Tokens</p>
          </span>
          <LuChevronRight size={20} />
        </div>
      </div>
    </div>
  );

  const TransactionView = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      {/* Add your transaction history content here */}
      <Button onClick={() => setCurrentView("main")}>Back to Main</Button>
    </div>
  );

  const TokensView = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Tokens</h2>
      {/* Add your tokens content here */}
      <Button onClick={() => setCurrentView("main")}>Back to Main</Button>
    </div>
  );

  return (
    <div className="flex items-center gap-4">
      <div
        onClick={onOpen}
        className="flex items-center gap-2 border-1 p-1 pr-4 rounded-xl font-light text-xs shadow-lg cursor-pointer hover:bg-default-100">
        <Image src={`Icon.svg`} alt="walletImg" width={40} />
        <div className="flex flex-col font-medium">
          {shortenAddress(address)}
          <p className="text-default-500">
            {balance}.00 {network === "mainnet" ? "BTC" : "tBTC"}
          </p>
        </div>
        <Modal
          className="bg-default-50"
          isOpen={isOpen}
          onOpenChange={onOpenChange}>
          <ModalContent>
              <ModalBody>
                {currentView === "main" && <MainView />}
                {currentView === "transaction" && <TransactionView />}
                {currentView === "tokens" && <TokensView />}
              </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default WalletDetails;
