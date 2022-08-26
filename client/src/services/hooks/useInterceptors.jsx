import { useEffect } from 'react';
import { useRefreshToken } from './useRefreshToken';
import { useAuth } from './useAuth';
import { privAxios } from '../api/axios';

const useInterceptors = () => {
	const { auth } = useAuth();
	const refresh = useRefreshToken();

	useEffect(() => {
		/*
		 *
		 */
		const requestInterceptor = privAxios.interceptors.request.use(
			config => {
				// Do something before request is sent
				if (!config.headers['Authorization'])
					config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
				return config;
			},
			err => Promise.reject(err)
		);

		/*
		 * Set a new access token into header authorization field in case of invalid token
		 */
		const responseInterceptor = privAxios.interceptors.response.use(
			response => response,
			async err => {
				// Any status codes that falls outside the range of 2xx cause this function to trigger
				const prevConfig = err?.config;

				if (err?.response?.status === 403 && !prevConfig.errHandled) {
					//protect from error handling endless cycle
					prevConfig.errHandled = true;
					const newAccessToken = await refresh();

					//Set new access token into authorization
					prevConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;

					return privAxios(prevConfig);
				}
				return Promise.reject(err);
			}
		);

		//Unmount func
		return () => {
			privAxios.interceptors.request.eject(requestInterceptor);
			privAxios.interceptors.response.eject(responseInterceptor);
		};
	}, [auth, refresh]);

	return privAxios;
};

export default useInterceptors;
