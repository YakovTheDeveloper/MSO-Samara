import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { getBattles, getOneBattle } from '@/api'
import type { BattleType } from '@/entities'

const MAX = 16
const MIN = 10
const BASE = 10
const STEP = 2

export const useCounterStore = defineStore('counter', () => {
  const sizeCoefficient = ref(BASE)

  function increment() {
    if (sizeCoefficient.value === MAX) return
    sizeCoefficient.value += STEP
  }

  function decrement() {
    if (sizeCoefficient.value === MIN) return
    sizeCoefficient.value -= STEP
  }

  const sizeCoefficientDisplay = computed(() => +(sizeCoefficient.value / BASE).toFixed(1))

  return { sizeCoefficient: sizeCoefficientDisplay, increment, decrement }
})


export const useBattlesStore = defineStore('battles', () => {

  const battles = ref<BattleType[]>([])

  const currentBattle = ref<BattleType | null>(null)

  const getBattlesHandler = async () => {
    const res = await getBattles()
    if (res.isError) return

    battles.value = res.data
    return res.data
  }

  const getOneBattleHandler = async (id: number) => {
    const res = await getOneBattle(id)
    if (res.isError) return

    const updatedBattle = res.data
    const index = battles.value.findIndex(battle => battle.id === updatedBattle.id)
    if (index !== -1) {
      battles.value[index] = updatedBattle
    } else return
  }

  const setCurrentBattle = (battle: BattleType) => {
    currentBattle.value = battle
  }

  const clearCurrentBattle = () => currentBattle.value = null

  return { battles, getOneBattleHandler, getBattlesHandler, setCurrentBattle, clearCurrentBattle, currentBattle }
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

  const { setCurrentPopup, closePopup } = usePopupStore()
  const { setCurrentBattle, clearCurrentBattle, getOneBattleHandler } = useBattlesStore()

  const chooseBattleHandler = (battle: BattleType) => {
    getOneBattleHandler(battle.id)
    setCurrentBattle(battle)
    setCurrentPopup('description-short')
  }

  const backHandler = () => {
    closePopup()
    clearCurrentBattle()
  }

  return { chooseBattleHandler, backHandler }
})