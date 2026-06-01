// MFA Under Siege — Scenario Data
const SCENARIOS = [
  {
    id: 1,
    title: "The Innocent Push",
    difficulty: "Easy",
    icon: "1",
    setup: {
      time: "9:15 AM",
      location: "Your Desk",
      narrative: `You're settling into your morning, coffee in hand, reviewing emails. Your phone suddenly buzzes with an MFA push notification from your company's authentication app.`,
      detail: `You haven't tried to log in to anything. The notification reads:`,
      notification: {
        app: "SecureAuth",
        title: "Sign-in Approval",
        body: "Someone is trying to sign in to your account from Windows PC — Downtown Office",
        time: "Just now"
      }
    },
    question: "What do you do?",
    timerSeconds: 30,
    choices: [
      {
        id: "approve",
        label: "Approve It",
        subtitle: "Maybe I forgot I was logging in somewhere",
        isCorrect: false,
        points: -20,
        consequence: {
          type: "breach",
          title: "Account Compromised",
          description: "An attacker who had stolen your password was waiting for you to approve that push. They now have full access to your company email, files, and internal systems.",
          impact: [
            "Your credentials are now in attacker's hands",
            "Company data is being exfiltrated",
            "The breach goes undetected for 4 hours"
          ]
        }
      },
      {
        id: "deny",
        label: "Deny It",
        subtitle: "I didn't request this — decline",
        isCorrect: false,
        points: 5,
        consequence: {
          type: "partial",
          title: "Threat Blocked... For Now",
          description: "Good instinct! You denied the request. But the attacker still has your password and may try again — or switch tactics. Without reporting it, IT has no idea this happened.",
          impact: [
            "This attempt was blocked",
            "Attacker still has your password",
            "No investigation is triggered"
          ]
        }
      },
      {
        id: "deny-report",
        label: "Deny & Report to IT",
        subtitle: "Something's wrong — deny and alert security",
        isCorrect: true,
        points: 20,
        consequence: {
          type: "secure",
          title: "Threat Neutralized",
          description: "You denied the request AND reported it to IT Security. They immediately forced a password reset, identified the attacker's IP, and blocked it across the organization.",
          impact: [
            "Your account is secured with a new password",
            "Attacker's IP is blocked company-wide",
            "IT discovers 3 other employees were targeted"
          ]
        }
      }
    ],
    breachCard: {
      company: "Twilio",
      year: "2022",
      description: "Attackers used stolen credentials to send MFA push notifications to Twilio employees. Some approved them, leading to a breach that exposed data from 125+ customer companies including Signal.",
      lesson: "An unexpected MFA push is an alarm, not a nuisance. Always deny and report."
    }
  },
  {
    id: 2,
    title: "The Pressure Play",
    difficulty: "Medium",
    icon: "2",
    setup: {
      time: "2:30 PM",
      location: "Conference Room B — Team Meeting",
      narrative: `You're in the middle of presenting quarterly results to your team. Your phone starts buzzing — not once, but repeatedly. Five MFA push notifications hit your phone in under a minute.`,
      detail: `As you glance at your phone, a Slack message pops up:`,
      notification: {
        app: "SecureAuth",
        title: "Sign-in Approval",
        body: "Someone is trying to sign in to your account",
        time: "5 notifications in 60 seconds"
      },
      slackMessage: {
        sender: "Jake from IT Support",
        avatar: "J",
        message: "Hey! We're doing a system migration and your auth is glitching out. Can you just approve the next push so we can sync your account? Should fix it. Thanks! 🙏",
        time: "2:31 PM"
      }
    },
    question: "Your phone won't stop buzzing and a colleague says to approve. What do you do?",
    timerSeconds: 25,
    choices: [
      {
        id: "approve",
        label: "Approve to Stop the Buzzing",
        subtitle: "It's disrupting the meeting — just approve it",
        isCorrect: false,
        points: -25,
        consequence: {
          type: "breach",
          title: "MFA Fatigue Attack Succeeded",
          description: "This is called 'push bombing' or 'MFA fatigue.' The attacker flooded you with requests betting you'd approve one just to make it stop. The Slack message was from a compromised account — not real IT.",
          impact: [
            "Attacker gains full access to your account",
            "The 'Jake from IT' Slack was a compromised account",
            "Company-wide ransomware deployed within 2 hours"
          ]
        }
      },
      {
        id: "ignore",
        label: "Ignore All Notifications",
        subtitle: "Don't approve anything, focus on the meeting",
        isCorrect: false,
        points: 5,
        consequence: {
          type: "partial",
          title: "Attack Blocked, But Not Reported",
          description: "Smart — you didn't approve. But by not reporting it, the attacker moves on to another employee who might be less careful. The Slack message from 'Jake' goes uninvestigated.",
          impact: [
            "Your account is safe for now",
            "Attacker pivots to other targets",
            "The compromised Slack account stays active"
          ]
        }
      },
      {
        id: "report-deny",
        label: "Report Slack Message & Deny All",
        subtitle: "This feels coordinated — report everything",
        isCorrect: true,
        points: 25,
        consequence: {
          type: "secure",
          title: "Coordinated Attack Exposed",
          description: "You recognized the signs of an MFA fatigue attack combined with social engineering. By reporting both the push bombing AND the suspicious Slack message, IT uncovered a multi-pronged attack campaign.",
          impact: [
            "Push bombing attack neutralized",
            "'Jake's' compromised Slack account is secured",
            "IT identifies the attacker used credentials from a phishing campaign last week"
          ]
        }
      }
    ],
    breachCard: {
      company: "Uber",
      year: "2022",
      description: "An 18-year-old hacker bombarded an Uber contractor with MFA push requests, then contacted them on WhatsApp pretending to be IT support. The contractor approved — the hacker gained access to Uber's internal systems, Slack, and cloud infrastructure.",
      lesson: "MFA fatigue + social engineering is a powerful combo. Repeated pushes are ALWAYS an attack."
    }
  },
  {
    id: 3,
    title: "The Social Engineer",
    difficulty: "Hard",
    icon: "3",
    setup: {
      time: "4:45 PM",
      location: "Your Desk — End of Day",
      narrative: `Your desk phone rings. The caller ID shows "IT Help Desk — Internal." A professional, friendly voice greets you.`,
      detail: `The caller says:`,
      phoneCall: {
        caller: "IT Help Desk — Internal",
        transcript: `"Hi, this is Marcus from the IT Security team. We've detected some unusual login activity on your account and need to verify your identity as part of our incident response protocol. I'm going to send you an MFA push right now — please approve it so we can confirm it's really you and lock out the suspicious session. This is time-sensitive."`,
        note: "The caller sounds professional, uses correct company terminology, and creates urgency."
      }
    },
    question: "A caller claiming to be IT needs you to approve an MFA push. What do you do?",
    timerSeconds: 20,
    choices: [
      {
        id: "approve",
        label: "Approve When Prompted",
        subtitle: "They sound legit and it's urgent",
        isCorrect: false,
        points: -30,
        consequence: {
          type: "breach",
          title: "Social Engineering Succeeded",
          description: "That wasn't IT. It was a social engineer who researched your company's internal language, spoofed the caller ID, and created urgency to bypass your judgment. By approving, you gave them the second factor they needed.",
          impact: [
            "Attacker now has full authenticated access",
            "They use your account to send phishing emails to executives",
            "A wire transfer of $340,000 is initiated before detection"
          ]
        }
      },
      {
        id: "ticket",
        label: "Ask for a Ticket Number",
        subtitle: "Verify — real IT should have a ticket",
        isCorrect: false,
        points: 10,
        consequence: {
          type: "partial",
          title: "Good Instinct, But Not Enough",
          description: "Asking for a ticket number shows good security awareness. However, a skilled social engineer might have a fake ticket number ready, or pressure you by saying 'this is an emergency, we'll create the ticket after.' You need to independently verify.",
          impact: [
            "Shows security awareness",
            "A skilled attacker could still talk their way through",
            "Independent verification is the only safe path"
          ]
        }
      },
      {
        id: "hangup-call",
        label: "Hang Up & Call IT Directly",
        subtitle: "Don't trust incoming calls — verify independently",
        isCorrect: true,
        points: 30,
        consequence: {
          type: "secure",
          title: "Social Engineering Defeated",
          description: "By hanging up and calling IT's official number yourself, you broke the attacker's script. Real IT confirmed they never called you. Security traced the spoofed number and added it to their threat intelligence.",
          impact: [
            "Attack completely neutralized",
            "Spoofed phone number flagged and blocked",
            "Company issues an all-hands alert about vishing attacks"
          ]
        }
      }
    ],
    breachCard: {
      company: "Cisco",
      year: "2022",
      description: "Attackers used voice phishing (vishing) to contact a Cisco employee, posing as trusted organizations. After gaining the employee's trust, they convinced them to accept an MFA push notification, gaining access to Cisco's VPN and internal systems.",
      lesson: "Never approve MFA based on someone else's request. Always verify through an independent channel YOU initiate."
    }
  }
];

// Scoring thresholds
const SCORE_RATINGS = {
  excellent: { min: 90, label: "Security Champion", color: "#00ff88", description: "Outstanding! You recognized every threat and took decisive action. You're the employee every security team dreams of." },
  good: { min: 65, label: "Security Aware", color: "#4ecdc4", description: "Good instincts! You avoided the worst outcomes but missed some opportunities to fully neutralize threats. A little more vigilance and you'll be airtight." },
  fair: { min: 35, label: "Needs Training", color: "#f9c74f", description: "You fell for some common tactics that real attackers use every day. The good news: now you know what to look for. These scenarios happen to real employees at real companies." },
  poor: { min: 0, label: "High Risk", color: "#ff6b6b", description: "These are exactly the mistakes attackers count on. But that's why training like this exists — now you've seen these tactics, you'll recognize them in the real world." }
};

function getScoreRating(score) {
  if (score >= SCORE_RATINGS.excellent.min) return SCORE_RATINGS.excellent;
  if (score >= SCORE_RATINGS.good.min) return SCORE_RATINGS.good;
  if (score >= SCORE_RATINGS.fair.min) return SCORE_RATINGS.fair;
  return SCORE_RATINGS.poor;
}
