import { WebGLRenderer, CanvasRenderer } from '@pixi';
import { Ticker } from '@pixi/node';
import { applyContainerPolyfill } from "./containerPolyfill";
import { applyDisplayObjectPolyfill } from "./displayObjectPolyfill";
import { AnimationManager } from "./AnimationManager";
import { Layout } from "./Layout";

export { Layout, IYogaAnimationConfig } from "./Layout";
export { LayoutConfig } from "./LayoutConfig";
export * from "./YogaContants";

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
