"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

import "react-datepicker/dist/react-datepicker.css";

import "react-calendar/dist/Calendar.css";
import { Button } from "../ui/button";
import { getAvailableDates } from "@/actions/dates";
import { cn } from "@/lib/utils";

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  selectedDoctor: string | null;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  setDateAndTime: (date: Date, time: number) => void;
  resetDateAndTime: () => void;
  setSelectedTimeSlotId: (id: string) => void;
  availableDates: { [key: string]: { hour: number; id: string }[] };
  availableHours: { hour: number; id: string }[];
  setAvailableDates: (dates: {
    [key: string]: { hour: number; id: string }[];
  }) => void;
  setAvailableHours: (hours: { hour: number; id: string }[]) => void;
};

export const DateTimePicker = ({
  selectedDoctor,
  setDateAndTime,
  resetDateAndTime,
  setSelectedTimeSlotId,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  availableDates,
  availableHours,
  setAvailableDates,
  setAvailableHours,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    if (!selectedDoctor) return;
    setIsOpen(!isOpen);
  };
  const closeModal = () => setIsOpen(false);

  const handleTimeSelection = (hour: number, id: string) => {
    setSelectedTime(hour.toString());
    setSelectedTimeSlotId(id);
    if (selectedDate) {
      setDateAndTime(selectedDate, hour);
    }
  };

  const handleDateChange = (value: Date | Date[]) => {
    setSelectedDate(Array.isArray(value) ? value[0] : value);
    const dateKey = (Array.isArray(value) ? value[0] : value)
      .toISOString()
      .split("T")[0];
    const availableSlots = availableDates[dateKey] || [];

    setAvailableHours(
      availableSlots.map((slot: { hour: number; id: string }) => slot)
    );
  };

  const isTileDisabled = ({ date }: { date: Date }) => {
    const dateKey = date.toISOString().split("T")[0];
    return !availableDates[dateKey]; // disable dates without availability
  };

  useEffect(() => {
    if (selectedDoctor) {
      getAvailableDates(selectedDoctor).then(setAvailableDates);
    } else {
      setAvailableDates({});
    }
  }, [selectedDoctor]);

  return (
    <>
      <button
        type="button"
        onClick={toggleModal}
        className="text-gray-900 w-full  bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
      >
        <svg
          className="w-4 h-4 me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
            clipRule="evenodd"
          />
        </svg>
        Schedule appointment
      </button>

      {isOpen && (
        <div
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-[23rem] max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Schedule an appointment
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    resetDateAndTime();
                    closeModal();
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 pt-0">
                <div className="mx-auto sm:mx-0 flex justify-center my-5 [&>div>div]:shadow-none [&>div>div]:bg-gray-50 [&_div>button]:bg-gray-50">
                  <Calendar
                    onChange={(value) => handleDateChange(value as Date)}
                    value={selectedDate} // bind selected date to value
                    tileDisabled={isTileDisabled}
                    // onClickDay={() =>
                    //   setDateAndTime(date, Number(selectedTime))
                    // }
                  />
                </div>
                <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                  Pick your time
                </label>
                <ul className="grid w-full grid-cols-3 gap-2 mb-5">
                  {availableHours.map((hour) => (
                    <button
                      type="button"
                      key={hour.hour}
                      onClick={() => handleTimeSelection(hour.hour, hour.id)}
                      className={cn(
                        "inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center border rounded-lg cursor-pointer",
                        selectedTime === hour.hour.toString()
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      {hour.hour}:00
                    </button>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={"default"}
                    type="button"
                    onClick={() => {
                      if (selectedDate && selectedTime) {
                        setDateAndTime(selectedDate, Number(selectedTime));
                        console.log("Selected time:", selectedTime);
                        closeModal();
                      }
                    }}
                    className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Save
                  </Button>
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => {
                      resetDateAndTime();
                      closeModal();
                    }}
                    className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Discard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
