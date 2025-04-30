import type { ApiResponse } from "@/api"
import apiClient from "@/api/axios"
import type { Map, MapMark } from "@/entities"

export function getCd1MapMarks(): Promise<ApiResponse<MapMark[]>> {
    return apiClient.get('vc-1/map-objects', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  
  export function getCd1Maps(): Promise<ApiResponse<Map>> {
    return apiClient.get('vc-1/maps', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }