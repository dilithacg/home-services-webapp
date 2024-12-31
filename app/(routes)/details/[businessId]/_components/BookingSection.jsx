import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import moment from "moment";

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]);
  const { data } = useSession();

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    if (date) BusinessBookedSlot();
  }, [date]);

  /**
   * Get Selected Date Business Booked Slot
   */
  const BusinessBookedSlot = () => {
    GlobalApi.BusinessBookedSlot(
      business.id,
      moment(date).format("DD-MMM-yyyy")
    ).then((resp) => {
      console.log(resp);
      setBookedSlot(resp.bookings);
    });
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: `${i}:00 AM` });
      timeList.push({ time: `${i}:30 AM` });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: `${i}:00 PM` });
      timeList.push({ time: `${i}:30 PM` });
    }
    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    GlobalApi.createNewBooking(
      business.id,
      moment(date).format("DD-MMM-yyyy"),
      selectedTime,
      data.user.email,
      data.user.name
    ).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          setDate();
          setSelectedTime("");
          toast("Service Booked successfully!");
        }
      },
      (e) => {
        toast("Error while creating booking");
      }
    );
  };

  const isSlotBooked = (time) => {
    return bookedSlot.find((item) => item.time === time);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book a Service</SheetTitle>
            <SheetDescription>
              Select Date and Time slot to book a service.
            </SheetDescription>
          </SheetHeader>

          {/* Date Picker */}
          <div className="flex flex-col gap-5 items-baseline">
            <h2 className="mt-5 font-bold text-lg">Select Date</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>

          {/* Time Slot Picker */}
          <div className="my-5">
            <h2 className="font-bold text-lg">Select Time Slot</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {timeSlot.map((item, index) => (
                <Button
                  key={index}
                  disabled={isSlotBooked(item.time)}
                  variant="outline"
                  className={`border rounded-full p-2 px-3 hover:text-white ${
                    selectedTime === item.time ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => setSelectedTime(item.time)}
                >
                  {item.time}
                </Button>
              ))}
            </div>
          </div>

          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button variant="destructive">Cancel</Button>
                <Button
                  disabled={!(selectedTime && date)}
                  onClick={saveBooking}
                >
                  Book
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
