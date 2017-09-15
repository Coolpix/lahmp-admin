import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  private sub: any;
  @Input() layout;
    pageInfo;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private route: ActivatedRoute
    ) {
      this.sub = this.route.params.subscribe( params => console.log(params) );
    }
    ngOnInit(): void {
        this
        .router.events
        .filter(event => event instanceof NavigationEnd)
        .map(() => this.activatedRoute)
        .map(route => {
            while (route.firstChild) route = route.firstChild;
            return route;
        })
        .filter(route => route.outlet === 'primary')
        .mergeMap(route => route.data)
        .subscribe((event) => {
            this.titleService.setTitle(event['title']);
            this.pageInfo = event;
        });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }
}
