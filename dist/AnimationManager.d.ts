import { IAnimationState } from "./Layout";
export declare class LayoutAnimationManager {
    animations: IAnimationState[];
    update(delta: number): void;
    add(anim: IAnimationState): void;
    remove(anim: IAnimationState): void;
}
export declare const AnimationManager: LayoutAnimationManager;
