import Yoga from "yoga-layout";
export var YogaConstants;
(function (YogaConstants) {
    let FlexDirection;
    (function (FlexDirection) {
        FlexDirection[FlexDirection["column"] = Yoga.FLEX_DIRECTION_COLUMN] = "column";
        FlexDirection[FlexDirection["column-reverse"] = Yoga.FLEX_DIRECTION_COLUMN_REVERSE] = "column-reverse";
        FlexDirection[FlexDirection["row"] = Yoga.FLEX_DIRECTION_ROW] = "row";
        FlexDirection[FlexDirection["row-reverse"] = Yoga.FLEX_DIRECTION_ROW_REVERSE] = "row-reverse";
    })(FlexDirection = YogaConstants.FlexDirection || (YogaConstants.FlexDirection = {}));
    let JustifyContent;
    (function (JustifyContent) {
        JustifyContent[JustifyContent["flex-start"] = Yoga.JUSTIFY_FLEX_START] = "flex-start";
        JustifyContent[JustifyContent["flex-end"] = Yoga.JUSTIFY_FLEX_END] = "flex-end";
        JustifyContent[JustifyContent["center"] = Yoga.JUSTIFY_CENTER] = "center";
        JustifyContent[JustifyContent["space-between"] = Yoga.JUSTIFY_SPACE_BETWEEN] = "space-between";
        JustifyContent[JustifyContent["space-around"] = Yoga.JUSTIFY_SPACE_AROUND] = "space-around";
        JustifyContent[JustifyContent["space-evenly"] = Yoga.JUSTIFY_SPACE_EVENLY] = "space-evenly";
    })(JustifyContent = YogaConstants.JustifyContent || (YogaConstants.JustifyContent = {}));
    let FlexWrap;
    (function (FlexWrap) {
        FlexWrap[FlexWrap["wrap"] = Yoga.WRAP_WRAP] = "wrap";
        FlexWrap[FlexWrap["no-wrap"] = Yoga.WRAP_NO_WRAP] = "no-wrap";
        FlexWrap[FlexWrap["wrap-reverse"] = Yoga.WRAP_WRAP_REVERSE] = "wrap-reverse";
    })(FlexWrap = YogaConstants.FlexWrap || (YogaConstants.FlexWrap = {}));
    let Align;
    (function (Align) {
        Align[Align["stretch"] = Yoga.ALIGN_STRETCH] = "stretch";
        Align[Align["auto"] = Yoga.ALIGN_AUTO] = "auto";
        Align[Align["baseline"] = Yoga.ALIGN_BASELINE] = "baseline";
        Align[Align["center"] = Yoga.ALIGN_CENTER] = "center";
        Align[Align["flex-start"] = Yoga.ALIGN_FLEX_START] = "flex-start";
        Align[Align["flex-end"] = Yoga.ALIGN_FLEX_END] = "flex-end";
        Align[Align["space-between"] = Yoga.ALIGN_SPACE_BETWEEN] = "space-between";
        Align[Align["space-around"] = Yoga.ALIGN_SPACE_AROUND] = "space-around";
    })(Align = YogaConstants.Align || (YogaConstants.Align = {}));
    let PositionType;
    (function (PositionType) {
        PositionType[PositionType["relative"] = Yoga.POSITION_TYPE_RELATIVE] = "relative";
        PositionType[PositionType["absolute"] = Yoga.POSITION_TYPE_ABSOLUTE] = "absolute";
    })(PositionType = YogaConstants.PositionType || (YogaConstants.PositionType = {}));
    let Display;
    (function (Display) {
        Display[Display["flex"] = Yoga.DISPLAY_FLEX] = "flex";
        Display[Display["none"] = Yoga.DISPLAY_NONE] = "none";
    })(Display = YogaConstants.Display || (YogaConstants.Display = {}));
    let YogaCustomSizeConfig;
    (function (YogaCustomSizeConfig) {
        YogaCustomSizeConfig["AUTO"] = "auto";
        YogaCustomSizeConfig["SCREEN_SIZE"] = "screen";
        YogaCustomSizeConfig["WINDOW_SIZE"] = "window";
    })(YogaCustomSizeConfig = YogaConstants.YogaCustomSizeConfig || (YogaConstants.YogaCustomSizeConfig = {}));
    YogaConstants.YogaEdges = [Yoga.EDGE_TOP, Yoga.EDGE_RIGHT, Yoga.EDGE_BOTTOM, Yoga.EDGE_LEFT];
})(YogaConstants || (YogaConstants = {}));
