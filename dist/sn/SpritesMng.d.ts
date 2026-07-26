import { Config } from './Config';
import { type IEvtMng } from './CmnLib';
import type { T_Main, T_Variable } from './CmnInterface';
import type { SysBase } from './SysBase';
import type { SoundMng } from './SoundMng';
import type { TArg } from './Grammar';
import { Sprite, type Container } from 'pixi.js';
type IFncCompSpr = (sp: Sprite) => void;
export declare class SpritesMng {
    #private;
    readonly csvFn: string;
    readonly ctn?: Container | undefined;
    private fncFirstComp;
    private fncAllComp;
    static init(cfg: Config, val: T_Variable, sys: SysBase, main: T_Main, sndMng: SoundMng): void;
    static setEvtMng(evtMng: IEvtMng): void;
    constructor(csvFn?: string, ctn?: Container | undefined, fncFirstComp?: IFncCompSpr, fncAllComp?: (isStop: boolean) => void);
    readonly ret: boolean;
    destroy(): void;
    static destroy(): void;
    static getHFn2VElm(fn: string): HTMLVideoElement | undefined;
    static wv(hArg: TArg): boolean;
    static stopVideo(fn: string): void;
    static add_face(hArg: TArg): boolean;
}
export {};
