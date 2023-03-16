import { IMyEvent } from '../types'

export const dbToEntity = (d: any): IMyEvent => ({
  id: d.id,
  title: d.title,
  start: new Date(d.start.seconds * 1000),
  end: new Date(d.end.seconds * 1000),
  resourceId: d.resourceId
})
