import { setStatusBarVisible, createWidget, widget, align, text_style } from "@zos/ui";
import { setScrollMode, SCROLL_MODE_SWIPER_HORIZONTAL } from '@zos/page'
import { push } from '@zos/router'
import { log } from '@zos/utils'
import * as s from "./common.style";
import { CurrentPosView } from "./currentPosView"
import { SavedPosView } from "./savedPosView"

const logger = log.getLogger("positioner");

Page({
  state: {
    currentPos: null,
    lastUpdatedMs: 0
  },

  buildSavedPosView: function(defaultOptions) {
    [
      yPos => createWidget(widget.TEXT, {
        ...s.COMMON_TEXT_STYLE,
        ...defaultOptions,
        align_h: align.CENTER_H,
        text: "Saved pos",
        y: yPos
      }),      yPos => createWidget(widget.TEXT, {
        ...defaultOptions,
        ...s.COMMON_TEXT_STYLE,
        text: "TODO",
        y: yPos
      }),

    ].forEach((f, i) => f(i * s.TEXT_H))
  },  

  build() {
    logger.debug("page build invoked");
    setStatusBarVisible(false);

    this.currentPosView = new CurrentPosView(this.state);
    this.savedPosView = new SavedPosView(this.state);

    setScrollMode({
      mode: SCROLL_MODE_SWIPER_HORIZONTAL,
      options: {
        width: s.DEVICE_WIDTH,
        count: 2
      }
    });

    this.currentPosView.build({
      w: s.DEVICE_WIDTH
    });
    
    this.savedPosView.build({
      x: s.DEVICE_WIDTH,
      w: s.DEVICE_WIDTH
    });    

  },

  onInit() {
    logger.debug("page onInit invoked");
  },

  onDestroy() {
    logger.debug("page onDestroy invoked");
  },
});


