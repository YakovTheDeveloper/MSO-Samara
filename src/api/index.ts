import type { BattleType } from "@/entities";
import apiClient from "./axios";

export type ApiResponse<T> =
    | { isError: false; data: T }
    | { isError: true; description: string, status: number };


export function getBattles(): Promise<ApiResponse<BattleType[]>> {
    return apiClient.get('/battles')
}

// export function getOneBattle(): Promise<BattleType> {
//     return apiClient.get('/battles')
// }

