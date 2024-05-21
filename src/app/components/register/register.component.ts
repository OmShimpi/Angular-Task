import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      photo: [null],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]]
    });
}

onFileChange(event: any) {
  const file = event.target.files[0];
  this.registrationForm.patchValue({
    photo: file
  });
}

onSubmit() {
  if (this.registrationForm.valid) {
    console.log(this.registrationForm.value);
    // Handle form submission
  } else {
    console.log('Form is not valid');
  }
}
}