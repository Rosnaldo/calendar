import { useState } from 'react'

import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

import MyCalendar from './MyCalendar'
import { MyEventContextProvider, useMyEventContext } from './context/myEvent.context'
import { Repository } from './services/repository'
import { ModalCreate } from './modals/ModalCreate'
import { ModalDelete } from './modals/ModalDelete'
import { IMyEvent } from './types'

const App = () => {
  const { selectMyEvent, selectedMyEvent } = useMyEventContext();
  const [openCreate, setOpenCreate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const openDeleteSelected = (data: IMyEvent) => {
    selectMyEvent(data)
    setOpenDelete(true)
  }

  return (
    <>
      <MyCalendar openDeleteSelected={openDeleteSelected} />
      <Box style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Fab color="primary" aria-label="add" onClick={() => setOpenCreate(true)}>
          <AddIcon />
        </Fab>
      </Box>
      <ModalCreate openCreate={openCreate} setOpenCreate={setOpenCreate} />
      <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} />
    </>
  )
}

const BaseApp = () => {
  return (
    <MyEventContextProvider>
      <App />
    </MyEventContextProvider>
  )
}

export default BaseApp