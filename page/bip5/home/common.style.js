import { gettext } from "i18n";
import { log } from "@zos/utils";
import { getDeviceInfo } from "@zos/device";
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui'

export const logger = log.getLogger("positioner");

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();

const textSize = 36;

export const { height: TEXT_H } = getTextLayout("H", {
  text_size: textSize,
  text_width: 0,
  wrapped: 0
});

export const COMMON_TEXT_STYLE = {
  h: TEXT_H,
  color: 0xffffff,
  text_size: textSize,
  align_h: align.LEFT,
  align_v: align.CENTER_V,
  text_style: text_style.NONE,
};
