class PratikAcademyApp {
  constructor() {
    this.state = {
      activeView: 'home',
      courses: coursesData || [],
      // Load enrolled courses from localStorage (mock persist)
      enrolledCourses: JSON.parse(localStorage.getItem('pa_enrolled_courses')) || [],
      // Lesson progress structure: { courseId: [lessonTitlesCompleted] }
      courseProgress: JSON.parse(localStorage.getItem('pa_course_progress')) || {},
      selectedCourse: null,
      selectedClassroomCourse: null,
      currentLessonIndex: 0,
      
      // Admin dashboard metrics
      revenue: 1854200,
      students: 4870,
      soldCount: 532,
      recentEnrollments: [
        { name: 'Rahul Sharma', course: 'Full-Stack Web Development Mastery', date: '09-Aug-2026', price: 3499 },
        { name: 'Priya Patel', course: 'AI & Data Science Professional Boot Camp', date: '08-Aug-2026', price: 3999 },
        { name: 'Anil Kumar', course: 'DevOps & Cloud Infrastructure Engineer', date: '06-Aug-2026', price: 4299 },
        { name: 'Sneha Gupta', course: 'Python Automation & Scripting Specialist', date: '05-Aug-2026', price: 2499 }
      ]
    };
    
    // Canvas animation property for mock video
    this.animationFrameId = null;
    this.canvasContext = null;
    this.canvasElement = null;
    this.isVideoPlaying = false;

    this.init();
  }

  init() {
    // Render featured courses on landing page
    this.renderFeaturedCourses();
    
    // Render the course catalog
    this.renderCatalog();
    
    // Set up responsive navbar mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active-menu');
      if (navMenu.classList.contains('active-menu')) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '80px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'rgba(7, 9, 19, 0.95)';
        navMenu.style.padding = '20px';
        navMenu.style.borderBottom = '1px solid var(--border-glass)';
      } else {
        navMenu.removeAttribute('style');
      }
    });

    // Handle initial routing navigation
    this.navigateTo(this.state.activeView);
    
    // Initialize admin dashboard
    this.updateAdminDashboardUI();
  }

  // SPA Route management
  navigateTo(viewId) {
    this.state.activeView = viewId;
    
    // Update active navbar links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    const activeLink = document.getElementById(`nav-link-${viewId}`);
    if (activeLink) activeLink.classList.add('active');

    // Hide all views, display targeted view
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active-view');
      view.style.display = 'none';
    });
    
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
      targetView.style.display = 'block';
      setTimeout(() => {
        targetView.classList.add('active-view');
      }, 50);
    }
    
    // Special setup for specific screens
    if (viewId === 'dashboard') {
      this.renderDashboard();
    } else {
      this.stopCanvasVideo();
    }

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    if (navMenu && navMenu.classList.contains('active-menu')) {
      navMenu.classList.remove('active-menu');
      navMenu.removeAttribute('style');
    }
  }

  // Render first 3 courses on home landing page
  renderFeaturedCourses() {
    const featuredGrid = document.getElementById('featured-courses-grid');
    if (!featuredGrid) return;
    
    featuredGrid.innerHTML = '';
    const featured = this.state.courses.slice(0, 3);
    
    featured.forEach(course => {
      featuredGrid.appendChild(this.createCourseCard(course));
    });
  }

  // Render all courses inside Catalog page
  renderCatalog() {
    const catalogGrid = document.getElementById('catalog-courses-grid');
    if (!catalogGrid) return;
    
    catalogGrid.innerHTML = '';
    this.state.courses.forEach(course => {
      catalogGrid.appendChild(this.createCourseCard(course));
    });
  }

  // Create course card elements
  createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'glass-panel course-card';
    card.setAttribute('data-id', course.id);
    
    // Setup decorative emoji/character representation of courses
    let graphic = '💻';
    if (course.category === 'data-science') graphic = '📊';
    if (course.category === 'devops') graphic = '🛡️';
    if (course.category === 'programming') graphic = '🐍';

    const isEnrolled = this.state.enrolledCourses.includes(course.id);
    const badgeText = isEnrolled ? 'Enrolled' : course.category;

    card.innerHTML = `
      <div class="course-card-image">
        <span class="course-badge" style="${isEnrolled ? 'background-color: var(--success); color: #fff;' : ''}">${badgeText}</span>
        <div class="course-card-graphic">${graphic}</div>
      </div>
      <div class="course-card-content">
        <div class="course-meta-top">
          <span class="course-rating">⭐ ${course.rating}</span>
          <span>${course.studentsEnrolled} students</span>
        </div>
        <h3>${course.title}</h3>
        <p>${course.shortDescription}</p>
        <div class="course-skills-list">
          ${course.skills.slice(0, 3).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        <div class="course-card-footer">
          <div class="course-price">
            <span class="price-old">₹${course.price.toLocaleString('en-IN')}</span>
            <span class="price-new">₹${course.discountPrice.toLocaleString('en-IN')}</span>
          </div>
          <button class="btn btn-secondary" onclick="event.stopPropagation(); app.openDrawer('${course.id}')">View Details</button>
        </div>
      </div>
    `;

    card.addEventListener('click', () => this.openDrawer(course.id));
    return card;
  }

  // Filtering course catalog
  filterCourses(category) {
    // Update active filter button styling
    const filterContainer = document.getElementById('filter-categories');
    if (filterContainer) {
      filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase().includes(category.replace('-', ' ').substring(0, 5))) {
          btn.classList.add('active');
        }
      });
    }

    const catalogGrid = document.getElementById('catalog-courses-grid');
    if (!catalogGrid) return;
    
    catalogGrid.innerHTML = '';
    const filtered = category === 'all' 
      ? this.state.courses 
      : this.state.courses.filter(c => c.category === category);
      
    filtered.forEach(course => {
      catalogGrid.appendChild(this.createCourseCard(course));
    });
  }

  // Course Search functionality
  searchCourses(query) {
    const catalogGrid = document.getElementById('catalog-courses-grid');
    if (!catalogGrid) return;
    
    catalogGrid.innerHTML = '';
    const q = query.toLowerCase();
    const filtered = this.state.courses.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.shortDescription.toLowerCase().includes(q) || 
      c.skills.some(s => s.toLowerCase().includes(q))
    );

    filtered.forEach(course => {
      catalogGrid.appendChild(this.createCourseCard(course));
    });
  }

  // Drawer slider controller
  openDrawer(courseId) {
    const course = this.state.courses.find(c => c.id === courseId);
    if (!course) return;

    this.state.selectedCourse = course;

    // Fill drawer content details
    document.getElementById('drawer-course-title').innerText = course.category.toUpperCase();
    document.getElementById('drawer-course-full-title').innerText = course.title;
    document.getElementById('drawer-description').innerText = course.description;
    
    let graphic = '💻';
    if (course.category === 'data-science') graphic = '📊';
    if (course.category === 'devops') graphic = '🛡️';
    if (course.category === 'programming') graphic = '🐍';
    document.getElementById('drawer-graphic').innerText = graphic;

    document.getElementById('drawer-rating').innerText = course.rating;
    document.getElementById('drawer-duration').innerText = course.duration;
    document.getElementById('drawer-lectures').innerText = `${course.lecturesCount} Lectures`;
    document.getElementById('drawer-level').innerText = course.level;
    
    document.getElementById('drawer-price-old').innerText = `₹${course.price.toLocaleString('en-IN')}`;
    document.getElementById('drawer-price-new').innerText = `₹${course.discountPrice.toLocaleString('en-IN')}`;

    // Fill skills tag list
    const skillsList = document.getElementById('drawer-skills-list');
    skillsList.innerHTML = course.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');

    // Fill syllabus accordions
    const accordionsContainer = document.getElementById('drawer-curriculum-accordions');
    accordionsContainer.innerHTML = '';
    
    course.syllabus.forEach((module, idx) => {
      const accordion = document.createElement('div');
      accordion.className = 'accordion';
      if (idx === 0) accordion.classList.add('active'); // active first chapter by default

      accordion.innerHTML = `
        <div class="accordion-header" onclick="app.toggleAccordion(this.parentElement)">
          <span>${module.chapterTitle}</span>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-content" style="${idx === 0 ? 'max-height: 500px;' : ''}">
          <ul class="lessons-list">
            ${module.lessons.map(lesson => `
              <li class="lesson-item">
                <span>📄 ${lesson.title}</span>
                <span style="font-size: 0.8rem; opacity: 0.7;">${lesson.duration}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
      accordionsContainer.appendChild(accordion);
    });

    // Check enrollment state and adjust bottom enroll button
    const enrollBtn = document.getElementById('drawer-enroll-btn');
    const isEnrolled = this.state.enrolledCourses.includes(course.id);
    
    if (isEnrolled) {
      enrollBtn.innerText = 'Go to Classroom Dashboard';
      enrollBtn.onclick = () => {
        this.closeDrawer();
        this.navigateTo('dashboard');
      };
    } else {
      enrollBtn.innerText = 'Enroll & Pay Now';
      enrollBtn.onclick = () => {
        this.closeDrawer();
        this.openCheckoutModal(course.id);
      };
    }

    // Display overlay and slide-in drawer
    const overlay = document.getElementById('drawer-overlay');
    const container = document.getElementById('drawer-container');
    
    overlay.style.display = 'block';
    setTimeout(() => {
      overlay.style.opacity = '1';
      container.style.right = '0px';
    }, 50);
  }

  closeDrawer() {
    const overlay = document.getElementById('drawer-overlay');
    const container = document.getElementById('drawer-container');
    
    container.style.right = '-600px';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 400);
  }

  toggleAccordion(accordionElement) {
    const isActive = accordionElement.classList.contains('active');
    
    // Close siblings if desired (optional accordion functionality)
    const content = accordionElement.querySelector('.accordion-content');
    
    if (isActive) {
      accordionElement.classList.remove('active');
      content.style.maxHeight = null;
    } else {
      accordionElement.classList.add('active');
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  // ==========================================
  // CHECKOUT PORTAL CONTROLLERS
  // ==========================================
  openCheckoutModal(courseId) {
    const course = this.state.courses.find(c => c.id === courseId);
    if (!course) return;

    this.state.selectedCourse = course;

    // Set order summary info
    document.getElementById('checkout-summary-title').innerText = course.title;
    document.getElementById('checkout-summary-price').innerText = `₹${course.discountPrice.toLocaleString('en-IN')}`;

    // Reset views inside modal
    document.getElementById('checkout-form-view').style.display = 'grid';
    document.getElementById('checkout-success-view').style.display = 'none';
    document.getElementById('checkout-billing-form').reset();
    this.togglePaymentFields('card'); // default select card input fields

    // Display modal
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 50);
  }

  closeCheckoutModal(redirectToDashboard = false) {
    const modal = document.getElementById('checkout-modal');
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
      if (redirectToDashboard) {
        this.navigateTo('dashboard');
        // Automatically select newly bought course inside classroom
        if (this.state.selectedCourse) {
          this.selectClassroomCourse(this.state.selectedCourse.id);
        }
      }
    }, 300);
  }

  togglePaymentFields(method) {
    const cardInputs = document.getElementById('payment-card-inputs');
    const upiInputs = document.getElementById('payment-upi-inputs');
    
    if (method === 'card') {
      cardInputs.style.display = 'block';
      upiInputs.style.display = 'none';
      
      // Mark card fields required, clean UPI
      cardInputs.querySelectorAll('input').forEach(i => i.setAttribute('required', 'true'));
      upiInputs.querySelectorAll('input').forEach(i => i.removeAttribute('required'));
    } else {
      cardInputs.style.display = 'none';
      upiInputs.style.display = 'block';
      
      // Clean card, mark UPI required
      cardInputs.querySelectorAll('input').forEach(i => i.removeAttribute('required'));
      upiInputs.querySelectorAll('input').forEach(i => i.setAttribute('required', 'true'));
    }
  }

  processCheckout(event) {
    event.preventDefault();
    
    const course = this.state.selectedCourse;
    if (!course) return;

    const studentName = document.getElementById('bill-name').value;
    const email = document.getElementById('bill-email').value;

    // Enroll logic: check if already enrolled
    if (!this.state.enrolledCourses.includes(course.id)) {
      this.state.enrolledCourses.push(course.id);
      localStorage.setItem('pa_enrolled_courses', JSON.stringify(this.state.enrolledCourses));
      
      // Set empty completed lesson progress array
      if (!this.state.courseProgress[course.id]) {
        this.state.courseProgress[course.id] = [];
        localStorage.setItem('pa_course_progress', JSON.stringify(this.state.courseProgress));
      }

      // Update analytics stats
      this.state.revenue += course.discountPrice;
      this.state.students += 1;
      this.state.soldCount += 1;

      // Add to recent purchases list
      const today = new Date();
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = today.toLocaleDateString('en-GB', options).replace(/ /g, '-');
      
      this.state.recentEnrollments.unshift({
        name: studentName,
        course: course.title,
        date: formattedDate,
        price: course.discountPrice
      });

      // Update UI displays
      this.updateAdminDashboardUI();
      this.renderFeaturedCourses();
      this.renderCatalog();
    }

    // Toggle checkout modal view to success window
    document.getElementById('checkout-form-view').style.display = 'none';
    document.getElementById('checkout-success-view').style.display = 'block';
  }

  // ==========================================
  // INSTRUCTOR PANEL UI UPDATE
  // ==========================================
  updateAdminDashboardUI() {
    // Metrics
    document.getElementById('admin-total-revenue').innerText = `₹${this.state.revenue.toLocaleString('en-IN')}`;
    document.getElementById('admin-total-students').innerText = this.state.students.toLocaleString('en-IN');
    document.getElementById('admin-courses-sold').innerText = this.state.soldCount;

    // Month chart August bar height update
    // Starting bar point was 210000, updates by course sells
    const augBaseSales = 210000;
    const totalAug = augBaseSales + (this.state.revenue - 1854200);
    const activeBar = document.getElementById('active-month-bar');
    if (activeBar) {
      activeBar.style.height = '95%';
      document.getElementById('active-month-tooltip').innerText = `₹${totalAug.toLocaleString('en-IN')}`;
    }

    // Recent enrollments table
    const tableBody = document.getElementById('admin-enrollments-table-body');
    if (tableBody) {
      tableBody.innerHTML = this.state.recentEnrollments.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.course}</td>
          <td>${item.date}</td>
          <td>₹${item.price.toLocaleString('en-IN')}</td>
          <td><span class="badge-status badge-success">Completed</span></td>
        </tr>
      `).join('');
    }
  }

  // ==========================================
  // STUDENT PORTAL / DASHBOARD
  // ==========================================
  renderDashboard() {
    const emptyView = document.getElementById('dashboard-empty-view');
    const activeView = document.getElementById('dashboard-active-view');
    
    if (this.state.enrolledCourses.length === 0) {
      emptyView.style.display = 'block';
      activeView.style.display = 'none';
      return;
    }

    emptyView.style.display = 'none';
    activeView.style.display = 'grid';

    // Renders active courses inside sidebar
    const enrolledList = document.getElementById('enrolled-courses-list');
    enrolledList.innerHTML = '';

    this.state.enrolledCourses.forEach((courseId, idx) => {
      const course = this.state.courses.find(c => c.id === courseId);
      if (!course) return;

      const completionPercentage = this.calculateCourseProgress(courseId);
      const isSelected = this.state.selectedClassroomCourse && this.state.selectedClassroomCourse.id === courseId;
      const activeClass = (isSelected || (!this.state.selectedClassroomCourse && idx === 0)) ? 'active' : '';
      
      // Auto select first course in list if none selected
      if (!this.state.selectedClassroomCourse && idx === 0) {
        this.selectClassroomCourse(courseId);
      }

      const item = document.createElement('div');
      item.className = `glass-panel enrolled-course-item ${activeClass}`;
      item.innerHTML = `
        <div style="flex-grow: 1;">
          <h5 style="font-size: 0.95rem; margin-bottom: 4px;">${course.title}</h5>
          <div style="display:flex; justify-content:space-between; font-size: 0.75rem; color: var(--text-muted);">
            <span>Progress</span>
            <span>${completionPercentage}%</span>
          </div>
          <div class="course-progress-container">
            <div class="course-progress-bar" style="width: ${completionPercentage}%"></div>
          </div>
        </div>
      `;

      item.onclick = () => this.selectClassroomCourse(courseId);
      enrolledList.appendChild(item);
    });
  }

  calculateCourseProgress(courseId) {
    const course = this.state.courses.find(c => c.id === courseId);
    if (!course) return 0;
    
    const completedList = this.state.courseProgress[courseId] || [];
    const totalLessons = course.syllabus.reduce((acc, current) => acc + current.lessons.length, 0);
    
    if (totalLessons === 0) return 0;
    return Math.round((completedList.length / totalLessons) * 100);
  }

  selectClassroomCourse(courseId) {
    const course = this.state.courses.find(c => c.id === courseId);
    if (!course) return;

    this.state.selectedClassroomCourse = course;
    this.state.currentLessonIndex = 0;
    
    // Update classroom header title
    document.getElementById('classroom-course-title').innerText = `${course.title} Curriculum`;
    
    // Re-render enrolled course list to update active highlight
    this.renderDashboard();
    
    // Render lessons list
    this.renderClassroomLessonsList();
    
    // Reset player back to preview screen
    this.resetClassroomPlayer();
  }

  renderClassroomLessonsList() {
    const lessonsContainer = document.getElementById('classroom-lessons-list');
    if (!lessonsContainer) return;
    
    lessonsContainer.innerHTML = '';
    const course = this.state.selectedClassroomCourse;
    const completedList = this.state.courseProgress[course.id] || [];

    let absoluteIndex = 0;
    course.syllabus.forEach(module => {
      const moduleHeader = document.createElement('h5');
      moduleHeader.style.margin = '20px 0 10px 0';
      moduleHeader.style.color = 'var(--primary)';
      moduleHeader.innerText = module.chapterTitle;
      lessonsContainer.appendChild(moduleHeader);

      module.lessons.forEach(lesson => {
        const item = document.createElement('div');
        const isCompleted = completedList.includes(lesson.title);
        const isActive = this.state.currentLessonIndex === absoluteIndex;
        
        let itemClass = 'classroom-lesson-item';
        if (isCompleted) itemClass += ' completed';
        if (isActive) itemClass += ' active';

        item.className = itemClass;
        
        const thisIdx = absoluteIndex;
        item.innerHTML = `
          <div class="lesson-left-wrapper">
            <div class="lesson-check-circle" onclick="event.stopPropagation(); app.toggleLessonComplete('${lesson.title}', ${thisIdx})">✓</div>
            <span>📄 ${lesson.title}</span>
          </div>
          <span style="font-size: 0.8rem; opacity: 0.7;">${lesson.duration}</span>
        `;
        
        item.addEventListener('click', () => this.selectLesson(thisIdx));
        lessonsContainer.appendChild(item);
        absoluteIndex++;
      });
    });

    // Update syllabus progress bar in classroom
    const percent = this.calculateCourseProgress(course.id);
    document.getElementById('classroom-progress-bar').style.width = `${percent}%`;
  }

  selectLesson(lessonIndex) {
    this.state.currentLessonIndex = lessonIndex;
    
    // Re-render lists to update active styling classes
    this.renderClassroomLessonsList();
    
    // Update player details
    const activeLesson = this.getLessonByIndex(lessonIndex);
    if (activeLesson) {
      this.resetClassroomPlayer();
      document.getElementById('player-video-title').innerText = activeLesson.title;
    }
  }

  getLessonByIndex(index) {
    const course = this.state.selectedClassroomCourse;
    if (!course) return null;

    let absoluteIndex = 0;
    for (let module of course.syllabus) {
      for (let lesson of module.lessons) {
        if (absoluteIndex === index) {
          return lesson;
        }
        absoluteIndex++;
      }
    }
    return null;
  }

  toggleLessonComplete(lessonTitle, lessonIdx) {
    const course = this.state.selectedClassroomCourse;
    if (!course) return;

    let completedList = this.state.courseProgress[course.id] || [];
    
    const index = completedList.indexOf(lessonTitle);
    if (index > -1) {
      // remove completion mark
      completedList.splice(index, 1);
    } else {
      // add completion mark
      completedList.push(lessonTitle);
    }

    this.state.courseProgress[course.id] = completedList;
    localStorage.setItem('pa_course_progress', JSON.stringify(this.state.courseProgress));

    // Re-render
    this.renderClassroomLessonsList();
    this.renderDashboard();
  }

  // ==========================================
  // CUSTOM PREMIUM CANVAS MOCK PLAYER
  // ==========================================
  resetClassroomPlayer() {
    this.stopCanvasVideo();
    
    const overlay = document.getElementById('player-overlay');
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
    
    const playBtn = document.getElementById('player-play-btn');
    playBtn.innerText = '▶';
    
    const activeLesson = this.getLessonByIndex(this.state.currentLessonIndex);
    document.getElementById('player-video-title').innerText = activeLesson ? activeLesson.title : 'Select a Lesson to Start';

    // Remove canvas if existing
    const existingCanvas = document.getElementById('mock-player-canvas');
    if (existingCanvas) existingCanvas.remove();
  }

  playMockVideo() {
    const activeLesson = this.getLessonByIndex(this.state.currentLessonIndex);
    if (!activeLesson) return;

    const overlay = document.getElementById('player-overlay');
    // Hide overlay content or dim it
    overlay.style.display = 'none';

    // Create custom canvas to run code visualization stream (Matrix coding screen style)
    const container = document.getElementById('mock-player-container');
    
    // Create new canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'mock-player-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    
    container.appendChild(canvas);
    
    this.canvasElement = canvas;
    this.canvasContext = canvas.getContext('2d');
    
    // Resize canvas
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    this.isVideoPlaying = true;
    this.startCanvasVideoAnimation(activeLesson.title);

    // Auto mark lesson as complete after 8 seconds of playing simulation (for interactive UX demonstration)
    const courseId = this.state.selectedClassroomCourse.id;
    setTimeout(() => {
      if (this.isVideoPlaying && this.state.selectedClassroomCourse && this.state.selectedClassroomCourse.id === courseId) {
        this.toggleLessonComplete(activeLesson.title, this.state.currentLessonIndex);
      }
    }, 6000);
  }

  startCanvasVideoAnimation(lessonTitle) {
    const ctx = this.canvasContext;
    const canvas = this.canvasElement;
    
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(1);
    
    const chars = '010101<>/{};[]=+#$ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let frame = 0;
    const draw = () => {
      if (!this.isVideoPlaying) return;
      
      // Translucent black bg to reveal trails
      ctx.fillStyle = 'rgba(7, 9, 19, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid code visualizer
      ctx.fillStyle = '#06b6d4'; // Cyan neon
      ctx.font = '12px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Random coloring gradient
        if (Math.random() > 0.9) {
          ctx.fillStyle = '#8b5cf6'; // Violet neon
        } else {
          ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
        }

        ctx.fillText(text, i * 20, drops[i] * 20);
        
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Draw dynamic loading bar / timeline visualization at bottom
      ctx.fillStyle = 'rgba(139, 92, 246, 0.4)';
      ctx.fillRect(0, canvas.height - 8, canvas.width, 8);
      
      ctx.fillStyle = '#06b6d4';
      const playProgressWidth = (frame % 400) / 400 * canvas.width;
      ctx.fillRect(0, canvas.height - 8, playProgressWidth, 8);

      // Title overlay on top
      ctx.fillStyle = 'rgba(7, 9, 19, 0.6)';
      ctx.fillRect(15, 15, canvas.width - 30, 40);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.strokeRect(15, 15, canvas.width - 30, 40);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px "Outfit", sans-serif';
      ctx.fillText(`▶ Streaming: ${lessonTitle}`, 30, 40);

      ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
      ctx.font = '10px sans-serif';
      ctx.fillText('ACTIVE LEARNING SIMULATOR', canvas.width - 180, 40);

      frame++;
      this.animationFrameId = requestAnimationFrame(draw);
    };

    draw();
  }

  stopCanvasVideo() {
    this.isVideoPlaying = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

// Instantiate application
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new PratikAcademyApp();
});
