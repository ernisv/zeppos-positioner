import { gettext } from "i18n";
import { log } from "@zos/utils";
import { getDeviceInfo } from "@zos/device";

const logger = log.getLogger("torques");

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();

const textSize = 36;

export const textH = textSize * 2;

export const UNIT_LEFT_TEXT_STYLE = {
  x: 0,
  y: 0,
  w: DEVICE_WIDTH,
  h: textH,
  color: 0xffffff,
  text_size: textSize,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.NONE,
};
