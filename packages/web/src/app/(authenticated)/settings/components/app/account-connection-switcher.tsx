import { RotateCw, Trash } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button"

type Props = {
  app: string
  isEnabled: boolean
}

const AccountConnectionSwitcher = ({app, isEnabled}: Props) => {
  return (
    <>
      {isEnabled ?
        (
          <div className='w-full flex flex-col sm:flex-row items-end sm:items-start gap-2'>
            <Button className='w-fit'>
              <Link href={`/settings/${app}`} className='flex items-center gap-1'>
                <RotateCw />
                再連携
              </Link>
            </Button>
            <Button variant={"destructive"} className='w-fit'>
              <Link href={`/settings/delete?app=${app}`} className='flex items-center gap-1'>
                <Trash/>
                連携を削除する
              </Link>
            </Button>
          </div>
        ):
        (
          <div className='w-full flex flex-col items-end sm:items-start'>
            <Button className='w-fit'>
              <Link href={`/settings/${app}`}>
                連携する
              </Link>
            </Button>
          </div>
        )
      }
    </>
  )
}

export default AccountConnectionSwitcher