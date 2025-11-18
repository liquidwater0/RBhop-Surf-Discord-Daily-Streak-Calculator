import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './context/ThemeContext';
import CalculationsProvider from './context/CalculationsContext';
import FunniesProvider from './context/FunniesContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  	<React.StrictMode>
		<ThemeProvider>
			<FunniesProvider>
				<CalculationsProvider>
					<App />
				</CalculationsProvider>
			</FunniesProvider>
		</ThemeProvider>
	</React.StrictMode>,
);