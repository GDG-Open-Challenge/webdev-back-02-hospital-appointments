# Hospital Appointments API - 5 Real Issues Workshop

This codebase contains **5 real, unfixed bugs** that require actual code changes to resolve. No comments hint at their locations.

---

## Issue #1: Phone Validation Missing

**File:** `src/models/Doctor.js` → phone field

**Problem:**
```javascript
phone: {
  type: String,
  required: true,
  // NO FORMAT VALIDATION!
}
```

**What breaks:**
- Invalid phone numbers accepted: `"123"`, `"invalid"`, `"abcdefghij"`
- SMS/calling systems fail
- Patient-doctor communication broken
- Database contains garbage data
- Contact tracing impossible

**How to verify the bug:**
```bash
POST /api/doctors
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@hospital.com",
  "phone": "invalid-phone",
  "licenseNumber": "LIC123",
  "specialization": "Cardiology",
  "hospital": "{hospitalId}"
}
# Saves successfully! Should reject.
```

---

## Issue #2: Appointment Time in Past Allowed

**File:** `src/routes/appointments.js` → POST `/api/appointments`

**Problem:**
```javascript
router.post('/', async (req, res) => {
  const { patient, doctor, hospital, appointmentDate, duration, reason } = req.body;

  const appointment = new Appointment({
    patient,
    doctor,
    hospital,
    appointmentDate,  // NO DATE VALIDATION!
    duration: duration || 30,
    reason,
  });

  const saved = await appointment.save();
});
```

**What breaks:**
- Schedule appointments in the past
- Impossible meetings recorded
- Billing for fake visits
- Medical records inaccurate
- Violates appointment logic

**How to verify the bug:**
```bash
POST /api/appointments
{
  "patient": "{patientId}",
  "doctor": "{doctorId}",
  "hospital": "{hospitalId}",
  "appointmentDate": "2020-01-01T10:00:00Z",
  "reason": "Checkup"
}
# Saves successfully despite being 6 years in past!
```

---

## Issue #3: No Doctor Availability Check

**File:** `src/routes/appointments.js` → POST `/api/appointments`

**Problem:**
```javascript
router.post('/', async (req, res) => {
  const { patient, doctor, hospital, appointmentDate, duration, reason } = req.body;

  const appointment = new Appointment({
    patient,
    doctor,
    hospital,
    appointmentDate,
    duration: duration || 30,
    reason,
    // NO CHECK IF DOCTOR ALREADY BOOKED!
  });

  const saved = await appointment.save();
});
```

**What breaks:**
- Same doctor booked at same time twice
- Patient waits, doctor unavailable
- Medical staff confused
- Scheduling system broken
- Double patient cancellations

**How to verify the bug:**
```bash
# First appointment
POST /api/appointments
{
  "patient": "{patient1}",
  "doctor": "{doctorId}",
  "hospital": "{hospitalId}",
  "appointmentDate": "2026-03-15T10:00:00Z",
  "reason": "Checkup"
}

# Second appointment SAME doctor, SAME time
POST /api/appointments
{
  "patient": "{patient2}",
  "doctor": "{doctorId}",
  "hospital": "{hospitalId}",
  "appointmentDate": "2026-03-15T10:00:00Z",
  "reason": "Follow-up"
}

# Both save! Doctor now has 2 patients at same time
```

---

## Issue #4: Missing Hospital Reference Validation

**File:** `src/routes/doctors.js` → POST `/api/doctors`

**Problem:**
```javascript
router.post('/', async (req, res) => {
  const { firstName, lastName, email, phone, licenseNumber, specialization, hospital } = req.body;

  const doctor = new Doctor({
    firstName,
    lastName,
    email,
    phone,
    licenseNumber,
    specialization,
    hospital,  // NO CHECK IF HOSPITAL EXISTS!
  });

  const saved = await doctor.save();
});
```

**What breaks:**
- Doctor assigned to non-existent hospital
- Hospital lookup returns null
- Can't contact hospital
- Orphaned doctor records
- Referential integrity broken
- Patient scheduling fails

**How to verify the bug:**
```bash
POST /api/doctors
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "555-1234",
  "licenseNumber": "LIC456",
  "specialization": "Neurology",
  "hospital": "507f1f77bcf86cd799439999"
}
# Saves successfully even though hospital doesn't exist
```

---

## Issue #5: No Appointment Cancellation Response

**File:** `src/routes/appointments.js` → DELETE `/api/appointments/:id`

**Problem:**
```javascript
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    // MISSING: res.json() response!
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

**What breaks:**
- Client request hangs waiting for response
- No confirmation that cancellation worked
- Network timeout errors
- Patient-facing app crashes
- Appointment still appears cancelled inconsistently

**How to verify the bug:**
```bash
DELETE /api/appointments/{id}
# Request hangs for 30+ seconds until timeout
# No response body even after successful deletion
```

---

## Summary

| Issue | Type | Severity | Fix Difficulty |
|-------|------|----------|-----------------|
| #1 Phone Validation | Data Quality | High | Easy |
| #2 Time in Past | Logic Bug | High | Easy |
| #3 Double-Booking | Concurrency | Critical | Medium |
| #4 Hospital Validation | Data Integrity | High | Easy |
| #5 No Response | API Bug | High | Easy |

---

## Quick Test Checklist

- [ ] Try invalid phone format signup
- [ ] Schedule appointment in past
- [ ] Double-book same doctor at same time
- [ ] Create doctor with fake hospital
- [ ] Cancel appointment and check response

---

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

API runs on `http://localhost:3000`

**All 5 issues are live and ready to fix!**
