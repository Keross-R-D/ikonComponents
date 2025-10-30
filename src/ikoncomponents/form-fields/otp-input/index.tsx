import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../shadcn/form'
import React from 'react'
import { FormInputProps } from '../types'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "../../../shadcn/input-otp"

export function FormOtpInput({ formControl, label, formDescription, extraFormComponent, name, ...inputProps }: FormInputProps) {
    return (
        <>
            <FormField
                control={formControl}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        {label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            <InputOTP maxLength={4} {...field} >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    {/* <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} /> */}
                                </InputOTPGroup>
                            </InputOTP>
                        </FormControl>
                        {extraFormComponent && extraFormComponent(field.value)}
                        {formDescription && <FormDescription>{formDescription}</FormDescription>}
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}