export type MapMark = {
  ulid: string
  title: string
  description: string
  images: string[]
}

export type Point = {
  x: number
  y: number
}

export type MapArea = Point[]

export type Map = {
  file: string
  points: {
    x: number
    y: number
    objectId: string
  }[]
  areas: {
    points: MapArea
    objectId: string
  }[]
}
