import { log } from "@zos/utils";
import { openSync, writeSync, writeFileSync, readFileSync, O_RDWR, O_CREAT } from '@zos/fs'

export const logger = log.getLogger("positioner");

export class LocalStore {
    constructor() {}

    storeFileName = "positioner-local-data.dat"

    storeObject(obj) {
          const dataToWrite = JSON.stringify(obj)

          writeFileSync({
            path: this.storeFileName,
            data: dataToWrite,
            options: {
              encoding: 'utf8',
            }
          })
    }

    loadObject() {
        const contentString = readFileSync({
            path: this.storeFileName,
            options: {
              encoding: 'utf8',
            },
          })
        if (contentString === undefined) return undefined;
        return JSON.parse(contentString)
    }

}