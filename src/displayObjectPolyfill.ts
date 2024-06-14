import { DisplayObject, Texture } from '@pixi/node';
import { TransformStatic } from '@pixi'
import { Layout } from "./Layout.js";

declare module "@pixi/node" {
    export interface DisplayObject {
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


export function applyDisplayObjectPolyfill(prototype: any = DisplayObject.prototype) {

    Object.defineProperty(prototype, "layout", {
        configurable: true,
        get(): boolean {
            if (!this.__yoga) {
                this.__yoga = new Layout(this);
                this.__hasYoga = true;
            }
            return this.__yoga;
        },
        set(v: any): void {
            this.__yoga = v;
        }
    });

    Object.defineProperty(prototype, "visible", {
        configurable: true,
        get(): boolean {
            return this._visible;
        },
        set(v: any): void {
            if (this.__hasYoga && this._visible !== v) {
                this.__yoga.display = v ? "flex" : "none";
            }
            this._visible = v;
        }
    });

    const destroy = prototype.destroy;
    prototype.destroy = function () {
        if (this.__hasYoga) {
            this.layout.children = [];
            this.layout.node.free();
            this.layout.parent = undefined;
            this.__hasYoga = false;
            delete this.layout;
        }
        destroy.call(this);
    }

    prototype.checkIfBoundingBoxChanged = function (this: DisplayObject) {
        if ((this as any).updateText) {
            (this as any).updateText(true);
        }

        for (let i = 0, j = this.__yoga.children.length; i < j; i++) {
            if (this.__yoga.children[i].target.visible) {
                this.__yoga.children[i].target.checkIfBoundingBoxChanged();
            }
        }

        const texture: Texture = (this as any)._texture;
        const bounds = (this as any)._bounds;

        if (texture && texture.orig) {
            let tw = Math.abs(this.__yoga.rescaleToYoga ? 1 : this.scale.x) * texture.orig.width;
            let th = Math.abs(this.__yoga.rescaleToYoga ? 1 : this.scale.y) * texture.orig.height;

            if (!this.__yoga.rescaleToYoga && (<any>this).updateHorizontalVertices /* Is NineSlicePlane?*/) {
                tw = (<any>this).width;
                th = (<any>this).height;
            } else if (this.__yoga.rescaleToYoga && this.__yoga.keepAspectRatio) {
                this.__yoga.aspectRatio = texture.orig.width / texture.orig.height;
            }

            this._LayoutHash = tw * 0.12498 + th * 4121;
            if (this._LayoutHash !== this._prevLayoutHash) {
                (<any>this.__yoga)._width === "pixi" && this.__yoga.node.setWidth(tw);
                (<any>this.__yoga)._height === "pixi" && this.__yoga.node.setHeight(th);
                this.emit(Layout.NEED_LAYOUT_UPDATE);
            }

            this._prevLayoutHash = this._LayoutHash;

        } else if (bounds) {
            this._LayoutHash = -1000000;

            if ((<any>this.__yoga)._width === "pixi") {
                let w = Math.round(bounds.maxX - bounds.minX);
                this.__yoga.node.setWidth(w);
                this._LayoutHash += w * 0.2343;
            }

            if ((<any>this.__yoga)._height === "pixi") {
                let h = Math.round(bounds.maxY - bounds.minY);
                this.__yoga.node.setHeight(h);
                this._LayoutHash += h * 5121;
            }

            if (this._LayoutHash !== -1000000 && this._LayoutHash !== this._prevLayoutHash) {
                this.emit(Layout.NEED_LAYOUT_UPDATE);
            }
            this._prevLayoutHash = this._LayoutHash;
        }
    }

    prototype.updateLayout = function (this: DisplayObject) {
        this.__yoga.update();
        const updated = this.__yoga.willLayoutWillBeRecomputed();
        const layout = this.__yoga.getComputedLayout();

        if (updated || this.__yoga.animationConfig || this.__yoga.rescaleToYoga) {
            (this.transform as TransformStatic).position.set(layout.left, layout.top)

            if (this.__yoga.rescaleToYoga) {
                if (this.__yoga.keepAspectRatio && !isNaN((<any>this.__yoga)._height)) {
                    this.scale.set(layout.height / (<any>this.__yoga)._height);
                } else {
                    (<any>this).width = layout.width;
                    (<any>this).height = layout.height;
                }
            }

            if (updated) {
                this.emit(Layout.AFTER_LAYOUT_UPDATED_EVENT, layout)
            }
        }

        for (let i = 0, j = this.__yoga.children.length; i < j; i++) {
            if (this.__yoga.children[i].target.visible) {
                this.__yoga.children[i].target.updateLayout()
            }
        }
    }
}
