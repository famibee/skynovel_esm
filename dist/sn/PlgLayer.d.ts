import { Layer } from './Layer';
import type { SysBase } from './SysBase';
import { type AbstractRenderer, type Application } from 'pixi.js';
export declare class PlgLayer extends Layer {
    #private;
    static setup(appPixi: Application, sys: SysBase, isFore: (me: Layer) => boolean): void;
    readonly htm: HTMLDivElement;
    constructor();
    cvsResize(): void;
    setDomZ(z: number): void;
    destroy(): void;
    protected plgCvs: HTMLCanvasElement | undefined;
    snapshotByCanvas(cvs: HTMLCanvasElement, rnd: AbstractRenderer, re: () => void): void;
    snapshot_end(): void;
    transBake(): void;
    transUnbake(): void;
}
