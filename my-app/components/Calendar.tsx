"use client";

import React, { useEffect, useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/app/styles/calendar.css";
import { useTaskStore } from "@/zustand/useTaskStore";

const TaskCalendar = () => {
  const { selectedDate, setSelectedDate } = useTaskStore();
  const [date, setDate] = useState<Date>(selectedDate as Date);

  useEffect(() => {
    // Ensure a default selected date if none is set
    if (!selectedDate) {
      setSelectedDate(new Date());
    }
  }, [selectedDate, setSelectedDate]);

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (!value) {
      const today = new Date();
      setDate(today);
      setSelectedDate(today);
      return;
    }

    if (value instanceof Date) {
      setDate(value);
      setSelectedDate(value);
    } else {
      // If a range is selected, take the first date in the range
      setDate(value[0] as Date);
      setSelectedDate(value[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-md h-auto px-3 max-w-3xl text-black py-2">
      <h2 className="text-2xl font-semibold mb-2 text-center">Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="w-full my-1 px-3"
      />
    </div>
  );
};

export default TaskCalendar;
