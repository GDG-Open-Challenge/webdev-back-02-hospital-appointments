# 🤝 Contributing to Hospital Appointments API

Thank you for your interest in contributing! This project is a backend API for managing hospital appointments, doctors, patients, and hospital information. Here's how to get started.

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the **Fork** button in the top-right corner of the GitHub repo page. This creates your own copy of the project under your GitHub account.

### 2. Clone Your Fork

```bash
git clone https://github.com/<your-username>/webdev-back-02-hospital-appointments.git
cd webdev-back-02-hospital-appointments
```

### 3. Add the Upstream Remote

Keep your fork synced with the original repo:

```bash
git remote add upstream https://github.com/GDG-Open-Challenge/webdev-back-02-hospital-appointments.git
git fetch upstream
```

---

## 🔀 Branching Strategy

Create a **separate branch** for each feature or fix. Use this naming convention:

```
<type>/<short-description>
```

**Types:** `feature`, `fix`, `docs`, `refactor`, `test`

**Examples:**

```bash
git checkout -b feature/add-appointment-search
git checkout -b fix/doctor-availability-bug
git checkout -b docs/api-endpoints
git checkout -b test/appointment-validation
```

> [!IMPORTANT]
> Always branch off from the latest `main` branch:
> ```bash
> git checkout main
> git pull upstream main
> git checkout -b <type>/<description>
> ```

---

## 🛠 Making Changes

1. **Pick an issue or feature** from the GitHub Issues tab
2. **Comment on the issue** to let others know you're working on it
3. **Read the full description** — understand the requirements and expected behavior
4. **Implement your change** in the relevant file(s)
5. **Test your changes** locally to ensure they work correctly
6. **Update documentation** if your change affects the API

### Testing Locally

**1. Install dependencies:**
```bash
npm install
```

**2. Configure your environment:**
Create a `.env` file in the project root with your database configuration (see `config/database.js`)

**3. Start the server:**
```bash
npm start
```

The API will be available at http://localhost:3000

**4. Test your endpoints:**
Use Postman, Insomnia, or cURL to test your API changes:
```bash
curl http://localhost:3000/api/appointments
curl http://localhost:3000/api/doctors
curl http://localhost:3000/api/patients
curl http://localhost:3000/api/hospitals
```

---

## 📝 Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:

```
<type>(<scope>): <description>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Scopes:** `api`, `models`, `routes`, `database`, `config`, `validation`

**Examples:**

```bash
git commit -m "feat(routes): add appointment filtering by date"
git commit -m "fix(models): correct Doctor schema validation"
git commit -m "docs(api): update endpoint documentation"
git commit -m "test(routes): add unit tests for patient endpoints"
git commit -m "refactor(database): improve connection pooling"
```

> [!NOTE]
> Keep commit messages concise and descriptive. Use lowercase and imperative mood ("add", "fix", not "added", "fixed").

---

## 🚀 Submitting a Pull Request

### 1. Push Your Branch

```bash
git push origin <type>/<description>
```

### 2. Open a Pull Request

- Go to your fork on GitHub
- Click **"Compare & pull request"**
- Set the base repository to `GDG-Open-Challenge/webdev-back-02-hospital-appointments` and base branch to `main`
- Fill in the PR title and description
- Link related issues using `Closes #<issue-number>` or `Fixes #<issue-number>`

---

## 📋 Pull Request Guidelines

Your pull request should include:

1. **Clear Title:** Describe what you've changed
   - ✅ Good: "Add patient appointment history endpoint"
   - ❌ Bad: "Update code"

2. **Description:** Include:
   - What changes you made
   - Why you made them
   - Any relevant context or related issues
   - Testing you've done

3. **Code Quality:**
   - Keep changes focused (single feature/fix per PR)
   - Write clean, readable code
   - Add comments for complex logic
   - Follow the existing code style

4. **Testing:**
   - Test your changes with API calls
   - Verify no existing functionality is broken
   - List what you tested

---

## ⚠️ PR Review Criteria

Your pull request will be evaluated on:

| Criterion | What We Look For |
|-----------|-----------------|
| **Correctness** | Does the code work as intended without breaking existing features? |
| **Code Quality** | Is the code clean, readable, and well-structured? |
| **Testing** | Did you test your changes thoroughly? Are there edge cases to consider? |
| **Documentation** | Is the API change documented? Are there helpful code comments? |
| **Consistency** | Does the code follow the project's style and patterns? |
| **Focus** | Is the PR focused on a single feature/fix, not bundling unrelated changes? |

---

## ✅ Contribution Rules

| Rule | Details |
|------|---------|
| **One feature per PR** | Keep PRs focused on a single feature or fix |
| **No breaking changes** | Maintain backward compatibility with existing API endpoints |
| **Minimal changes** | Only modify what's necessary; avoid unnecessary refactoring |
| **No new dependencies** | Don't add npm packages without discussing with maintainers first |
| **Test before submitting** | Verify your changes work and don't break existing functionality |
| **Follow the code style** | Match the existing code patterns and structure |
| **Document API changes** | Update documentation if you modify endpoints or models |

---


## 💬 Need Help?

- Comment on the issue you're working on so others know it's in progress
- Ask questions in the issue thread if you're stuck
- Review other contributors' PRs to learn different approaches
- Check the [README](README.md) for project overview and API documentation

---

## 🛠️ Project Structure

Understanding the codebase:

```
src/
├── server.js           # Main Express server
├── config/
│   └── database.js     # Database configuration
├── models/
│   ├── Appointment.js  # Appointment model
│   ├── Doctor.js       # Doctor model
│   ├── Hospital.js     # Hospital model
│   └── Patient.js      # Patient model
└── routes/
    ├── appointments.js # Appointment endpoints
    ├── doctors.js      # Doctor endpoints
    ├── hospitals.js    # Hospital endpoints
    └── patients.js     # Patient endpoints
```

---

## 📜 Code of Conduct

- Be respectful and constructive in all interactions
- Help other contributors when possible
- Give credit where credit is due
- Have fun debugging! 🐛
