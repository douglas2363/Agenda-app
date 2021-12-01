import { Component, OnInit } from '@angular/core';
import { ContatoService } from './../contato.service';
import { Contato } from './contato';
import { Form, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contatos: Contato[] = [];
  colunas = [
  'foto',
  'id',
  'nome',
  'email',
  'favorito'
  ];
  totalElementos = 0;
  pagina? = 0;
  tamanho = 2;
  pageSizeOptions: number[] = [2];
  constructor(
    private contato: ContatoService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos(this.pagina, this.tamanho);

  }

  montarFormulario(){
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  listarContatos(pagina = 0, tamanho = 0){
    this.contato.list(pagina,tamanho).subscribe(respnse => {
      this.contatos = respnse.content;
      this.totalElementos = respnse.totalElements;
      this.pagina = respnse.number;
      console.log('contatos', this.contatos)
      console.log('TotalElementos', this.totalElementos);
      console.log('paginas', this.pagina);
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

  uploadFoto(event: any, contato: any){
    if (event.target.files && event.target.files[0]){
      const foto = event.target.files[0];
        const formData: FormData = new FormData();
        formData.append("foto", foto);
        this.contato.upload(contato, formData).subscribe(response => this.listarContatos());

    }
  }

  visualizarContato(contato: Contato){
    this.dialog.open(
      ContatoDetalheComponent,{
        width: '400px',
        height: '400px',
        data: contato

      })
  }

  paginar(event: PageEvent){
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho);

  }

}

