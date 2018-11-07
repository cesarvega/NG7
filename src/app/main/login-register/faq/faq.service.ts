import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FaqService implements Resolve<any>
{
    faqs: any;
    onFaqsChanged: BehaviorSubject<any>;
    constructor(
        private _httpClient: HttpClient
    )
    {       
        this.onFaqsChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getFaqs()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getFaqs(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/bi-faq')
                .subscribe((response: any) => {
                    this.faqs = response;
                    this.onFaqsChanged.next(this.faqs);
                    resolve(this.faqs);
                }, reject);
        });
    }
}
