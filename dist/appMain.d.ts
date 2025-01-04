import { BrowserWindow } from 'electron';
export declare class appMain {
    #private;
    private readonly bw;
    readonly version: string;
    static initRenderer(preload: string, version: string): BrowserWindow;
    private constructor();
    openDevTools: () => void;
}
//# sourceMappingURL=appMain.d.ts.map