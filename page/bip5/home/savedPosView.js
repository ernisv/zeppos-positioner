import { setStatusBarVisible, createWidget, widget, align, text_style, prop } from "@zos/ui";
import * as s from "./common.style";

export class SavedPosView {
    constructor(state) {
        this.state = state;
    }

    _lastUpdatedText() {
        const label = "Updated: ";
        if (this.state.currentPos && this.state.currentPos.lastUpdatedMs) {
            return label + Math.floor((Date.now() - this.state.currentPos.lastUpdatedMs) / 1000) + "s ago";
        } else return label + "..."
    }

    _savedLatText() {
        const label = "Lat: ";
        if (this.state.savedPos && this.state.savedPos.lat != undefined) {
            return label + this.state.savedPos.lat;
        } else return label + "..."
    }

    _savedLonText() {
        const label = "Lon: ";
        if (this.state.savedPos && this.state.savedPos.lon != undefined) {
            return label + this.state.savedPos.lon;
        } else return label + "..."
    }

    _savedDistanceText() {
        const label = "Dist: ";
        const curPos = { ...this.state.currentPos };
        const savedPos = { ...this.state.savedPos };
        if (curPos.lat !== undefined && savedPos.lat !== undefined) {
            return label + this._calculateDistance(curPos, savedPos) + "m";
        } else return label + "..."
    }    

    _savedAzimuthText() {
        const label = "Azimuth: ";
        const curPos = { ...this.state.currentPos };
        const savedPos = { ...this.state.savedPos };
        if (curPos.lat !== undefined && savedPos.lat !== undefined) {
            return label + this._calculateAzimuth(curPos, savedPos);
        } else return label + "..."
    }

    _saveBtnText() {
        if (this.state.savedPos)
            return "Replace"; 
        else return "Save";
    }

    _calculateAzimuth(pos1, pos2) {
        const toRadians = (degrees) => (degrees * Math.PI) / 180;
        const toDegrees = (radians) => (radians * 180) / Math.PI;
      
        const lat1 = toRadians(pos1.lat);
        const lat2 = toRadians(pos2.lat);
        const deltaLon = toRadians(pos2.lon - pos1.lon);
      
        const x = Math.cos(lat2) * Math.sin(deltaLon);
        const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
      
        // Azimuth (in radians)
        let azimuth = Math.atan2(x, y);
      
        // Convert azimuth from radians to degrees
        azimuth = toDegrees(azimuth);
      
        // Normalize to [0, 360) range
        if (azimuth < 0) {
          azimuth += 360;
        }
      
        return azimuth;
      }    

    _calculateDistance(pos1, pos2) {
        const toRadians = (degrees) => (degrees * Math.PI) / 180;
        
        const R = 6371000; // Radius of the Earth in meters
        const lat1 = toRadians(pos1.lat);
        const lat2 = toRadians(pos2.lat);
        const deltaLat = toRadians(pos2.lat - pos1.lat);
        const deltaLon = toRadians(pos2.lon - pos1.lon);
        
        const a = 
            Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        const distance = R * c; // Distance in meters
        return distance;
    }

    savePosition() {
        const curPos = { ...this.state.currentPos }
        if (curPos) {
            this.state.savedPos = {
                lat: curPos.lat,
                lon: curPos.lon
            }
        }
        this.refresh();
    }

    clearPosition() {
        this.state.savedPos = null;
        this.refresh();
    }    

    _onClickSave() {
        this.savePosition();
    }

    _onLongClickSave() {
        this.clearPosition();
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
            yPos => this.latTextWidget = createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: this._savedLatText(),
                y: yPos
            }),
            yPos => this.lonTextWidget = createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: this._savedLonText(),
                y: yPos
                }),
            yPos => this.distanceTextWidget = createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: this._savedDistanceText(),
                y: yPos
            }),
            yPos => this.azimuthTextTextWidget = createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: this._savedAzimuthText(),
                y: yPos
            }),
            yPos => this.lastUpdatedTextWidget = createWidget(widget.TEXT, {
                ...defaultOptions,
                ...s.COMMON_TEXT_STYLE,
                text: this._lastUpdatedText(),
                y: yPos
                }),
        
            yPos => this.saveBtnWidget = createWidget(widget.BUTTON, {
                ...defaultOptions,
                ...s.COMMON_BUTTON_STYLE,
                text: this._saveBtnText(),
                x: (defaultOptions.x ?? 0) + s.DEVICE_WIDTH / 4,
                radius: 12,
                normal_color: 0xfc6950,
                press_color: 0xfeb4a8,
                y: yPos,
                click_func: (button_widget) => {
                    this._onClickSave(button_widget);
                  },
                longpress_func: (button_widget) => {
                this._onLongClickSave(button_widget);
                },           
                }),

        ].forEach((f, i) => f(i * s.TEXT_H))
    }

    refresh() {
        //s.logger.debug("State during refresh: " + JSON.stringify(this.state))
        this.lastUpdatedTextWidget.setProperty(prop.TEXT, this._lastUpdatedText());
        this.latTextWidget.setProperty(prop.TEXT, this._savedLatText());
        this.lonTextWidget.setProperty(prop.TEXT, this._savedLonText());
        this.saveBtnWidget.setProperty(prop.TEXT, this._saveBtnText());
        this.distanceTextWidget.setProperty(prop.TEXT, this._savedDistanceText());
        this.azimuthTextTextWidget.setProperty(prop.TEXT, this._savedAzimuthText());
   }

}