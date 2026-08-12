import { useEffect, useMemo, useState } from "react";
import "./Calendar.css";

const STORAGE_KEY = "studysync_calendar_events";

const eventTypes = [
  "Study",
  "Assignment",
  "Exam",
  "Personal",
];

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function Calendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    getDateKey(today)
  );

  const [events, setEvents] = useState(() => {
    try {
      const savedEvents = localStorage.getItem(STORAGE_KEY);

      return savedEvents
        ? JSON.parse(savedEvents)
        : [];
    } catch {
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "Study",
    time: "09:00",
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(events)
    );
  }, [events]);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    const previousMonthLastDay = new Date(
      year,
      month,
      0
    ).getDate();

    const startingDay = firstDay.getDay();

    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(
          year,
          month - 1,
          previousMonthLastDay - i
        ),
        currentMonth: false,
      });
    }

    for (
      let day = 1;
      day <= lastDay.getDate();
      day++
    ) {
      days.push({
        date: new Date(year, month, day),
        currentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;

    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        currentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  const selectedEvents = events
    .filter((event) => event.date === selectedDate)
    .sort((a, b) =>
      a.time.localeCompare(b.time)
    );

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  };

  const goToToday = () => {
    const now = new Date();

    setCurrentDate(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      )
    );

    setSelectedDate(getDateKey(now));
  };

  const handleDateClick = (date) => {
    setSelectedDate(getDateKey(date));

    if (
      date.getMonth() !== currentDate.getMonth()
    ) {
      setCurrentDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          1
        )
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    const newEvent = {
      id: Date.now(),
      date: selectedDate,
      title: form.title.trim(),
      type: form.type,
      time: form.time,
    };

    setEvents((previous) => [
      ...previous,
      newEvent,
    ]);

    setForm({
      title: "",
      type: "Study",
      time: "09:00",
    });

    setShowModal(false);
  };

  const deleteEvent = (id) => {
    setEvents((previous) =>
      previous.filter(
        (event) => event.id !== id
      )
    );
  };

  const monthName =
    currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  const todayKey = getDateKey(today);

  return (
    <main className="calendar-page">

      <section className="calendar-header">

        <div>
          <span className="page-label">
            STUDY PLANNER
          </span>

          <h1>Calendar</h1>

          <p>
            Organize your study sessions, assignments,
            exams and important activities.
          </p>
        </div>

        <button
          className="add-event-btn"
          onClick={() => setShowModal(true)}
        >
          <span>+</span>
          Add Event
        </button>

      </section>

      <section className="calendar-card">

        <div className="calendar-toolbar">

          <button
            className="today-btn"
            onClick={goToToday}
          >
            Today
          </button>

          <div className="month-navigation">

            <button
              onClick={goToPreviousMonth}
              aria-label="Previous month"
            >
              ←
            </button>

            <h2>{monthName}</h2>

            <button
              onClick={goToNextMonth}
              aria-label="Next month"
            >
              →
            </button>

          </div>

        </div>

        <div className="weekdays">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="calendar-grid">

          {calendarDays.map((day) => {
            const dateKey = getDateKey(day.date);

            const dayEvents = events.filter(
              (event) =>
                event.date === dateKey
            );

            const isToday =
              dateKey === todayKey;

            const isSelected =
              dateKey === selectedDate;

            return (
              <button
                key={dateKey}
                className={[
                  "calendar-day",
                  !day.currentMonth
                    ? "outside-month"
                    : "",
                  isToday ? "today" : "",
                  isSelected ? "selected" : "",
                ].join(" ")}
                onClick={() =>
                  handleDateClick(day.date)
                }
              >

                <span className="day-number">
                  {day.date.getDate()}
                </span>

                <div className="day-events">

                  {dayEvents
                    .slice(0, 2)
                    .map((event) => (
                      <span
                        key={event.id}
                        className={`event-dot event-${event.type.toLowerCase()}`}
                      >
                        {event.title}
                      </span>
                    ))}

                  {dayEvents.length > 2 && (
                    <span className="more-events">
                      +{dayEvents.length - 2} more
                    </span>
                  )}

                </div>

              </button>
            );
          })}

        </div>

      </section>

      <section className="selected-date-section">

        <div className="selected-date-header">

          <div>
            <span className="section-label">
              SELECTED DATE
            </span>

            <h2>
              {formatDate(selectedDate)}
            </h2>
          </div>

          <button
            className="small-add-btn"
            onClick={() =>
              setShowModal(true)
            }
          >
            + Add
          </button>

        </div>

        {selectedEvents.length === 0 ? (
          <div className="empty-events">

            <div className="empty-icon">
              📅
            </div>

            <h3>No events scheduled</h3>

            <p>
              Keep your study plan organized by
              adding an event for this date.
            </p>

            <button
              onClick={() =>
                setShowModal(true)
              }
            >
              Add your first event
            </button>

          </div>
        ) : (
          <div className="events-list">

            {selectedEvents.map((event) => (
              <div
                className="event-card"
                key={event.id}
              >

                <div className="event-time">
                  {event.time}
                </div>

                <div className="event-info">

                  <span
                    className={`event-type type-${event.type.toLowerCase()}`}
                  >
                    {event.type}
                  </span>

                  <h3>{event.title}</h3>

                </div>

                <button
                  className="delete-event"
                  onClick={() =>
                    deleteEvent(event.id)
                  }
                  aria-label="Delete event"
                >
                  ×
                </button>

              </div>
            ))}

          </div>
        )}

      </section>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="event-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <span className="section-label">
                  NEW EVENT
                </span>

                <h2>Add Study Event</h2>
              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>

            </div>

            <p className="modal-date">
              {formatDate(selectedDate)}
            </p>

            <form onSubmit={handleAddEvent}>

              <label>
                Event title

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Mathematics study session"
                  autoFocus
                />
              </label>

              <label>
                Event type

                <select
                  name="type"
                  value={form.type}
                  onChange={handleInputChange}
                >
                  {eventTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Start time

                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleInputChange}
                />
              </label>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-event-btn"
                >
                  Save Event
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </main>
  );
}

export default Calendar;