import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import DiscordImg from './assets/discord.svg';
import GitHub from './assets/github.svg';
import SlackImg from './assets/slack.svg';

enum ButtonState {
  Black = 0,
  White = 1,
}

const ButtonColorClasses: Record<ButtonState, string> = {
  [ButtonState.Black]: ' bg-black text-white hover:bg-black/70',
  [ButtonState.White]: ' bg-white text-black hover:bg-white/70',
};

type AppProps = {
  img: string | StaticImport | undefined;
  iconBackgroundColorClass: string;
  hasInvert: boolean;
  itemClass: string;
  buttonBackgroundState: ButtonState;
};

const AppsProps: Record<string, AppProps> = {
  discord: {
    img: DiscordImg,
    iconBackgroundColorClass: 'white',
    hasInvert: true,
    itemClass: ' text-white bg-blue-800',
    buttonBackgroundState: ButtonState.White,
  },
  slack: {
    img: SlackImg,
    iconBackgroundColorClass: 'white',
    hasInvert: false,
    itemClass: ' text-black bg-white',
    buttonBackgroundState: ButtonState.Black,
  },
  github: {
    img: GitHub,
    iconBackgroundColorClass: 'background',
    hasInvert: true,
    itemClass: ' text-white bg-black',
    buttonBackgroundState: ButtonState.White,
  },
};

const defaultAppProps: AppProps = {
  img: undefined,
  iconBackgroundColorClass: 'primary',
  hasInvert: false,
  itemClass: ' text-black bg-gray-400',
  buttonBackgroundState: ButtonState.Black,
};

export { AppsProps, ButtonColorClasses, ButtonState, defaultAppProps };
export type { AppProps };
