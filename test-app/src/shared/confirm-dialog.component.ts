import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'confirm-dialog',
    template: `
        <div class="confirm-dialog">
        <h1 class="confirm-dialog-title">{{data && data.title? data.title: 'Dialog'}}</h1>

        <mat-dialog-content class="confirm-dialog-content">
        {{data && data.message? data.message: 'Are you sure to do this?'}}
        </mat-dialog-content>
        <mat-dialog-actions class="confirm-dialog-action">
        <button mat-raised-button [mat-dialog-close]="ACTION_CONFIRM" class="accent" >Confirm</button>
        <button mat-raised-button [mat-dialog-close]="ACTION_CANCEL" class="primary">Cancel</button>
        </mat-dialog-actions>
        </div>`
    ,
    styles: [
        `
        h1 {
            color: #3d3d3d;
        }
        .confirm-dialog {
            min-width: 350px;
            font-family: sans-serif;
            text-align: center;
            }
            
        .confirm-dialog-title {
            margin-top:0px;
        }
        .confirm-dialog-content {
            padding-top:10px; 
            padding-bottom:20px;
            color: #3d3d3d;
        }
        .confirm-dialog-action {
            justify-content: center;
            color: #424242;
            margin-left: 10px;
        }
        .accent {
            margin-right: 20px;
            border: none;
            padding: 6px 12px;
            border-radius: 10px;
            transition: all 0.3s ease;
            background-color: #c7d0d4;
        }
        .accent:hover {
            background-color: #3dc37d;
            color: white;
        }
        .primary {
            background: none;
            border: none;
            color: #f32430;
            transition: background 0.4s;
            border-radius: 10px;
        }
        .primary:hover {
            background: rgba(206, 81, 81, 0.11);
            cursor: pointer;
        }
        
        `
    ]

})
export class ConfirmDialogComponent {
    // dialogActions: string;
    public readonly ACTION_YES: string = "YES";
    public readonly ACTION_NO: string = "NO";
    public readonly ACTION_CANCEL: string = "CANCELED";
    public readonly ACTION_IGNORE: string = "IGNORED";
    public readonly ACTION_OK: string = "OK";
    public readonly ACTION_CLOSE: string = "CLOSED";
    public readonly ACTION_CONFIRM: string = "CONFIRMED";

    constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmDialogComponent>) {


    }
}
