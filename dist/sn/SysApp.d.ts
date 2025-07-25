import { SysNode } from './SysNode';
import { IHTag, ITag } from './Grammar';
import { IVariable, IData4Vari, IMain, T_SysBaseParams, T_SysBaseLoadedParams } from './CmnInterface';
import { Application } from 'pixi.js';
export declare class SysApp extends SysNode {
    #private;
    constructor(...[hPlg, arg]: T_SysBaseParams);
    protected loaded(...[hPlg, arg]: T_SysBaseLoadedParams): Promise<void>;
    ensureFileSync: (path: string) => Promise<void>;
    readFileSync: (path: string, encoding?: BufferEncoding) => Promise<string>;
    protected writeFileSync: (path: string, data: string | NodeJS.ArrayBufferView, o?: object) => Promise<void>;
    appendFile: (path: string, data: string) => Promise<void>;
    outputFile: (path: string, data: string) => Promise<void>;
    protected $path_userdata: string;
    protected $path_downloads: string;
    initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari) => void): Promise<void>;
    protected run(): Promise<void>;
    init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[];
    cvsResize(): void;
    copyBMFolder: (from: number, to: number) => Promise<void>;
    eraseBMFolder: (place: number) => Promise<void>;
    protected readonly close: () => boolean;
    protected readonly _export: () => boolean;
    protected readonly _import: () => boolean;
    protected readonly navigate_to: ITag;
    protected titleSub(title: string): void;
    protected readonly tglFlscr_sub: () => Promise<void>;
    protected readonly update_check: ITag;
    protected readonly window: ITag;
    capturePage(path: string, w: number, h: number, fnc: () => void): void;
}
//# sourceMappingURL=SysApp.d.ts.map