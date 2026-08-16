import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import type { Note } from "../types/Notes";

export default function NotesDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load the logged-in user, then their notes
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        setLoading(false);
        return;
      }
      setUser(data.user);
      await fetchNotes();
      setLoading(false);
    };
    init();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      return;
    }
    setNotes(data as Note[]);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) return;

    if (editingId) {
      // Update existing note
      const { error } = await supabase
        .from("notes")
        .update({ title, content })
        .eq("id", editingId);

      if (error) {
        setError(error.message);
        return;
      }
    } else {
      // Insert new note
      const { error } = await supabase
        .from("notes")
        .insert({ title, content, user_id: user.id });

      if (error) {
        setError(error.message);
        return;
      }
    }

    resetForm();
    await fetchNotes();
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this note?");
    if (!confirmed) return;

    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    await fetchNotes();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (loading) return <div className="auth-container">Loading...</div>;

  if (!user) {
    return (
      <div className="auth-container">
        <p>Please log in to see your notes.</p>
      </div>
    );
  }

  return (
    <div className="notes-page">
      <div className="notes-header">
        <h1>My Notes</h1>
        <button onClick={handleLogout}>Log out</button>
      </div>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          required
        />
        {error && <p className="banner banner-error">{error}</p>}
        <div className="form-actions">
          <button type="submit">{editingId ? "Update Note" : "Add Note"}</button>
          {editingId && (
            <button type="button" onClick={resetForm} className="secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="notes-grid">
        {notes.length === 0 && <p>No notes yet. Add one above!</p>}
        {notes.map((note) => (
          <div className="note-card" key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-actions">
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => handleDelete(note.id)} className="danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}