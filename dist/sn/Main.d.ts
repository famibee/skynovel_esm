import type { TArg } from './Grammar';
import type { T_Main } from './CmnInterface';
import type { SysBase } from './SysBase';
export declare class Main implements T_Main {
    #private;
    private readonly sys;
    static generate(sys: SysBase): Promise<Main>;
    cvs: HTMLCanvasElement;
    private constructor();
    destroy(): void;
    errScript: (_mes: string, _isThrow?: boolean) => void;
    resumeByJumpOrCall(hArg: TArg): void;
    resume(): void;
    readonly stop: () => void;
    setLoop(isLoop: boolean, mes?: string): void;
}
