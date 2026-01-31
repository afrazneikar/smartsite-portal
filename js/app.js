// SmartSite Portal - Construction Lifecycle Management
// JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initLifecycleStages();
    initAnimations();
});

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Smooth scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', highlightActiveSection);
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Lifecycle Stages
function initLifecycleStages() {
    const stages = document.querySelectorAll('.lifecycle-stage');

    stages.forEach(stage => {
        stage.addEventListener('click', function() {
            // Remove active from all stages
            stages.forEach(s => s.classList.remove('active'));

            // Add active to clicked stage
            this.classList.add('active');

            // Get stage data
            const stageName = this.dataset.stage;
            showStageDetails(stageName);
        });
    });
}

function showStageDetails(stageName) {
    const stageData = {
        preconstruction: {
            title: 'Pre-Construction Phase',
            description: 'Planning, estimation, and preparation activities before construction begins.',
            tasks: [
                'Site surveys and assessments',
                'Cost estimation and budgeting',
                'Permit applications',
                'Design review and approval',
                'Subcontractor selection'
            ],
            apps: ['Handoff AI', 'DocVault', 'Project Hub']
        },
        procurement: {
            title: 'Procurement Phase',
            description: 'Acquiring materials, equipment, and finalizing contracts.',
            tasks: [
                'Material ordering',
                'Vendor negotiations',
                'Contract finalization',
                'Delivery scheduling',
                'Quality verification'
            ],
            apps: ['Jobtread', 'DocVault', 'SchedulePro']
        },
        construction: {
            title: 'Construction Phase',
            description: 'Active building and construction activities on site.',
            tasks: [
                'Site management',
                'Daily progress tracking',
                'Safety compliance',
                'Quality inspections',
                'Change order management'
            ],
            apps: ['FieldOps', 'Project Hub', 'SchedulePro']
        },
        closeout: {
            title: 'Closeout Phase',
            description: 'Final inspections, punch lists, and project handover.',
            tasks: [
                'Final inspections',
                'Punch list completion',
                'As-built documentation',
                'Client walkthrough',
                'Certificate of occupancy'
            ],
            apps: ['DocVault', 'Project Hub', 'FieldOps']
        },
        warranty: {
            title: 'Warranty Phase',
            description: 'Post-completion support and warranty management.',
            tasks: [
                'Warranty claims processing',
                'Maintenance scheduling',
                'Client support',
                'Issue resolution',
                'Performance monitoring'
            ],
            apps: ['Project Hub', 'DocVault', 'Jobtread']
        }
    };

    const data = stageData[stageName];
    if (data) {
        console.log(`Selected Stage: ${data.title}`);
        // Could expand this to show a detailed modal or panel
    }
}

// Modal Functions
function showModal(type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    const modalContent = {
        newProject: {
            title: 'Create New Project',
            body: `
                <form class="modal-form">
                    <div class="form-group">
                        <label>Project Name</label>
                        <input type="text" placeholder="Enter project name">
                    </div>
                    <div class="form-group">
                        <label>Client</label>
                        <input type="text" placeholder="Client name">
                    </div>
                    <div class="form-group">
                        <label>Project Type</label>
                        <select>
                            <option>Commercial</option>
                            <option>Residential</option>
                            <option>Industrial</option>
                            <option>Infrastructure</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Estimated Value</label>
                        <input type="text" placeholder="$0.00">
                    </div>
                    <button type="submit" class="btn btn-primary">Create Project</button>
                </form>
            `
        },
        newEstimate: {
            title: 'Create Estimate with Handoff AI',
            body: `
                <div class="ai-estimate-form">
                    <div class="ai-badge">
                        <i class="fas fa-robot"></i> Powered by AI
                    </div>
                    <div class="form-group">
                        <label>Project</label>
                        <select>
                            <option>Riverside Commercial Complex</option>
                            <option>Downtown Office Tower</option>
                            <option>Parkview Residential</option>
                            <option>New Project...</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Upload Plans (PDF)</label>
                        <div class="file-upload">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <span>Drag & drop files or click to browse</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Estimation Type</label>
                        <select>
                            <option>Full Takeoff</option>
                            <option>Quick Estimate</option>
                            <option>Change Order</option>
                        </select>
                    </div>
                    <button class="btn btn-primary">
                        <i class="fas fa-magic"></i> Generate AI Estimate
                    </button>
                </div>
            `
        },
        newInvoice: {
            title: 'Create Invoice',
            body: `
                <form class="modal-form">
                    <div class="form-group">
                        <label>Project</label>
                        <select>
                            <option>Riverside Commercial Complex</option>
                            <option>Downtown Office Tower</option>
                            <option>Parkview Residential</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Invoice Type</label>
                        <select>
                            <option>Progress Billing</option>
                            <option>Final Invoice</option>
                            <option>Change Order</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Amount</label>
                        <input type="text" placeholder="$0.00">
                    </div>
                    <div class="form-group">
                        <label>Due Date</label>
                        <input type="date">
                    </div>
                    <button type="submit" class="btn btn-primary">Send Invoice via Jobtread</button>
                </form>
            `
        },
        scheduleCall: {
            title: 'Schedule Call',
            body: `
                <form class="modal-form">
                    <div class="form-group">
                        <label>Call Type</label>
                        <select>
                            <option>Client Meeting</option>
                            <option>Team Standup</option>
                            <option>Vendor Call</option>
                            <option>Site Review</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Participants</label>
                        <input type="text" placeholder="Enter email addresses">
                    </div>
                    <div class="form-group">
                        <label>Date & Time</label>
                        <input type="datetime-local">
                    </div>
                    <div class="form-group">
                        <label>Notes</label>
                        <textarea placeholder="Meeting agenda..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Schedule Call</button>
                </form>
            `
        },
        addTeam: {
            title: 'Add Team Member',
            body: `
                <form class="modal-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter full name">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="email@company.com">
                    </div>
                    <div class="form-group">
                        <label>Role</label>
                        <select>
                            <option>Project Manager</option>
                            <option>Site Supervisor</option>
                            <option>Estimator</option>
                            <option>Field Worker</option>
                            <option>Admin</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Assign to Projects</label>
                        <select multiple>
                            <option>Riverside Commercial Complex</option>
                            <option>Downtown Office Tower</option>
                            <option>Parkview Residential</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Team Member</button>
                </form>
            `
        },
        generateReport: {
            title: 'Generate Report',
            body: `
                <form class="modal-form">
                    <div class="form-group">
                        <label>Report Type</label>
                        <select>
                            <option>Project Summary</option>
                            <option>Financial Overview</option>
                            <option>Progress Report</option>
                            <option>Safety Compliance</option>
                            <option>Resource Utilization</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Date Range</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="date" style="flex: 1;">
                            <input type="date" style="flex: 1;">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Projects</label>
                        <select multiple>
                            <option>All Projects</option>
                            <option>Riverside Commercial Complex</option>
                            <option>Downtown Office Tower</option>
                            <option>Parkview Residential</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Format</label>
                        <select>
                            <option>PDF</option>
                            <option>Excel</option>
                            <option>CSV</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Generate Report</button>
                </form>
            `
        }
    };

    const content = modalContent[type];
    if (content) {
        modalTitle.textContent = content.title;
        modalBody.innerHTML = content.body;
        modal.classList.add('active');

        // Add form styles dynamically
        addFormStyles();
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

// Close modal on outside click
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Open App Function
function openApp(appName) {
    const appUrls = {
        handoff: 'https://handoff.ai',
        project: '#project-hub',
        jobtread: 'https://jobtread.com',
        docs: '#doc-vault',
        field: '#field-ops',
        schedule: '#schedule-pro'
    };

    // For prototype, show a notification
    showNotification(`Opening ${appName.charAt(0).toUpperCase() + appName.slice(1)}...`, 'info');

    // In production, would redirect or open in new tab
    // window.open(appUrls[appName], '_blank');
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'info' ? 'info-circle' : type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 24px;
        background: ${type === 'info' ? '#0073e6' : type === 'success' ? '#6ebe4a' : '#e53935'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add Form Styles
function addFormStyles() {
    if (document.getElementById('modal-form-styles')) return;

    const formStyles = document.createElement('style');
    formStyles.id = 'modal-form-styles';
    formStyles.textContent = `
        .modal-form, .ai-estimate-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .form-group label {
            font-weight: 600;
            font-size: 0.9rem;
            color: #424242;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            padding: 12px 16px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            font-size: 0.95rem;
            transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #0073e6;
            box-shadow: 0 0 0 3px rgba(0, 115, 230, 0.1);
        }

        .form-group textarea {
            min-height: 100px;
            resize: vertical;
        }

        .file-upload {
            border: 2px dashed #e0e0e0;
            border-radius: 8px;
            padding: 40px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .file-upload:hover {
            border-color: #0073e6;
            background: rgba(0, 115, 230, 0.05);
        }

        .file-upload i {
            font-size: 2rem;
            color: #9e9e9e;
            margin-bottom: 12px;
            display: block;
        }

        .file-upload span {
            color: #757575;
        }

        .ai-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            width: fit-content;
        }
    `;
    document.head.appendChild(formStyles);
}

// Initialize Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate cards on scroll
    const animatedElements = document.querySelectorAll('.app-card, .dashboard-card, .lifecycle-stage');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Simulated Data Refresh
function refreshDashboardData() {
    console.log('Refreshing dashboard data...');
    // In production, this would fetch real data from APIs
}

// Auto-refresh every 5 minutes (for prototype, just logs)
setInterval(refreshDashboardData, 300000);
