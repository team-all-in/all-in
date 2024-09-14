import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import DiscordImg from '../../../../../../public/app-logo/discord.svg'
import SlackImg from '../../../../../../public/app-logo/slack.svg'
import GitHub from '../../../../../../public/app-logo/github.svg'

enum AppType {
  Discord,
  Slack,
  GitHub
}

enum ButtonState {
  Black,
  White
}

const ButtonColorClasses: Record<ButtonState, string> = {
  [ButtonState.Black] : " bg-black text-white",
  [ButtonState.White] : " bg-white text-black"
}

type AppProps = {
  img: string | StaticImport | undefined,
  hasInvert: boolean,
  itemClass: string,
  buttonBackgroundState: ButtonState
}

const AppsProps: Record<AppType, AppProps> = {
  [AppType.Discord]: {
    img: DiscordImg,
    hasInvert: true,
    itemClass: " text-white bg-blue-800",
    buttonBackgroundState: ButtonState.White
  },
  [AppType.Slack]: {
    img: SlackImg,
    hasInvert: false,
    itemClass: " text-black bg-white",
    buttonBackgroundState: ButtonState.Black
  },
  [AppType.GitHub]: {
    img: GitHub,
    hasInvert: true,
    itemClass: " text-white bg-black",
    buttonBackgroundState: ButtonState.White
  }
}

export {
  AppType, ButtonState, ButtonColorClasses, AppsProps
}
export type { AppProps }
