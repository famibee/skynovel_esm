import { type IEvtMng } from './CmnLib';
import type { TArg } from './Grammar';
import type { Layer } from './Layer';
export declare class Tw {
    #private;
    constructor(target: any);
    to(hTo: any, time_ms: number): this;
    onUpdate(fn: (d: any) => void): this;
    onComplete(fn: () => void): this;
    easing(fn: (k: number) => number): this;
    delay(ms: number): this;
    repeat(n: number): this;
    yoyo(b: boolean): this;
    chain(next: Tw): this;
    start(): this;
    stop(): this;
    end(): this;
    kill(): void;
    pause(): this;
    resume(): this;
    isPaused(): boolean;
}
export declare const TW_NM_TRANS = "trans\n";
export declare class CmnTween {
    #private;
    static init(evtMng: IEvtMng): void;
    static destroy(): void;
    static stopAllTw(): void;
    static setTwProp(tw: Tw, hArg: TArg): Tw;
    static ease(nm: string | undefined): (k: number) => number;
    static readonly aLayerPrpNm: (keyof Layer)[];
    static cnvTweenArg(hArg: TArg, lay: any): TArg;
    static tween(tw_nm: string, hArg: TArg, hNow: any, hTo: any, onUpdate: (d: any) => void, onComplete: () => void, onEnd: () => void, start?: boolean): Tw;
    static wt(hArg: TArg): boolean;
    static stopEndTrans(): void;
    static wait_tsy(hArg: TArg): boolean;
    static stop_tsy(hArg: TArg): boolean;
    static pause_tsy(hArg: TArg): boolean;
    static resume_tsy(hArg: TArg): boolean;
}
