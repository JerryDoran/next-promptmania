import Navbar from '@components/Navbar';
import Provider from '@components/Provider';
import '@styles/globals.css';

export const metadata = {
  title: 'Promptmania',
  description: 'Discover and share AI prompts',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>
          <Navbar />
          <Provider />
          {children}
        </main>
      </body>
    </html>
  );
}
