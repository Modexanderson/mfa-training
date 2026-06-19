// MFA Under Siege — Main Game Logic

const Game = {
  state: {
    currentScenario: 0,
    score: 50,
    choices: [],
    timerInterval: null,
    started: false,
    transitioning: false
  },

  container: null,

  init() {
    this.container = document.getElementById('app');
    this.showLanding();
  },

  showLanding() {
    this.container.innerHTML = `
      <div class="landing">
        <div class="landing-bg">
          <div class="grid-lines"></div>
        </div>
        <div class="landing-content">
          <div class="landing-badge">Interactive Security Training</div>
          <h1 class="landing-title">
            <span class="title-mfa">MFA</span>
            <span class="title-under">Under Siege</span>
          </h1>
          <p class="landing-desc">
            You're <strong>Alex</strong>, an employee at a tech company. Over the course of one workday,
            you'll face <strong>3 real-world MFA attack scenarios</strong> — each based on actual breaches
            at companies like Uber, Twilio, and Cisco.
          </p>
          <div class="landing-features">
            <div class="feature">
              <div class="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div class="feature-text">3 Escalating Scenarios</div>
            </div>
            <div class="feature">
              <div class="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div class="feature-text">Timed Decisions</div>
            </div>
            <div class="feature">
              <div class="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <div class="feature-text">Real Breach Case Studies</div>
            </div>
          </div>
          <button class="btn-start" id="btn-start">
            Begin Training
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <div class="landing-time">Estimated time: 5–8 minutes</div>
        </div>
      </div>
    `;

    document.getElementById('btn-start').addEventListener('click', () => {
      this.state.started = true;
      this.showScenario(0);
    });
  },

  async showScenario(index) {
    if (this.state.transitioning) return;
    this.state.transitioning = true;
    this.state.currentScenario = index;
    const scenario = SCENARIOS[index];

    // Build scenario-specific mockups
    let mockupHTML = '';
    if (scenario.setup.notification) {
      mockupHTML += UI.createNotification(scenario.setup.notification, index === 1);
    }
    if (scenario.setup.slackMessage) {
      mockupHTML += UI.createSlackMessage(scenario.setup.slackMessage);
    }
    if (scenario.setup.phoneCall) {
      mockupHTML += UI.createPhoneCall(scenario.setup.phoneCall);
    }

    const choicesHTML = scenario.choices.map(c => `
      <button class="choice-btn" data-choice="${c.id}">
        <span class="choice-label">${c.label}</span>
        <span class="choice-subtitle">${c.subtitle}</span>
      </button>
    `).join('');

    const html = `
      <div class="scenario">
        <div class="scenario-top-bar">
          <div class="progress-section">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${((index) / SCENARIOS.length) * 100}%"></div>
            </div>
            <span class="progress-label">Scenario ${index + 1} of ${SCENARIOS.length}</span>
          </div>
          ${UI.createScoreDisplay(this.state.score)}
          ${UI.createTimer(scenario.timerSeconds)}
        </div>

        <div class="scenario-header">
          <div class="scenario-meta">
            <span class="scenario-time">${scenario.setup.time}</span>
            <span class="scenario-divider">|</span>
            <span class="scenario-location">${scenario.setup.location}</span>
            <span class="scenario-difficulty difficulty-${scenario.difficulty.toLowerCase()}">${scenario.difficulty}</span>
          </div>
          <h1 class="scenario-title">${scenario.title}</h1>
        </div>

        <div class="scenario-body">
          <div class="narrative">
            <p>${scenario.setup.narrative}</p>
            <p>${scenario.setup.detail}</p>
          </div>

          <div class="mockups">
            ${mockupHTML}
          </div>
        </div>

        <div class="scenario-decision">
          <h2 class="decision-question">${scenario.question}</h2>
          <div class="choices" id="choices">
            ${choicesHTML}
          </div>
        </div>
      </div>
    `;

    await UI.transition(this.container, html);

    // Start timer
    this.state.timerInterval = UI.startTimer(scenario.timerSeconds, () => {
      this.handleTimeout(scenario);
    });

    // Wire up choice buttons
    document.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.state.transitioning) return;
        const choiceId = btn.dataset.choice;
        this.handleChoice(scenario, choiceId);
      });
    });

    this.state.transitioning = false;
  },

  handleTimeout(scenario) {
    // On timeout, auto-select the worst choice
    const worst = scenario.choices.reduce((a, b) => a.points < b.points ? a : b);
    this.handleChoice(scenario, worst.id, true);
  },

  async handleChoice(scenario, choiceId, timedOut = false) {
    if (this.state.transitioning) return;
    this.state.transitioning = true;

    // Stop timer
    if (this.state.timerInterval) {
      clearInterval(this.state.timerInterval);
      this.state.timerInterval = null;
    }

    const choice = scenario.choices.find(c => c.id === choiceId);
    this.state.choices.push(choiceId);

    // Highlight selected choice
    document.querySelectorAll('.choice-btn').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.choice === choiceId) {
        btn.classList.add('selected');
      }
    });

    // Update score
    const oldScore = this.state.score;
    this.state.score = Math.max(0, Math.min(100, this.state.score + choice.points));

    await new Promise(r => setTimeout(r, 600));

    // Show consequence
    const html = `
      <div class="consequence-screen">
        <div class="scenario-top-bar">
          <div class="progress-section">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${((this.state.currentScenario + 1) / SCENARIOS.length) * 100}%"></div>
            </div>
            <span class="progress-label">Scenario ${this.state.currentScenario + 1} of ${SCENARIOS.length}</span>
          </div>
          ${UI.createScoreDisplay(this.state.score)}
        </div>
        ${timedOut ? '<div class="timeout-banner">Time\'s up! Under pressure, hesitation defaults to the worst outcome.</div>' : ''}
        ${UI.createConsequence(choice.consequence, choice)}
        ${UI.createBreachCard(scenario.breachCard)}
        <button class="btn-continue" id="btn-continue">
          ${this.state.currentScenario < SCENARIOS.length - 1 ? 'Next Scenario' : 'View Your Report'}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    `;

    await UI.transition(this.container, html);

    // Animate score
    UI.animateScore(oldScore, this.state.score);

    document.getElementById('btn-continue').addEventListener('click', () => {
      if (this.state.currentScenario < SCENARIOS.length - 1) {
        this.showScenario(this.state.currentScenario + 1);
      } else {
        this.showReport();
      }
    });

    this.state.transitioning = false;
  },

  async showReport() {
    if (this.state.transitioning) return;
    this.state.transitioning = true;

    const html = `
      <div class="report-screen">
        ${UI.createReportCard(this.state.score, this.state.choices, SCENARIOS)}
        <div class="report-actions">
          <button class="btn-restart" id="btn-restart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>
            Try Again
          </button>
          <a class="btn-design-doc" href="design-document.html">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            View Design Document
          </a>
        </div>
        <div class="report-footer">
          <p>Learning & AI Content Designer</p>
        </div>
      </div>
    `;

    await UI.transition(this.container, html);

    document.getElementById('btn-restart').addEventListener('click', () => {
      this.state.score = 50;
      this.state.choices = [];
      this.state.currentScenario = 0;
      this.state.transitioning = false;
      this.showScenario(0);
    });

    this.state.transitioning = false;
  }
};

// Boot
document.addEventListener('DOMContentLoaded', () => Game.init());
