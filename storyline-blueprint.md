# MFA Under Siege — Storyline Blueprint

Use this as your exact reference while building in Articulate Storyline 360.
Copy the text directly into slides.

---

## PROJECT SETTINGS
- Slide size: 16:9 (widescreen)
- Theme colors: Dark background (#0a0e17), Cyan accent (#00d4ff), White text
- Player: Modern player, no sidebar menu (keep it clean)
- Variable: Create a Number variable called `Score`, default value = 50

---

## SLIDE 1 — Title Slide
**Layout:** Title slide (centered)

**Text:**
- Heading: MFA Under Siege
- Subheading: Interactive Security Awareness Training
- Body: You're about to face a real-world MFA attack scenario. Your decisions have consequences.
- Button: "Begin Training" → jumps to Slide 2

**Design notes:** Dark background, large title, cyan accent on the heading

---

## SLIDE 2 — Context Setup
**Layout:** Content slide with text

**Text:**
- Header: 9:15 AM — Your Desk
- Body:
  You're settling into your morning, coffee in hand, reviewing emails.

  Your phone suddenly buzzes with an MFA push notification from your company's authentication app.

  You haven't tried to log in to anything.

  The notification reads:

- Callout box (styled like a phone notification):
  🔒 SecureAuth
  Sign-in Approval
  "Someone is trying to sign in to your account from Windows PC — Downtown Office"
  [Just now]

- Button: "Continue" → jumps to Slide 3

---

## SLIDE 3 — Decision Point (BRANCHING SLIDE)
**Layout:** Content with 3 buttons

**Text:**
- Header: What do you do?
- Subtitle: Choose carefully — your response matters.

**3 Choice Buttons:**

1. "Approve It"
   Subtitle: Maybe I forgot I was logging in somewhere
   → Trigger: Set Score = Score - 20, then Jump to Slide 4A

2. "Deny It"
   Subtitle: I didn't request this — decline
   → Trigger: Set Score = Score + 5, then Jump to Slide 4B

3. "Deny & Report to IT"
   Subtitle: Something's wrong — deny and alert security
   → Trigger: Set Score = Score + 20, then Jump to Slide 4C

**Design notes:** Make each button a rectangle shape with hover state (change color on hover). Add a subtle timer graphic or "30 seconds" text to create urgency feel.

---

## SLIDE 4A — Consequence: BREACH (Wrong Answer)
**Layout:** Content slide

**Text:**
- Header (RED): ⚠ Account Compromised
- Body:
  An attacker who had stolen your password was waiting for you to approve that push. They now have full access to your company email, files, and internal systems.

- "What Happened" box:
  • Your credentials are now in the attacker's hands
  • Company data is being exfiltrated
  • The breach goes undetected for 4 hours

- Score display: Show "Score: [variable]" — styled in red
- Points: -20 points

- Button: "See What Really Happened" → jumps to Slide 5

---

## SLIDE 4B — Consequence: PARTIAL (Okay Answer)
**Layout:** Content slide

**Text:**
- Header (ORANGE): ⚡ Threat Blocked... For Now
- Body:
  Good instinct! You denied the request. But the attacker still has your password and may try again — or switch tactics. Without reporting it, IT has no idea this happened.

- "What Happened" box:
  • This attempt was blocked
  • Attacker still has your password
  • No investigation is triggered

- Score display: Show "Score: [variable]" — styled in orange
- Points: +5 points

- Button: "See What Really Happened" → jumps to Slide 5

---

## SLIDE 4C — Consequence: SECURE (Best Answer)
**Layout:** Content slide

**Text:**
- Header (GREEN): ✅ Threat Neutralized
- Body:
  You denied the request AND reported it to IT Security. They immediately forced a password reset, identified the attacker's IP, and blocked it across the organization.

- "What Happened" box:
  • Your account is secured with a new password
  • Attacker's IP is blocked company-wide
  • IT discovers 3 other employees were targeted

- Score display: Show "Score: [variable]" — styled in green
- Points: +20 points

- Button: "See What Really Happened" → jumps to Slide 5

---

## SLIDE 5 — Real-World Breach Card
**Layout:** Content slide

**Text:**
- Header: 🌐 Real-World Parallel: Twilio (2022)
- Body:
  Attackers used stolen credentials to send MFA push notifications to Twilio employees. Some approved them, leading to a breach that exposed data from 125+ customer companies including Signal.

- Key Takeaway box (cyan accent):
  An unexpected MFA push is an alarm, not a nuisance. Always deny and report.

- Button: "Continue to Results" → jumps to Slide 6

---

## SLIDE 6 — Results / Report Card
**Layout:** Results slide

**Text:**
- Header: Your Security Assessment
- Score display: Large text showing "Score: [variable] / 100"
- Conditional text (use Storyline layers):
  - If Score >= 70: Layer "EXCELLENT" — "Security Champion — Outstanding! You took decisive action."
  - If Score >= 40 AND < 70: Layer "GOOD" — "Security Aware — Good instincts, but room to improve."
  - If Score < 40: Layer "NEEDS WORK" — "Needs Training — These are the mistakes attackers count on."

- Key Takeaways box:
  1. Never approve an MFA push you didn't initiate
  2. Always report suspicious activity to IT Security
  3. Denying alone isn't enough — reporting enables investigation

- Two buttons:
  - "Try Again" → Jump to Slide 2 (reset Score to 50 first)
  - "View Full Web Experience" → Open URL: https://modexanderson.github.io/mfa-training/

---

## TRIGGERS SUMMARY (copy these into Storyline)

| Slide | Trigger | Action |
|-------|---------|--------|
| Slide 1 | Click "Begin Training" | Jump to Slide 2 |
| Slide 2 | Click "Continue" | Jump to Slide 3 |
| Slide 3 | Click "Approve It" | Set Score -= 20, Jump to Slide 4A |
| Slide 3 | Click "Deny It" | Set Score += 5, Jump to Slide 4B |
| Slide 3 | Click "Deny & Report" | Set Score += 20, Jump to Slide 4C |
| Slide 4A/B/C | Click "See What Really Happened" | Jump to Slide 5 |
| Slide 5 | Click "Continue to Results" | Jump to Slide 6 |
| Slide 6 | Click "Try Again" | Set Score = 50, Jump to Slide 2 |
| Slide 6 | Timeline starts (Results) | Show layer based on Score value |

## LAYERS ON SLIDE 6 (Results)

Create 3 layers:
- Layer "Excellent": Show when Score >= 70
- Layer "Good": Show when Score >= 40 AND Score < 70
- Layer "NeedsWork": Show when Score < 40

Trigger for each: "Show layer [X] when timeline starts if Score [condition]"

---

## PUBLISHING SETTINGS
- Publish as: SCORM 1.2 (most compatible)
- Also publish as: Web (HTML5) for sharing the link
- Output: Upload to Review 360 for shareable link, or export .story file
