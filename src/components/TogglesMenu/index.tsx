import { useState, useEffect } from 'react';
import { useCalculations } from '../../context/CalculationsContent';
import { ArrowDropUp } from '@mui/icons-material';
import { ToggleButton } from '../Button';

export default function TogglesMenu() {
    const { 
        currentCalculator, 
        haveYouDoneDaily, 
        setCurrentCalculator,
        setHaveYouDoneDaily 
    } = useCalculations();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener("click", ({ target }) => {
            if ((target as HTMLElement).closest(".toggles-container")) return;
            setIsOpen(false);
        });
    }, []);

    return (
        <div className='toggles-container'>
            <div 
                className="toggles-menu" 
                data-expanded={isOpen}
            >
                <div>
                    <h2>Current Calculator</h2>
                    <ToggleButton 
                        group="calculator"
                        onToggle={() => setCurrentCalculator("dateToStreak")}
                        defaultChecked={currentCalculator === "dateToStreak"}
                    >
                        Date To Streak
                    </ToggleButton>
                    <ToggleButton 
                        group="calculator"
                        onToggle={() => setCurrentCalculator("streakToDate")}
                        defaultChecked={currentCalculator === "streakToDate"}
                    >
                        Streak To Date
                    </ToggleButton>
                </div>

                <div>
                    <h2>Have you done #!daily today?</h2>
                    <ToggleButton 
                        group="have"
                        onToggle={() => setHaveYouDoneDaily(true)}
                        defaultChecked={haveYouDoneDaily}
                    >
                        Yes
                    </ToggleButton>
                    <ToggleButton 
                        group="have"
                        onToggle={() => setHaveYouDoneDaily(false)}
                        defaultChecked={!haveYouDoneDaily}
                    >
                        No
                    </ToggleButton>
                </div>
            </div>
            
            <button 
                className='toggles-menu-button'
                onClick={() => setIsOpen(prev => !prev)}
            >
                <ArrowDropUp 
                    style={{
                        rotate: `${isOpen ? "180deg" : "0deg"}`
                    }}
                />
            </button>
        </div>
    );
}