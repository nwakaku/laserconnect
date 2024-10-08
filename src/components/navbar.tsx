import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  SearchIcon,
} from "@/components/icons";
import { WalletConnect } from "./walletConnect";
import { Image } from "@nextui-org/image";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/">
            
            <Image src="/logo.png" alt="home" width={150} />
          </Link>
        </NavbarBrand>
        
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end">
        <NavbarItem className="hidden sm:flex gap-2">{searchInput}</NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitch />{" "}
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <WalletConnect/>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden basis-1 pl-4" justify="end">
        <WalletConnect/>
      </NavbarContent>
    </NextUINavbar>
  );
};
