# Functional Requirements Document (FRD) – Conference Room Booking System

## Project Overview
**Application Name:** Question Pro Conference Room Booking System  
**Purpose:** Manage office conference rooms and their bookings, ensuring availability and efficient use of resources.  
**Session Type:** Context Engineering – Backend Development  
**Duration:** ~2 hours  
**Approach:** Backend-only APIs tested via Postman  

---

## Business Objectives
- Allow administrators to manage conference rooms (create, update, delete, view).  
- Allow employees to view available rooms and make/cancel bookings.  
- Enforce rules around advance booking and cancellations.  
- Provide visibility into room status at any time.  
- Enhance collaboration by optionally sending updates to a Slack channel.  

---

## Target Users
- **Admin Users:** Office managers responsible for room inventory and overall management.  
- **Regular Users:** Employees who want to book and use conference rooms.  

---

## Core Functional Requirements

### 1. Conference Room Management (Admin Only)
**Purpose:** Enable administrators to maintain the list of conference rooms.  
**Requirements:**  
- Create a new room (name, capacity, location, facilities).  
- Update details of an existing room.  
- Delete a room (only if no active bookings).  
- List all rooms with their details.  
- View status of a room (booked or free, with booking metadata if booked).  

**Business Rules:**  
- Room name must be unique.  
- Facilities could include: projector, whiteboard, TV screen, video conferencing setup, water/refreshments, etc.  
- Deleted rooms should not appear in user-facing lists.  

---

### 2. View Available Rooms (User)  
**Purpose:** Allow employees to check available rooms for a specific date/time.  
**Requirements:**  
- Input: date and optional time range.  
- Output: list of rooms that are not booked in that period.  
- Include room metadata (capacity, facilities, attendees list).  

**Business Rules:**  
- Bookings must be made exactly for the same day, not before or after.  
- Users cannot book a room for future days.
- User can book at max 2 rooms per day
- User can book a room for minimum 15 mins and maximum 90 minutes   

---

### 3. Book a Room (User)  
**Purpose:** Allow employees to reserve a room.  
**Requirements:**  
- Input: room_id, date, start time, end time, purpose, list of attendees, optional facility requests (water, technical support).  
- Output: booking confirmation with all details.  

**Business Rules:**  
- A room cannot be double-booked.  
- Booking duration must be within office hours.  
- Booking must specify purpose and at least one attendee.  
- Booking must be made on the same day of use (no advance booking beyond today).  
- Slack channel update: "Room X booked for [purpose] from [start] to [end]."  

---

### 4. Cancel / Leave Room (User)  
**Purpose:** Allow employees to cancel their booking.  
**Requirements:**  
- Input: booking_id.  
- Output: cancellation confirmation.  

**Business Rules:**  
- Only the creator of the booking can cancel it.  
- Cancellation should free up the slot immediately.  
- Slack channel update: "Room X booking for [purpose] has been canceled."  

---

### 5. Room Status (Admin & User)  
**Purpose:** View the real-time status of any room.  
**Requirements:**  
- Input: room_id.  
- Output:  
  - If available → "Room is free."  
  - If booked → Show booking metadata (purpose, booked_by, attendees, time range, facilities requested).  

**Business Rules:**  
- Metadata visible to admin always.  
- Metadata visible to users only if they are part of the booking.  

---

## User Stories

**As an Admin, I want to:**  
1. Create/update/delete rooms so I can manage inventory.  
2. See which rooms are currently occupied so I can monitor usage.  

**As a User, I want to:**  
1. Find available rooms for my meeting today.  
2. Book a room and specify purpose and attendees.  
3. Cancel my booking if plans change.  
4. Know the status of a room before entering.  

---

## Success Criteria

### User Experience Success  
- Users can check availability and book/cancel within 2–3 API calls.  
- Admins can manage rooms effortlessly.  

### Technical Success  
- No double bookings occur.  
- "Same day booking only" rule is enforced.  
- Slack notifications are triggered correctly.  

### Business Success  
- Employees use rooms more efficiently.  
- Transparency of room usage reduces conflicts.  

---

## Acceptance Criteria

### Admin  
- [ ] Can create, update, delete rooms.  
- [ ] Can list all rooms with details.  
- [ ] Can see full booking metadata for any room.  

### User  
- [ ] Can list available rooms for today.  
- [ ] Cannot book a room for future days.  
- [ ] Can successfully book a room with purpose, attendees, and facilities.  
- [ ] Can cancel own booking.  
- [ ] Sees status of a room (free/booked) with appropriate metadata.  

### Slack Notifications (Optional, Good-to-Have)  
- [ ] Message sent when room is booked.  
- [ ] Message sent when room booking is canceled.  
