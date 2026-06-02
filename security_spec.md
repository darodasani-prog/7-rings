# Security Specification & Threat Model for 7 Rings Firestore

This document outlines the zero-trust security specification, the "Dirty Dozen" payload test cases, and the structural safety invariants designed to secure user profiles and purchased tickets.

## 1. Safety Invariants

- **User Profiles (/users/{userId})**:
  - A user profile can only be created or modified by the user themselves (`request.auth.uid == userId`).
  - Roles cannot be self-updated or elevated to `admin` (immutable roles or no client-driven RBAC modifications).
  - Profile reads are limited strictly to the owner (`request.auth.uid == userId`) or an admin to protect privacy.

- **Tickets (/tickets/{ticketId})**:
  - A ticket can only be created by an authenticated user (`request.auth.uid != null`), and the `userId` in the ticket payload must match their authenticated ID.
  - Users can read, update, or cancel their own tickets (`resource.data.userId == request.auth.uid`).
  - A ticket's payment status (`paid` and `status`) is vital. Once a ticket is marked `CONFIRMED` and `paid == true` (the terminal state), the user cannot toggle `paid` back to `false` or modify the event identifier itself.
  - Strict key checks prevent "Ghost Fields" or shadow updates on ticket data.

---

## 2. The "Dirty Dozen" Malicious Payloads

The following attack payloads represent threats to the system. All must return `PERMISSION_DENIED` under our firestore security configuration:

### Core Identity Spoofing Attacks
1. **The Identity Thief**: User A attempts to create a profile under User B's uid.
   - *Target Path*: `/users/user_B_uid` (Authenticated as `user_A_uid`)
2. **Ticket Hijacking**: User A attempts to read User B's ticket.
   - *Target Path*: `/tickets/ticket_B_id` (Authenticated as `user_A_uid`)
3. **The Proxy Buyer**: User A creates a ticket with `userId: "user_B_uid"` to bypass accountability.
   - *Target Path*: `/tickets/ticket_A_id` (Authenticated as `user_A_uid`)

### Privilege Escalation & State Shortcutting
4. **Self-Admin Elevate**: User A attempts to update their user profile role to "admin".
   - *Target Path*: `/users/user_A_uid` (Changing `role` from "user" to "admin")
5. **Direct Ticket Fraud**: User A tries to create a ticket pre-marked as `paid: true` with `status: "CONFIRMED"` without simulation or proper settlement.
   - *Target Path*: `/tickets/ticket_A_id`
6. **Double Bypass Lock**: User A attempts to modify `totalPaid` on an already purchased ticket.
   - *Target Path*: `/tickets/ticket_A_id`

### Resource Exhaustion & Boundary Breach (Denial of Wallet)
7. **The Long-String Attack**: Injecting a extremely long junk string (e.g. 500KB) as the buyer's phone or name to consume storage.
   - *Target Path*: `/tickets/ticket_A_id`
8. **Malicious ID Poisoning**: Creating a ticket with an enormously long or malformed document ID containing junk punctuation (`/tickets/SOME_JUNK_$$$_ID...`).
   - *Target Path*: `/tickets/SOME_JUNK_$$$_ID...`
9. **Negative Quantity Order**: Registering a ticket with `quantity: -5` or `totalPaid: -50000` to attempt overflow or refund exploitation.
   - *Target Path*: `/tickets/ticket_A_id`

### Relational Orphan & Temporal Integrity
10. **The Clock spoofer**: Creating a ticket with a forged client timestamp `bookedAt: "2030-01-01T00:00:00Z"` rather than `request.time`.
    - *Target Path*: `/tickets/ticket_A_id`
11. **Shadow Field Injection**: Injecting an unmapped field `isVIP_Forced: true` inside a standard regular ticket layout.
    - *Target Path*: `/tickets/ticket_A_id`
12. **The Terminal State Toggle**: Forcing an already `CONFIRMED` ticket back to `PENDING_PAYMENT` to reissue a simulated payment.
    - *Target Path*: `/tickets/ticket_A_id`
