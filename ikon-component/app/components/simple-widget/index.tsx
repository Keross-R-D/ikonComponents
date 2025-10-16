import { Card, CardContent } from "../../shadcn/ui/card";
import { icons, LoaderCircle, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  title: string;
  iconName?: string;
  iconSize?: number;
  iconClass?: string;
  primaryText: number | string | ReactNode;
  secondaryText?: string | ReactNode;
  mainClassName?: string;
  loading?: boolean;
  loadingMessage?: string;
}

const LUCID_ICONS: Record<string, LucideIcon> = icons;

export default function SimpleWidget({ title, iconName, iconSize, iconClass, primaryText, secondaryText, mainClassName = '', loading, loadingMessage }: Props) {
  let IconComponent: LucideIcon | null = null;

  if (iconName) {
    IconComponent = LUCID_ICONS[iconName]
  }

  iconSize = iconSize === undefined ? 20 : iconSize;
  iconClass = iconClass ?? '';
  loadingMessage = loadingMessage ?? 'Loading...';

  return (
    <Card className={mainClassName}>
      <CardContent className={'p-5'}>
        <div className={'flex items-center justify-between gap-4'}>
          <span>{title}</span>
          {loading ? (
            <LoaderCircle size={iconSize} className={'animate-spin ' + iconClass} />
          ) : (
            IconComponent && <IconComponent size={iconSize} className={iconClass} />
          )}
        </div>

        <div className={'mt-6 text-2xl font-semibold'}>
          {loading ? '...' : primaryText}
        </div>

        {secondaryText && (
          <small className={'mt-2 text-gray-400'}>
            {loading ? loadingMessage : secondaryText}
          </small>
        )}
      </CardContent>
    </Card>
  );
}
