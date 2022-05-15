import { Provider } from 'react-redux'
import Navigator from './navigation/Navigator'
import { setupStore } from './store/store'

const store = setupStore()

export default function App() {
	return (
		<Provider store={store}>
			<Navigator />
		</Provider>
	)
}
