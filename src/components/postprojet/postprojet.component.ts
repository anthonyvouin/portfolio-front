import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.services';


@Component({
  selector: 'app-postprojet',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './postprojet.component.html',
  styleUrl: './postprojet.component.scss'
})


export class PostprojetComponent {

  selectedFile: File | null = null;
  categories: any[] = []; // Variable to store categories

  constructor(
    private readonly formBuilder: FormBuilder,
    private apiService: ApiService, 
    private authService: AuthService,
    private readonly router:Router) {}


     formGroup: FormGroup = this.formBuilder.group({
      title: ["", [Validators.minLength(2), Validators.required]],
      description: ["", [Validators.minLength(2), Validators.required]],
      explanation: ["", [Validators.minLength(2), Validators.required]],
      category: ["", [Validators.required]],
      image: [null, [Validators.required]]
    });
  
    
    ngOnInit(): void {
      this.getCategories(); 
    }

    getCategories(): void {
      this.apiService.request<any[]>('/category/get-all', 'GET')
        .then(response => {
          this.categories = response; 
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des catégories:', error);
        });
    }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }


  async submitProjet(e:any): Promise<void> {

    e.preventDefault()

    if (this.formGroup.valid && this.selectedFile) {

      const formData:FormData  = new FormData();
      formData.append('title',this.formGroup.get('title')?.value)
      formData.append('description',this.formGroup.get('description')?.value)
      formData.append('explanation',this.formGroup.get('explanation')?.value)
      formData.append('category',this.formGroup.get('category')?.value)
      formData.append('image', this.selectedFile)

        
      const token = this.authService.getToken()

    this.apiService.request<any>('/projet', 'POST', formData, token, 'multipart/form-data')
        .then(() => {
          this.formGroup.reset();
        })
        .catch(error => {
          console.error('Erreur lors de la création du projet:', error);
         
        });
 }
}
}

