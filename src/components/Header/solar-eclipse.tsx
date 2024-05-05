import classNames from 'classnames';

interface ISolarEclipseProps {
  className?: string;
}

const SolarEclipse = ({ className }: ISolarEclipseProps) => {
  return (
    <div
      className={classNames(
        'orbit relative m-[240px_auto] h-[500px] w-[500px] -rotate-45 animate-[linear_sunrise_infinite_var(--animation-speed)] md:m-[120px_auto] md:h-[700px] md:w-[700px] lg:h-[980px] lg:w-[980px] xl:h-[1200px] xl:w-[1200px] 2xl:h-[1400px] 2xl:w-[1400px]',
        {
          [className]: className,
        },
      )}
    >
      <div
        className={classNames(
          'solar-eclipse relative h-[240px] w-[240px] overflow-hidden transition-transform',
          "before:absolute before:left-1/2 before:top-1/2 before:-m-[120px] before:h-[240px] before:w-[240px] before:animate-[rotate_8.6s_ease-in-out_infinite] before:opacity-50 before:mix-blend-overlay before:content-['']",
          "after:absolute after:left-1/2 after:top-1/2 after:-m-[120px] after:h-[240px] after:w-[240px] after:animate-[rotate_8.6s_ease-in-out_infinite] after:opacity-50 after:mix-blend-overlay after:content-['']",
        )}
      />
    </div>
  );
};

export default SolarEclipse;
