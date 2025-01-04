import { setStatusBarVisible, createWidget, widget, align, text_style } from "@zos/ui";
import { setScrollMode, SCROLL_MODE_SWIPER_HORIZONTAL } from '@zos/page'
import { push } from '@zos/router'
import * as s from "./common.style";
import { CurrentPosView } from "./currentPosView"
import { SavedPosView } from "./savedPosView"
import { GeolocationModule } from "./../../../utils/geolocationModule"
import { setPageBrightTime } from '@zos/display'

Page({
  state: {
    currentPos: null
  },

  build() {
    s.logger.debug("page build invoked");
    setStatusBarVisible(false);
    setPageBrightTime({
      brightTime: 90000,
    });

    this.geoModule.listeners.push(this.geoListener.bind(this));

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

    this.refreshTimer = setInterval(() => {
      this.currentPosView.refresh();
      this.savedPosView.refresh();
    }, 1000);

  },

  geoListener(currentPosState) {
    this.state.currentPos = { ...currentPosState};

    this.currentPosView.refresh();
    this.savedPosView.refresh();
  },  

  onInit() {
    s.logger.debug("page onInit invoked");

    this.currentPosView = new CurrentPosView(this.state);
    this.savedPosView = new SavedPosView(this.state);

    this.geoModule = new GeolocationModule();
    this.geoModule.start();
  },

  onDestroy() {
    s.logger.debug("page onDestroy invoked");
    this.geoModule.stop();
    this.geoModule.listeners.length = 0;

    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = undefined;
    }
  }
});


