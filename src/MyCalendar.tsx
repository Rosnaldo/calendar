import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

import { IMyEvent } from './types'
import { resourceMap } from './resourceMap'
import { Repository } from './services/repository'
import { dbToEntity } from './services/mapper'
import { db } from './Firebase'


type Props = {
  openDeleteSelected: (data: IMyEvent) => void
}

const MyCalendar = ({ openDeleteSelected }: Props) => {
  const [myEvents, setMyEvents] = useState<IMyEvent[]>([])

  const min = new Date('Tue Aug 03 2023 6:00:00')
  const max = new Date('Tue Aug 03 2023 19:00:00')

  const locales = { 'en-US': enUS }
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })
  const DnDCalendar = withDragAndDrop(Calendar)

  const updateMyEvent = (data: any) => {
    const eventId = data.event.id
    const { start, end, resourceId } = data
    Repository.updateMyEvent(eventId, {
      start: new Date(start),
      end: new Date(end),
      resourceId,
    })
  }

  const onEventResize: withDragAndDropProps['onEventResize'] = updateMyEvent

  const onEventDrop: withDragAndDropProps['onEventDrop'] = updateMyEvent

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'my-events'), snapshot => {
      const data = snapshot.docs
      .map(docSnap => ({ ...docSnap.data(), id: docSnap.id }) as any)
      .map(dbToEntity)
      setMyEvents(data)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <DnDCalendar
      defaultView={Views.DAY}
      events={myEvents}
      localizer={localizer}
      selectable={true}
      onSelectEvent={(e: any) => openDeleteSelected({ ...e, start: new Date(e.start), end: new Date(e.end) })}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      resourceIdAccessor="resourceId"
      resources={resourceMap}
      resourceTitleAccessor="resourceTitle"
      step={30}
      timeslots={2}
      min={min}
      max={max}
      style={{ height: '100vh' }}
    />
  )
}

export default MyCalendar