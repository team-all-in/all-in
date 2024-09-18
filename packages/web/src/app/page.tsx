import Logo from '~/components/common/header/logo';
import FooterLinkList from './components/footer-link/link-list';
import LoginForm from './components/get-starded/login-form';

export default function Home() {
  return (
    <div className='grid min-h-dvh grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20'>
      <header className='flex flex-col items-center gap-4'>
        <h1>
          <Logo />
        </h1>
        <h2>すべての会話を、ひとつの場所に。</h2>
      </header>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <LoginForm />
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        <FooterLinkList />
      </footer>
    </div>
  );
}
