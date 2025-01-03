import { createWidget, widget, align, text_style } from "@zos/ui";
import * as s from "./index.style";

const logger = DeviceRuntimeCore.HmLogger.getLogger("positioner");

Page({
  build() {
    logger.debug("page build invoked");
    hmUI.setStatusBarVisible(false);

    hmUI.createWidget(hmUI.widget.TEXT, {
      text: "aha",
      ...s.UNIT_LEFT_TEXT_STYLE,
    });
  },

  onInit() {
    logger.debug("page onInit invoked");
  },

  onDestroy() {
    logger.debug("page onDestroy invoked");
  },
});
