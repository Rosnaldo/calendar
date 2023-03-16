import { Controller, Control } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { FormNames, FormValues } from '../types'

type Props = {
  name: FormNames
  control: Control<FormValues>
  label: string
}

export const FormInputText = ({ name, control, label }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field : {...restField} }) => (
        <TextField {...restField} label={label} variant="outlined" />
      )}
    />
  )
}
