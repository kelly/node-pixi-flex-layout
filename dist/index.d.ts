import { WebGLRenderer, CanvasRenderer } from '@pixi';
export { Layout, IYogaAnimationConfig } from "./Layout.js";
export { LayoutConfig } from "./LayoutConfig.js";
export * from "./YogaContants.js";
export interface IFlexLayoutOptions {
    usePixiSharedTicker: boolean;
}
/**
 * Polyfills PIXI.DisplayObject and PIXI.Container
 *
 */
export declare function initializeLayout(options?: IFlexLayoutOptions): void;
/**
 * Can be used to optimize Yoga update calls.
 * If renderer is set yoga boundBoxCheck/layotutUpdate in updateTransform will be called ONLY when rendering.
 * @param renderer
 */
export declare function layoutSetRenderer(renderer: WebGLRenderer | CanvasRenderer): void;
