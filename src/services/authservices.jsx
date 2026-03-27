import { apiFetch } from '../../../api/api';

// Servicio para registrar usuario
export async function registerUser(payload) {
	return apiFetch('/auth/registrar', {
		method: 'POST',
		body: payload
	});
}
