export function tokenHeader(){
	const token =localStorage.getItem('jwtToken');
	if(token)
		return {headers:{Authorization: `Bearer ${token}`}};

	return {}
}