'use client';

import { ReactNode } from "react";

interface Props {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  tools?: ReactNode;
  children: ReactNode;
}

export default function PageWrapper({ title, subtitle, tools, children }: Props) {
  title = title ?? '';
  subtitle = subtitle ?? '';

  return (
    <div className={"flex flex-col gap-4 h-full"}>
      <div className={"flex items-center justify-between gap-4"}>
        <div className={'grid grid-cols-1 gap-1'}>
          {title && <h1 className={'text-2xl font-semibold'}>{title}</h1>}
          {subtitle && <p className={'text-muted-foreground/60'}>{subtitle}</p>}
        </div>
        <div>
          {tools}
        </div>
      </div>
      {children}
    </div>
  );
}
