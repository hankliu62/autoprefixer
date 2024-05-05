import AOS from 'aos';
import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Tooltip, message, Button, Input, Breadcrumb } from '@hankliu/hankliu-ui';
import { CiOutlined, CopyrightOutlined, InfoCircleOutlined } from '@hankliu/icons';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MirrorEditor = dynamic(import('@hankliu/rc-mirror-editor'), {
  ssr: false,
});

const CSSDemo = `.hl-box {
  display: grid;
  transition: all .5s;
  user-select: none;
  background: linear-gradient(to bottom, white, black);
}
`;

/**
 * CSS 兼容性处理
 *
 * @returns
 */
export default function Index() {
  const [content, setContent] = useState<string>(CSSDemo);
  const [prefixedContent, setPrefixedContent] = useState<string>();
  const [fetching, setFetching] = useState<boolean>(false);
  const [browserList, setBrowserList] = useState<string>('last 4 version');
  const router = useRouter();

  useEffect(() => {
    AOS.init();
  }, []);

  const textPrepare = (text = '') => {
    return text.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
  };

  const onRunPrefixer = async () => {
    const inputCSS = content;
    const params = {
      overrideBrowserslist: browserList,
      grid: 'autoplace' as any,
    };

    try {
      setFetching(true);
      const autoPrefixerPlugin = autoprefixer(params);
      const compiled = await postcss([autoPrefixerPlugin]).process(inputCSS);
      setPrefixedContent(textPrepare(compiled.css));
    } catch (error) {
      setPrefixedContent('');
      message.error('CSS 兼容性处理失败');
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="relative w-full text-white/75">
      {!!router.query?.['with-breadcrumb'] && (
        <Breadcrumb className="!m-6 !text-base" separator="/">
          <Breadcrumb.Item>
            <Link href="https://hankliu62.github.io/toolkits/">小工具集合</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>天气预报</Breadcrumb.Item>
        </Breadcrumb>
      )}

      <div className="relative z-20 mx-auto mt-6 w-full max-w-[1920px]">
        <div className="flex flex-col flex-wrap">
          {/* CSS 兼容性处理 */}
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            className="info-card group relative flex w-full flex-col content-between justify-between gap-[24px] overflow-hidden rounded-[4px] p-[24px] ease-in"
          >
            <Card bordered className="relative shadow-lg">
              <Tooltip title="CSS 兼容性处理">
                <div className="absolute top-0 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded bg-[#1677ff]">
                  <CopyrightOutlined className="text-[20px] text-white" />
                </div>
              </Tooltip>
              <div className="relative pt-4">
                <div className="flex flex-col justify-start">
                  <label className="text-xl font-medium">输入 CSS 代码开始处理</label>
                  <div className="mt-2 w-full">
                    <MirrorEditor
                      height={500}
                      value={content}
                      language="css"
                      onChange={(val) => {
                        setContent(val);
                      }}
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col justify-start">
                  <div className="flex items-center justify-start">
                    <label className="mr-4 text-xl font-medium">过滤浏览器</label>
                    <Link
                      className="text-xl font-medium text-[#1677ff]"
                      href="https://browsersl.ist/"
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      https://browsersl.ist
                    </Link>
                  </div>
                  <div className="mt-2 w-full">
                    <Input
                      size="medium"
                      value={browserList}
                      onChange={(e) => {
                        setBrowserList(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-start">
                  <Button size="medium" type="primary" onClick={onRunPrefixer}>
                    开始处理
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* 处理结果 */}
          {!!prefixedContent && (
            <div className="info-card group relative flex w-full flex-col content-between justify-between gap-[24px] overflow-hidden rounded-[4px] p-[24px] ease-in">
              <Card bordered className="relative shadow-lg">
                <Tooltip title="CSS 兼容性处理成功">
                  <div className="absolute top-0 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded bg-[#1677ff]">
                    <CiOutlined className="text-[20px] text-white" />
                  </div>
                </Tooltip>
                <div className="relative flex flex-col pt-4">
                  {fetching ? (
                    <Skeleton className="w-full" active />
                  ) : (
                    <MirrorEditor height={500} value={prefixedContent} language="css" readOnly />
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* 使用说明 */}
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            className="info-card group relative flex w-full flex-col content-between justify-between gap-[24px] overflow-hidden rounded-[4px] p-[24px] ease-in"
          >
            <Card bordered className="relative shadow-lg">
              <Tooltip title="使用说明">
                <div className="absolute top-0 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded bg-[#1677ff]">
                  <InfoCircleOutlined className="text-[20px] text-white" />
                </div>
              </Tooltip>
              <div className="relative grid grid-cols-1 gap-4 pt-4">
                <div className="text-base">
                  在线 CSS 兼容性处理，用于解析您的 CSS 并自动添加浏览器兼容性前缀。
                </div>
                <div className="text-base">
                  CSS
                  兼容性处理是确保网站在不同浏览器和设备上都能够良好显示和运行的关键步骤。通过在线
                  CSS
                  兼容性处理，可以让网站更具魅力和稳定性，使其在各种环境下都能够提供出色的用户体验。
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
