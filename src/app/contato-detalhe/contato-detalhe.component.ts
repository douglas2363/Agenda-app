import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Contato } from '../contato/contato';

@Component({
  selector: 'app-contato-detalhe',
  templateUrl: './contato-detalhe.component.html',
  styleUrls: ['./contato-detalhe.component.css']
})
export class ContatoDetalheComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ContatoDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public contato: Contato,
  ) { }

  ngOnInit(): void {
  }


  fechar(): void {
    this.dialogRef.close();
  }

}
