import type { Map, MapMark } from '@/entities'
import apiClient from './axios'

export type ApiResponse<T> =
  | { isError: false; data: T }
  | { isError: true; description: string; status: number }

export function getForestStoryMapMarks(): Promise<ApiResponse<MapMark[]>> {
  return apiClient.get('forest-story/map-objects', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function getForestStoryMaps(): Promise<ApiResponse<Map>> {
  return apiClient.get('forest-story/maps', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export type AggregatedMap = {
  file: string
  points: {
    x: number
    y: number
    objectId: string
    mark?: {
      ulid: string
      title: string
      description: string
      images: string[]
    }
  }[]
  areas: {
    points: { x: number; y: number }[]
    objectId: string
  }[]
}

export async function getAggregatedForestStoryData(): Promise<AggregatedMap | null> {
  const [marksResponse, mapResponse] = await Promise.all([
    getForestStoryMapMarks(),
    getForestStoryMaps(),
  ])

  if (marksResponse.isError || mapResponse.isError) return null

  const marks = marksResponse.data
  const map = mapResponse.data 

  return {
    file: map.file,
    points: map.points.map((point) => {
      const mark = marks.find((m) => m.ulid === point.objectId)
      return {
        ...point,
        mark,
      }
    }),
    areas: map.areas,
  }
}
