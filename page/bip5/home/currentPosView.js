import { setStatusBarVisible, createWidget, widget, align, text_style, redraw, prop } from "@zos/ui";
import * as s from "./common.style";

export class CurrentPosView {
    constructor(state) {
        this.state = state;
    }

    currentLonText() {
        if (this.state.currentPos)
            return this.state.currentPos.lon;
        else return "..."
    }

    currentLatText() {
        if (this.state.currentPos)
            return this.state.currentPos.lat;
        else return "..."
    }

    currentAltText() {
        if (this.state.currentPos) {
            return this.state.currentPos.alt + "m";
        } else return "..."
    }

    lastUpdatedText() {
        const label = "Updated: ";
        if (this.state.currentPos && this.state.currentPos.lastUpdatedMs) {
            return label + Math.floor((Date.now() - this.state.currentPos.lastUpdatedMs) / 1000) + "s ago";
        } else return label + "..."
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
                text: "Lon: " + this.currentLonText(),
                y: yPos
                }),
            yPos => createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: "Lat: " + this.currentLatText(),
                y: yPos
            }),
            yPos => createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: "Alt: " + this.currentAltText(),
                y: yPos
            }),
            yPos => this.lastUpdatedTextWidget = createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: this.lastUpdatedText(),
                y: yPos
            }),

        ].forEach((f, i) => f(i * s.TEXT_H))
    }

    refresh() {
        //s.logger.debug("State during refresh: " + JSON.stringify(this.state))
        this.lastUpdatedTextWidget.setProperty(prop.TEXT, this.lastUpdatedText());
   }

}