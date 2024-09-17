import FooterLinkItem from './link-item';

const itemList: {
  href: string;
  text: string;
}[] = [
  {
    href: 'https://github.com/team-all-in/all-in',
    text: 'GitHub',
  },
  {
    href: 'https://docs.google.com/presentation/d/1ufXQzxkTj8J199yQqRH4xEdtk68o8Xm07cAA5hsaqF4/edit?hl=ja#slide=id.g28aa48714f9_0_20',
    text: 'Slides',
  },
  {
    href: 'https://x.com/tech_summercamp/status/1835584588443451458',
    text: 'X',
  },
];

export default function FooterLinkList() {
  return (
    <>
      {itemList.map(item => (
        <FooterLinkItem key={item.href} href={item.href} text={item.text} />
      ))}
    </>
  );
}
