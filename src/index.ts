import { WebGLRenderer, CanvasRenderer } from '@pixi';
import { Ticker } from '@pixi/node';
import { applyContainerPolyfill } from "./containerPolyfill.js";
import { applyDisplayObjectPolyfill } from "./displayObjectPolyfill.js";
import { AnimationManager } from "./AnimationManager.js";
import { Layout } from "./Layout.js";

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
export function initializeLayout(DisplayObject: DisplayObject, Container: Container, options: IFlexLayoutOptions = {usePixiSharedTicker: true}) {
    applyDisplayObjectPolyfill(DisplayObject);
    applyContainerPolyfill(Container);
    if (options.usePixiSharedTicker) {
        Ticker.shared.add(delta => AnimationManager.update(delta));
    }
}


/**
 * Can be used to optimize Yoga update calls.
 * If renderer is set yoga boundBoxCheck/layotutUpdate in updateTransform will be called ONLY when rendering.
 * @param renderer
 */
export function layoutSetRenderer(renderer: WebGLRenderer | CanvasRenderer) {
    renderer.on("prerender", () => Layout.isRendering = true)
    renderer.on("postrender", () => Layout.isRendering = false)
}
