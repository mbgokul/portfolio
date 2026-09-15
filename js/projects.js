/**
 * Projects Data & Filtering Logic
 */

const projectsData = [
  {
    id: 'taskflow',
    title: 'TaskFlow — Cloud Workflow & Agile Platform',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web App',
    image: 'assets/images/project-taskflow.jpg',
    description: 'A modern, full-stack workflow management platform engineered for development teams to organize sprints, manage real-time Kanban tasks, and analyze productivity metrics.',
    technologies: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'JWT Auth', 'REST API'],
    github: 'https://github.com/gokul-cs/taskflow-platform',
    demo: 'https://taskflow-preview.demo',
    features: [
      'Interactive Kanban board with fluid drag-and-drop state management',
      'Role-based access control (RBAC) with secure JWT authentication',
      'Normalized relational database schema designed in PostgreSQL',
      'Real-time sprint progress analytics and deadline warnings'
    ]
  },
  {
    id: 'codesphere',
    title: 'CodeSphere — Real-Time Collaborative IDE',
    category: 'web',
    categoryLabel: 'Web Application',
    image: 'assets/images/project-codesphere.jpg',
    description: 'A browser-based collaborative coding environment featuring live pair-programming synchronization, syntax highlighting, integrated terminal simulation, and multi-file project exploration.',
    technologies: ['JavaScript (ES6+)', 'Socket.io', 'Monaco Editor', 'Node.js', 'CSS Glassmorphism'],
    github: 'https://github.com/gokul-cs/codesphere-live',
    demo: 'https://codesphere-editor.demo',
    features: [
      'Multi-client synchronized code editing via WebSocket channels',
      'Built-in terminal runner simulator with command parsing',
      'Dark-mode theme optimized for code legibility and low eye fatigue',
      'Exportable project workspaces with ZIP bundle generation'
    ]
  },
  {
    id: 'edupulse',
    title: 'EduPulse — University Academic Management Portal',
    category: 'fullstack',
    categoryLabel: 'Full-Stack / Database',
    image: 'assets/images/project-edupulse.jpg',
    description: 'A comprehensive academic information system empowering students to track course milestones, monitor grade distributions, submit lab assignments, and inspect interactive attendance graphs.',
    technologies: ['Java / Spring Boot', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'Chart.js'],
    github: 'https://github.com/gokul-cs/edupulse-portal',
    demo: 'https://edupulse-academic.demo',
    features: [
      'Automated GPA/CGPA forecasting calculations based on university grading rubrics',
      'Interactive SVG/Chart.js visual analytics for grade distributions',
      'Secure document submission portal for coursework assignments',
      'Optimized MySQL relational queries and stored procedures'
    ]
  },
  {
    id: 'algostruct',
    title: 'AlgoStruct — Interactive DSA Visualizer',
    category: 'algorithms',
    categoryLabel: 'Core CS / Algorithms',
    image: 'assets/images/project-algostruct.jpg',
    description: 'An interactive algorithmic animation tool created to deepen comprehension of fundamental Computer Science concepts, including Binary Search Trees, sorting routines, and graph traversals.',
    technologies: ['JavaScript', 'HTML5 Canvas', 'Data Structures & Algorithms', 'CSS3 Keyframes'],
    github: 'https://github.com/gokul-cs/algostruct-visualizer',
    demo: 'https://algostruct-visualizer.demo',
    features: [
      'Step-by-step visual animation for QuickSort, MergeSort, and HeapSort',
      'Dynamic Binary Search Tree node insertion, deletion, and balancing',
      'Graph pathfinding simulations with Dijkstra and A* path discovery',
      'Adjustable playback speed and execution call-stack inspection'
    ]
  }
];

// Initialize Projects Rendering
function initProjects() {
  const container = document.getElementById('projects-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!container) return;

  function renderProjects(filter = 'all') {
    container.innerHTML = '';
    
    const filtered = filter === 'all' 
      ? projectsData 
      : projectsData.filter(p => p.category === filter);

    filtered.forEach((project, index) => {
      const card = document.createElement('article');
      card.className = `project-card reveal-on-scroll reveal-delay-${(index % 4) + 1} revealed`;
      card.setAttribute('data-category', project.category);

      const techTags = project.technologies
        .map(t => `<span class="tech-tag">${t}</span>`)
        .join('');

      card.innerHTML = `
        <div class="project-thumb-wrapper">
          <img src="${project.image}" alt="${project.title} Preview" class="project-thumb" loading="lazy">
          <div class="project-overlay">
            <button type="button" class="btn btn-sm btn-primary" onclick="openProjectModal('${project.id}')">
              <i class="fa-solid fa-circle-info"></i> View Details
            </button>
            <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
            </a>
          </div>
        </div>
        <div class="project-content">
          <span class="project-tag-badge">${project.categoryLabel}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tech-stack">
            ${techTags}
          </div>
          <div class="project-footer-actions">
            <div class="project-links">
              <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link-item" title="View Source on GitHub">
                <i class="fa-brands fa-github"></i> <span>GitHub</span>
              </a>
              <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link-item" title="Visit Live Demo">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> <span>Live Demo</span>
              </a>
            </div>
            <button type="button" class="btn btn-sm btn-outline" onclick="openProjectModal('${project.id}')">
              Details <i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i>
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // Filter Button Clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      renderProjects(filterValue);
    });
  });

  // Initial render
  renderProjects('all');
}

// Open Project Details Modal
function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');
  const modalTitle = document.getElementById('project-modal-title');
  if (!modal || !modalBody || !modalTitle) return;

  modalTitle.textContent = project.title;

  const featuresList = project.features
    .map(f => `<li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px;"><i class="fa-solid fa-check" style="color: var(--cyan); margin-top: 4px;"></i> <span>${f}</span></li>`)
    .join('');

  const techBadges = project.technologies
    .map(t => `<span class="tech-tag" style="font-size: 0.85rem;">${t}</span>`)
    .join('');

  modalBody.innerHTML = `
    <div style="margin-bottom: 20px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle);">
      <img src="${project.image}" alt="${project.title}" style="width: 100%; max-height: 320px; object-fit: cover;">
    </div>
    <div style="margin-bottom: 16px;">
      <span class="project-tag-badge">${project.categoryLabel}</span>
    </div>
    <p style="color: var(--text-secondary); font-size: 1.02rem; line-height: 1.7; margin-bottom: 22px;">
      ${project.description}
    </p>
    <div style="margin-bottom: 24px;">
      <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 12px;">Key Engineering Highlights:</h4>
      <ul style="list-style: none; padding: 0;">
        ${featuresList}
      </ul>
    </div>
    <div>
      <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 12px;">Technologies & Tools:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${techBadges}
      </div>
    </div>
  `;

  // Update modal action links
  const modalGithub = document.getElementById('project-modal-github');
  const modalDemo = document.getElementById('project-modal-demo');
  if (modalGithub) modalGithub.href = project.github;
  if (modalDemo) modalDemo.href = project.demo;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Global modal close on click outside or escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeResumeModal();
  }
});

document.addEventListener('DOMContentLoaded', initProjects);
