import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable, Subject } from "rxjs";
import { StoreSummary } from "../_models/StoreSummary";

@Injectable({
    providedIn: "root"
})
export class AppStateService {
    private expandMenu = new Subject<string>();
    enviromentData: any;
    //storeList!: Array<StoreSummary>;

    constructor(private cookieService: CookieService) { }

    getBaseUrl() {
        return this.enviromentData.url + "api/";
    }

    get userType(): string {
        return this.cookieService.get("userType");
    }
    set userType(val: string) {
        this.cookieService.set("userType", val);
    }

    get userName(): string {
        return this.cookieService.get("userName");
    }
    set userName(val: string) {
        this.cookieService.set("userName", val);
    }

    get retailerOrBrandId(): any {
        return this.cookieService.get("retailerOrBrandId");
    }
    set retailerOrBrandId(val: any) {
        this.cookieService.set("retailerOrBrandId", val);
    }

    get storeList(): Array<StoreSummary> {
        return JSON.parse(this.cookieService.get("storeList"));
    }
    set storeList(val: Array<StoreSummary>) {
        this.cookieService.set("storeList", JSON.stringify(val));
    }

    get storeId(): number {
        return Number(this.cookieService.get("storeId"));
    }
    set storeId(val: number) {
        this.cookieService.set("storeId", val.toString());
    }

    get storeName(): string {
        return this.cookieService.get("storeName");
    }
    set storeName(val: string) {
        this.cookieService.set("storeName", val);
    }

    get storeLocation(): string {
        return this.cookieService.get("storeLocation");
    }
    set storeLocation(val: string) {
        this.cookieService.set("storeLocation", val);
    }

    get showAddStoreView(): boolean {
        return this.getBoolean(this.cookieService.get("showAddStoreView"));
    }
    set showAddStoreView(val: boolean) {
        this.cookieService.set("showAddStoreView", val.toString());
    }

    public clearAllCookies() {
        this.cookieService.deleteAll();
    }

    public clearRetailerOrBrandId() {
        this.cookieService.delete("retailerOrBrandId");
    }

    public clearStoreDetails() {
        this.cookieService.delete("storeName");
        this.cookieService.delete("storeId");
        this.cookieService.delete("storeLocation");
    }

    public getBoolean(value: any) {
        switch (value) {
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    }

    setExpandMenu(item: any) {
        this.expandMenu.next(item);
    }

    getonExpandMenu(): Observable<any> {
        return this.expandMenu.asObservable();
    }

}
