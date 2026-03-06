
export namespace OOT {
    export interface Question {
        id: string
        question: string
        answer: string
    }
}

export namespace FF {
    export type Answer = {
        name: string
        score: number
    }

    export interface Question {
        id: string
        question: string
        answers: Answer[]
    }
}

export const enum Game {
    OOT = "Jeden z dziesięciu",
    FF = "Familiada",
}
