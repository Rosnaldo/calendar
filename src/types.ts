export type IMyEvent = {
  id: string
  title: string
  start: Date
  end: Date
  resourceId: number
}

export type FormNames = 'title' | 'startDate' | 'endDate' | 'resourceId'

export type FormValues = Record<FormNames, string>

