import MessageItem from './components/message-item';
import { getMessages } from './data/getMessages';
import DiscordImg from '../../../../public/app-logo/discord.svg'
import { AppType } from './components/message-item/app-type';
import { LabelType } from './components/message-item/label-type';

export default async function Inbox() {
  const messages = await getMessages();
  console.log('messages', messages);

  return (
    <div className='h-dvh space-y-2 overflow-y-auto p-3 pt-32 sm:pt-14'>
      <MessageItem app={AppType.Slack} user={{img: DiscordImg, name: "natanuki"}} labelType={LabelType.High} message='かつて、静かな村に一人の賢者が住んでいました。彼は村の人々から信頼され、いつも困ったときには助けを求められていました。賢者は知恵を持ち、その知恵を使って多くの問題を解決しました。しかし、ある日突然、村に大きな嵐がやってきました。嵐は村の家々を倒し、畑を荒らし、人々は困り果てました。そんな時、村人たちは賢者のもとに集まり、助けを求めました。' />
      <MessageItem app={AppType.Discord} user={{img: DiscordImg, name: "natanuki"}} labelType={LabelType.Middle} message='かつて、静かな村に一人の賢者が住んでいました。彼は村の人々から信頼され、いつも困ったときには助けを求められていました。賢者は知恵を持ち、その知恵を使って多くの問題を解決しました。しかし、ある日突然、村に大きな嵐がやってきました。嵐は村の家々を倒し、畑を荒らし、人々は困り果てました。そんな時、村人たちは賢者のもとに集まり、助けを求めました。' />
      <MessageItem app={AppType.GitHub} user={{img: DiscordImg, name: "natanuki"}} labelType={LabelType.Row} message='かつて、静かな村に一人の賢者が住んでいました。彼は村の人々から信頼され、いつも困ったときには助けを求められていました。賢者は知恵を持ち、その知恵を使って多くの問題を解決しました。しかし、ある日突然、村に大きな嵐がやってきました。嵐は村の家々を倒し、畑を荒らし、人々は困り果てました。そんな時、村人たちは賢者のもとに集まり、助けを求めました。' />
    </div>
  );
}
