import "./scss/App.scss";
import { Brightness4, Brightness7, Whatshot, Calculate } from "@mui/icons-material";
import { useTheme } from "./context/ThemeContext";
import { useCalculations } from "./context/CalculationsContent";
import Button from "./components/Buttons/Button";
import IconButton from "./components/Buttons/IconButton";
import TextButton from "./components/Buttons/TextButton";
import ToggleButton from "./components/Buttons/ToggleButton";
import TimeRemaining from "./components/TimeRemaining";
import NumberInput from "./components/Inputs/NumberInput";
import DateInput from "./components/Inputs/DateInput";

import Switch from "./components/Switch/Switch";

/*
	TODO:
	Make favorite streaks sidebar thing
	Make custom calendar date picker for date input??
*/

function App() {
	const { theme, toggleTheme } = useTheme();
	const { 
		desiredDateStreak,
		desiredStreakDate,
		currentStreakMultiplier,
		desiredStreakMulitplier,
		desiredDateMultiplier,
		startDate, 
		currentCalculator, 
		calculate,
		setHaveYouDoneDaily, 
		setCurrentCalculator,
		setCurrentStreak,
		setDesiredStreak,
		setDesiredDate
	} = useCalculations();

	return (
		<>
			<header className="header">
				<h1>Daily Streak Calculator</h1>

				{/* <Switch
					checkedIcon={<Brightness4 />}
					uncheckedIcon={<Brightness7 />}
					defaultChecked={theme === "dark"}
					onChange={() => toggleTheme()}
				/> */}
			</header>

			<main className="main">
				<div className="calculations-grid container">
					<div className="calculations-section">
						<h2 className="calculation-heading">Current Streak</h2>

						<div className="calculations-card">
							<div className="result">{ startDate }</div>
							<div className="multiplier">{ currentStreakMultiplier }</div>
						</div>

						<NumberInput
							placeholder="Current Streak"
							onChange={({ target }) => setCurrentStreak(Number((target as HTMLInputElement).value))}
							onEnter={() => calculate()}
						/>
					</div>

					<div className={`calculations-section ${currentCalculator === "streakToDate" ? "" : "hidden"}`}>
						<h2 className="calculation-heading">Desired Streak</h2>

						<div className="calculations-card">
							<div className="result">{ desiredStreakDate }</div>
							<div className="multiplier">{ desiredStreakMulitplier }</div>
						</div>

						<NumberInput 
							placeholder="Desired Streak"
							onChange={({ target }) => setDesiredStreak(Number((target as HTMLInputElement).value))}
							onEnter={() => calculate()}
						/>
					</div>

					<div className={`calculations-section ${currentCalculator === "dateToStreak" ? "" : "hidden"}`}>
						<h2 className="calculation-heading">Desired Date</h2>

						<div className="calculations-card">
							<div className="result">
								{ desiredDateStreak }
								<Whatshot className="fire-icon"/>
							</div>
							<div className="multiplier">{ desiredDateMultiplier }</div>
						</div>

						<DateInput 
							className="desired-date-input"
							onDateChange={value => setDesiredDate(value!)}
							onEnter={() => calculate()}
						/>
					</div>
				</div>

				<Button
					className="calculate-button"
					onClick={calculate}
				>
					<Calculate/> Calculate
				</Button>
			</main>

			<footer className="footer">
				<TimeRemaining/>

				<div className="footer-toggles">
					<div>
						<p>Have You Done #!daily Today?</p>
						<ToggleButton onToggle={value => setHaveYouDoneDaily(value)}/>
					</div>
					<div>
						<p>{ currentCalculator === "streakToDate" ? "Streak To Date" : "Date To Streak" }</p>
						<TextButton
							onClick={() => {
								setCurrentCalculator(prev => prev === "streakToDate" ? "dateToStreak" : "streakToDate")
							}}
						>
							Change Calculator
						</TextButton>
					</div>
				</div>
				
				<IconButton 
					className="theme-changer"
					onClick={() => toggleTheme()}
				>
					{ theme === "dark" ? <Brightness4/> : <Brightness7/> }
				</IconButton>
			</footer>
    	</>
  	);
}

export default App;