import { setStatusBarVisible, createWidget, widget, align, text_style, redraw, prop } from "@zos/ui";
import * as s from "./common.style";

export class CurrentPosView {
    constructor(state) {
        this.state = state;
    }

    currentLonText() {
        const label = "Lon: "
        if (this.state.currentPos)
            return label + this.state.currentPos.lon;
        else return label + "..."
    }

    currentLatText() {
        const label = "Lat: "
        if (this.state.currentPos)
            return label + this.state.currentPos.lat;
        else return label + "..."
    }

    currentStatusText() {
        const label = "Status: "
        if (this.state.currentPos) {
            return label + this.state.currentPos.status;
        } else return label + "..."
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
            yPos => this.latTextWidget = createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: this.currentLatText(),
                y: yPos
            }),
            yPos => this.lonTextWidget = createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: this.currentLonText(),
                y: yPos
                }),
            yPos => this.statusTextWidget = createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: this.currentStatusText(),
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
//        s.logger.debug("State during refresh: " + JSON.stringify(this.state))
        this.lastUpdatedTextWidget.setProperty(prop.TEXT, this.lastUpdatedText());
        this.statusTextWidget.setProperty(prop.TEXT, this.currentStatusText());
        this.latTextWidget.setProperty(prop.TEXT, this.currentLatText());
        this.lonTextWidget.setProperty(prop.TEXT, this.currentLonText());
   }

}