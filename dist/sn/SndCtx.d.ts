export declare class SndCtx {
    #private;
    static get ctx(): AudioContext;
    static get master(): GainNode;
    static unlock(): void;
    static needClick2Play(): boolean;
    static setGlobalVol(v: number): void;
    static get globalVol(): number;
    static codecs(): string;
    static decode(src: string, fetchAB: () => Promise<ArrayBuffer>): Promise<AudioBuffer>;
}
