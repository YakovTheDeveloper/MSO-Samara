import type { ApiResponse } from '@/api'
import apiClient from '@/api/axios'
import type { Map, MapCd1, MapMark, MapMarkCd1 } from '@/entities'

export function getCd1MapMarks(mapId: string): Promise<ApiResponse<MapMarkCd1[]>> {
  return apiClient.get(`vc-1/map-objects?mapUlid=${mapId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function getCd1Maps(): Promise<ApiResponse<MapCd1[]>> {
  return apiClient.get('vc-1/maps', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
