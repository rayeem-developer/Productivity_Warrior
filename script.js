// Comprehensive JavaScript for the Productivity Dashboard
document.addEventListener("DOMContentLoaded", function () {
  // Initialize with current date (Wednesday)
  const today = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDayName = daysOfWeek[today.getDay()];

  // Set current date in header
  document.getElementById("current-date-day").textContent = currentDayName;
  document.getElementById("current-date-full").textContent =
    today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Data structure for the 20-day challenge
  const challengeData = {
    totalDays: 20,
    days: [],
    currentDay: 1, // Start from Day 1
    completedDays: 0,
    sleepHours: 0,
    waterLiters: 0,
    streak: 0,
    achievements: {
      studyMaster: false,
      codingWarrior: false,
      consistencyKing: false,
      wellnessChampion: false,
    },
  };

  // Schedule templates for different day types
  const scheduleTemplates = {
    satMonWed: [
      {
        time: "05:45 – 06:45",
        activity: "Wake up + Namaz + Workout (Muscle and abs)",
        duration: "1h",
        type: "workout",
        completed: false,
      },
      {
        time: "06:45 – 07:00",
        activity: "Fresh + Shower",
        duration: "15m",
        type: "rest",
        completed: false,
      },
      {
        time: "07:00 – 09:00",
        activity: "Study (Hard Subjects)",
        duration: "2h",
        type: "study",
        completed: false,
      },
      {
        time: "09:00 – 09:30",
        activity: "Breakfast",
        duration: "30m",
        type: "rest",
        completed: false,
      },
      {
        time: "09:30 – 10:30",
        activity: "Study (Bio / ICT / English)",
        duration: "1h",
        type: "study",
        completed: false,
      },
      {
        time: "10:30 – 13:00",
        activity: "💻 PC (Web Dev learning)",
        duration: "2.5h",
        type: "coding",
        completed: false,
      },
      {
        time: "13:00 – 14:00",
        activity: "Lunch + rest",
        duration: "1h",
        type: "rest",
        completed: false,
      },
      {
        time: "14:00 – 16:00",
        activity: "Study (Revision / MCQ)",
        duration: "1.5h",
        type: "study",
        completed: false,
      },
      {
        time: "15:30 – 16:15",
        activity: "Light rest / prep",
        duration: "45m",
        type: "rest",
        completed: false,
      },
      {
        time: "16:30 – 18:00",
        activity: "🎓 Coaching",
        duration: "1.5h",
        type: "coaching",
        completed: false,
      },
      {
        time: "18:30 – 20:00",
        activity: "💻 PC (Project / Freelance)",
        duration: "1.5h",
        type: "coding",
        completed: false,
      },
      {
        time: "20:00 – 21:30",
        activity: "💻 PC (Extra / practice)",
        duration: "1.5h",
        type: "coding",
        completed: false,
      },
    ],
    sunTueThu: [
      {
        time: "05:45 – 06:45",
        activity: "Wake up + Namaz + Workout (Muscle and abs)",
        duration: "1h",
        type: "workout",
        completed: false,
      },
      {
        time: "06:45 – 07:00",
        activity: "Fresh + Shower",
        duration: "15m",
        type: "rest",
        completed: false,
      },
      {
        time: "07:00 – 09:00",
        activity: "Study (Hard subjects)",
        duration: "2h",
        type: "study",
        completed: false,
      },
      {
        time: "09:00 – 09:30",
        activity: "Breakfast",
        duration: "30m",
        type: "rest",
        completed: false,
      },
      {
        time: "09:30 – 12:00",
        activity: "💻 PC (Web Dev learning)",
        duration: "2.5h",
        type: "coding",
        completed: false,
      },
      {
        time: "12:30 – 14:30",
        activity: "🎓 Coaching",
        duration: "2h",
        type: "coaching",
        completed: false,
      },
      {
        time: "14:30 – 15:30",
        activity: "Lunch + rest",
        duration: "1h",
        type: "rest",
        completed: false,
      },
      {
        time: "15:30 – 17:30",
        activity: "Study",
        duration: "2h",
        type: "study",
        completed: false,
      },
      {
        time: "17:30 – 20:00",
        activity: "💻 PC (Project / Freelance)",
        duration: "2.5h",
        type: "coding",
        completed: false,
      },
      {
        time: "20:00 – 21:30",
        activity: "Study",
        duration: "1.5h",
        type: "study",
        completed: false,
      },
    ],
    friday: [
      {
        time: "05:45 – 06:45",
        activity: "Wake up + Namaz + Workout (Muscle and abs)",
        duration: "1h",
        type: "workout",
        completed: false,
      },
      {
        time: "06:45 – 07:00",
        activity: "Fresh + Shower",
        duration: "15m",
        type: "rest",
        completed: false,
      },
      {
        time: "07:00 – 08:30",
        activity: "Study | then rest",
        duration: "1.5h",
        type: "study",
        completed: false,
      },
      {
        time: "09:00 – 11:00",
        activity: "💻 PC (Learning)",
        duration: "2h",
        type: "coding",
        completed: false,
      },
      {
        time: "11:00 – 12:00",
        activity: "Light Study",
        duration: "1h",
        type: "study",
        completed: false,
      },
      {
        time: "12:00 – 14:00",
        activity: "🕌 Jumma + rest",
        duration: "2h",
        type: "prayer",
        completed: false,
      },
      {
        time: "14:00 – 16:00",
        activity: "Study (Weekly revision)",
        duration: "2h",
        type: "study",
        completed: false,
      },
      {
        time: "16:00 – 18:00",
        activity: "💻 PC (Project work)",
        duration: "2h",
        type: "coding",
        completed: false,
      },
      {
        time: "18:00 – 19:30",
        activity: "Study | then rest",
        duration: "1.5h",
        type: "study",
        completed: false,
      },
      {
        time: "20:00 – 21:30",
        activity: "💻 PC (Extra / planning)",
        duration: "1.5h",
        type: "coding",
        completed: false,
      },
    ],
  };

  // Motivational quotes
  const motivationalQuotes = [
    {
      text: "The secret of getting ahead is getting started.",
      author: "Mark Twain",
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      text: "Your future is created by what you do today, not tomorrow.",
      author: "Robert Kiyosaki",
    },
    {
      text: "Consistency is what transforms average into excellence.",
      author: "Unknown",
    },
    {
      text: "Dreams don't work unless you do.",
      author: "John C. Maxwell",
    },
    {
      text: "Push yourself because no one else is going to do it for you.",
      author: "Unknown",
    },
    {
      text: "Small daily improvements are the key to staggering long-term results.",
      author: "Unknown",
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    { text: "Strive for progress, not perfection.", author: "Unknown" },
    {
      text: "The harder you work for something, the greater you'll feel when you achieve it.",
      author: "Unknown",
    },
    {
      text: "Wake up with determination. Go to bed with satisfaction.",
      author: "Unknown",
    },
    {
      text: "Success is the sum of small efforts, repeated day in and day out.",
      author: "Robert Collier",
    },
    {
      text: "It's not about perfect. It's about effort.",
      author: "Jillian Michaels",
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
    },
  ];

  // Initialize the application
  function init() {
    // Load saved data from localStorage
    loadSavedData();

    // Initialize days if not already loaded
    if (challengeData.days.length === 0) {
      initializeDays();
    }

    // Set up event listeners
    setupEventListeners();

    // Display initial data
    updateDisplay();

    // Show a random motivational quote
    showRandomQuote();

    // Update the day select dropdown
    updateDaySelect();

    // Update wellness progress
    updateWellnessProgress();

    // Calculate and update streak
    updateStreak();

    // Update achievements
    updateAchievements();
  }

  // Initialize the 20 days with appropriate schedules
  function initializeDays() {
    challengeData.days = [];

    // Day types pattern starting from Wednesday
    const dayPattern = ["wed", "thu", "fri", "sat", "sun", "mon", "tue"];
    const dayNames = [
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
    ];

    for (let i = 0; i < challengeData.totalDays; i++) {
      const dayIndex = i % 7;
      const dayType = dayPattern[dayIndex];
      const dayName = dayNames[dayIndex];

      let schedule = [];
      let studyHours = 0;
      let codingHours = 0;

      // Get schedule based on day type
      switch (dayType) {
        case "wed":
        case "sat":
        case "mon":
          schedule = JSON.parse(JSON.stringify(scheduleTemplates.satMonWed));
          studyHours = 4.5; // 2h + 1h + 1.5h
          codingHours = 5.5; // 2.5h + 1.5h + 1.5h
          break;
        case "thu":
        case "sun":
        case "tue":
          schedule = JSON.parse(JSON.stringify(scheduleTemplates.sunTueThu));
          studyHours = 5.5; // 2h + 2h + 1.5h
          codingHours = 5; // 2.5h + 2.5h
          break;
        case "fri":
          schedule = JSON.parse(JSON.stringify(scheduleTemplates.friday));
          studyHours = 4.5; // 1.5h + 1h + 2h
          codingHours = 5.5; // 2h + 2h + 1.5h
          break;
      }

      challengeData.days.push({
        dayNumber: i + 1,
        dayName: dayName,
        dayType: dayType,
        schedule: schedule,
        completed: false,
        studyHours: studyHours,
        codingHours: codingHours,
        workouts: 1, // Each day has 1 workout
        prayers: 5, // Each day has 5 prayers
      });
    }
  }

  // Load saved data from localStorage
  function loadSavedData() {
    const savedData = localStorage.getItem("productivityChallengeSoft");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);

        // Merge saved data with current challengeData
        Object.assign(challengeData, parsedData);

        // Ensure days array exists and has the right structure
        if (
          !challengeData.days ||
          challengeData.days.length !== challengeData.totalDays
        ) {
          // If days data is corrupted, reinitialize
          initializeDays();
        }

        console.log("Data loaded from localStorage");
      } catch (e) {
        console.error("Error loading saved data:", e);
        // If there's an error, initialize fresh data
        initializeDays();
      }
    } else {
      console.log("No saved data found, initializing fresh");
    }
  }

  // Save data to localStorage
  function saveData() {
    try {
      localStorage.setItem(
        "productivityChallengeSoft",
        JSON.stringify(challengeData)
      );
      console.log("Data saved to localStorage");
    } catch (e) {
      console.error("Error saving data:", e);
    }
  }

  // Set up event listeners
  function setupEventListeners() {
    // Previous day button
    document.getElementById("prev-day").addEventListener("click", () => {
      if (challengeData.currentDay > 1) {
        challengeData.currentDay--;
        updateDisplay();
        saveData();
      }
    });

    // Next day button
    document.getElementById("next-day").addEventListener("click", () => {
      if (challengeData.currentDay < challengeData.totalDays) {
        challengeData.currentDay++;
        updateDisplay();
        saveData();
      }
    });

    // Day select dropdown
    document.getElementById("day-select").addEventListener("change", (e) => {
      challengeData.currentDay = parseInt(e.target.value);
      updateDisplay();
      saveData();
    });

    // Mark day as completed button
    document
      .getElementById("mark-day-complete")
      .addEventListener("click", markDayAsCompleted);

    // Reset day button
    document
      .getElementById("reset-day")
      .addEventListener("click", resetCurrentDay);

    // New quote button
    document
      .getElementById("new-quote-btn")
      .addEventListener("click", showRandomQuote);

    // Reset all progress button
    document
      .getElementById("reset-all-btn")
      .addEventListener("click", resetAllProgress);

    // Modal close button
    document
      .getElementById("modal-close-btn")
      .addEventListener("click", closeModal);

    // Sleep tracker buttons
    document
      .getElementById("sleep-add-1")
      .addEventListener("click", () => updateSleep(1));
    document
      .getElementById("sleep-add-2")
      .addEventListener("click", () => updateSleep(2));
    document
      .getElementById("sleep-reset")
      .addEventListener("click", () => updateSleep(0, true));

    // Water tracker buttons
    document
      .getElementById("water-add-250")
      .addEventListener("click", () => updateWater(0.25));
    document
      .getElementById("water-add-500")
      .addEventListener("click", () => updateWater(0.5));
    document
      .getElementById("water-reset")
      .addEventListener("click", () => updateWater(0, true));
  }

  // Update the display with current data
  function updateDisplay() {
    // Update current day display
    document.getElementById("day-number").textContent =
      challengeData.currentDay;
    document.getElementById("current-day-num").textContent =
      challengeData.currentDay;

    // Get current day data
    const currentDayData = challengeData.days[challengeData.currentDay - 1];

    // Update day name and type
    document.getElementById("current-day-name").textContent =
      currentDayData.dayName;

    let dayTypeText = "";
    switch (currentDayData.dayType) {
      case "wed":
      case "sat":
      case "mon":
        dayTypeText = "SAT / MON / WED Schedule";
        break;
      case "thu":
      case "sun":
      case "tue":
        dayTypeText = "SUN / TUE / THU Schedule";
        break;
      case "fri":
        dayTypeText = "FRIDAY Schedule (Jumma Day)";
        break;
    }
    document.getElementById("day-type-badge").textContent = dayTypeText;

    // Update schedule display with checkboxes
    renderSchedule(currentDayData.schedule);

    // Update day stats
    updateDayStats(currentDayData);

    // Update mark day button based on completion status
    const markDayBtn = document.getElementById("mark-day-complete");
    if (currentDayData.completed) {
      markDayBtn.innerHTML =
        '<i class="fas fa-check-circle"></i> Day Completed!';
      markDayBtn.style.background = "linear-gradient(135deg, #4ade80, #22c55e)";
    } else {
      markDayBtn.innerHTML =
        '<i class="fas fa-check-circle"></i> Mark Day as Complete';
      markDayBtn.style.background =
        "linear-gradient(135deg, var(--success-color), #4ade80)";
    }

    // Update overall stats
    updateTotals();

    // Update navigation buttons state
    document.getElementById("prev-day").disabled =
      challengeData.currentDay === 1;
    document.getElementById("next-day").disabled =
      challengeData.currentDay === challengeData.totalDays;
  }

  // Render the schedule for a day with checkboxes
  function renderSchedule(schedule) {
    const scheduleContainer = document.getElementById("schedule-container");
    scheduleContainer.innerHTML = "";

    schedule.forEach((item, index) => {
      const scheduleItem = document.createElement("div");
      scheduleItem.className = `schedule-item ${item.type} ${
        item.completed ? "completed" : ""
      }`;

      scheduleItem.innerHTML = `
                        <div class="task-checkbox">
                            <input type="checkbox" id="task-${index}" class="checkbox-input" ${
        item.completed ? "checked" : ""
      }>
                            <label for="task-${index}" class="checkbox-label"></label>
                        </div>
                        <div class="task-time">${item.time}</div>
                        <div class="task-details">
                            <div class="task-title">${item.activity}</div>
                            <div class="task-description">${
                              item.type.charAt(0).toUpperCase() +
                              item.type.slice(1)
                            } Activity</div>
                        </div>
                        <div class="task-duration">${item.duration}</div>
                    `;

      // Add event listener to checkbox
      const checkbox = scheduleItem.querySelector(".checkbox-input");
      checkbox.addEventListener("change", () => {
        item.completed = checkbox.checked;

        // Update the schedule item class
        if (checkbox.checked) {
          scheduleItem.classList.add("completed");

          // Add completion animation
          scheduleItem.style.transform = "scale(1.02)";
          setTimeout(() => {
            scheduleItem.style.transform = "";
          }, 300);

          // Check if all tasks are completed
          checkAllTasksCompleted();
        } else {
          scheduleItem.classList.remove("completed");
        }

        // Update day stats
        const currentDayData = challengeData.days[challengeData.currentDay - 1];
        updateDayStats(currentDayData);

        // Save data
        saveData();
      });

      scheduleContainer.appendChild(scheduleItem);
    });
  }

  // Update day statistics
  function updateDayStats(dayData) {
    // Calculate completed tasks
    const completedTasks = dayData.schedule.filter(
      (task) => task.completed
    ).length;
    const totalTasks = dayData.schedule.length;
    const completionPercentage = Math.round(
      (completedTasks / totalTasks) * 100
    );

    // Update stats display
    let studyHours = 0;
    let codingHours = 0;
    let workoutCount = 0;

    dayData.schedule.forEach((task) => {
      if (task.completed) {
        if (task.type === "study") {
          studyHours += parseFloat(task.duration);
        } else if (task.type === "coding") {
          codingHours += parseFloat(task.duration);
        } else if (task.type === "workout") {
          workoutCount++;
        }
      }
    });

    document.getElementById("stat-study").textContent =
      studyHours.toFixed(1) + "h";
    document.getElementById("stat-coding").textContent =
      codingHours.toFixed(1) + "h";
    document.getElementById("stat-workout").textContent = workoutCount;

    // Update achievements if applicable
    if (studyHours >= 5 && !challengeData.achievements.studyMaster) {
      challengeData.achievements.studyMaster = true;
      unlockAchievement(1, "Study Master!");
    }

    if (codingHours >= 10 && !challengeData.achievements.codingWarrior) {
      challengeData.achievements.codingWarrior = true;
      unlockAchievement(2, "Coding Warrior!");
    }
  }

  // Update overall totals
  function updateTotals() {
    challengeData.completedDays = challengeData.days.filter(
      (day) => day.completed
    ).length;

    // Calculate streak
    updateStreak();

    // Update achievements
    updateAchievements();
  }

  // Update the day select dropdown
  function updateDaySelect() {
    const daySelect = document.getElementById("day-select");
    daySelect.innerHTML = "";

    for (let i = 1; i <= challengeData.totalDays; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Day ${i}: ${challengeData.days[i - 1].dayName}`;

      if (challengeData.days[i - 1].completed) {
        option.textContent += " ✓";
      }

      daySelect.appendChild(option);
    }

    daySelect.value = challengeData.currentDay;
  }

  // Update sleep progress
  function updateSleep(hours, reset = false) {
    if (reset) {
      challengeData.sleepHours = 0;
    } else {
      challengeData.sleepHours += hours;

      // Cap at 10 hours max
      if (challengeData.sleepHours > 10) challengeData.sleepHours = 10;
    }

    updateWellnessProgress();
    saveData();

    // Check if sleep goal is met
    if (
      challengeData.sleepHours >= 6 &&
      !challengeData.achievements.wellnessChampion
    ) {
      challengeData.achievements.wellnessChampion = true;
      showNotification("Sleep goal achieved! You're a Wellness Champion!");
    }
  }

  // Update water progress
  function updateWater(liters, reset = false) {
    if (reset) {
      challengeData.waterLiters = 0;
    } else {
      challengeData.waterLiters += liters;

      // Cap at 4 liters max
      if (challengeData.waterLiters > 4) challengeData.waterLiters = 4;
    }

    updateWellnessProgress();
    saveData();
  }

  // Update wellness progress bars
  function updateWellnessProgress() {
    // Sleep progress
    const sleepPercentage = Math.min((challengeData.sleepHours / 6) * 100, 100);
    document.getElementById("sleep-progress").style.width =
      sleepPercentage + "%";
    document.getElementById("sleep-current").textContent =
      challengeData.sleepHours.toFixed(1) + " hours";

    // Water progress
    const waterPercentage = Math.min(
      (challengeData.waterLiters / 3) * 100,
      100
    );
    document.getElementById("water-progress").style.width =
      waterPercentage + "%";
    document.getElementById("water-current").textContent =
      challengeData.waterLiters.toFixed(2) + " liters";
  }

  // Update streak counter
  function updateStreak() {
    // Calculate current streak (consecutive completed days from most recent)
    let streak = 0;
    for (let i = challengeData.days.length - 1; i >= 0; i--) {
      if (challengeData.days[i].completed) {
        streak++;
      } else {
        break;
      }
    }

    challengeData.streak = streak;
    document.getElementById("streak-count").textContent = streak;
    document.getElementById("streak-days").textContent =
      streak === 1 ? "day in a row!" : "days in a row!";

    // Update streak visualization
    const streakVisual = document.getElementById("streak-visual");
    streakVisual.innerHTML = "";

    // Show last 7 days of streak
    const startIdx = Math.max(0, challengeData.days.length - 7);
    for (let i = startIdx; i < challengeData.days.length; i++) {
      const dayElement = document.createElement("div");
      dayElement.className = `streak-day ${
        challengeData.days[i].completed ? "active" : ""
      }`;
      dayElement.textContent = i + 1;
      dayElement.title = `Day ${i + 1}: ${
        challengeData.days[i].completed ? "Completed" : "Not completed"
      }`;
      streakVisual.appendChild(dayElement);
    }

    // Check for consistency achievement
    if (streak >= 7 && !challengeData.achievements.consistencyKing) {
      challengeData.achievements.consistencyKing = true;
      unlockAchievement(3, "Consistency King! 7-day streak!");
    }
  }

  // Update achievements display
  function updateAchievements() {
    // Study Master
    const achievement1 = document.getElementById("achievement-1");
    if (challengeData.achievements.studyMaster) {
      achievement1.classList.remove("locked");
      achievement1.querySelector(".badge-icon").innerHTML =
        '<i class="fas fa-crown"></i>';
      achievement1.querySelector("h4").innerHTML =
        'Study Master <i class="fas fa-check" style="color: var(--success-color);"></i>';
    }

    // Coding Warrior
    const achievement2 = document.getElementById("achievement-2");
    if (challengeData.achievements.codingWarrior) {
      achievement2.classList.remove("locked");
      achievement2.querySelector(".badge-icon").innerHTML =
        '<i class="fas fa-crown"></i>';
      achievement2.querySelector("h4").innerHTML =
        'Coding Warrior <i class="fas fa-check" style="color: var(--success-color);"></i>';
    }
  }

  // Unlock an achievement with animation
  function unlockAchievement(achievementNum, message) {
    const achievement = document.getElementById(
      `achievement-${achievementNum}`
    );

    // Add unlock animation
    achievement.style.transform = "scale(1.1)";
    achievement.style.boxShadow = "0 10px 30px rgba(255, 107, 139, 0.4)";

    setTimeout(() => {
      achievement.style.transform = "";
      achievement.style.boxShadow = "";
    }, 500);

    // Show notification
    showNotification(`Achievement Unlocked: ${message}`);
  }

  // Show notification
  function showNotification(message) {
    // Create notification element
    const notification = document.createElement("div");
    notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, var(--primary-pink), var(--accent-purple));
                    color: white;
                    padding: 15px 25px;
                    border-radius: var(--border-radius);
                    box-shadow: var(--shadow-hover);
                    z-index: 1000;
                    animation: slideIn 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
                    font-weight: 600;
                `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after animation
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);

    // Add CSS for animations
    const style = document.createElement("style");
    style.textContent = `
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes fadeOut {
                        from { opacity: 1; }
                        to { opacity: 0; }
                    }
                `;
    document.head.appendChild(style);
  }

  // Check if all tasks are completed
  function checkAllTasksCompleted() {
    const currentDayData = challengeData.days[challengeData.currentDay - 1];
    const allCompleted = currentDayData.schedule.every(
      (task) => task.completed
    );

    if (allCompleted && !currentDayData.completed) {
      // Auto-mark day as completed if all tasks are done
      currentDayData.completed = true;

      // Show celebration
      showCompletionModal();

      // Update display
      updateDisplay();

      // Save data
      saveData();
    }
  }

  // Mark the current day as completed
  function markDayAsCompleted() {
    const currentDayData = challengeData.days[challengeData.currentDay - 1];

    if (!currentDayData.completed) {
      // Mark all tasks as completed
      currentDayData.schedule.forEach((task) => {
        task.completed = true;
      });

      currentDayData.completed = true;

      // Update totals
      updateTotals();

      // Update display
      updateDisplay();

      // Save data
      saveData();

      // Show celebration modal
      showCompletionModal();
    }
  }

  // Reset the current day to not completed
  function resetCurrentDay() {
    const currentDayData = challengeData.days[challengeData.currentDay - 1];

    if (currentDayData.completed) {
      // Reset all tasks
      currentDayData.schedule.forEach((task) => {
        task.completed = false;
      });

      currentDayData.completed = false;

      // Update totals
      updateTotals();

      // Update display
      updateDisplay();

      // Save data
      saveData();

      showNotification("Day reset successfully. You can start fresh!");
    }
  }

  // Reset all progress
  function resetAllProgress() {
    if (
      confirm(
        "Are you sure you want to reset all progress? This will clear all your achievements and completed days."
      )
    ) {
      // Reset all days
      challengeData.days.forEach((day) => {
        day.completed = false;
        day.schedule.forEach((task) => {
          task.completed = false;
        });
      });

      // Reset wellness stats
      challengeData.sleepHours = 0;
      challengeData.waterLiters = 0;
      challengeData.streak = 0;

      // Reset achievements
      challengeData.achievements = {
        studyMaster: false,
        codingWarrior: false,
        consistencyKing: false,
        wellnessChampion: false,
      };

      // Reset current day to 1
      challengeData.currentDay = 1;

      // Update display
      updateDisplay();
      updateWellnessProgress();
      updateAchievements();

      // Save data
      saveData();

      showNotification("All progress has been reset. Fresh start!");
    }
  }

  // Show a random motivational quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    const quote = motivationalQuotes[randomIndex];

    document.getElementById("daily-quote").textContent = `"${quote.text}"`;
    document.querySelector(".quote-author").textContent = `- ${quote.author}`;

    // Add a fade effect
    const quoteElement = document.getElementById("daily-quote");
    quoteElement.style.opacity = "0";
    setTimeout(() => {
      quoteElement.style.transition = "opacity 0.5s ease";
      quoteElement.style.opacity = "1";
    }, 10);
  }

  // Show the completion modal
  function showCompletionModal() {
    const modal = document.getElementById("celebration-modal");
    const modalMessage = document.getElementById("modal-message");

    // Custom message based on day
    const messages = [
      `Excellent work on completing Day ${challengeData.currentDay}! You're one step closer to your goals!`,
      `Day ${challengeData.currentDay} conquered! Your consistency is inspiring!`,
      `Amazing! Day ${challengeData.currentDay} is now in your achievement list!`,
      `You nailed Day ${challengeData.currentDay}! Keep this momentum going!`,
      `Day ${challengeData.currentDay} completed successfully! You're building incredible habits!`,
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    modalMessage.textContent = randomMessage;

    // Show the modal with animation
    modal.style.display = "flex";

    // Add confetti effect
    createConfetti();
  }

  // Close the modal
  function closeModal() {
    const modal = document.getElementById("celebration-modal");
    modal.style.display = "none";
  }

  // Create a beautiful confetti effect for celebration
  function createConfetti() {
    const colors = [
      "#ff6b8b",
      "#c77dff",
      "#80ffdb",
      "#ffafcc",
      "#a78bfa",
      "#7dd3fc",
    ];
    const container = document.querySelector(".container");

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.width = "15px";
      confetti.style.height = "15px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.top = "50%";
      confetti.style.left = "50%";
      confetti.style.opacity = "0.9";
      confetti.style.zIndex = "9999";
      confetti.style.pointerEvents = "none";

      // Random animation
      const angle = Math.random() * Math.PI * 2;
      const velocity = 3 + Math.random() * 4;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      let x = 50;
      let y = 50;

      confetti.style.transform = `translate(${x}vw, ${y}vh) rotate(0deg)`;

      container.appendChild(confetti);

      // Animate the confetti
      let animationId;
      const animateConfetti = () => {
        x += vx;
        y += vy;
        vy += 0.15; // gravity

        confetti.style.transform = `translate(${x}vw, ${y}vh) rotate(${x}deg)`;
        confetti.style.opacity = parseFloat(confetti.style.opacity) - 0.01;

        if (parseFloat(confetti.style.opacity) > 0 && y < 150) {
          animationId = requestAnimationFrame(animateConfetti);
        } else {
          cancelAnimationFrame(animationId);
          confetti.remove();
        }
      };

      animateConfetti();
    }
  }

  // Initialize the app
  init();

  // Add some initial confetti for a welcoming effect
  setTimeout(() => {
    createConfetti();
  }, 1000);
});
