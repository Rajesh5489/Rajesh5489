import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AppStateService {
    enviromentData: any;
    constructor() { }

    getBaseUrl() {
        return this.enviromentData.url+"api/";
    }
}
