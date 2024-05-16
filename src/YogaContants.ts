import Yoga from "yoga-layout";

export namespace YogaConstants {

    export enum FlexDirection {
        "column" = Yoga.FLEX_DIRECTION_COLUMN,
        "column-reverse" = Yoga.FLEX_DIRECTION_COLUMN_REVERSE,
        "row" = Yoga.FLEX_DIRECTION_ROW,
        "row-reverse" = Yoga.FLEX_DIRECTION_ROW_REVERSE
    }


    export enum JustifyContent {
        "flex-start" = Yoga.JUSTIFY_FLEX_START,
        "flex-end" = Yoga.JUSTIFY_FLEX_END,
        "center" = Yoga.JUSTIFY_CENTER,
        "space-between" = Yoga.JUSTIFY_SPACE_BETWEEN,
        "space-around" = Yoga.JUSTIFY_SPACE_AROUND,
        "space-evenly" = Yoga.JUSTIFY_SPACE_EVENLY
    }

    export enum FlexWrap {
        "wrap" = Yoga.WRAP_WRAP,
        "no-wrap" = Yoga.WRAP_NO_WRAP,
        "wrap-reverse" = Yoga.WRAP_WRAP_REVERSE
    }

    export enum Align {
        "stretch" = Yoga.ALIGN_STRETCH,
        "auto" = Yoga.ALIGN_AUTO,
        "baseline" = Yoga.ALIGN_BASELINE,
        "center" = Yoga.ALIGN_CENTER,
        "flex-start" = Yoga.ALIGN_FLEX_START,
        "flex-end" = Yoga.ALIGN_FLEX_END,
        "space-between" = Yoga.ALIGN_SPACE_BETWEEN,
        "space-around" = Yoga.ALIGN_SPACE_AROUND,
    }


    export enum PositionType {
        "relative" = Yoga.POSITION_TYPE_RELATIVE,
        "absolute" = Yoga.POSITION_TYPE_ABSOLUTE
    }

    export enum Display {
        "flex" = Yoga.DISPLAY_FLEX,
        "none" = Yoga.DISPLAY_NONE
    }

    export enum YogaCustomSizeConfig {
        AUTO = "auto",
        SCREEN_SIZE = "screen",
        WINDOW_SIZE = "window"
    }

    export const YogaEdges = [Yoga.EDGE_TOP, Yoga.EDGE_RIGHT, Yoga.EDGE_BOTTOM, Yoga.EDGE_LEFT];

    export interface ComputedLayout {
        left: number;
        right: number;
        top: number;
        bottom: number;
        width: number;
        height: number;
    }
}