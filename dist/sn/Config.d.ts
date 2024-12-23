import { SysBase } from './SysBase';
import { ConfigBase, SEARCH_PATH_ARG_EXT, T_CFG } from './ConfigBase';
export declare class Config extends ConfigBase {
    readonly sys: SysBase;
    static generate(sys: SysBase): Promise<Config>;
    protected constructor(sys: SysBase);
    load(oCfg: T_CFG): Promise<void>;
    searchPath(fn: string, extptn?: SEARCH_PATH_ARG_EXT): string;
}
//# sourceMappingURL=Config.d.ts.map