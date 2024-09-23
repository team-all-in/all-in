import Logo from './logo';

export default function Header() {
  return (
    <header className='fixed top-0 z-40 flex w-full border-b bg-card/10 p-4 backdrop-blur'>
      <Logo />
    </header>
  );
}
