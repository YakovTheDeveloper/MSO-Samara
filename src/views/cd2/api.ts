import type { ApiResponse } from "@/api"
import apiClient from "@/api/axios"
import type { Map, MapMark, MapMarkCd2 } from "@/entities"

export function getCd2MapMarks(): Promise<ApiResponse<MapMarkCd2[]>> {
    return apiClient.get('vc-2/map-objects', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  
  export function getCd2Maps(): Promise<ApiResponse<Map>> {
    return apiClient.get('vc-2/maps', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }