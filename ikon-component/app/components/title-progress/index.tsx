import { Progress } from "../../shadcn/ui/progress";
import * as React from "react";

interface Props {
  title: string;
  value: number;
  valueText?: string;
  isPercent?: boolean;
  className?: string;
  titleClassName?: string;
  valueClassName?: string;
  progressClassName?: string;
}

export function TitleProgress({ title, value, valueText, isPercent = true, className, titleClassName, valueClassName, progressClassName }: Props) {
  let finalValue = value.toFixed(2);
  const parts = finalValue.split('.');

  if (parts[1] === '00') {
    finalValue = parts[0];
  }

  return (
    <div className={'w-full ' + (className ?? '')}>
      <div className={'flex items-center justify-between gap-4'}>
        <div className={'text-muted-foreground text-sm ' + (titleClassName ?? '')}>
          {title}
        </div>

        <div className={'text-sm ' + (valueClassName ?? '')}>
          {valueText ?? `${finalValue}${isPercent ? '%' : ''}`}
        </div>
      </div>

      <Progress
        value={value}
        className={'w-full mt-2 ' + (progressClassName ?? '')}
      />
    </div>
  );
}
