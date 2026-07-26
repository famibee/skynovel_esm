import { type IEvtMng } from './CmnLib';
import type { TArg } from './Grammar';
import type { Config } from './Config';
import type { IMakeDesignCast } from './LayerMng';
import { Container, Rectangle } from 'pixi.js';
export declare class Button extends Container {
    #private;
    private readonly hArg;
    readonly evtMng: IEvtMng;
    readonly resolve: () => void;
    private readonly canFocus;
    static fontFamily: string;
    static init(cfg: Config): void;
    setText(_text: string): void;
    getBtnBounds: () => Rectangle;
    constructor(hArg: TArg, evtMng: IEvtMng, resolve: () => void, canFocus: () => boolean);
    destroy(): void;
    makeDesignCast(_gdc: IMakeDesignCast): void;
    showDesignCast(): void;
    cvsResize(): void;
    normal: () => void;
}
