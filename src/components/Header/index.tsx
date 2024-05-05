import classNames from 'classnames';

import { PageSubTitle, PageTitle } from '@/constants';

import SolarEclipse from './solar-eclipse';

export interface IHeaderProps {
  className?: string;
}

/**
 * 网页头部
 */
export default function Header({ className }: IHeaderProps) {
  return (
    <header
      className={classNames(
        'group relative flex h-[520px] items-center justify-center overflow-hidden bg-black',
        {
          [className]: className,
        },
      )}
    >
      {/* 背景 */}
      <div className="header-bg absolute inset-0 z-[0] blur-[0]">
        <SolarEclipse />
      </div>

      {/* 右侧的球 */}
      <div className="earth absolute inset-[auto_auto_0_0] z-[1] aspect-[1_/_1] h-[62px] w-full rounded-[50%_50%_0_0] bg-white/10 shadow-[0_5px_24px_0-hsl(0deg_0%_15%_/_10%)] backdrop-blur-[5px] transition-all duration-500 ease-[cubic-bezier(.5,_0,_0,_1)] group-hover:right-[-45%] group-hover:top-[15%] group-hover:w-[110%] md:inset-[20%_-40%_auto_auto] md:h-auto" />
      {/* 流星 */}
      <div className="stars-wrapper absolute left-0 top-0 h-full w-full -rotate-[135deg]">
        <div className="flex h-full w-full animate-[about-starts_10s_linear_infinite] flex-col justify-around">
          <div className="before:contents-[''] before:rounded-1/2 flex h-[2px] w-[120px] items-center bg-gradient-to-r from-[rgb(255_255_255_/_30%)] to-[rgb(255_255_255_/_0%)] before:h-[2px] before:w-[2px] before:bg-white" />
          <div className="before:contents-[''] before:rounded-1/2 ml-[100%] flex h-[2px] w-[120px] items-center bg-gradient-to-r from-[rgb(255_255_255_/_30%)] to-[rgb(255_255_255_/_0%)] before:h-[2px] before:w-[2px] before:bg-white" />
          <div className="before:contents-[''] before:rounded-1/2 ml-[-5%] flex h-[2px] w-[120px] items-center bg-gradient-to-r from-[rgb(255_255_255_/_30%)] to-[rgb(255_255_255_/_0%)] before:h-[2px] before:w-[2px] before:bg-white" />
          <div className="before:contents-[''] before:rounded-1/2 ml-[35%] flex h-[2px] w-[120px] items-center bg-gradient-to-r from-[rgb(255_255_255_/_30%)] to-[rgb(255_255_255_/_0%)] before:h-[2px] before:w-[2px] before:bg-white" />
          <div className="before:contents-[''] before:rounded-1/2 ml-[-35%] flex h-[2px] w-[120px] items-center bg-gradient-to-r from-[rgb(255_255_255_/_30%)] to-[rgb(255_255_255_/_0%)] before:h-[2px] before:w-[2px] before:bg-white" />
        </div>
      </div>

      {/* 标题 */}
      <div className="relative z-10 px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <h1 className="toolkits-title animate__animated animate__bounceInDown group/title select-none tracking-tight hover:cursor-pointer">
          <span className="block cursor-pointer text-center font-[about-title] text-4xl font-bold text-white hover:animate-[title-blur-change_2s_ease-out_forwards] sm:text-5xl lg:text-6xl">
            {PageTitle}
          </span>

          <svg className="hidden" width="0" height="0">
            <filter id="filter">
              <feTurbulence
                id="turbulence"
                type="fractalNoise"
                baseFrequency=".03 .03"
                numOctaves="20"
              />
              <feDisplacementMap in="SourceGraphic" scale="70" />
            </filter>
          </svg>
        </h1>

        <div className="animate__animated animate__bounceInLeft mx-auto mt-6 max-w-2xl break-all text-center text-xl text-white/80 sm:max-w-3xl">
          {PageSubTitle}
        </div>
      </div>
    </header>
  );
}
