import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private userserviceService: UserServiceService) {
    this.profileForm = this.fb.group({
      photo: [null],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]]
    });
}

ngOnInit(): void {
  this.userserviceService.getProfile().subscribe(
    data => {
      this.profileForm.patchValue(data);
    },
    error => {
      console.error('Error fetching profile data', error);
    }
  );
}

onFileChange(event: any) {
  const file = event.target.files[0];
  this.profileForm.patchValue({
    photo: file
  });
}

onSubmit() {
  if (this.profileForm.valid) {
    this.userserviceService.updateProfile(this.profileForm.value).subscribe(
      response => {
        console.log('Profile updated successfully', response);
      },
      error => {
        console.error('Error updating profile', error);
      }
    );
  } else {
    console.log('Form is not valid');
  }
}
}
