namespace zen {
    export enum CullingMask {
        Everything = 0xffffffff,
        Nothing = 0x00000000,
        Default = 0x00000001,
        UI = 0x00000002,
        BeforeUI = 0x00000004
    }
}