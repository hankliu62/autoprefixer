import useTopWindow from '@/hooks/useTopWindow';
import { Watermark } from '@hankliu/hankliu-ui';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function NoHeaderLayout({ children }: LayoutProps) {
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
          {/* Main content */}
          <main className="flex flex-1 grow-[1] flex-col" style={{ flex: 1 }}>
            {children}
          </main>
        </Watermark>
      </div>
    </>
  );
}
