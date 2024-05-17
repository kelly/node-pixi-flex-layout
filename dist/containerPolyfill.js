import { Layout } from "./Layout.js";
import { Container } from '@pixi/node';
export function applyContainerPolyfill(proto = Container.prototype) {
    Object.defineProperty(proto, "flex", {
        configurable: true,
        get() {
            return this.__flex;
        },
        set(newFlex) {
            if (!this.flex && newFlex) {
                this.children.forEach(child => {
                    this.layout.addChild(child.layout);
                    if (this.flexRecursive && child instanceof Container && child.flex !== false) {
                        child.flexRecursive = true;
                    }
                });
                this.emit(Layout.NEED_LAYOUT_UPDATE);
            }
            if (this.flex && !newFlex) {
                this.children.forEach(child => {
                    this.layout.removeChild(child.layout);
                });
            }
            this.__flex = newFlex;
        }
    });
    Object.defineProperty(proto, "flexRecursive", {
        configurable: true,
        get() {
            return this.__flexRecursive;
        },
        set(newFlex) {
            this.__flexRecursive = newFlex;
            this.flex = newFlex;
        }
    });
    const addChild = proto.addChild;
    const removeChildren = proto.removeChildren;
    const addChildAt = proto.addChildAt;
    const removeChild = proto.removeChild;
    const containerUpdateTransform = proto.updateTransform;
    proto.addChild = function (...children) {
        if (children.length === 1) {
            const child = children[0];
            if (this.flex) {
                child.layout = child.layout || new Layout(child);
                child.__hasYoga = true;
                this.layout.addChild(child.layout);
            }
            if (this.flexRecursive && child instanceof Container && child.flex !== false) {
                child.flexRecursive = true;
            }
            this.emit(Layout.NEED_LAYOUT_UPDATE);
        }
        return addChild.call(this, ...children);
    };
    proto.addChildAt = function (child, index) {
        if (this.flex) {
            child.layout = child.layout || new Layout(child);
            this.__hasYoga = true;
            this.layout.addChild(child.layout, index);
        }
        if (this.flexRecursive && child instanceof Container && child.flex !== false) {
            child.flexRecursive = true;
        }
        this.emit(Layout.NEED_LAYOUT_UPDATE);
        return addChildAt.call(this, child, index);
    };
    proto.removeChild = function (...children) {
        if (children.length === 1) {
            const child = children[0];
            if (this.flex) {
                this.layout.removeChild(child.layout);
            }
            this.emit(Layout.NEED_LAYOUT_UPDATE);
        }
        return removeChild.call(this, ...children);
    };
    proto.removeChildren = function (beginIndex, endIndex) {
        if (this.__hasYoga) {
            const begin = beginIndex || 0;
            const end = typeof endIndex === 'number' ? endIndex : this.children.length;
            const range = end - begin;
            if (range > 0 && range <= end) {
                const removed = this.children.slice(begin, range);
                removed.forEach(child => child.__hasYoga && this.layout.removeChild(child.layout));
            }
            this.emit(Layout.NEED_LAYOUT_UPDATE);
        }
        return removeChildren.call(this, beginIndex, endIndex);
    };
    proto.updateTransform = function () {
        if (this.__hasYoga && this.__yoga.isRoot && Layout.isRendering) {
            this.checkIfBoundingBoxChanged();
            this.updateLayout();
        }
        return containerUpdateTransform.call(this);
    };
}
