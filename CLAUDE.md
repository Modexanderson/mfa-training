# MFA Under Siege — Interactive Security Training

## Project Context
- Built for a Learning & AI Content Designer job application test assignment
- Topic: MFA (Multi-Factor Authentication) security training
- Deadline: 24 hours from assignment
- Strategy: Live interactive web prototype to differentiate from traditional Storyline/PDF submissions

## Deliverables
1. **Interactive Prototype** (`index.html`) — 3 escalating MFA attack scenarios with branching decisions
2. **Design Document** (`design-document.html`) — 10-section professional instructional design doc

## Live URLs
- Prototype: https://modexanderson.github.io/mfa-training/
- Design Doc: https://modexanderson.github.io/mfa-training/design-document.html
- Repo: https://github.com/Modexanderson/mfa-training

## Tech Stack
- Vanilla HTML + CSS + JavaScript (zero dependencies)
- Dark cyber theme, mobile responsive
- Hosted on GitHub Pages

## File Structure
```
index.html              # Main interactive app
design-document.html    # Professional design document
css/styles.css          # All styling
js/scenarios.js         # Scenario data + scoring thresholds
js/app.js               # Game engine + state management
js/ui.js                # UI components (phone, Slack, call mockups)
```

## Key Design Decisions
- 3 scenarios based on real breaches: Twilio (2022), Uber (2022), Cisco (2022)
- 3 choices per scenario: wrong / partial / optimal
- Timer creates urgency (30s/25s/20s decreasing)
- Score starts at 50, range 0-100
- Action Mapping methodology (Cathy Moore) for instructional design

## Status
- Submitted to client on 2026-06-02
