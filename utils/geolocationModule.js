export class GeolocationModule {
    constructor() {}

    listeners = Array()

    currentPosState = {
        lastUpdatedMs: Date.now()
    }

    _notifyListeners() {
        const notificationTime = Date.now()
        this.listeners.forEach((listener) => listener(this.currentPosState, notificationTime))
    }

    start() {
        this.timerHandle = setInterval(() => {
            if (Date.now() % 5000 < 2000)
                this.currentPosState.lastUpdatedMs = Date.now()
            this._notifyListeners()
          }, 1000)
    } 

    stop() {
        if (this.timerHandle)
            clearInterval(this.timerHandle)

    }
}