import { DEBUG } from '../const';
import { Api } from '../controllers/api';
export const api = new Api(
	{
		endpoint: DEBUG ? 'http://localhost:8000/api/v1' : 'http://gpi.valdomero.live/api/v1',
		credentials: true,
	},
	{ apiKey: 'rayaparalasuma' },
);
