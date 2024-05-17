import { Layout } from "./Layout.js";
declare module "@pixi/node" {
    interface DisplayObject {
        yoga: Layout;
        /**
         * Internal property for fast checking if object has yoga
         */
        __hasYoga: boolean;
        /**
         * Applies yoga layout to DisplayObject
         */
        updateLayout(): void;
        /**
         * Checks boundaries of DisplayObject and emits NEED_LAYOUT_UPDATE if needed
         */
        checkIfBoundingBoxChanged(): void;
    }
    interface DisplayObject {
        _LayoutHash: number;
        _prevLayoutHash: number;
        __yoga: Layout;
    }
}
export declare function applyDisplayObjectPolyfill(prototype?: any): void;
