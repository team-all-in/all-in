import Image from "next/image";
import { Button } from "~/components/ui/button";
import LogoImg from "../../../../assets/logo.png";
import SettingIcon from "../../../../assets/setting-icon.png"
import Link from "next/link";

export const headerHeight = 56

export default function Header({}) {
  const style = {
    height: headerHeight
  }

  return (
    <header className="flex items-center justify-between border-b bg-white backdrop-blur  py-2 px-4 z-40" style={style}>
      <Image
        src={LogoImg}
        alt="ALL-INのロゴ"
      />

      <nav className=" flex items-center">
        <Button variant="ghost" size="icon">
          <Link href="/settings">
            <Image
              src={SettingIcon}
              alt="settingのicon"
            />
          </Link>
        </Button>
      </nav>
    </header>
  );
}
