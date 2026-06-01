// MFA Under Siege — UI Components & Animations

const UI = {
  // Create phone notification mockup
  createNotification(notification, multiple) {
    const count = multiple ? `<div class="notif-badge">5</div>` : '';
    return `
      <div class="phone-frame">
        <div class="phone-notch"></div>
        <div class="phone-screen">
          <div class="phone-time">${notification.time === 'Just now' ? '9:15' : '2:30'}</div>
          <div class="notification-card ${multiple ? 'buzzing' : 'slide-in'}">
            ${count}
            <div class="notif-header">
              <div class="notif-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div class="notif-app">${notification.app}</div>
              <div class="notif-time">${notification.time}</div>
            </div>
            <div class="notif-title">${notification.title}</div>
            <div class="notif-body">${notification.body}</div>
            <div class="notif-actions">
              <button class="notif-btn notif-approve" disabled>Approve</button>
              <button class="notif-btn notif-deny" disabled>Deny</button>
            </div>
          </div>
          ${multiple ? `
          <div class="notification-card stacked n2"></div>
          <div class="notification-card stacked n3"></div>
          ` : ''}
        </div>
      </div>
    `;
  },

  // Create Slack message mockup
  createSlackMessage(slack) {
    return `
      <div class="slack-frame">
        <div class="slack-header">
          <span class="slack-channel"># it-support</span>
          <span class="slack-dot"></span>
        </div>
        <div class="slack-message slide-in-left">
          <div class="slack-avatar">${slack.avatar}</div>
          <div class="slack-content">
            <div class="slack-sender">${slack.sender} <span class="slack-timestamp">${slack.time}</span></div>
            <div class="slack-text">${slack.message}</div>
          </div>
        </div>
      </div>
    `;
  },

  // Create phone call mockup
  createPhoneCall(call) {
    return `
      <div class="call-frame">
        <div class="call-screen">
          <div class="call-pulse"></div>
          <div class="call-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div class="call-caller">${call.caller}</div>
          <div class="call-status">Incoming Call...</div>
        </div>
        <div class="call-transcript">
          <div class="transcript-label">Caller says:</div>
          <div class="transcript-text">"${call.transcript}"</div>
          <div class="transcript-note">${call.note}</div>
        </div>
      </div>
    `;
  },

  // Create timer
  createTimer(seconds) {
    return `
      <div class="timer" id="timer">
        <svg class="timer-svg" viewBox="0 0 36 36">
          <path class="timer-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
          <path class="timer-fill" id="timer-fill" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke-dasharray="100, 100"/>
        </svg>
        <div class="timer-text" id="timer-text">${seconds}</div>
      </div>
    `;
  },

  // Create score display
  createScoreDisplay(score) {
    return `
      <div class="score-display">
        <div class="score-label">Security Score</div>
        <div class="score-value" id="score-value">${score}</div>
        <div class="score-bar">
          <div class="score-fill" id="score-fill" style="width: ${score}%"></div>
        </div>
      </div>
    `;
  },

  // Create consequence screen
  createConsequence(consequence, choice) {
    const iconSvg = consequence.type === 'breach'
      ? `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
           <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
           <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
         </svg>`
      : consequence.type === 'secure'
      ? `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
           <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
           <polyline points="9 12 11 14 15 10"/>
         </svg>`
      : `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
           <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
         </svg>`;

    return `
      <div class="consequence consequence-${consequence.type} fade-in">
        <div class="consequence-icon">${iconSvg}</div>
        <h2 class="consequence-title">${consequence.title}</h2>
        <p class="consequence-desc">${consequence.description}</p>
        <div class="consequence-impacts">
          <h3>What Happened:</h3>
          <ul>
            ${consequence.impact.map(i => `<li>${i}</li>`).join('')}
          </ul>
        </div>
        <div class="points-change ${choice.points > 0 ? 'points-positive' : 'points-negative'}">
          ${choice.points > 0 ? '+' : ''}${choice.points} points
        </div>
      </div>
    `;
  },

  // Create breach card
  createBreachCard(card) {
    return `
      <div class="breach-card slide-up">
        <div class="breach-card-header">
          <div class="breach-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
            </svg>
          </div>
          <span>Real-World Parallel</span>
        </div>
        <div class="breach-card-body">
          <div class="breach-company">${card.company} <span class="breach-year">(${card.year})</span></div>
          <p class="breach-desc">${card.description}</p>
          <div class="breach-lesson">
            <strong>Key Takeaway:</strong> ${card.lesson}
          </div>
        </div>
      </div>
    `;
  },

  // Create final report card
  createReportCard(score, choices, scenarios) {
    const rating = getScoreRating(score);
    const choiceDetails = choices.map((choice, i) => {
      const scenario = scenarios[i];
      const selected = scenario.choices.find(c => c.id === choice);
      const correct = scenario.choices.find(c => c.isCorrect);
      const isRight = selected.isCorrect;
      return `
        <div class="report-scenario ${isRight ? 'report-correct' : selected.points > 0 ? 'report-partial' : 'report-wrong'}">
          <div class="report-scenario-header">
            <span class="report-scenario-num">Scenario ${i + 1}</span>
            <span class="report-scenario-title">${scenario.title}</span>
            <span class="report-scenario-badge">${isRight ? 'Optimal' : selected.points > 0 ? 'Partial' : 'Compromised'}</span>
          </div>
          <div class="report-choice">
            <span class="report-choice-label">Your choice:</span> ${selected.label}
          </div>
          ${!isRight ? `<div class="report-best"><span class="report-choice-label">Best action:</span> ${correct.label}</div>` : ''}
        </div>
      `;
    }).join('');

    return `
      <div class="report-card fade-in">
        <div class="report-header">
          <h1>Your Security Assessment</h1>
          <div class="report-score-circle" style="--score-color: ${rating.color}">
            <svg viewBox="0 0 36 36" class="report-circle-svg">
              <path class="report-circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
              <path class="report-circle-fill" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                stroke-dasharray="${score}, 100" style="stroke: ${rating.color}"/>
            </svg>
            <div class="report-score-text">${score}</div>
          </div>
          <div class="report-rating" style="color: ${rating.color}">${rating.label}</div>
          <p class="report-rating-desc">${rating.description}</p>
        </div>
        <div class="report-details">
          <h2>Scenario Breakdown</h2>
          ${choiceDetails}
        </div>
        <div class="report-key-takeaways">
          <h2>Key Takeaways</h2>
          <div class="takeaway-grid">
            <div class="takeaway-item">
              <div class="takeaway-num">1</div>
              <div class="takeaway-text"><strong>Unexpected MFA = Attack.</strong> Never approve a push you didn't trigger. Deny and report immediately.</div>
            </div>
            <div class="takeaway-item">
              <div class="takeaway-num">2</div>
              <div class="takeaway-text"><strong>Pressure is a weapon.</strong> Repeated pushes and urgent messages are designed to override your judgment.</div>
            </div>
            <div class="takeaway-item">
              <div class="takeaway-num">3</div>
              <div class="takeaway-text"><strong>Verify independently.</strong> Never trust an incoming call or message — contact IT through official channels YOU initiate.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Animate score change
  animateScore(from, to) {
    const el = document.getElementById('score-value');
    const fill = document.getElementById('score-fill');
    if (!el || !fill) return;

    const duration = 800;
    const start = performance.now();
    const diff = to - from;

    function step(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + diff * eased);
      el.textContent = current;
      fill.style.width = current + '%';

      if (to >= 75) fill.className = 'score-fill score-high';
      else if (to >= 40) fill.className = 'score-fill score-mid';
      else fill.className = 'score-fill score-low';

      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  },

  // Timer countdown
  startTimer(seconds, onComplete) {
    const textEl = document.getElementById('timer-text');
    const fillEl = document.getElementById('timer-fill');
    const timerEl = document.getElementById('timer');
    if (!textEl || !fillEl) return null;

    let remaining = seconds;
    const total = seconds;

    const interval = setInterval(() => {
      remaining--;
      textEl.textContent = remaining;
      const pct = (remaining / total) * 100;
      fillEl.style.strokeDasharray = `${pct}, 100`;

      if (remaining <= 10) timerEl.classList.add('timer-urgent');
      if (remaining <= 5) timerEl.classList.add('timer-critical');

      if (remaining <= 0) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 1000);

    return interval;
  },

  // Screen transition
  transition(container, html, direction = 'right') {
    return new Promise(resolve => {
      container.classList.add(`exit-${direction}`);
      setTimeout(() => {
        container.innerHTML = html;
        container.classList.remove(`exit-${direction}`);
        container.classList.add(`enter-${direction}`);
        setTimeout(() => {
          container.classList.remove(`enter-${direction}`);
          resolve();
        }, 400);
      }, 300);
    });
  }
};
