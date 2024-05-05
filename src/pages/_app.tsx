import '@/styles/globals.css';
import 'nprogress/nprogress.css';
// 页面滚动元素动画
import 'aos/dist/aos.css';
// footer组件
import '@hankliu/rc-footer/assets/index.css';
// exception组件
import '@hankliu/rc-exception/assets/index.css';

import { ConfigProvider } from '@hankliu/hankliu-ui';
import zhCN from '@hankliu/hankliu-ui/lib/locale/zh_CN';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { ReactElement, ReactNode } from 'react';

import DefaultLayout from '@/layouts/index';
import { getRoutePrefix } from '@/utils/route';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

/**
 * 网站入口APP类
 * @param param0
 * @returns
 */
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <>
      <Head>
        <title>CSS 兼容性处理 - H.L Toolkits</title>
        <link rel="icon" href={`${getRoutePrefix()}/favicon.ico`} />
        <meta
          name="description"
          content="CSS 兼容性处理是确保网站在不同浏览器和设备上都能够良好显示和运行的关键步骤。通过在线 CSS 兼容性处理，可以让网站更具魅力和稳定性，使其在各种环境下都能够提供出色的用户体验。"
        />
        <meta
          name="keywords"
          content="autoprefixer,CSS 兼容性处理,兼容性处理,toolkit,toolkits,前端开发,前端开发工具,前端开发工具集合,在线工具,toolbox,frontend,卡鲁秋,Hank,HankLiu"
        />
        <meta name="author" content="Hank.Liu" />
      </Head>

      {getLayout(
        <ConfigProvider locale={zhCN}>
          <Component {...pageProps} />
        </ConfigProvider>,
      )}
    </>
  );
}
