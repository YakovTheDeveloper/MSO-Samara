import type { Map, MapMark, MapMarkForest } from '@/entities'
import apiClient from './axios'

export type ApiResponse<T> =
  | { isError: false; data: T }
  | { isError: true; description: string; status: number }

export function getForestStoryMapMarks(): Promise<ApiResponse<MapMarkForest[]>> {
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



