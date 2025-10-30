import * as React from "react";
import { Input } from '../../shadcn/input'
import { cx } from 'class-variance-authority'
import { Search } from 'lucide-react'

export function SearchInput({ className, ...props }: any) {
    return (
        <div className="relative w-auto flex items-center">
            <Search className="absolute left-2 mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
                className={cx(
                    'pl-8 h-8',
                    className
                )}
                {...props} />
        </div>
    )
}
