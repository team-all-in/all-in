import Logo from './logo';

export default function Header() {
  return (
    <header className='fixed top-0 z-40 w-full border-b bg-card/10 p-2 backdrop-blur'>
      <Logo />
    </header>
  );
}
