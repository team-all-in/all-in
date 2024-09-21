import DiscordImg from './assets/discord.svg';
import GitHubLightImg from './assets/github.svg';
import SlackImg from './assets/slack.svg';

const AppType = [
  {
    type: 'discord',
    name: 'Discrod',
    img: DiscordImg,
    backgroundColorClass: 'bg-indigo-600',
    textColor: 'white',
  },
  {
    type: 'slack',
    name: 'Slack',
    img: SlackImg,
    backgroundColorClass: 'bg-white',
    textColor: 'black',
  },
  {
    type: 'github',
    name: 'GitHub',
    img: GitHubLightImg,
    backgroundColorClass: 'bg-background',
    textColor: 'black',
  },
];

export default AppType;
