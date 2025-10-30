/* eslint-disable max-lines */
'use client'

import React, { type FC, useState, useEffect, useRef, JSX } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Calendar } from './calendar'
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons' // Use these icons for the arrows in the header
import { Button } from './button'

export interface DateRangePickerProps {
  /** Click handler for applying the updates from DateRangePicker. */
  onUpdate?: (values: { range: DateRange }) => void
  /** Initial value for start date */
  initialDateFrom?: Date | string
  /** Initial value for end date */
  initialDateTo?: Date | string
  /** Alignment of popover */
  align?: 'start' | 'center' | 'end'
  /** Option for locale */
  locale?: string
}

const getDateAdjustedForTimezone = (dateInput: Date | string): Date => {
  if (typeof dateInput === 'string') {
    const parts = dateInput.split('-').map((part) => parseInt(part, 10))
    const date = new Date(parts[0], parts[1] - 1, parts[2])
    return date
  } else {
    return dateInput
  }
}

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

/** The DateRangePicker component allows a user to select a range of dates */
export const DateRangePicker: FC<DateRangePickerProps> & {
  filePath: string
} = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo,
  onUpdate,
  align = 'center',
  locale = 'en-US'
}): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false)

    const [range, setRange] = useState<DateRange>({
      from: initialDateFrom
        ? getDateAdjustedForTimezone(initialDateFrom)
        : undefined,
      to: initialDateTo
        ? getDateAdjustedForTimezone(initialDateTo)
        : initialDateFrom
          ? getDateAdjustedForTimezone(initialDateFrom)
          : undefined
    })

    useEffect(() => {
      // This effect will be triggered when a date is selected.
      // We update the state of the component using the new range.
      if (onUpdate) {
        onUpdate({ range })
      }
    }, [range, onUpdate])

    return (
      <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button size={'lg'} variant="secondary" className="w-auto px-3 py-2">
            <div className="flex-grow text-left font-normal">


              <span>Select a date range</span>

            </div>
            <div className="pl-1 opacity-60 -mr-2 scale-125">
              {isOpen ? <ChevronLeftIcon width={24} /> : <ChevronRightIcon width={24} />}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent align={align} className="w-auto p-0">
          <Calendar
            mode="range"
            onSelect={(value: { from?: Date, to?: Date } | undefined) => {
              setRange({ from: value?.from, to: value?.to })
            }}
            selected={range}
            numberOfMonths={2}
            defaultMonth={
              new Date(new Date().setMonth(new Date().getMonth() - 1))
            }
          />
        </PopoverContent>
      </Popover>
    )
  }

DateRangePicker.displayName = 'DateRangePicker'
DateRangePicker.filePath =
  'libs/shared/ui-kit/src/lib/date-range-picker/date-range-picker.tsx'