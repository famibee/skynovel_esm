import type { TArg } from './Grammar';
import type { T_PropParser } from './CmnInterface';
import type { SysBase } from './SysBase';
import type { ScriptIterator } from './ScriptIterator';
import type { HPage } from './LayerMng';
import type { HPRM } from './AnalyzeTagArg';
import type { TxtStage } from './TxtStage';
import type { Button } from './Button';
import type { GrpLayer } from './GrpLayer';
import type { Config } from './Config';
import type { Application, Text, Sprite } from 'pixi.js';
export declare class DesignCast {
    readonly bg_col: string;
    readonly isLay: boolean;
    static init(_appPixi: Application, _sys: SysBase, _scrItr: ScriptIterator, _prpPrs: T_PropParser, _cfg: Config, _hPages: HPage): void;
    static cvsResizeDesign(): void;
    constructor(bg_col: string, isLay?: boolean);
    destroy(): void;
    gethArg(): TArg;
    protected hArg: TArg;
    sethArg(hArg: TArg): void;
    setOther(_hPrm: HPRM): void;
    adopt(_idcCh: DesignCast): void;
    static enterMode(): void;
    static allHide(): void;
    set visible(_v: boolean);
    static leaveMode(): void;
    cvsResize(): void;
    make(): void;
    static replaceToken(_o: unknown): void;
}
export declare class GrpLayDesignCast extends DesignCast {
    constructor(_ctn: Sprite, _gl: GrpLayer);
    setSp(_sp: Sprite): void;
}
export declare class TxtLayDesignCast extends DesignCast {
    constructor(_ctn: Sprite, _ts: TxtStage);
}
export declare class TxtLayPadDesignCast extends DesignCast {
    constructor(_ts: TxtStage);
}
export declare class BtnDesignCast extends DesignCast {
    protected readonly btn: Button;
    readonly hArg: TArg;
    constructor(btn: Button, hArg: TArg);
}
export declare class TxtBtnDesignCast extends BtnDesignCast {
    constructor(btn: Button, hArg: TArg, _txt: Text);
}
export declare class PicBtnDesignCast extends BtnDesignCast {
    setSp(_sp: Sprite): void;
}
