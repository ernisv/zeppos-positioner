import { setStatusBarVisible, createWidget, widget, align, text_style } from "@zos/ui";
import * as s from "./common.style";

export class SavedPosView {
    constructor(state) {
        this.state = state;
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
                text: "Saved pos",
                y: yPos
                }),
            yPos => createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: "TODO",
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