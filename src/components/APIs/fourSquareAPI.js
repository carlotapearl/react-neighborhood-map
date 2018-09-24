const CLIENT_ID='VBWDK1BIW412NV2YPHAJMDFMHRZHQNL04ZYCK4KF1JWECWMJ';
const CLIENT_SECRET='3ZSICYJQLLAMEHYCUOMEM0AIUCLX3FHANQSEAZYA0YHF02TJ';
const API = "https://api.foursquare.com/v2";
const VERSION = "20180917";

const RADIUS_M = 250;
const SEARCH_RESULTS = 1;

/**
*Use lat, lng & name to fetch a venue id from FourSquare. 
*/
export const getSearchResult = (lat, lng, name) =>
	fetch(`${API}/venues/search?ll=${lat},${lng}&limit=${SEARCH_RESULTS}&radius=${RADIUS_M}&query=${name}
    	&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
	  	.then(response=>response.json())
	  	.then(response=>response.response.venues[0].id)
	  	.catch('error')
/**
*Use FourSquare id to return array of details about a place.
*/
export const getDetails = (id) =>
	fetch(`${API}/venues/${id}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
  	.then(res => res.json())
    .catch('error')