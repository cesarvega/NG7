import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestOptions } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class EcommerceProductsService implements Resolve<any>
{
    public widgets: any[];
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    private _SP_getSurveySummary = '[BI_MEMBERS].[dbo].[pm_getSummary] ';
    private ASMX_URL_GetSurveySummary = 'https://tools.brandinstitute.com/wsPanelMembers/wsPanel.asmx/pm_getSummary';


    products: any[];
    now = true;
    webApiUrl = 'https://ng6-node-app-boldepvhqf.now.sh/';
    apiCall = 'api/bi-surveys';
    API_URL = 'https://tools.brandinstitute.com/BIWebServices/' + 'api/BiFormCreator/';
    api_call = '[RESPONDENTS].[dbo].[pm_GetSurveyHistory] ';
    private headers = { headers: new HttpHeaders().set('content-type', 'application/json').set('Accept', 'application/json') };
    onProductsChanged: BehaviorSubject<any>;
    newO: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onProductsChanged = new BehaviorSubject({});
    }

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
                this.getSurveys()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    // get survey summary by username
    private getSurveySummary(username: string): Observable<any> {
        const bodyString = JSON.stringify({ username: username });
        const url = `${this.API_URL}`;
        return this._httpClient.post(this.ASMX_URL_GetSurveySummary, bodyString, this.httpOptions);
    }

    getWidgets(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/analytics-dashboard-widgets')
                .subscribe((response: any) => {
                    this.getSurveySummary('cvega@1.com').subscribe(res => {
                        if (res) {
                            const jsonData = JSON.parse(res.d)[0].json;
                            let amount = JSON.parse(jsonData).maxamount;
                            amount = Math.ceil(amount / 100) * 100;
                            response.widget1.options.scales.yAxes[0].ticks.max = amount;
                            const parseData = JSON.parse(jsonData);
                            response.widget1.datasets = parseData.DataSet;
                            response.widget1.totalAmount = parseData.Summary[0].Amount;
                            response.widget1.totalAmountSurveys = parseData.Detail.length;
                            response.widget1.avg = parseData.Summary[1].Amount;
                            this.widgets = response;
                            resolve(response);
                        }
                    });

                }, reject);
        });
    }

    getSurveys(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.now) {
                this._httpClient.get(this.webApiUrl + this.apiCall)
                    .subscribe((response: any) => {                            
                        response.sort( (a, b) => {                                                                                
                             if (a.surveyStatus <  b.surveyStatus ){
                                 return -1;
                             }                        
                             if (a.surveyStatus >  b.surveyStatus ){
                                 return 1;
                             }
                            return  0;
                        } );

                        this.products = response;
                        this.onProductsChanged.next(this.products);
                        resolve(response);
                    }, reject);
            } else {
                const api_call = JSON.stringify(this.api_call);
                const user = localStorage.getItem('username');
                return this._httpClient.post(this.API_URL, api_call + '\'' + user + '\',' + '\'2\'', this.headers)
                    .subscribe((response: any) => {
                        this.products = response;
                        this.onProductsChanged.next(this.products);
                        resolve(response);
                    }, reject);
            }
        });
    }
}
