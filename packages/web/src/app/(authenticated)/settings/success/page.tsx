"use client"

import BackLink from "../components/back-link"
import Image from "next/image"
import { Button, buttonVariants } from "~/components/ui/button"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import AppType from "./appType"


export default function Success() {
  const searchParams = useSearchParams();
  const getAppNameParams = searchParams.get("appName")
  const app = AppType.find((app) => app.type == getAppNameParams)

  return (
    app ?
    <div
      className={`h-screen -mt-14 ${app.backgroundColorClass}`}
    >
      <div className="pt-14 h-full relative">
        <BackLink
          href="/settings"
          place="設定"
          textColor={app.textColor}
        />
        <div className="flex flex-col items-center w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={app.img}
            alt="appIcon"
            height={320}
          />
          <p
            className={`text-5xl mb-8 text-${app.textColor}`}
          >
            {app.name}との連携が完了しました
          </p>
          <Button variant={"outline"} className="bg-white">
            <Link href={"/"} className={buttonVariants({ variant: 'link' })}>
              <span className="text-black">
                メッセージ一覧を見る
              </span>
              <ArrowRightIcon color="black" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
    :
    <div>
      <h1>認証されたアプリが見つかりません</h1>
    </div>
  )
}