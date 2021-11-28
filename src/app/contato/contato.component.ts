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
  contatos: Contato[] = [];
  colunas = [
  'id',
  'nome',
  'email',
  'favorito'
  ];
  constructor(
    private contato: ContatoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos();

  }

  montarFormulario(){
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  listarContatos(){
    this.contato.list().subscribe(respnse => {
      this.contatos = respnse;
      console.log('contatos', this.contatos)
    })
  }

  favoritarContato(contato:Contato){
    this.contato.favoritarContato(contato).subscribe(respnse =>{
      contato.favorito = !contato.favorito;
    })

  }
  submit() {
  const formValues = this.formulario.value;
  const contato: Contato = new Contato(formValues.nome, formValues.email);
  this.contato.save(contato).subscribe(resposta => {
    let lista: Contato[] = [...this.contatos, resposta];
    this.contatos = lista;
    console.log(this.contatos);
  })

  }

}

