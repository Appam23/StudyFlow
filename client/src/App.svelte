<script>
  const API_URL = "http://localhost:3000/api/assignments";

  let assignments = [];
  let title = "";
  let course = "";
  let dueDate = "";
  let status = "Not Started";

  async function loadAssignments() {
    const response = await fetch(API_URL);
    assignments = await response.json();
  }

  async function addAssignment(event) {
    event.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, course, dueDate, status }),
    });

    title = "";
    course = "";
    dueDate = "";
    status = "Not Started";

    await loadAssignments();
  }

  loadAssignments();
  async function deleteAssignment(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  await loadAssignments();
}

let editingAssignment = null;

function startEditing(assignment) {
  editingAssignment = {
    ...assignment,
    dueDate: assignment.dueDate.slice(0, 10),
  };
}

function cancelEditing() {
  editingAssignment = null;
}

async function saveEdit() {
  await fetch(`${API_URL}/${editingAssignment._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: editingAssignment.title,
      course: editingAssignment.course,
      dueDate: editingAssignment.dueDate,
      status: editingAssignment.status,
    }),
  });

  editingAssignment = null;
  await loadAssignments();
}
</script>

<main>
  <h1>StudyFlow</h1>

  <form class="edit-form" onsubmit={addAssignment}>
    <input bind:value={title} placeholder="Assignment title" required />
    <input bind:value={course} placeholder="Course name" required />
    <input bind:value={dueDate} type="date" required />

    <select bind:value={status}>
      <option>Not Started</option>
      <option>In Progress</option>
      <option>Completed</option>
    </select>

    <button class="add-button" type="submit">Add Assignment</button>
  </form>

  <section id="assignment-list">
  
    {#each assignments as assignment}
      <article>
        <h2>{assignment.title}</h2>
        <p>Course: {assignment.course}</p>
        <p>Due date: {assignment.dueDate.slice(0, 10)}</p>
        <p>Status: {assignment.status}</p>
        <button class="delete" onclick={() => deleteAssignment(assignment._id)}>
        Delete
        </button>
        <button onclick={() => startEditing(assignment)}>
        Edit
        </button>
      </article>
    {/each}
    </section>

    {#if editingAssignment}
      <div
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-heading"
      >
        <form
          class="edit-form modal"
          onsubmit={(event) => {
            event.preventDefault();
            saveEdit();
          }}
        >
          <h2 id="edit-heading">Edit Assignment</h2>

          <input bind:value={editingAssignment.title} required />
          <input bind:value={editingAssignment.course} required />
          <input type="date" bind:value={editingAssignment.dueDate} required />

          <select bind:value={editingAssignment.status}>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="submit">Save Changes</button>
          <button type="button" onclick={cancelEditing}>Cancel</button>
        </form>
      </div>
    {/if}
  
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    background: #eef4ff;
    font-family: Arial, sans-serif;
    color: #172033;
  }

  main {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  h1 {
    color: #1d4ed8;
    text-align: center;
  }

  form {
    display: grid;
    gap: 12px;
    max-width: 560px;
    margin: 30px auto;
    padding: 24px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgb(15 23 42 / 10%);
  }

  input,
  select,
  button {
    padding: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 16px;
  }

  button {
    border: none;
    background: #2563eb;
    color: white;
    cursor: pointer;
  }

  button.delete {
    background: #dc2626;
  }

  button.delete:hover {
    background: #b91c1c;
  }

  button.add-button {
    background: #16a34a;
  }

  button.add-button:hover {
    background: #39cb6f;
  }

  #assignment-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.edit-form {
  max-width: 560px;
  margin: 24px auto;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgb(15 23 42 / 55%);
}

.modal {
  width: min(100%, 560px);
  margin: 0;
}

  article {
    padding: 18px;
    background: white;
    border-radius: 14px;
    box-shadow: 0 5px 15px rgb(15 23 42 / 8%);
  }

  form h2 {
  margin: 0;
  color: #1e3a8a;
}

.modal button:last-child {
  background: #64748b;
}

.modal button:last-child:hover {
  background: #475569;
}

  @media (max-width: 600px) {
    main {
      padding: 24px 12px;
    }
  }
</style>