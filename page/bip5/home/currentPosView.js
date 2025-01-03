import { setStatusBarVisible, createWidget, widget, align, text_style } from "@zos/ui";
import * as s from "./common.style";

export class CurrentPosView {
    constructor(state) {
        this.state = state;
    }

    currentLonStr() {
        if (this.state.currentPos)
            return this.state.currentPos.lon;
        else return "..."
    }

    currentLatStr() {
        if (this.state.currentPos)
            return this.state.currentPos.lat;
        else return "..."
    }

    currentAltStr() {
        if (this.state.currentPos) {
            return this.state.currentPos.alt + "m";
        } else return "..."
    }

    lastUpdatedStr() {
        if (this.state.lastUpdatedMs) {
            return Math.floor(Date.now() - this.state.lastUpdatedMs / 1000) + "s ago";
        } else return "..."
    }

    build(defaultOptions) {
        [
            yPos => createWidget(widget.TEXT, {
                ...s.COMMON_TEXT_STYLE,
                ...defaultOptions,
                align_h: align.CENTER_H,
                text: "Current pos",
                y: yPos
                }),
            yPos => createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: "Lon: " + this.currentLonStr(),
                y: yPos
                }),
            yPos => createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: "Lat: " + this.currentLatStr(),
                y: yPos
            }),
            yPos => createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: "Alt: " + this.currentAltStr(),
                y: yPos
            }),
            yPos => createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: "Updated: " + this.lastUpdatedStr(),
                y: yPos
            }),

        ].forEach((f, i) => f(i * s.TEXT_H))
    }

}