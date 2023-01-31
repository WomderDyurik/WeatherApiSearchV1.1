import axios from "axios";
import configReg from "../config/apiRegistr";

/**
 * 
 * @param {String} email 
 * @param {String} password 
 */
export async function login(email, password){
	try {
		const response = await axios.post(
			`${configReg.apiUrl}/api/registr`,
			JSON.stringify({email, password})
		)
		return response.data
	} catch (error) {
		console.log(error)
		return Promise.reject(error)
	}
}