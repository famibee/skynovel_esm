export type T_PLACE = 'top' | 'bottom' | 'left' | 'right';
export type T_RECT = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type T_SIZE = {
    width: number;
    height: number;
};
export type T_POS = {
    left: number;
    top: number;
};
export type T_HINT_OPT = {
    placement: T_PLACE;
    skid: number;
    dist: number;
};
export declare function parseHintOpt(json: string | undefined): T_HINT_OPT;
export declare function flipPlace(trg: T_RECT, box: T_SIZE, place: T_PLACE, dist: number, vp: T_SIZE): T_PLACE;
export declare function calcPos(trg: T_RECT, box: T_SIZE, place: T_PLACE, skid: number, dist: number): T_POS;
export declare function clampPos(pos: T_POS, box: T_SIZE, vp: T_SIZE): T_POS;
export declare function calcArrowOffset(trg: T_RECT, box: T_SIZE, boxPos: T_POS, place: T_PLACE, arrowSize?: number): number;
