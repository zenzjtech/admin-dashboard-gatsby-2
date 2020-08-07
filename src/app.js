import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline} from '@material-ui/core'
import theme from './theme';
import Store from './store';
import { configureFakeBackend } from 'helpers';

const browserHistory = createBrowserHistory();

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
					<CssBaseline/>
					<Router history={browserHistory}>
						{ element }
					</Router>
				</PersistGate>
			</Provider>
		</ThemeProvider>
	);
}
