import { type FC } from 'react';
export interface DateRangePickerProps {
    /** Click handler for applying the updates from DateRangePicker. */
    onUpdate?: (values: {
        range: DateRange;
    }) => void;
    /** Initial value for start date */
    initialDateFrom?: Date | string;
    /** Initial value for end date */
    initialDateTo?: Date | string;
    /** Alignment of popover */
    align?: 'start' | 'center' | 'end';
    /** Option for locale */
    locale?: string;
}
interface DateRange {
    from: Date | undefined;
    to: Date | undefined;
}
/** The DateRangePicker component allows a user to select a range of dates */
export declare const DateRangePicker: FC<DateRangePickerProps> & {
    filePath: string;
};
export {};
