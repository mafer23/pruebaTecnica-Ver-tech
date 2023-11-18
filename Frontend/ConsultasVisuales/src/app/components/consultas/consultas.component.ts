import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbnormalConditionsFilters } from 'src/app/model/abnormal-conditions-filters';
import { AbnormalConditionsResponse } from 'src/app/model/abnormal-conditions-response';
import { Consulta } from 'src/app/model/consultas';
import { CountyNatalityFilterResidenceAndBirths } from 'src/app/model/county-natality-filter-residence-and-births';
import { CountyNatalityResponse } from 'src/app/model/county-natality-response';
import { ConsultasService } from 'src/app/service/consultas.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {

 
  consultaForm: FormGroup;
  countyNatalityData: CountyNatalityResponse [] = []; // Inicializamos como arreglo vacío
  countyNatalityResidenceAndBirthsData: CountyNatalityFilterResidenceAndBirths[] = [];
  countyNatalityByAbnormalConditionsData: AbnormalConditionsResponse[] = [];
  abnormalConditionsFiltersData: AbnormalConditionsFilters[] = [];

  selectedOption: string = ''; // Esta propiedad almacena el valor seleccionado
  constructor(private consultasService: ConsultasService, private fb: FormBuilder){
    this.consultaForm = this.fb.group({
      nameConsult: ['', [Validators.required]],
      nameUser: ['', Validators.required],
      comment: [''],
    });
  }
  ngOnInit() {

  }



  onButtonClick() {
    if (this.selectedOption) {
      switch (this.selectedOption) {
        case 'NDC':
          this.consultasService.getCountyNatality().subscribe(data => {
            this.countyNatalityData = data;
            console.log('Datos de Natalidad del Condado:', data);

          }, error => {
            console.error('Error en la consulta de Natalidad del Condado:', error);
          });
          break;
        case 'PRN':
          this.consultasService.getCountyNatalityResidenceAndBirths().subscribe(
            data => {
              this.countyNatalityResidenceAndBirthsData = data;
              console.log('Filtros por condado y nacimientos:', data);
            }, error => {
              console.error('Error en la consulta de Natalidad del Condado:', error);
            });

          break;
        case 'NCPCA':
          this.consultasService.getCountyNatalityByAbnormalConditions().subscribe(
            data => {
              this.countyNatalityByAbnormalConditionsData = data;
              console.log(' Nacimientos anomalos:', data);
            },error => {
              console.error('Error en la consulta de nacimientos anomalos:', error);
            }
          )
          break;
        case 'CAE':
          this.consultasService.abnormalConditionsFilters().subscribe(
            data =>  {
              this.abnormalConditionsFiltersData = data;
              console.log('Filtros por coniciones anomalas:', data);
            },error =>{
              console.error('Error en la consulta filtros anomalos:', error);
            }
          )
          break;
        default:
          break;
      }
    }
  }

  noDataCondition(): boolean {
    return (
        (!this.selectedOption) ||
        (this.selectedOption === 'NDC' && (!this.countyNatalityData || this.countyNatalityData.length === 0)) ||
        (this.selectedOption === 'PRN' && (!this.countyNatalityResidenceAndBirthsData || this.countyNatalityResidenceAndBirthsData.length === 0)) ||
        (this.selectedOption === 'NCPCA' && (!this.countyNatalityByAbnormalConditionsData || this.countyNatalityByAbnormalConditionsData.length === 0)) ||
        (this.selectedOption === 'CAE' && (!this.abnormalConditionsFiltersData || this.abnormalConditionsFiltersData.length === 0)) ||
        (this.selectedOption === 'VAC')
    );
}

guardarConsulta() {
  if (this.consultaForm.valid) {
    const nuevaConsulta: Consulta = {
      nameConsult: this.consultaForm.value.nameConsult,
      nameUser: this.consultaForm.value.nameUser,
      comment: this.consultaForm.value.comment,
      countyNatalityBaseList: this.getDataForConsulta(), // Método para obtener datos de la consulta
    };

    this.consultasService.saveConsulta(nuevaConsulta).subscribe(
      (response) => {
        console.log('Consulta guardada con éxito', response);
        // Puedes realizar otras acciones después de guardar la consulta
      },
      (error) => {
        console.error('Error al guardar la consulta', error);
        // Puedes manejar errores aquí
      }
    );
  }
}

// Método para obtener los datos específicos de la consulta según la opción seleccionada
getDataForConsulta(): any[] {
  switch (this.selectedOption) {
    case 'NDC':
      return this.countyNatalityData;
    case 'PRN':
      return this.countyNatalityResidenceAndBirthsData;
    case 'NCPCA':
      return this.countyNatalityByAbnormalConditionsData;
    case 'CAE':
      return this.abnormalConditionsFiltersData;
    default:
      return [];
  }
}

}
