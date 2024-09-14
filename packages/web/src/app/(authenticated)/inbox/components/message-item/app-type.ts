import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import DiscordImg from '../../../../../../public/app-logo/discord.svg'
import SlackImg from '../../../../../../public/app-logo/slack.svg'
import GitHub from '../../../../../../public/app-logo/github.svg'

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

const AppsProps: Record<string, AppProps> = {
  discord: {
    img: DiscordImg,
    hasInvert: true,
    itemClass: " text-white bg-blue-800",
    buttonBackgroundState: ButtonState.White
  },
  slack: {
    img: SlackImg,
    hasInvert: false,
    itemClass: " text-black bg-white",
    buttonBackgroundState: ButtonState.Black
  },
  gitHub: {
    img: GitHub,
    hasInvert: true,
    itemClass: " text-white bg-black",
    buttonBackgroundState: ButtonState.White
  }
}

const defaultAppProps: AppProps = {
  img: undefined,
  hasInvert: false,
  itemClass: " text-black bg-gray-400",
  buttonBackgroundState: ButtonState.Black
};

export { ButtonState, ButtonColorClasses, AppsProps, defaultAppProps }
export type { AppProps }
