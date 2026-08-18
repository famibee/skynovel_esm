import type { FocusMng } from './FocusMng';
export declare class GamepadMng {
    #private;
    private readonly fcs;
    constructor(fcs: FocusMng);
    start(): void;
    stop(): void;
}
