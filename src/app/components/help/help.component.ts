import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-help',
	templateUrl: './help.component.html',
	styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

	private helpOption: string;

	constructor( private route: ActivatedRoute ) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.helpOption = params.get('id');
		});
	}

}
