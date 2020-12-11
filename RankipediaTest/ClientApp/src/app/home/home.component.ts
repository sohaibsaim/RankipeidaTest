import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericApiCallingService } from '../shared/services/global/generic-api-calling.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  IsSubCategory1: boolean;
  IsSubCategory2: boolean;

  // SUB CATEGORIES LIST
  SubCategory1List: any[];
  SubCategory2List: any[];
  SubCategory3List: any[];

  // INDUSTRIES ARRAY
  IndustriesList: {
    Id: number,
    Name: string,
    Value: number,
    IsSubCategory: boolean,
    SubCatergoryList: any[]
  }[];

  // FORM GROUP
  IndustryForm: FormGroup;
  IndustryViewForm: FormGroup;

  ViewFromData:
    {
      Industry: string,
      SubIndustry1: string,
      SubIndustry2: string,
      Suggestion: string
    };

  // PROPERTY NAME TO SEARCH FROM ARRAY
  keyword = 'Name';

  IsFormSubmitted: boolean;

  constructor(private formBuilder: FormBuilder,
    private _GenericApiCallingService: GenericApiCallingService,
    private toastr: ToastrService) {
    // INITILIZATIONS
    this.IsSubCategory1 = false;
    this.IsSubCategory2 = false;

    this.IsFormSubmitted = false;

    this.SubCategory1List = [];
    this.SubCategory2List = [];
    this.SubCategory3List = [];

    this.IndustriesList = [];

    this.ViewFromData =
    {
      Industry: "",
      SubIndustry1: "",
      SubIndustry2: "",
      Suggestion: ""
    };
  }

  ngOnInit(): void {
    this.GetIndustriesList();
    // FORM INITILIZATION
    this.IndustryForm = this.formBuilder.group({
      IndustryName: ['', [Validators.required]],
      subGroup: this.formBuilder.group({}),
      IndustryTextArea: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(200)]]
    });

    this.IndustryViewForm = this.formBuilder.group({
      IndustryName: [''],
      SubCategory1: [''],
      SubCategory2: [''],
      IndustryTextArea: [null]
    });
  }

  // SET SUB FORM 1 VALIDATORS
  createSubForm1() {
    return this.formBuilder.group({
      SubCategory1: ['', Validators.required]
    });
  }

  // CLEAR SUB FORM 1 VALIDATORS
  clearSubForm1Validators() {
    let SubCategory = this.IndustryForm.get('subGroup');
    if (SubCategory != null) {
      let SubCategoryValidators = SubCategory.get("SubCategory1");
      if (SubCategoryValidators != null) {
        SubCategoryValidators.clearValidators();
        SubCategoryValidators.updateValueAndValidity();
      }
    }
  }

  // SET SUB FORM 2 VALIDATORS
  createSubForm2() {
    let SubGroup = this.IndustryForm.get('subGroup');
    return this.formBuilder.group({
      SubCategory1: [SubGroup.get('SubCategory1').value, Validators.required],
      SubCategory2: ['', Validators.required]
    });
  }

  // CLEAR SUB FORM 2 VALIDATORS
  clearSubForm2Validators() {
    let SubCategory = this.IndustryForm.get('subGroup');
    if (SubCategory != null) {
      let SubCategoryValidators = SubCategory.get("SubCategory2");
      if (SubCategoryValidators != null) {
        SubCategoryValidators.clearValidators();
        SubCategoryValidators.updateValueAndValidity();
      }
    }
  }

  // ON CHANGE 1ST MAIN INDUSTRY
  onChangeIndustry(): void {

    // GET SELECTED INDUSTRY DATA FROM THE MAIN ARRAY
    let IndustryValue = Number(this.IndustryForm.get('IndustryName').value);
    let SelectedIndustry = this.IndustriesList.find(x => x.Id == IndustryValue);

    // IF SELECTED INDUSTRY HAS SUB CATEGORIES THEN ADD ADDITIONAL FORM VALIDATOR
    if (SelectedIndustry != null) {
      this.ViewFromData.Industry = SelectedIndustry.Name;
      if (SelectedIndustry.IsSubCategory) {
        // this.SubCategory1List = SelectedIndustry.SubCatergoryList;
        // API CALL TO GET SUB INDUSTRIES LIST
        this.GetSubIndustryDetailsById(IndustryValue);
        this.IndustryForm.setControl('subGroup', this.createSubForm1())
        this.IsSubCategory1 = true;
      }
      else {
        this.ViewFromData.SubIndustry1 = "";
        this.ViewFromData.SubIndustry2 = "";
        this.IsSubCategory1 = false;
        this.IsSubCategory2 = false;
        this.SubCategory1List = [];
        this.SubCategory2List = [];
        this.SubCategory3List = [];
        this.clearSubForm1Validators();
        this.clearSubForm2Validators();
      }
    }
    else {
      this.IsSubCategory1 = false;
      this.IsSubCategory2 = false;
      this.SubCategory1List = [];
      this.SubCategory2List = [];
      this.SubCategory3List = [];
      this.clearSubForm1Validators();
      this.clearSubForm2Validators();
    }
  }

  // ON CHANGE SUB MAIN INDUSTRY
  onChangeSubIndustry(): void {
    let SubGroup = this.IndustryForm.get('subGroup');
    if (SubGroup != null) {

      // GET SUB SELECTED INDUSTRY DATA FROM SUB CATEGORY LIST ARRAY
      let IndustryValue = Number(SubGroup.get('SubCategory1').value);
      let SelectedSubIndustry = this.SubCategory1List.find(x => x.Id == IndustryValue);
      

      // IF SELECTED INDUSTRY HAS SUB CATEGORIES THEN ADD ADDITIONAL FORM VALIDATOR
      if (SelectedSubIndustry != null) {
        this.ViewFromData.SubIndustry1 = SelectedSubIndustry.Name;
        if (SelectedSubIndustry.IsSubCategory) {
          this.IsSubCategory2 = true;
          this.SubCategory2List = SelectedSubIndustry.SubCatergoryList;
          this.IndustryForm.setControl('subGroup', this.createSubForm2())
        }
        else {
          this.IsSubCategory2 = false;
          this.ViewFromData.SubIndustry2 = "";
          this.SubCategory2List = [];
          this.SubCategory3List = [];
          this.clearSubForm2Validators();
        }
      }
      else {
        this.IsSubCategory2 = false;
        this.ViewFromData.SubIndustry2 = "";
        this.SubCategory2List = [];
        this.SubCategory3List = [];
        this.clearSubForm2Validators();
      }
    }
  }

  // ON CHANGE SUB INDUSTRY
  onChangeSubIndustry1() {
    let SubGroup = this.IndustryForm.get('subGroup');
    if (SubGroup != null) {
      // GET SUB SELECTED INDUSTRY DATA FROM SUB CATEGORY LIST ARRAY
      let IndustryValue = Number(SubGroup.get('SubCategory2').value);
      let SelectedSubIndustry = this.SubCategory2List.find(x => x.Id == IndustryValue);

      // IF SELECTED INDUSTRY HAS SUB CATEGORIES THEN ADD ADDITIONAL FORM VALIDATOR
      if (SelectedSubIndustry != null) {
        this.ViewFromData.SubIndustry2 = SelectedSubIndustry.Name;
        if (SelectedSubIndustry.IsSubCategory) {
          this.SubCategory3List = SelectedSubIndustry.SubCatergoryList;
        }
        else {
          this.SubCategory3List = [];
        }
      }
      else {
        this.SubCategory3List = [];
      }
    }
  }

  // GET FORM VALUES
  get IndustryFormValues() { return this.IndustryForm.controls; }

  // ON SUBMIT FORM

  showSubmitConfirmationModal() {
    if (this.IndustryForm.invalid) {
      return;
    }
    let IndustryTextAreaValue = this.IndustryFormValues.IndustryTextArea.value;
    if (IndustryTextAreaValue.Name != undefined) {
      this.ViewFromData.Suggestion = IndustryTextAreaValue.Name;
    } else {
      this.ViewFromData.Suggestion = IndustryTextAreaValue;
    }
    $('#confirm-submit').modal('show');
  }

  onSubmitIndustryForm() {
    if (this.IndustryForm.invalid) {
      return;
    }
    this.CopyFormDataToAnotherForm();
    this.IsFormSubmitted = true;
    // HERE WE CAN ADD THE API CALL TO SAVE THE FORM IN THE DATABASE
    this.toastr.success('Form is submitted successfully!', 'Success!');
    $('#confirm-submit').modal('hide');

  }

  // GET BACK TO THE PREVIOUS FORM
  getPreviousForm() {
    this.IsFormSubmitted = false;
    this.IndustryViewForm.reset();
  }

  GetIndustriesList() {
    this._GenericApiCallingService.GetData("Search", "GetMainIndustriesList")
      .subscribe(
        data => {
          if (data != null) {
            this.IndustriesList = data;
          }
        },
        error => {
          this.toastr.error('An error occured while processing your request!', 'Error!');
        });
  }

  GetSubIndustryDetailsById(IndustryId) {
    this._GenericApiCallingService.PostData("Search", "GetSubIndustryDetailsById", Number(IndustryId))
      .subscribe(
        data => {
          if (data != null) {
            this.SubCategory1List = data;
          }
          else {
            this.IsSubCategory1 = false;
          }
        },
        error => {
          this.toastr.error('An error occured while processing your request!', 'Error!');
        });
  }
  CopyFormDataToAnotherForm() {
    this.IndustryViewForm.reset();
    this.IndustryViewForm.get('IndustryName').setValue(this.IndustryFormValues.IndustryName.value);
    let SubCategory = this.IndustryForm.get('subGroup');
    if (SubCategory != null) {
      let SubCategoryValue = SubCategory.get("SubCategory1");
      if (SubCategoryValue != null) {
        this.IndustryViewForm.get('SubCategory1').setValue(SubCategoryValue.value);
      }
    }
    let SubCategory2 = this.IndustryForm.get('subGroup');
    if (SubCategory2 != null) {
      let SubCategory2Value = SubCategory2.get("SubCategory2");
      if (SubCategory2Value != null) {
        this.IndustryViewForm.get('SubCategory2').setValue(SubCategory2Value.value);
      }
    }
    let IndustryTextAreaValue = this.IndustryFormValues.IndustryTextArea.value;
    if (IndustryTextAreaValue.Name != undefined) {
      this.IndustryViewForm.get('IndustryTextArea').setValue(IndustryTextAreaValue.Name);
      this.IndustryForm.get('IndustryTextArea').setValue(IndustryTextAreaValue.Name);
    } else {
      this.IndustryViewForm.get('IndustryTextArea').setValue(IndustryTextAreaValue);
      this.IndustryForm.get('IndustryTextArea').setValue(IndustryTextAreaValue);
    }
    this.IndustryForm.get('IndustryTextArea').updateValueAndValidity();
  }


}
