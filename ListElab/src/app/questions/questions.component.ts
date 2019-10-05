import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionsService} from './questions.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  questionsServiceSubscription = new Subscription();
  questions: any[];

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.questionsService.getQuestions()
      .subscribe(questions => this.questions = questions)
      .error(error => console.error(error));
  }

  ngOnDestroy() {
    this.questionsServiceSubscription.unsubscribe();
  }

}
