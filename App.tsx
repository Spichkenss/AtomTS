import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { Provider } from 'react-redux'
import Navigator from './navigation/Navigator'
import { setupStore } from './store/store'

const store = setupStore()
setupListeners(store.dispatch)

export default function App() {
	return (
		<Provider store={store}>
			<Navigator />
		</Provider>
	)
}
