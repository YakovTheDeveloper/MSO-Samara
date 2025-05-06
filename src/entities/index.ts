export type MapMark = {
  ulid: string
  title: string
  description: string
  images: string[]
  point: Point
  area?: MapArea
}

export type MapMarkForest = {
  mapTitle: string
  mapTitleType:  'number' | 'text'
} & MapMark

export type Point = {
  x: number
  y: number
}

export type MapArea = Point[]

export type Map = {
  map: string
  youAreHerePoint: Point
}

export type MapMarkCd2 = MapMark & {
  responsibleDescription: string
  qrTitle: string
  qr: string
  phone: string
  email: string
  canOpen: boolean
  headquarters: Headquarters[]
}

export type Headquarters = {
  title: string
  description: string
  qr: string
  directorFullName: string
  phone: string
  email: string
}
