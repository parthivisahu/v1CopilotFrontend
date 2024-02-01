// patient-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
  animations: [
    trigger('cardState', [
      state('show', style({
        transform: 'scale(1)'
      })),
      state('hide', style({
        transform: 'scale(0)'
      })),
      transition('show => hide', animate('200ms ease-out')),
      transition('hide => show', animate('200ms ease-in'))
    ])
  ]
})
export class PatientDetailsComponent implements OnInit {
  patient: any;
  state = 'show';
  constructor(private route: ActivatedRoute, private patientService: PatientService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { 
    this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.patientService.getPatientsById(id).subscribe(patient => this.patient = patient);
  }

  hideCard() {
    this.state = 'hide';
  }

  showCard() {
    this.state = 'show';
  }
}