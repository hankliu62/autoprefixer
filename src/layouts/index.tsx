import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import useTopWindow from '@/hooks/useTopWindow';
import { Watermark } from '@hankliu/hankliu-ui';

const Footer = dynamic(() => import('@hankliu/rc-footer'), {
  ssr: false,
});

const Header = dynamic(() => import('@/components/Header'), {
  ssr: false,
});

interface LayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: LayoutProps) {
  const router = useRouter();
  const isTop = useTopWindow();

  return (
    <>
      <div
        className="flex h-full min-h-[100vh] w-full flex-col"
        style={{ flexDirection: 'column', minHeight: '100vh' }}
      >
        <Watermark
          content={isTop ? 'HankLiu CSS Autoprefixer' : ''}
          font={{ color: 'rgba(0, 0, 0, 0.1)' }}
          className="flex h-full flex-1 flex-col"
          zIndex={21}
        >
          {/* header */}
          <Header />

          {/* Main content */}
          <main className="flex flex-1 grow-[1] flex-col" style={{ flex: 1 }}>
            {children}
          </main>

          {/* footer */}
          {!!(isTop || router.query?.['with-header']) && <Footer />}
        </Watermark>
      </div>
    </>
  );
}
