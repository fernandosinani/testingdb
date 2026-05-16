const form = document.getElementById("staff-form");
const formTitle = document.getElementById("form-title");
const formError = document.getElementById("form-error");
const cancelBtn = document.getElementById("cancel-btn");
const idInput = document.getElementById("id");
const tbody = document.getElementById("staff-tbody");
const emptyRow = document.getElementById("empty-row");

let editMode = false;
let originalId = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveStaff();
});

async function loadStaff() {
  const res = await fetch("/staff");
  if (!res.ok) return;
  const staff = await res.json();
  tbody.innerHTML = "";
  if (staff.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty">No staff members found</td></tr>';
    return;
  }
  staff.forEach((s) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${escapeHtml(s.name)}</td>
      <td>${escapeHtml(s.lastname)}</td>
      <td>${escapeHtml(s.email)}</td>
      <td>${escapeHtml(s.phone)}</td>
      <td>
        <button class="btn btn-sm btn-edit" onclick="editStaff(${s.id})">Edit</button>
        <button class="btn btn-sm btn-delete" onclick="deleteStaff(${s.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function saveStaff() {
  formError.classList.add("hidden");
  const data = {
    id: parseInt(idInput.value),
    name: document.getElementById("name").value.trim(),
    lastname: document.getElementById("lastname").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
  };

  let url = "/staff";
  let method = "POST";
  if (editMode) {
    url = `/staff/${originalId}`;
    method = "PUT";
    delete data.id;
  }

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    formError.textContent = err.detail || "An error occurred";
    formError.classList.remove("hidden");
    return;
  }

  resetForm();
  loadStaff();
}

async function editStaff(id) {
  const res = await fetch(`/staff/${id}`);
  if (!res.ok) return;
  const s = await res.json();
  idInput.value = s.id;
  document.getElementById("name").value = s.name;
  document.getElementById("lastname").value = s.lastname;
  document.getElementById("email").value = s.email;
  document.getElementById("phone").value = s.phone;
  idInput.disabled = true;
  editMode = true;
  originalId = id;
  formTitle.textContent = "Edit Staff Member";
  cancelBtn.classList.remove("hidden");
}

async function deleteStaff(id) {
  if (!confirm("Delete this staff member?")) return;
  await fetch(`/staff/${id}`, { method: "DELETE" });
  if (editMode && originalId === id) resetForm();
  loadStaff();
}

function resetForm() {
  form.reset();
  idInput.disabled = false;
  editMode = false;
  originalId = null;
  formTitle.textContent = "Add Staff Member";
  cancelBtn.classList.add("hidden");
  formError.classList.add("hidden");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

loadStaff();
