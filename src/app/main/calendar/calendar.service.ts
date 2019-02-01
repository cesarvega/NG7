import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CalendarEvent } from 'calendar-utils';

import { AngularFirestore } from '@angular/fire/firestore';
@Injectable()
export class CalendarService implements Resolve<any>
{
    events: any;
    onEventsUpdated: Subject<any>;
    list: any[] = [];
    protected API_URL_LOOPBACK = 'https://nodeappcesar.herokuapp.com';
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private db: AngularFirestore

    ) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
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

    getEvents(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.collection('events').get().subscribe((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${doc.data()}`);
                    console.dir(doc.data());
                    this.list.push(doc.data());
                }, reject);
                this.events = this.list;
                console.log(this.events);
                this.onEventsUpdated.next(this.events);
                resolve(this.events);
            });
        });
    }

  
    updateEvents(events): Promise<any> {
        // const url = `${this.API_URL_LOOPBACK}/api/calendar-events`;
        return new Promise((resolve, reject) => {
            // for each
            // this.db.collection('events').add({});
            //     this._httpClient.post(url, {
            //         id  : 'events',
            //         data: [...events]
            //     })
            //         .subscribe((response: any) => {
            //             this.getEvents();
            //         }, reject);
            this.getEvents();
        });
    }


    createCalendarEvent(event: CalendarEvent): Observable<any> {
        const url = `${this.API_URL_LOOPBACK}/api/calendar-events`;
        return this._httpClient.post(url, event);
    }
    deleteCalendarEvent(event: CalendarEvent): Observable<any> {
        const url = `${this.API_URL_LOOPBACK}/api/calendar-events/` + event.id;
        return this._httpClient.delete(url);
    }
    updateCalendarEvent(event: CalendarEvent, id: string): Observable<any> {
        const url = `${this.API_URL_LOOPBACK}/api/calendar-events/` + id;
        return this._httpClient.put(url, event);
    }
}
