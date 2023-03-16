import { Dispatch, SetStateAction, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

import { resourceMap } from '../resourceMap'
import { Repository } from '../services/repository'
import { FormInputText } from '../Form/FormInputText'
import { FormInputDate } from '../Form/FormInputDate'
import { FormInputSelect } from '../Form/FormInputInputSelect'
import { FormValues, IMyEvent } from '../types'
import { style } from './style'

type Props = {
  openCreate: boolean
  setOpenCreate: Dispatch<SetStateAction<boolean>>
}

export const ModalCreate = ({ openCreate, setOpenCreate }: Props) => {
  const methods = useForm<FormValues>({ defaultValues: { title: '', startDate: '', endDate: '' } })
  const { handleSubmit, reset, control } = methods
  
  const onSubmit = useCallback((data: FormValues) => {
    const newEvent: Omit<IMyEvent, 'id'> = {
      title: data.title,
      start: new Date(data.startDate),
      end: new Date(data.endDate),
      resourceId: parseInt(data.resourceId)
    }

    Repository.createMyEvent(newEvent)
    reset()
    setOpenCreate(false)
  }, [])

  return (
    <Modal
      open={openCreate}
      onClose={() => setOpenCreate(false)}
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">Create new event</Typography>
        <Box mt={2} />
        <FormInputText name="title" control={control} label="title" />
        <Box mt={1} />
        <FormInputDate name="startDate" control={control} label="start" />
        <Box mt={1} />
        <FormInputDate name="endDate" control={control} label="end" />
        <Box mt={1} />
        <FormInputSelect name="resourceId" control={control} label="team" options={resourceMap.map((r) => ({ value: r.resourceId, label: r.resourceTitle }))} />
        <Box mt={1} />
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
          create
        </Button>
      </Box>
    </Modal>
  )
}
