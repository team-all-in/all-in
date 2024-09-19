import BackLink from "../components/back-link"
import Image from "next/image"
import DiscordImg from "./assets/discord.svg"
import { Button, buttonVariants } from "~/components/ui/button"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"


export default function Success() {
  const appName = "Discrod"
  return (
    <div className="bg-indigo-600 h-screen -mt-14">
      <div className="pt-14 h-full relative">
        <BackLink
          href="/settings"
          place="設定"
          textColor="white"
        />
        <div className="flex flex-col items-center w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={DiscordImg}
            alt="appIcon"
            height={320}
          />
          <p className="text-5xl mb-8 text-white">{appName}との連携が完了しました</p>
          <Button variant={"outline"}>
            <Link href={"/"} className={buttonVariants({ variant: 'link' })}>
              メッセージ一覧を見る
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}