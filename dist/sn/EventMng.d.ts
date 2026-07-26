import { type IEvtMng } from './CmnLib';
import type { T_HTag, TArg } from './Grammar';
import type { T_Variable, T_Main } from './CmnInterface';
import type { LayerMng } from './LayerMng';
import type { ScriptIterator } from './ScriptIterator';
import type { SoundMng } from './SoundMng';
import type { Config } from './Config';
import { SysBase } from './SysBase';
import { Container, type Application } from 'pixi.js';
export declare class EventMng implements IEvtMng {
    #private;
    private readonly cfg;
    private readonly hTag;
    readonly appPixi: Application;
    private readonly main;
    private readonly layMng;
    private readonly val;
    private readonly scrItr;
    private readonly sys;
    constructor(cfg: Config, hTag: T_HTag, appPixi: Application, main: T_Main, layMng: LayerMng, val: T_Variable, sndMng: SoundMng, scrItr: ScriptIterator, sys: SysBase);
    resvFlameEvent(body: HTMLBodyElement): void;
    destroy(): void;
    unButton(ctnBtn: Container): void;
    button(hArg: TArg, ctnBtn: Container, normal: () => void, hover: () => boolean, clicked: () => void): void;
    hideHint(): void;
    cvsResize(): void;
    get isSkipping(): boolean;
}
