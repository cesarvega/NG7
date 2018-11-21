import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CalendarService implements Resolve<any>
{
    events: any;
    onEventsUpdated: Subject<any>;
    protected API_URL_LOOPBACK = 'https://nodeappcesar.herokuapp.com';

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onEventsUpdated = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getEvents()
            ]).then(
                ([events]: [any]) => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get events
     *
     * @returns {Promise<any>}
     */
    getEvents(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            const url = `${this.API_URL_LOOPBACK}/api/calendar-events`;
            this._httpClient.get(url)
                .subscribe((response: any) => {
                    this.events = response;
                    this.onEventsUpdated.next(this.events);
                //    console.log(JSON.stringify(this.events));                    
                    resolve(this.events);
                }, reject);
        });
    }


      // get User by id
  getUser(token: string): Observable<any> {
    const url = `${this.API_URL_LOOPBACK}/api/calendar-events`;
    return this._httpClient.get(url);
  }

    /**
     * Update events
     *
     * @param events
     * @returns {Promise<any>}
     */
    updateEvents(events): Promise<any>
    {
        const url = `${this.API_URL_LOOPBACK}/api/calendar-events`;
        // let data = {
        //     id  : 'events',
        //     data: [...events]
        // };
        return new Promise((resolve, reject) => {
            this._httpClient.post(url, JSON.stringify(events))
                .subscribe((response: any) => {
                    this.getEvents();
                }, reject);
        });
    }

}
