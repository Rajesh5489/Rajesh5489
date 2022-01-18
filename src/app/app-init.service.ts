import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppStateService } from './_services/appStateService';

@Injectable()
export class AppInitService {

    constructor(private http: HttpClient, private appStateService: AppStateService) {
    }

    load(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.http.get('assets/json/Environment.json').subscribe(value => {
                this.appStateService.enviromentData = value;
                resolve(true);
            });
        });
    }
}
