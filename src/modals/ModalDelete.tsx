import { Dispatch, SetStateAction } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'

import { resourceMap } from '../resourceMap'
import { useMyEventContext } from '../context/myEvent.context'
import { Repository } from '../services/repository'
import { style } from './style'

type Props = {
  openDelete: boolean
  setOpenDelete: Dispatch<SetStateAction<boolean>>
}

export const ModalDelete = ({ openDelete, setOpenDelete }: Props) => {
  const { selectedMyEvent } = useMyEventContext()
  const deleteSeletedMyEvent = () => {
    Repository.deleteMyEvent(selectedMyEvent.id)
    setOpenDelete(false)
  }

  return (
    <Modal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <Box sx={style}>
        <Typography variant="h6" component="h2">Delete event</Typography>
        <Box mt={2} />
        <TextField label="title" variant="outlined" value={selectedMyEvent?.title} disabled />
        <Box mt={1} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDateTimePicker value={selectedMyEvent?.start} label="start" disabled />
        </LocalizationProvider>
        <Box mt={1} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDateTimePicker value={selectedMyEvent?.end} label="end" disabled />
        </LocalizationProvider>
        <Box mt={1} />
        <Select value={selectedMyEvent!.resourceId} disabled>
          <MenuItem value={selectedMyEvent!.resourceId}>
            {resourceMap.find(r => r.resourceId === selectedMyEvent!.resourceId)?.resourceTitle}
          </MenuItem>
        </Select>
        <Box mt={1} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button style={{ width: '100%' }} variant="contained" color="primary" onClick={deleteSeletedMyEvent}>
              yes
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button style={{ width: '100%' }} variant="contained" color="primary" onClick={() => setOpenDelete(false)}>
              No
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
