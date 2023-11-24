import React, { useState, useEffect } from "react";

export const Counter = () => {
    const [showCounterTime, setshowCounterTime] = useState([]);
    const [isTimerRunning, setIsTimerRunning] = useState([]);
    const [totalTimerSum, setTotalTimerSum] = useState(0);

    const handleAddCounterButton = () => {
        setshowCounterTime((prevshowCounterTime) => [...prevshowCounterTime, 0]);
        setIsTimerRunning((prevRunning) => [...prevRunning, false]);
    };

    const handleStartStopButton = (index) => {
        setIsTimerRunning((prevRunning) => {
            const newRunningTimer = [...prevRunning];
            newRunningTimer[index] = !newRunningTimer[index];
            return newRunningTimer;
        });
    };
    useEffect(() => {
        let timers = [];

        isTimerRunning.forEach((isTimerunning, index) => {
            if (isTimerunning) {
                timers[index] = setInterval(() => {
                    setshowCounterTime((prevshowCounterTime) => {
                        const newshowCounterTime = [...prevshowCounterTime];
                        newshowCounterTime[index] = newshowCounterTime[index] + 1;
                        return newshowCounterTime;
                    });
                    setTotalTimerSum((prevSum) => prevSum + 1);
                }, 1000);
            }
        });

        return () => {
            timers.forEach((timer) => {
                clearInterval(timer);
            });
        };
    }, [isTimerRunning]);

    return (
        <div className="w-100 flex justify-between flex-col my-5 mx-5">
            <div className="flex justify-between">
                <button onClick={handleAddCounterButton} className="bg-sky-950 rounded-lg px-4 py-4 text-slate-100 font-medium">Add Counter</button>
                <h2 className="bg-sky-950 font-medium px-10 py-4 rounded-2xl text-slate-100">{totalTimerSum}</h2>
            </div>
            <div className="flex justify-evenly">
                {showCounterTime.map((counter, index) => (
                    <div key={index} className="flex items-center justify-between mt-28 h-36">
                        <div className="flex flex-col items-center">
                            <h1 className="bg-slate-200	px-12 py-5 rounded-xl font-medium">{counter}</h1>
                            <button className="bg-slate-200	mt-5 px-12 py-5 rounded-xl font-medium" onClick={() => handleStartStopButton(index)}>
                                {isTimerRunning[index] ? "Stop Counter" : "Start Counter"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};
