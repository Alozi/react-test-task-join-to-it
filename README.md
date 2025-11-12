# React JS test task for Join.To.IT company

I completed a test task which required creating a calendar with the ability to add events. I built the application using React, TypeScript, and react-big-calendar. Users can add, edit, delete, and drag-and-drop events. The project also includes a custom toolbar and a modal for managing events.

## Features

- Full calendar view (Month, Week, Day, Agenda)
- Custom toolbar with navigation and view selection
- Add new events (max 30 characters) with a specific date, time, and color
- Edit existing events including title, date and color
- Delete existing events
- Drag and drop events
- Styled with CSS Modules
- Deployable to GitHub Pages

## Demo

https://alozi.github.io/react-test-task-join-to-it/

## Usage

- Click on a day (or time slot in week/day view) to open the Event modal.
- Fill in the event details: title, start/end time, and select a color.
- Click Save to add the event to the calendar.
- Click an existing event to edit or delete it.
- Drag events to reschedule them.
- Use the toolbar to navigate between days, weeks, months, or agenda view.

## Folder Structure

```js
src/
├─ components/
│  ├─ Calendar
│  ├─ CustomToolbar
│  └─ EventModal
├─ assets/
│  └─ fonts/
│     └─ SourceSansPro-Regular
├─ hooks/
│  └─ useCalendarEvents
├─ styles/
│  └─ fonts
├─ types/
│  └─ event
├─ utils/
│  └─ calendarFormats
├─ index
└─ App
```
