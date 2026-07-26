import { type IEvtMng } from './CmnLib';
import type { T_HTag } from './Grammar';
import type { T_Variable, T_Main, T_NoticeChgVolume } from './CmnInterface';
import type { Config } from './Config';
import type { SysBase } from './SysBase';
import { SndBuf } from './SndBuf';
export type HSndBuf = {
    [buf: string]: SndBuf;
};
export declare class SoundMng {
    #private;
    private readonly val;
    constructor(cfg: Config, hTag: T_HTag, val: T_Variable, main: T_Main, sys: SysBase);
    setEvtMng(evtMng: IEvtMng): void;
    setNoticeChgVolume(setGlbVol: T_NoticeChgVolume, setMovVol: T_NoticeChgVolume): void;
    playLoopFromSaveObj(all_stop_and_play: boolean): Promise<void>[];
    destroy(): void;
}
