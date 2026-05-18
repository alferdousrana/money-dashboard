import { useState, useEffect } from "react";
import "./Calendar.css";

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(0);

    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Get first day of month (0 = Sunday, 1 = Monday, etc.)
        const firstDay = new Date(year, month, 1).getDay();
        setFirstDayOfMonth(firstDay);

        // Get number of days in month
        const numDays = new Date(year, month + 1, 0).getDate();
        const days = [];

        for (let i = 1; i <= numDays; i++) {
            days.push(i);
        }
        setDaysInMonth(days);
    }, [currentDate]);

    const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const today = new Date();
    const isCurrentMonth =
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    return (
        <div className="calendar-card">
            <div className="calendar-header">
                <button className="calendar-nav" onClick={handlePrevMonth}>◀</button>
                <h3>{monthName}</h3>
                <button className="calendar-nav" onClick={handleNextMonth}>▶</button>
            </div>

            <div className="calendar-weekdays">
                <div className="weekday">Sun</div>
                <div className="weekday">Mon</div>
                <div className="weekday">Tue</div>
                <div className="weekday">Wed</div>
                <div className="weekday">Thu</div>
                <div className="weekday">Fri</div>
                <div className="weekday">Sat</div>
            </div>

            <div className="calendar-days">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="calendar-day empty"></div>
                ))}

                {/* Days of month */}
                {daysInMonth.map((day) => {
                    const isToday =
                        isCurrentMonth &&
                        day === today.getDate();

                    return (
                        <div
                            key={day}
                            className={`calendar-day ${isToday ? "today" : ""}`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;
