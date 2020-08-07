import React from 'react'
import { Account } from '../views';
import { RouteWithLayout } from '../components';
import { Main as MainLayout } from '../layouts';
import { Router } from "@reach/router"
import PrivateRoute from '../components/PrivateRoute'

const AccountPage = () => (
	<Router>
		<PrivateRoute default component={
			() => <RouteWithLayout component= {Account} layout={MainLayout}/>
		}/>
	</Router>
)

export default AccountPage
