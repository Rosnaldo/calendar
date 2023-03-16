import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import { Controller, Control } from 'react-hook-form'
import { FormNames, FormValues } from '../types'

type Props = {
  name: FormNames
  control: Control<FormValues>
  label: string
}

export const FormInputDate = ({ name, control, label }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} control={control}>
      <Controller
        name={name}
        control={control}
        render={({ field : {...restField } }) => (
          <MobileDateTimePicker  {...restField} label={label} />
        )}
      />
    </LocalizationProvider>
  )
}
