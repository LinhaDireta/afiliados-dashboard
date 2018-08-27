import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';
import { PlacesService } from '../../services/places.service';
import { dataCountries } from '../../_data/countries';
import { dataStates } from '../../_data/states';
import { AlertifyService } from '../../services/alertify.service';

declare var $: any;

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  loading: boolean = true;
  submitted: boolean = false;
  places: any = [];
  countries: Array<any>;
  states: Array<any>;
  cepIsInvalid: boolean = false;
  labelBtn: string = 'Cadastrar';

  id = new FormControl('', []);

  name = new FormControl('', [
    Validators.required,
    Validators.maxLength(191)
  ]);
  
  address = new FormControl('', [
    Validators.required,
    Validators.maxLength(191)
  ]);

  street_number = new FormControl('', [
    Validators.required,
    Validators.maxLength(9)
  ]);

  complement = new FormControl('', [
    Validators.maxLength(30)
  ]);

  neighborhood = new FormControl('', [
    Validators.required,
    Validators.maxLength(191)
  ]);

  city = new FormControl('', [
    Validators.required,
    Validators.maxLength(50)
  ]);

  state = new FormControl('', [
    Validators.required,
    Validators.maxLength(50)
  ]);

  postal_code = new FormControl('', [
    Validators.required,
    Validators.maxLength(9)
  ]);

  country = new FormControl('', [
    Validators.required,
    Validators.maxLength(30)
  ]);

  country_code = new FormControl('', [
    Validators.required,
    Validators.maxLength(5)
  ]);

  uf = new FormControl('', [
    Validators.required,
    Validators.maxLength(2)
  ]);

  lat = new FormControl('', [
    Validators.required
  ]);

  lng = new FormControl('', [
    Validators.required
  ]);

  ssid = new FormControl('', [
    Validators.maxLength(100)
  ]);

  remember_me = new FormControl('', []);

  RegisterForm: FormGroup = this.builder.group({
    id: this.id,
    name: this.name,
    address: this.address,
    street_number: this.street_number,
    complement: this.complement,
    neighborhood: this.neighborhood,
    city: this.city,
    state: this.state,
    postal_code: this.postal_code,
    country: this.country,
    country_code: this.country_code,
    uf: this.uf,
    lat: this.lat,
    lng: this.lng,
    ssid: this.ssid
  });
  
  constructor(
    private builder: FormBuilder,
    public auth: AuthService, 
    private user: UserService,
    private search: SearchService,
    private placesService: PlacesService,
    private alertify: AlertifyService) {
  }

  ngOnInit() {
    this.getPlaces();
    this.countries = dataCountries['VALUES'];
    this.states = dataStates['VALUES'];
  }

  getPlaces() {
    this.user.getPlaces(this.auth.getUser().id).subscribe((places) => {
      this.places = places;
      console.log(places);
      this.loading = false;
    });
  }

  fillSelect(originField) {
    switch(originField) {
      case 'state':
        const uf = this.states.filter(value => value.state == this.RegisterForm.controls['state'].value);
        this.RegisterForm.controls['uf'].setValue(uf[0].code);
      break;
      case 'uf':
        const state = this.states.filter(value => value.code == this.RegisterForm.controls['uf'].value);
        this.RegisterForm.controls['state'].setValue(state[0].state);
      break;
      case 'country':
        const country_code = this.countries.filter(value => value.nome == this.RegisterForm.controls['country'].value);
        this.RegisterForm.controls['country_code'].setValue(country_code[0].iso);
      case 'country_code':
        const country = this.countries.filter(value => value.iso == this.RegisterForm.controls['country_code'].value);
        this.RegisterForm.controls['country'].setValue(country[0].nome);
      break;
    }
  }

  searchCEP() {
		const field = this.RegisterForm.controls['postal_code'];
		const cep = field.value.replace(/([^0-9]+)/gi, '');

		if (cep == '' || cep == undefined || cep.length < 8) {
      $("#postal_code").addClass("is-invalid");
      this.cepIsInvalid = true;
		} else {
      $("#postal_code").removeClass("is-invalid");
      this.cepIsInvalid = false;
			this.search.cep(cep).subscribe((data) => {
				if (data.erro) {
          $("#postal_code").addClass("is-invalid");
          this.cepIsInvalid = true;
				} else {
					this.RegisterForm.controls['address'].setValue(data.logradouro);
					this.RegisterForm.controls['neighborhood'].setValue(data.bairro);
					this.RegisterForm.controls['city'].setValue(data.localidade);
          this.RegisterForm.controls['uf'].setValue(data.uf);
          this.fillSelect('uf');
          $("#street_number").focus();
				}
			});
		}
  }
  
  getLocation() {
    let address = [];
    let isValid = true;
    
    if (this.RegisterForm.controls['address'].value && this.RegisterForm.controls['street_number'].value && this.RegisterForm.controls['neighborhood'].value) {
      address.push(this.RegisterForm.controls['address'].value);
      address.push(this.RegisterForm.controls['street_number'].value);
      address.push(this.RegisterForm.controls['neighborhood'].value);
    } else {
      isValid = false;
      if (!this.RegisterForm.controls['address'].value) $("#address").addClass("is-invalid");
      if (!this.RegisterForm.controls['street_number'].value) $("#street_number").addClass("is-invalid");
      if (!this.RegisterForm.controls['neighborhood'].value) $("#neighborhood").addClass("is-invalid");
    }

		if (isValid) {
			address.join(" ");
			this.search.geolocation(address).subscribe((res: Array<any>) => {
				if (res['results'].length > 0) {
					this.search.geolocation(address).subscribe((res: Array<any>) => {
						if (res['results'].length > 0) {
              this.RegisterForm.controls['lat'].setValue(res['results'][0].geometry.location.lat);
              this.RegisterForm.controls['lng'].setValue(res['results'][0].geometry.location.lng);
						}
					});
				}
			});
		}
  }
  
  onSubmitPlace() {
    this.submitted = true;

    if ( this.RegisterForm.valid ) {
      
      let data = this.RegisterForm.value;

      if (data.id) {
        this.placesService.update(data).subscribe((result) => {
          if (result['success']) {
            data.location = {
              coordinates: [
                data.lng,
                data.lat
              ],
              type: 'Point'
            };
    
            delete data.lng;
            delete data.lat;
            
            this.places.map((elem, index) => {
              if (elem.id == data.id) {
                this.places[index] = data;
              }
            });
            this.clearForm();
            $("#exampleModalCenter").modal('hide');
            this.alertify.success('Local alterado com sucesso');
          } else {
            this.alertify.error('Erro ao editar o local');
            this.submitted = false;
          }
        });
      } else {
        delete data.id;
        data.public = true;
        data.types = [];
        this.placesService.add(this.auth.getUser().id, data).subscribe((result) => {
          if (result['success']) {
            this.places.push(result['place']);
            this.clearForm();
            $("#exampleModalCenter").modal('hide');
            this.alertify.success('Local cadastrado com sucesso')
          } else {
            this.alertify.error('Erro ao cadastrar o local');
            this.submitted = false;
          }
        });
      }
    }

  }

  clearForm() {
    this.RegisterForm.reset();
    this.submitted = false;
    $("#address").removeClass("is-invalid");
    $("#street_number").removeClass("is-invalid");
    $("#neighborhood").removeClass("is-invalid");
    $("#postal_code").removeClass("is-invalid");
  }

  openFormAdd() {
    this.labelBtn = 'Cadastrar';
    this.clearForm();
  }

  openFormEdit(key, place) {
    this.labelBtn = 'Editar';
    this.clearForm();
    this.RegisterForm.controls['id'].setValue(place.id);
    this.RegisterForm.controls['name'].setValue(place.name);
    this.RegisterForm.controls['postal_code'].setValue(place.postal_code);
    this.RegisterForm.controls['address'].setValue(place.address);
    this.RegisterForm.controls['street_number'].setValue(place.street_number);
    this.RegisterForm.controls['complement'].setValue(place.complement);
    this.RegisterForm.controls['neighborhood'].setValue(place.neighborhood);
    this.RegisterForm.controls['city'].setValue(place.city);
    this.RegisterForm.controls['state'].setValue(place.state);
    this.RegisterForm.controls['uf'].setValue(place.uf);
    this.RegisterForm.controls['country'].setValue(place.country);
    this.RegisterForm.controls['country_code'].setValue(place.country_code);
    this.RegisterForm.controls['lat'].setValue(place.location.coordinates[1]);
    this.RegisterForm.controls['lng'].setValue(place.location.coordinates[0]);
    this.RegisterForm.controls['ssid'].setValue(place.ssid);
  }

  removePlace(index, item) {
    const msg = `Deseja excluir o local <b>${item.name}</b>?`;
    this.alertify.confirm('Atenção', msg,
      () => {
        this.placesService.remove(item.id).subscribe((response) => {
          if (response['success']) {
            this.places.splice(index, 1);
            this.alertify.success('Local excluído com sucesso');
          }
        });
      },
      () => {}
    );

  }

}
