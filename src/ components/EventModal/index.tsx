import { useState, useEffect } from "react";
import styles from "./EventModal.module.css";
import { type Event } from "../../types/event";

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: {
    id: number;
    title: string;
    start: Date;
    end: Date;
    color: string;
  }) => void;
  position: { x: number | undefined; y: number | undefined };
  defaultDate?: Date;
  defaultEvent: Event | null;
  onDelete: (id: number) => void;
};

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  defaultDate,
  position,
  defaultEvent,
  onDelete,
}: EventModalProps) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#3B86FF");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    if (defaultEvent) {
      setTitle(defaultEvent.title);
      setStart(defaultEvent.start);
      setEnd(defaultEvent.end);
      setColor(defaultEvent.color || "#3B86FF");
    } else if (defaultDate) {
      setStart(defaultDate);
      setEnd(defaultDate);
    }
  }, [defaultEvent, defaultDate]);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() === "" || title.length > 30) return;

    if (defaultEvent) {
      onSave({ id: defaultEvent.id, title, start, end, color });
    } else {
      const id = Date.now();
      onSave({ id, title, start, end, color });
    }

    resetForm();
    onClose();
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleDelete() {
    if (defaultEvent?.id != null) {
      onDelete(defaultEvent.id);
      resetForm();
      onClose();
    }
  }

  function resetForm() {
    setTitle("");
    setColor("#007bff");
    setStart(defaultDate || new Date());
    setEnd(defaultDate || new Date());
  }

  function formatDateForInput(date: Date) {
    const pad = (n: number) => String(n).padStart(2, "0");
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
        }}
      >
        <form onSubmit={handleSubmit}>
          <label>
            Title (max 30 chars)
            <input
              type="text"
              value={title}
              maxLength={30}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Start
            <input
              type="datetime-local"
              value={formatDateForInput(start)}
              onChange={(e) => setStart(new Date(e.target.value))}
            />
          </label>

          <label>
            End
            <input
              type="datetime-local"
              value={formatDateForInput(end)}
              onChange={(e) => setEnd(new Date(e.target.value))}
            />
          </label>

          <label className={styles.color}>
            Color
            <div
              style={{
                backgroundColor: color,
              }}
            >
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </label>

          <div className={styles.actions}>
            {defaultEvent ? (
              <button type="button" onClick={handleDelete}>
                Delete
              </button>
            ) : (
              <button type="button" onClick={handleClose}>
                Cancel
              </button>
            )}
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
