# Hospital Appointments Management API - Workshop Edition

A practical Express.js + MongoDB hospital management system with **5 real bugs** to find and fix.

This is intentionally built with validation gaps, logic flaws, and data integrity issues for educational purposes.

---

## 🎯 Project Overview

This is a full **Hospital Management System** API with interconnected entities:
- **Patients** - With medical history and appointment tracking
- **Doctors** - With specialization and hospital assignment
- **Appointments** - With scheduling and status management
- **Hospitals** - Managing doctors and departments

**Purpose:** Workshop participants identify and fix 5 real issues embedded in production-like code.

**Stack:** 
- Express.js 4.18.2
- MongoDB + Mongoose 7.5.0
- Node.js with ES6

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Start development server
npm run dev
```

API available at: `http://localhost:3000`

Database: MongoDB (local or via `.env` connection string)

---

## 📋 API Endpoints

### Patients
```
GET    /api/patients              - List all patients (paginated)
GET    /api/patients/:id          - Get patient details
POST   /api/patients              - Create new patient
PUT    /api/patients/:id          - Update patient
DELETE /api/patients/:id          - Delete patient
```

### Doctors
```
GET    /api/doctors               - List doctors (filterable by specialization)
GET    /api/doctors/:id           - Get doctor details
POST   /api/doctors               - Register doctor
PUT    /api/doctors/:id           - Update doctor
DELETE /api/doctors/:id           - Remove doctor
```

### Appointments
```
GET    /api/appointments          - List all appointments
GET    /api/appointments/:id      - Get appointment details
POST   /api/appointments          - Schedule appointment
PUT    /api/appointments/:id      - Update appointment
DELETE /api/appointments/:id      - Cancel appointment
```

### Hospitals
```
GET    /api/hospitals             - List all hospitals
GET    /api/hospitals/:id         - Get hospital details
POST   /api/hospitals             - Add hospital
PUT    /api/hospitals/:id         - Update hospital
DELETE /api/hospitals/:id         - Remove hospital
```

---

## 🐛 The 5 Issues You Need to Fix

All issues are **active in the code** (no comments marking them). See [WORKSHOP_ISSUES.md](WORKSHOP_ISSUES.md) for detailed explanations.

### Issue #1: Phone Validation Missing
**File:** `src/models/Doctor.js` - phone field
- Phone field accepts any string without format validation
- **Impact:** Invalid contact info, SMS systems fail
- **Difficulty:** ⭐ Easy

### Issue #2: Appointment Time in Past Allowed
**File:** `src/routes/appointments.js` - POST `/api/appointments`
- No validation that appointment is in future
- **Impact:** Can schedule fake past appointments
- **Difficulty:** ⭐ Easy

### Issue #3: No Doctor Availability Check
**File:** `src/routes/appointments.js` - POST `/api/appointments`
- No check if doctor already booked at that time
- **Impact:** Same doctor double-booked multiple times
- **Difficulty:** ⭐⭐ Medium

### Issue #4: Hospital Reference Not Validated
**File:** `src/routes/doctors.js` - POST `/api/doctors`
- Doctor can be assigned to non-existent hospital
- **Impact:** Orphaned records, broken references
- **Difficulty:** ⭐ Easy

### Issue #5: No Appointment Cancellation Response
**File:** `src/routes/appointments.js` - DELETE `/api/appointments/:id`
- DELETE endpoint missing response body
- **Impact:** Client hangs, no confirmation
- **Difficulty:** ⭐ Easy

---

## 🧪 Testing the Issues

### Test Issue #1 (Phone Validation)
```bash
curl -X POST http://localhost:3000/api/doctors \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@hospital.com",
    "phone": "invalid",
    "licenseNumber": "LIC123",
    "specialization": "Cardiology",
    "hospital": "{hospitalId}"
  }'
# Should reject but saves successfully
```

### Test Issue #2 (Time in Past)
```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patient": "{patientId}",
    "doctor": "{doctorId}",
    "hospital": "{hospitalId}",
    "appointmentDate": "2020-01-01T10:00:00Z",
    "reason": "Checkup"
  }'
# Should reject past date but saves
```

### Test Issue #3 (Double-Booking)
```bash
# Schedule first appointment
curl -X POST http://localhost:3000/api/appointments \
  -d '{"patient": "{patient1}", "doctor": "{doctorId}", "appointmentDate": "2026-03-15T10:00:00Z"}'

# Schedule same doctor, same time
curl -X POST http://localhost:3000/api/appointments \
  -d '{"patient": "{patient2}", "doctor": "{doctorId}", "appointmentDate": "2026-03-15T10:00:00Z"}'

# Both appointments exist - doctor double-booked
```

### Test Issue #4 (Hospital Validation)
```bash
curl -X POST http://localhost:3000/api/doctors \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "phone": "555-1234",
    "licenseNumber": "LIC456",
    "specialization": "Neurology",
    "hospital": "507f1f77bcf86cd799439999"
  }'
# Saves despite fake hospital ID
```

### Test Issue #5 (No Response)
```bash
curl -X DELETE http://localhost:3000/api/appointments/{id}
# Request hangs with no response
```

---

## 📁 Project Structure

```
src/
├── models/           # Mongoose schemas
│   ├── Patient.js
│   ├── Doctor.js     # Issue #1, #4 here
│   ├── Appointment.js # Issues #2, #3, #5 here
│   └── Hospital.js
├── routes/           # API endpoints  
│   ├── patients.js
│   ├── doctors.js    # Issue #4 here
│   ├── appointments.js # Issues #2, #3, #5 here
│   └── hospitals.js
├── config/
│   └── database.js   # MongoDB connection
└── server.js         # Express app setup

WORKSHOP_ISSUES.md    # Detailed bug descriptions
README.md             # This file
.env.example          # Configuration template
package.json          # Dependencies
```

---

## ✅ Verification Checklist

After fixing all 5 issues, verify:

- [ ] **Issue #1:** Phone validation enforced - add regex pattern to schema
- [ ] **Issue #2:** Appointment date in future enforced - add date comparison check
- [ ] **Issue #3:** Doctor availability checked - verify no conflicting appointments
- [ ] **Issue #4:** Hospital validated - check if hospital exists before saving
- [ ] **Issue #5:** DELETE appointment returns response - add `res.json()` statement

---

## 🛠 How to Debug Each Issue

### Issue #1 (Phone Validation)
```javascript
// Find this in src/models/Doctor.js
phone: {
  type: String,
  required: true,
  // Missing validation!
}

// Fix: Add phone format validation
phone: {
  type: String,
  required: true,
  match: [/^(\+1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/, 'Invalid phone format']
}
```

### Issue #2 (Time in Past)
```javascript
// Find this in src/routes/appointments.js - POST
const appointment = new Appointment({
  appointmentDate,  // NO DATE VALIDATION!
  // ...
});

// Fix: Check that date is in future
if (new Date(appointmentDate) <= new Date()) {
  return res.status(400).json({ message: 'Appointment must be in the future' });
}
```

### Issue #3 (Double-Booking)
```javascript
// Find this in src/routes/appointments.js - POST
const appointment = new Appointment({
  doctor,
  appointmentDate,
  // NO AVAILABILITY CHECK!
});

// Fix: Check if doctor is already booked
const conflict = await Appointment.findOne({
  doctor,
  appointmentDate,
  status: { $ne: 'cancelled' }
});
if (conflict) {
  return res.status(400).json({ message: 'Doctor already has appointment at this time' });
}
```

### Issue #4 (Hospital Validation)
```javascript
// Find this in src/routes/doctors.js - POST
const doctor = new Doctor({
  hospital,  // NO CHECK IF EXISTS!
  // ...
});

// Fix: Validate hospital exists
if (hospital) {
  const hospitalExists = await Hospital.findById(hospital);
  if (!hospitalExists) {
    return res.status(400).json({ message: 'Hospital not found' });
  }
}
```

### Issue #5 (No Response)
```javascript
// Find this in src/routes/appointments.js - DELETE
router.delete('/:id', async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  
  if (!appointment) {
    return res.status(404).json({ message: 'Not found' });
  }
  // Missing: res.json() here!
});

// Fix: Add response
res.json({ message: 'Appointment cancelled successfully' });
```

---

## 📚 Learning Resources

- **Phone Validation:** [Regex for Phone Numbers](https://stackoverflow.com/questions/11501357/phone-number-validation)
- **Date Validation:** [JavaScript Date Comparison](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- **Query Optimization:** [MongoDB Queries](https://docs.mongodb.com/manual/reference/method/db.collection.findOne/)
- **RESTful API Design:** Best practices for responses
- **Data Integrity:** Foreign key and referential integrity

---

## 🎓 Workshop Instructions

1. **Read** [WORKSHOP_ISSUES.md](WORKSHOP_ISSUES.md) for complete detail on each issue
2. **Run** the API: `npm run dev`
3. **Test** each issue using curl commands above
4. **Find** the problematic code in `src/`
5. **Fix** each issue properly (validation, error handling, etc.)
6. **Verify** your fixes work with test cases
7. **Commit** and document your changes

**Important:** No comments mark the issue locations - you must find them!

---

## 🚀 After the Workshop

This project demonstrates real-world bugs:
- **Data Quality:** Missing validation
- **API Design:** Proper response design
- **Logic Bugs:** Scheduling conflicts
- **Data Integrity:** Referential constraints
- **Error Handling:** Proper client responses

Apply these lessons to prevent bugs in production!

---

## 📊 Difficulty Progression

**Start here (Easy):**
- Issue #1 - Phone validation
- Issue #2 - Time in past check
- Issue #4 - Hospital validation
- Issue #5 - Missing response

**Then tackle (Medium):**
- Issue #3 - Doctor availability check (requires query logic)

---

## ⚙️ Configuration

`.env` file required:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hospital_appointments
NODE_ENV=development
```

Create from `.env.example`:
```bash
cp .env.example .env
```

---

## 🔗 Related Files

- **Issues Guide:** [WORKSHOP_ISSUES.md](WORKSHOP_ISSUES.md) - Detailed explanations
- **Source Code:** `src/` directory - Find and fix the bugs here
- **Models:** `src/models/` - Patient, Doctor, Appointment, Hospital schemas

---

## 📝 License

Educational content for learning purposes.
