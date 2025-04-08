export type BattleType = {
    id: number;
    title: string;
    members: string[];
    location: string;
    images: {
        id: number;
        image: string;
    }[];
    description: string;
    map: {
        id: number;
        title: string;
        image: string;
    };
};
