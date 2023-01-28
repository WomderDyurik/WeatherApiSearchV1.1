import api from "./services/apiService";
import locations from "./store/locations";
import itemsUI from "./views/createElements";
import search from "./views/search";
import cityConfig from "./config/defaultCongif";
import { ItemsUI } from "./views/createElements";
import '../css/style.css';




document.addEventListener('DOMContentLoaded', () => {

	const btn = document.querySelector('.weather-btn')
	const input = document.querySelector('.weather-input')
	const container = document.querySelector('.weather-items')


	initApp()

	btn.addEventListener('click', ()=> {
		itemsUI.clearContainer()
		api.searchGeoLocation(input.value)
		.then(el=>{
			for(let i = 0; i < el.length - 1; i++){
				if(el[i].country == el[i+1].country && el[i].name == el[i+1].name){
					delete el[i]
				}
			}
			el.forEach(element => {
			api.searchWeatherOnCity(element.name, element.country)
			.then(el=> {
				container.insertAdjacentHTML('afterbegin',ItemsUI.itemTemplate(el))
			})
		})})

	})

	async function initApp(){
		await itemsUI.defaultRender(cityConfig)
		document.querySelector('.weather-btn').addEventListener('click', () => {
			search.goSearch()
		})
	}

	
})

