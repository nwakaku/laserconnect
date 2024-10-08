import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { WalletConnect } from "@/components/walletConnect";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useLaserEyes } from "@omnisat/lasereyes";
import { Input } from "@nextui-org/input";
import { LuCopy } from "react-icons/lu";
import { useState } from "react";

export default function IndexPage() {
  
  const [message, setMessage] = useState<string>("");
  const [currentNetwork, setCurrentNetwork] = useState("mainnet");

  const {
    connected,
    address,
    paymentAddress,
    publicKey,
    paymentPublicKey,
    balance,
    network,
    disconnect,
    sendBTC,
    signMessage,
    switchNetwork,
    signPsbt,
    pushPsbt,
    provider
  } = useLaserEyes();

  function shortenAddress(address: string) {
    const firstPart = address.slice(0, 6);
    const lastPart = address.slice(-5);
    return `${firstPart}...${lastPart}`;
  }

  //
   const handleSend = async () => {
     const recipientAddress = "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq";
     const amountInSatoshis = 100000; // 0.001 BTC

     try {
       const txId = await sendBTC(recipientAddress, amountInSatoshis);
       console.log("Transaction sent successfully. Transaction ID:", txId);
     } catch (error) {
       alert("Error sending BTC: " );
     }
   };

   const SignMsg = async () => {
     const messageToSign = "Hello, Bitcoin!";
     try {
       const signature = await signMessage(messageToSign);
       setMessage(signature);
       console.log("Message signed successfully. Signature:", signature);
     } catch (error) {
       alert("Error signing message: " );
     }
   };

   const switchNet = async () => {
     const targetNetwork = currentNetwork === "mainnet" ? "testnet" : "mainnet";

     try {
       await switchNetwork(targetNetwork); // replace with your actual network switching logic
       console.log(`Successfully switched to ${targetNetwork}`);
       setCurrentNetwork(targetNetwork);
     } catch (error) {
       alert(`Error switching to ${targetNetwork}: }`);
     }
   };

   const handleSignPsbt = async () => {
     const psbtHex = "70736274ff01..."; // Your PSBT hex string

     try {
       const result = await signPsbt(psbtHex, true, false);

       if (result) {
         const { signedPsbtHex, signedPsbtBase64, txId } = result;

         console.log("Signed PSBT (hex):", signedPsbtHex);
         console.log("Signed PSBT (Base64):", signedPsbtBase64);
         if (txId) {
           console.log("Transaction ID:", txId);
         }
       } else {
         alert("Error: signPsbt returned undefined");
       }
     } catch (error) {
       alert("Error signing PSBT: " );
     }
   };

   const handlePushPsbt = async () => {
     const signedPsbtHex = "70736274ff01..."; // Your signed PSBT hex string

     try {
       const txId = await pushPsbt(signedPsbtHex);
       if (txId) {
         console.log("Transaction successfully pushed. Transaction ID:", txId);
       } else {
         alert("Transaction push failed or was cancelled.");
       }
     } catch (error) {
       alert("Error pushing PSBT: " );
     }
   };
  
  return (
    <DefaultLayout>
      {!connected ? (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title()}>An&nbsp;</h1>
            <h1 className={title({ color: "violet" })}>interactive&nbsp;</h1>
            <br />
            <h1 className={title()}>
              page demonstrating Laser Eyes functionality.
            </h1>
            <h4 className={subtitle({ class: "mt-4" })}>
              Beautiful, fast and modern. Click below 👇.
            </h4>
          </div>

          <div className="flex gap-3">
            <WalletConnect />
          </div>

          <div className="mt-8">
            <Snippet hideCopyButton hideSymbol variant="bordered">
              <span>
                Get started by{" "}
                <Code color="primary">npm install @omnisat/lasereyes</Code>
              </span>
            </Snippet>
          </div>
        </section>
      ) : (
        <div className="flex flex-col space-y-2">
          <h3 className="text-3xl font-semibold">PlayGround</h3>
          <p className="text-sm">
            A complete toolkit for connecting wallets to apps, UI components
            that work out of the box, an interactive example page demonstrating
            Laser Eyes functionality.
          </p>
          <Card>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-2">
              <p className="text-tiny uppercase font-bold">
                Wallet Modal Button
              </p>
              <WalletConnect />
              {/* <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">Frontend Radio</h4> */}
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap lg:flex-nowrap gap-2">
                <div className="lg:basis-1/3 flex-col space-y-2">
                  <p className="text-tiny uppercase font-bold">
                    Functionalities
                  </p>
                  <Card>
                    <CardBody>
                      <div className="flex flex-col space-y-4">
                        <div className="flex justify-between gap-4">
                          <Button className="w-full lg:p-8 font-bold bg-[#FF0000]">
                            Connect Wallet
                          </Button>
                          <Button
                            onPress={disconnect}
                            className="w-full lg:p-8 font-bold bg-[#FF8E00]">
                            Disconnect Wallet
                          </Button>
                        </div>
                        <div className="flex justify-between gap-3">
                          <Button
                            onClick={switchNet}
                            className="w-full lg:p-8 font-bold bg-[#FFFF00]">
                            Switch to{" "}
                            {currentNetwork === "mainnet"
                              ? "Testnet"
                              : "Mainnet"}
                          </Button>
                          <Button
                            onPress={handleSend}
                            className="w-full lg:p-8 font-bold bg-[#008E00]">
                            Send BTC
                          </Button>
                        </div>
                        <div className="flex justify-between gap-3">
                          <Button
                            onPress={SignMsg}
                            className="w-full lg:p-8 font-bold bg-[#00C0C0]">
                            SignMessage
                          </Button>
                          <Button
                            onPress={handleSignPsbt}
                            className="w-full lg:p-8 font-bold bg-[#400098]">
                            SignPsbt
                          </Button>
                        </div>
                        <div className="flex justify-between gap-3">
                          <Button
                            onPress={handlePushPsbt}
                            className="w-full lg:p-8 font-bold bg-[#8E008E]">
                            PushPsbt
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <div className="lg:basis-2/3 w-full space-y-2">
                  <div className="flex w-full justify-between">
                    <p className="text-tiny uppercase font-bold">
                      Wallet : {provider}
                    </p>
                    <p className="text-tiny uppercase font-bold">
                      NetWork : {network}
                    </p>
                  </div>

                  <Card>
                    <CardBody className="flex flex-wrap flex-row justify-center gap-4">
                      <div className="flex flex-col items-center justify-center space-y-4 w-fit text-start ring-1 p-4 rounded-md">
                        <div className="flex flex-wrap lg:flex-nowrap w-full gap-4">
                          <div className="flex flex-col cursor-point">
                            <p>Address (Tap Root)</p>

                            <Input
                              isReadOnly
                              type="text"
                              endContent={<LuCopy />}
                              variant="bordered"
                              defaultValue={shortenAddress(address)}
                              className="max-w-sm cursor-pointer"
                              size="lg"
                              radius="sm"
                            />
                          </div>
                          <div className="flex flex-col cursor-point">
                            <p>Payment Address</p>
                            <Input
                              isReadOnly
                              type="text"
                              endContent={<LuCopy />}
                              variant="bordered"
                              defaultValue={shortenAddress(paymentAddress)}
                              className="max-w-sm cursor-pointer"
                              size="lg"
                              radius="sm"
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap lg:flex-nowrap w-full gap-4">
                          <div className="flex flex-col cursor-point">
                            <p>Public Key</p>
                            <Input
                              isReadOnly
                              type="text"
                              endContent={<LuCopy />}
                              variant="bordered"
                              defaultValue={shortenAddress(publicKey)}
                              className="max-w-sm cursor-pointer"
                              size="lg"
                              radius="sm"
                            />
                          </div>
                          <div className="flex flex-col cursor-point">
                            <p>Payment Public Key</p>
                            <Input
                              isReadOnly
                              type="text"
                              endContent={<LuCopy />}
                              variant="bordered"
                              defaultValue={shortenAddress(paymentPublicKey)}
                              className="max-w-sm cursor-pointer"
                              size="lg"
                              radius="sm"
                            />
                          </div>
                        </div>
                        {/* // */}
                        <div className="flex flex-col justify-center items-center w-full gap-4">
                          <div className=" flex-col">
                            <p>Balance</p>
                            <div>
                              {balance}.00{" "}
                              {network === "mainnet" ? "BTC" : "tBTC"}
                            </div>
                          </div>
                          <div className="text-center flex flex-col">
                            <p>Signature</p>
                            <Input
                              isReadOnly
                              type="text"
                              endContent={<LuCopy />}
                              variant="bordered"
                              defaultValue={message ? message : "---"}
                              className="max-w-sm cursor-pointer"
                              size="lg"
                              radius="sm"
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap lg:flex-nowrap w-full gap-4">
                          <div className="flex flex-col cursor-point">
                            <p>Unsigned PSBT</p>
                            <Input
                              isReadOnly
                              type="text"
                              endContent={<LuCopy />}
                              variant="bordered"
                              defaultValue={"---"}
                              className="max-w-sm cursor-pointer"
                              size="lg"
                              radius="sm"
                            />
                          </div>
                          <div className="flex flex-col cursor-point">
                            <p>Signed PSBT</p>
                            <Input
                              isReadOnly
                              type="text"
                              endContent={<LuCopy />}
                              variant="bordered"
                              defaultValue={"---"}
                              className="max-w-sm cursor-pointer"
                              size="lg"
                              radius="sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center ">
                        <Image
                          src="https://i.giphy.com/ykvRcYBJBiQwg.webp"
                          width={250}
                          alt="kk"
                        />
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </DefaultLayout>
  );
}
