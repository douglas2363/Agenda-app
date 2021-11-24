import { Component, OnInit } from '@angular/core';
import { ContatoService } from './../contato.service';
import { Contato } from './contato';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { throwToolbarMixedModesError } from '@angular/material/toolbar';



@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
 
  constructor(
    private contato: ContatoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]

    })

  }
  submit() {
  const formValues = this.formulario.value;
  const contato: Contato = new Contato();
  this.contato.save(contato).subscribe(resposta => {
    console.log(resposta);
  })

  }

}

