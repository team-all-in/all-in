import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import DiscordImg from './assets/discord.svg';
import GitHub from './assets/github.svg';
import SlackImg from './assets/slack.svg';

enum ButtonState {
  Black = 0,
  White = 1,
}

const ButtonColorClasses: Record<ButtonState, string> = {
  [ButtonState.Black]: ' bg-black text-white',
  [ButtonState.White]: ' bg-white text-black',
};

type AppProps = {
  img: string | StaticImport | undefined;
  hasInvert: boolean;
  itemClass: string;
  buttonBackgroundState: ButtonState;
};

const AppsProps: Record<string, AppProps> = {
  discord: {
    img: DiscordImg,
    hasInvert: true,
    itemClass: ' text-white bg-blue-800',
    buttonBackgroundState: ButtonState.White,
  },
  slack: {
    img: SlackImg,
    hasInvert: false,
    itemClass: ' text-black bg-white',
    buttonBackgroundState: ButtonState.Black,
  },
  github: {
    img: GitHub,
    hasInvert: true,
    itemClass: ' text-white bg-black',
    buttonBackgroundState: ButtonState.White,
  },
};

const defaultAppProps: AppProps = {
  img: undefined,
  hasInvert: false,
  itemClass: ' text-black bg-gray-400',
  buttonBackgroundState: ButtonState.Black,
};

export { AppsProps, ButtonColorClasses, ButtonState, defaultAppProps };
export type { AppProps };
