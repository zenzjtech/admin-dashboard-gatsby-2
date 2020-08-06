import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import Store from './store';
import { configureFakeBackend } from 'helpers';
import { PersistGate } from 'redux-persist/integration/react'
/*
console.log(process.env.GATSBY_FAKE_BACKEND);
if (process.env.GATSBY_FAKE_BACKEND !== '0') {
	configureFakeBackend();
}*/

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
	// Instantiating store in `wrapRootElement` handler ensures:
	//  - there is fresh store for each SSR page
	//  - it will be called only once in browser, when React mounts
	return (
		<ThemeProvider theme={theme}>
			<Provider store = {Store.store}>
				<PersistGate
					loading={null}
					persistor={Store.persistor}
				>
					{ element }
				</PersistGate>
			</Provider>
		</ThemeProvider>
	);
}
