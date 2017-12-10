    export interface IJob {
        id: number,
        position: string,
        locationCity: string,
        locationState: string,
        company: string,
        type: string,
        payRate?: number,
        payPeriod?: string,
        description: string,
        postedDate: Date,
        owner: number
    }