import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

const MAX = 16
const MIN = 10
const BASE = 10
const STEP = 2

export const useMapScaleStore = defineStore('map-scale', () => {
  const zoomLevel = ref(1) // 1 = 100%
  const zoomIn = () => {
    zoomLevel.value = Math.min(zoomLevel.value + 0.1, 3)
  }

  const zoomOut = () => {
    zoomLevel.value = Math.max(zoomLevel.value - 0.1, 0.5)
  }

  function increment() {
    zoomIn()
    return
  }

  function decrement() {
    zoomOut()
    return
  }

  return { sizeCoefficient: zoomLevel, increment, decrement }
})

// export const useBattlesStore = defineStore('battles', () => {

//   const battles = ref<BattleType[]>([])

//   const currentBattle = ref<BattleType | null>(null)

//   const getBattlesHandler = async () => {
//     const res = await getBattles()
//     if (res.isError) return

//     battles.value = res.data
//     return res.data
//   }

//   const getOneBattleHandler = async (id: number) => {
//     const res = await getOneBattle(id)
//     if (res.isError) return

//     const updatedBattle = res.data
//     const index = battles.value.findIndex(battle => battle.id === updatedBattle.id)
//     if (index !== -1) {
//       battles.value[index] = updatedBattle
//     } else return
//   }

//   const setCurrentBattle = (battle: BattleType) => {
//     currentBattle.value = battle
//   }

//   const clearCurrentBattle = () => currentBattle.value = null

//   return { battles, getOneBattleHandler, getBattlesHandler, setCurrentBattle, clearCurrentBattle, currentBattle }
// })

type Popup = 'description-short' | 'description-full'

export const usePopupStore = defineStore('popup', () => {
  const currentPopup = ref<Popup | null>(null)
  const setCurrentPopup = (popup: Popup) => {
    currentPopup.value = popup
  }
  const closePopup = () => (currentPopup.value = null)

  return { setCurrentPopup, currentPopup, closePopup }
})

// export const useFlowsStore = defineStore('UI', () => {

//   const { setCurrentPopup, closePopup } = usePopupStore()
//   const { setCurrentBattle, clearCurrentBattle, getOneBattleHandler } = useBattlesStore()

//   const chooseBattleHandler = (battle: BattleType) => {
//     getOneBattleHandler(battle.id)
//     setCurrentBattle(battle)
//     setCurrentPopup('description-short')
//   }

//   const backHandler = () => {
//     closePopup()
//     clearCurrentBattle()
//   }

//   return { chooseBattleHandler, backHandler }
// })
