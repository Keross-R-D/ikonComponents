import * as React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../shadcn/form'
import { Input } from '../../../shadcn/input'
import { Button } from '../../../shadcn/button'
import { Eye, EyeOff } from 'lucide-react'
import { FormInputProps } from '../types'


export function FormPasswordInput({ formControl, label, formDescription, extraFormComponent, name, ...inputProps }: FormInputProps) {
    const [showPassword, setShowPassword] = React.useState(false)
    const toggleVisibility = () => setShowPassword(!showPassword)

    return (
        <>
            <FormField
                control={formControl}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        {label && <FormLabel>{label}</FormLabel>}
                        <div className="relative">
                            <FormControl>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    {...field}
                                    {...inputProps}
                                    className={`${inputProps.className || ''} pr-10`}
                                />
                            </FormControl>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:bg-transparent!"
                                onClick={toggleVisibility}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {extraFormComponent && extraFormComponent(field.value)}
                        {formDescription && <FormDescription>{formDescription}</FormDescription>}
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}