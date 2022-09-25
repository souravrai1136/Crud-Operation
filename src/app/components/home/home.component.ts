import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { CrudService } from 'src/app/services/crud.service';


declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  thItems: any[] = [
    { text: 'Name' },
    { text: 'Amount of Cars' },
    { text: 'Total Budget' },
    { text: 'Remaining Budget' },
    { text: 'Action' },
  ];
  formModal: any;
  editModalFrom: any;
  DealersForm!: FormGroup;
  tableData: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private fb: FormBuilder, private api: CrudService) { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );

    this.DealersForm = this.fb.group({
      dealerName: [''],
      totalBudget: [''],
      numberOfCar: [''],
      remaningBudget: [''],
      ower: this.fb.group({
        fristName: [''],
        lastName: ['']
      }),
      id: [''],
    });
    this.showDealer();
  }

  get Location(): FormGroup {
    return this.DealersForm.get("location") as FormGroup;
  }

  get Owner(): FormGroup {
    return this.DealersForm.get("owner") as FormGroup;
  }

  addDealer() {
    let id = UUID.UUID();

    this.DealersForm.get("id")?.patchValue(id);
    this.api.postVal(this.DealersForm.value).subscribe((res: any) => {
      console.log(res);
      alert("Add Data Successfully ");
      let ref = document.getElementById('clear');
      ref?.click();

      this.DealersForm.reset();
      this.showDealer();
    })
  }

  showDealer() {
    this.api.getVal().subscribe((res: any) => {
      this.tableData = res;
      console.log(this.tableData)
    })
  }

  deleteDealer(item: any) {
    this.api.deleteVal(item.id).subscribe((res: any) => {
      this.showDealer();
    })
  }

  onEditDealer(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.DealersForm.controls['dealerName'].patchValue(data.dealerName);
    this.DealersForm.controls['numberOfCar'].patchValue(data.numberOfCar);
    this.DealersForm.controls['totalBudget'].patchValue(data.totalBudget);
    this.DealersForm.controls['remaningBudget'].patchValue(data.remaningBudget);
    this.DealersForm.controls['id'].patchValue(data.id);
  }



  updateDealer() {
    let id = this.DealersForm.get("id")?.value;
    this.api.updateVal(id, this.DealersForm.value).subscribe(res => {
      this.DealersForm.reset();
    });
    this.showDealer();
  }

  openModal() {
    this.formModal.show();
    this.DealersForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  CloseModal() {
    this.formModal.hide();
  }

}
