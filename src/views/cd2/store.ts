import { useMapMark } from '@/composables/useMapMark'
import { defineStore } from 'pinia'
import { getCd2MapMarks, getCd2Maps } from './api'

export const useStore = defineStore('cd-2', () => {
  const mapStore = useMapMark(getCd2Maps, getCd2MapMarks)

  return {
    ...mapStore
  }
})
