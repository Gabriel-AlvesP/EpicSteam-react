import { useEffect } from 'react';
import { useRefreshToken } from './useRefreshToken';
import { useAuth } from './useAuth';
import { axiosWCredentials } from '../apis/axios';

/**
 * Header authorization configuration
 *
 * Middleware makes sure that accessToken is set inside header authorization field in the
 * request and it tries to handle response forbidden errors (403),
 * refreshing the access token. Useful for routes that need accessToken
 *
 * @returns
 */
const useAccessAxios = () => {
	const { auth } = useAuth();
	const refresh = useRefreshToken();

	useEffect(() => {
		/*
		 * Config header authorization field in case it isn't already defined
		 */
		const requestInterceptor = axiosWCredentials.interceptors.request.use(
			config => {
				// Do something before request is sent

				//Set header authorization field
				if (!config.headers['Authorization'])
					config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
				return config;
			},
			err => Promise.reject(err)
		);

		/*
		 * Set a new access token into header authorization field in case of invalid token
		 */
		const responseInterceptor = axiosWCredentials.interceptors.response.use(
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

					return axiosWCredentials(prevConfig);
				}
				return Promise.reject(err);
			}
		);

		//Unmount func
		return () => {
			axiosWCredentials.interceptors.request.eject(requestInterceptor);
			axiosWCredentials.interceptors.response.eject(responseInterceptor);
		};
	}, [auth, refresh]);

	return axiosWCredentials;
};

export { useAccessAxios };
