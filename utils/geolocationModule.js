import { Geolocation } from '@zos/sensor'
import { log } from "@zos/utils";

export const logger = log.getLogger("positioner");

export class GeolocationModule {
    constructor() {}

    geolocation = new Geolocation()

    listeners = Array()

    currentPosState = {
        lastUpdatedMs: Date.now()
    }

    _transformSensorCoordinate(coordinate) {
        return coordinate
    }

    _geoCallbackFunction() {
//        logger.debug("Geo callback function")
        this.currentPosState.status = String(this.geolocation.getStatus())
        if (this.currentPosState.status === "A")
            this.currentPosState.lastUpdatedMs = Date.now()
        this.currentPosState.lon = this._transformSensorCoordinate(this.geolocation.getLongitude("DD"))
        this.currentPosState.lat = this._transformSensorCoordinate(this.geolocation.getLatitude("DD"))
        this._notifyListeners()
    }

    _geoCallback = this._geoCallbackFunction.bind(this)

    _notifyListeners() {
        const notificationTime = Date.now()
        this.listeners.forEach((listener) => listener(this.currentPosState, notificationTime))
    }

    start() {
        this.geolocation.onChange(this._geoCallback)  
        this.geolocation.start()
    } 

    stop() {

        this.geolocation.offChange(this._geoCallback)
        this.geolocation.stop()        

    }
}