import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './context/ThemeContext';
import CalculationsProvider from './context/CalculationsContent';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  	<React.StrictMode>
		<ThemeProvider>
			<CalculationsProvider>
    			<App />
			</CalculationsProvider>
		</ThemeProvider>
	</React.StrictMode>,
);