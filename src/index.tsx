import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import './styles/index.css';
import App from './App';
import { reducer, StateProvider } from './state';

ReactDOM.render(
	<React.StrictMode>
		<StateProvider reducer={reducer}>
			<App />
		</StateProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
