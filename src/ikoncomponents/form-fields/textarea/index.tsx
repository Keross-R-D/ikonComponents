import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../shadcn/form'

import React from 'react'
import { FormTextareaProps } from '../types'
import { Textarea } from '../../../shadcn/textarea'



export function FormTextarea({ formControl, name, label, formItemClass, formDescription, ...textAreaProps }: FormTextareaProps) {
  return (
    <>
      <FormField
        control={formControl}
        name={name}
        render={({ field }) => (
          <FormItem className={formItemClass}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Textarea {...field}  {...textAreaProps} />
            </FormControl>
            {formDescription && <FormDescription>{formDescription}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
