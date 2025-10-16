import React, { useRef } from 'react'
import { Upload } from 'lucide-react'
import { Input } from '../../shadcn/ui/input'
import { IconButtonWithTooltip } from '../buttons';

function FileInput({ tooltipContent, fileNamePlaceholder, fileName, onFileNameChange, ...props }: any) {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <div className='flex'>
                <Input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    {...props}
                />
                <div className='mx-1'></div>
                <Input className='rounded-e-none' placeholder={fileNamePlaceholder} onChange={(...args: any) => onFileNameChange?.(...args)} value={fileName} />
                <IconButtonWithTooltip tooltipContent={tooltipContent || "Browse File"} onClick={() => inputRef?.current?.click()} className='border-s-0 rounded-s-none'>
                    <Upload />
                </IconButtonWithTooltip>
            </div>
        </>
    )
}

export default FileInput
