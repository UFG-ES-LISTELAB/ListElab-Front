import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-lists-search',
    templateUrl: './lists-search.component.html',
    styleUrls: ['./lists-search.component.scss']
})
export class ListsSearchComponent implements OnInit {

    @Output() submitted = new EventEmitter();
    @Output() listNew = new EventEmitter();
    searchForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.searchForm = this.fb.group({});
    }

    ngOnInit() {
    }

    onListNew() {
        this.listNew.emit();
    }

    onSearch() {
        this.submitted.emit(this.searchForm.value);
    }

}
