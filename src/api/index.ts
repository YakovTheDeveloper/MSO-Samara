import type { BattleType } from "@/entities";
import apiClient from "./axios";

export type ApiResponse<T> =
    | { isError: false; data: T }
    | { isError: true; description: string, status: number };


export function getBattles(): Promise<ApiResponse<BattleType[]>> {
    return apiClient.get('/battles', {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export function getOneBattle(id: number): Promise<ApiResponse<BattleType>> {
    return apiClient.get(`/battles/${id}`)
}

