import { Ticker } from '@pixi/node';
import { applyContainerPolyfill } from "./containerPolyfill.js";
import { applyDisplayObjectPolyfill } from "./displayObjectPolyfill.js";
import { AnimationManager } from "./AnimationManager.js";
import { Layout } from "./Layout.js";
export { Layout } from "./Layout.js";
export * from "./YogaContants.js";
/**
 * Polyfills PIXI.DisplayObject and PIXI.Container
 *
 */
export function initializeLayout(DisplayObject, Container, options = { usePixiSharedTicker: true }) {
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
export function layoutSetRenderer(renderer) {
    renderer.on("prerender", () => Layout.isRendering = true);
    renderer.on("postrender", () => Layout.isRendering = false);
}

export function removeLayoutRenderer(renderer) {
    renderer.off("prerender");
    renderer.off("postrender");
}