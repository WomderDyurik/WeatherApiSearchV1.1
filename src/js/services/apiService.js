import axios from "axios";
import config from "../config/apiConfig";

class Api{
	constructor(config){
		this.url = config.url
		this.key = config.key
	}

	async searchGeoLocation(cityName){
		try {
			const response = await axios.get(`${this.url}/geo/1.0/direct?q=${cityName}&limit=3&appid=${this.key}`)
			if(!response.data.length) {
				alert('Введите другое название!')
			}
			return response.data
		} catch (err) {
			return Promise.reject(err)
		}
	}

	async searchWeatherOnCity(cityName,country){
		try {
			const response = await axios.get(`${this.url}/data/2.5/weather?q=${cityName},${country}&appid=${this.key}`)
			return response.data
		} catch (err) {
			console.log(err)
			return Promise.reject(err)
		}
	}

	async searchWeatherOnCityById(id){
		try {
			const response = await axios.get(`${this.url}/data/2.5/weather?id=${id}&appid=${this.key}`)
			return response.data
		} catch (err) {
			console.log(err)
			return Promise.reject(err)
		}
	}
	
}

const api = new Api(config)

export default api;