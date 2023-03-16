import { Controller, Control } from 'react-hook-form'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { FormNames, FormValues } from '../types'

type Props = {
  name: FormNames
  control: Control<FormValues>
  label: string
  options: { label: string, value: number }[]
}

export const FormInputSelect = ({ name, control, label, options }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue="1"
      render={({ field : {...restField} }) => (
        <Select
          {...restField}
        >
          {options.map((o) => (
            <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
          ))}
        </Select>
      )}
    />
  )
}
