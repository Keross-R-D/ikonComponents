"use client"
import * as React from 'react'
import * as LucideIcons from 'lucide-react'

export interface IconProps {
    name: string
    size?: number | string
    color?: string
    className?: string
    strokeWidth?: number
}

export function Icon({ name, ...props }: IconProps) {
    const IconComponent = (LucideIcons as any)[name]

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in lucide-react`)
        return null
    }

    return <IconComponent {...props} />
}