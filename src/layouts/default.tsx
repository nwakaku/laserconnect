import { Link } from "@nextui-org/link";

import { Navbar } from "@/components/navbar";
import { GiQueenCrown } from "react-icons/gi";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://forms.gle/wX4eFPw1PakM4RD78"
          title="nextui.org homepage">
          <span className="text-default-600">Jesus Christ</span>
          <p className="text-primary">The King</p>
          <GiQueenCrown color="gold" />
        </Link>
      </footer>
    </div>
  );
}
