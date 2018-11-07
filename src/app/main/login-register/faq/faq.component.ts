import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseUtils } from '@fuse/utils';
import { FaqService } from './faq.service';



@Component({
    selector   : 'faq',
    templateUrl: './faq.component.html',
    styleUrls  : ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy
{
    faqs: any;
    faqsFiltered: any;
    step: number;
    searchInput: any;
 
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _faqService: FaqService
    )
    {  
        this.searchInput = new FormControl('');
        this.step = 0;
        this._unsubscribeAll = new Subject();
    }
    
    ngOnInit(): void
    {
        this._faqService.onFaqsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                this.faqs = response;
                this.faqsFiltered = response ? response : {};
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this.faqsFiltered = FuseUtils.filterArrayByString(this.faqs, searchText);
            });
    }
   
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    setStep(index: number): void
    {
        this.step = index;
    }

    nextStep(): void
    {
        this.step++;
    }

    prevStep(): void
    {
        this.step--;
    }
}
