import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  // PROPERTY NAME TO SEARCH FROM ARRAY
  keyword = 'Name';

  IsFormSubmitted: boolean;

  constructor(private formBuilder: FormBuilder) {
    // INITILIZATIONS
    this.IsSubCategory1 = false;
    this.IsSubCategory2 = false;

    this.IsFormSubmitted = false;

    this.SubCategory1List = [];
    this.SubCategory2List = [];
    this.SubCategory3List = [];

    this.IndustriesList = [
      {
        Id: 1,
        Name: "Automotive",
        Value: 1,
        IsSubCategory: false,
        SubCatergoryList: []
      },
      {
        Id: 2,
        Name: "Education",
        Value: 2,
        IsSubCategory: false,
        SubCatergoryList: []
      },
      {
        Id: 3,
        Name: "Food & Beverage",
        Value: 3,
        IsSubCategory: false,
        SubCatergoryList: []
      },
      {
        Id: 4,
        Name: "Healthcare",
        Value: 4,
        IsSubCategory: true,
        SubCatergoryList: [
          {
            Id: 1,
            Name: "Chiropractic",
            Value: 1,
            IsSubCategory: false,
            SubCatergoryList: []
          },
          {
            Id: 2,
            Name: "Dental Lab Technicians",
            Value: 2,
            IsSubCategory: false,
            SubCatergoryList: []
          },
          {
            Id: 3,
            Name: "Dentistry",
            Value: 3,
            IsSubCategory: true,
            SubCatergoryList: [
              {
                Id: 1,
                Name: "Cosmetic Dentistry",
                Value: 1,
                IsSubCategory: false,
                SubCatergoryList: []
              },
              {
                Id: 2,
                Name: "Endodontics",
                Value: 2,
                IsSubCategory: true,
                SubCatergoryList: [
                  {
                    Id: 1,
                    Name: "Endodontics Suggestion 1",
                    Value: 1,
                    IsSubCategory: false,
                    SubCatergoryList: []
                  },
                  {
                    Id: 2,
                    Name: "Endodontics Suggestion 2",
                    Value: 2,
                    IsSubCategory: false,
                    SubCatergoryList: []
                  },
                  {
                    Id: 3,
                    Name: "Endodontics Suggestion 3",
                    Value: 3,
                    IsSubCategory: false,
                    SubCatergoryList: []
                  },
                  {
                    Id: 4,
                    Name: "Endodontics Suggestion 4",
                    Value: 4,
                    IsSubCategory: false,
                    SubCatergoryList: []
                  }
                ]
              },
              {
                Id: 3,
                Name: "Implant Dentistry",
                Value: 3,
                IsSubCategory: false,
                SubCatergoryList: []
              },
              {
                Id: 4,
                Name: "Neuromuscular Dentistry",
                Value: 4,
                IsSubCategory: false,
                SubCatergoryList: []
              },
              {
                Id: 5,
                Name: "Orthodontics",
                Value: 5,
                IsSubCategory: true,
                SubCatergoryList: [
                  {
                    Id: 1,
                    Name: "Orthodontics Suggestion 1",
                    Value: 1,
                    IsSubCategory: false,
                    SubCatergoryList: []
                  },
                  {
                    Id: 2,
                    Name: "Orthodontics Suggestion 2",
                    Value: 2,
                    IsSubCategory: false,
                    SubCatergoryList: []
                  },
                  {
                    Id: 3,
                    Name: "Orthodontics Suggestion 3",
                    Value: 3,
                    IsSubCategory: false,
                    SubCatergoryList: []
                  },
                  {
                    Id: 4,
                    Name: "Orthodontics Suggestion 4",
                    Value: 4,
                    IsSubCategory: false,
                    SubCatergoryList: []
                  }
                ]
              }
            ]
          },
          {
            Id: 4,
            Name: "Dermatology",
            Value: 4,
            IsSubCategory: false,
            SubCatergoryList: []
          },
          {
            Id: 5,
            Name: "Plastic Surgery",
            Value: 5,
            IsSubCategory: false,
            SubCatergoryList: []
          },
          {
            Id: 6,
            Name: "Orthopedics",
            Value: 6,
            IsSubCategory: false,
            SubCatergoryList: []
          },
        ]
      },
      {
        Id: 5,
        Name: "Automotive",
        Value: 5,
        IsSubCategory: false,
        SubCatergoryList: []
      },
      {
        Id: 6,
        Name: "Home Care",
        Value: 6,
        IsSubCategory: false,
        SubCatergoryList: []
      },
      {
        Id: 7,
        Name: "Legal",
        Value: 7,
        IsSubCategory: false,
        SubCatergoryList: []
      },
      {
        Id: 8,
        Name: "Personal",
        Value: 8,
        IsSubCategory: false,
        SubCatergoryList: []
      },
      {
        Id: 9,
        Name: "Veterinary",
        Value: 9,
        IsSubCategory: true,
        SubCatergoryList: [
          {
            Id: 1,
            Name: "Animal Sciences",
            Value: 1,
            IsSubCategory: false,
            SubCatergoryList: []
          },
          {
            Id: 2,
            Name: "Pet Grooming",
            Value: 2,
            IsSubCategory: false,
            SubCatergoryList: []
          },
          {
            Id: 3,
            Name: "Veterinary Medicine",
            Value: 3,
            IsSubCategory: false,
            SubCatergoryList: []
          },
          {
            Id: 4,
            Name: "Veterinarians",
            Value: 4,
            IsSubCategory: false,
            SubCatergoryList: []
          }
        ]
      }
    ];
  }

  ngOnInit(): void {
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
      if (SelectedIndustry.IsSubCategory) {
        this.SubCategory1List = SelectedIndustry.SubCatergoryList;
        this.IndustryForm.setControl('subGroup', this.createSubForm1())
        this.IsSubCategory1 = true;
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
        if (SelectedSubIndustry.IsSubCategory) {
          this.IsSubCategory2 = true;
          this.SubCategory2List = SelectedSubIndustry.SubCatergoryList;
          this.IndustryForm.setControl('subGroup', this.createSubForm2())
        }
        else {
          this.IsSubCategory2 = false;
          this.SubCategory2List = [];
          this.SubCategory3List = [];
          this.clearSubForm2Validators();
        }
      }
      else {
        this.IsSubCategory2 = false;
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
  onSubmitIndustryForm() {
    debugger;
    if (this.IndustryForm.invalid) {
      return;
    }
    this.IsFormSubmitted = true;
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
    } else {
      this.IndustryViewForm.get('IndustryTextArea').setValue(IndustryTextAreaValue);
    }

  }

  // GET BACK TO THE PREVIOUS FORM
  getPreviousForm() {
    this.IsFormSubmitted = false;
    this.IndustryViewForm.reset();
  }

  // SUGGESTION SELECT EVENT
  selectEvent(item) {
    this.IndustryForm.get('IndustryTextArea').setValue(item.Name);
    this.IndustryForm.get('IndustryTextArea').updateValueAndValidity();
  }

}
