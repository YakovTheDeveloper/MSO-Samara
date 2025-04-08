import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { getBattles } from '@/api'
import type { BattleType } from '@/entities'

const MAX = 16
const MIN = 4
const STEP = 2

export const useCounterStore = defineStore('counter', () => {
  const sizeCoefficient = ref(10)

  function increment() {
    if (sizeCoefficient.value === MAX) return
    sizeCoefficient.value += STEP
  }

  function decrement() {
    if (sizeCoefficient.value === MIN) return
    sizeCoefficient.value -= STEP
  }

  const sizeCoefficientDisplay = computed(() => +(sizeCoefficient.value / 10).toFixed(1))

  return { sizeCoefficient: sizeCoefficientDisplay, increment, decrement }
})


export const useBattlesStore = defineStore('battles', () => {

  const battles = ref<BattleType[]>([])

  const currentBattle = ref<BattleType | null>(null)

  const getBattlesHandler = async () => {
    const res = await getBattles()
    if (res.isError) return

    battles.value = res.data
  }

  const setCurrentBattle = (battle: BattleType) => {
    currentBattle.value = battle
  }

  return { battles, getBattlesHandler, setCurrentBattle, currentBattle }
})

type Popup = 'description-short' | 'description-full'

export const usePopupStore = defineStore('popup', () => {

  const currentPopup = ref<Popup | null>(null)
  const setCurrentPopup = (popup: Popup) => {
    currentPopup.value = popup
  }
  const closePopup = () => currentPopup.value = null

  return { setCurrentPopup, currentPopup, closePopup }
})

export const useFlowsStore = defineStore('UI', () => {

  const { setCurrentPopup } = usePopupStore()
  const { setCurrentBattle } = useBattlesStore()

  const chooseBattleHandler = (battle: BattleType) => {
    setCurrentBattle(battle)
    setCurrentPopup('description-short')
  }

  return { chooseBattleHandler }
})