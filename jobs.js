
let jobs = [
    { id: 1, company: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130,000 - $175,000", description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "all" },
    { id: 2, company: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA", type: "Part-time", salary: "$80,000 - $120,000", description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status: "all" },
    { id: 3, company: "DataViz Solutions", position: "Data Visualization Specialist", location: "Boston, MA", type: "Full-time", salary: "$125,000 - $165,000", description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status: "all" },
    { id: 4, company: "CloudFirst Inc", position: "Backend Developer", location: "Seattle, WA", type: "Full-time", salary: "$140,000 - $190,000", description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices.", status: "all" },
    { id: 5, company: "Innovation Labs", position: "UI/UX Engineer", location: "Austin, TX", type: "Full-time", salary: "$110,000 - $150,000", description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required", status: "all" },
    { id: 6, company: "MegaCorp Solutions", position: "JavaScript Developer", location: "New York, NY", type: "Full-time", salary: "$135,000 - $170,00", description: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation,health insurance, and professional devlopment opportunities.", status: "all" },
    { id: 7, company: "StartupXYZ", position: "Full Stack Engineer", location: "Remote", type: "Full-time", salary: "$120,000 - $160,000", description: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required.Great benefits and equity package included.", status: "all" },
    { id: 8, company: "TechCorp Industries", position: "Senior Frontend Developer", location: "San Francisco,CA", type: "Full-time", salary: "$130,000 - $175,000", description: "We are looking for an experienced Frontend Developer to bulid scalable web applications using React and TypeScript. You wil work with a talented team on cutting-edge projects.", status: "all" }
];

let currentTab = 'all';

function init() {
    renderUI();
}

function updateCounts() {
    const total = jobs.length;
    const interviewCount = jobs.filter(j => j.status === 'interview').length;
    const rejectedCount = jobs.filter(j => j.status === 'rejected').length;

    
    document.getElementById('total-count').innerText = total;
    document.getElementById('interview-count').innerText = interviewCount;
    document.getElementById('rejected-count').innerText = rejectedCount;

   
    const displayJobs = currentTab === 'all' ? jobs : jobs.filter(j => j.status === currentTab);
    document.getElementById('tab-job-count').innerText = `${displayJobs.length} jobs`;
}


function switchTab(tab) {
    currentTab = tab;
    
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active-tab', 'bg-blue-600', 'text-white');
        btn.classList.add('bg-white', 'text-gray-500');
    });
    
    const activeBtn = document.getElementById(`tab-${tab}`);
    activeBtn.classList.add('active-tab', 'bg-blue-600', 'text-white');
    activeBtn.classList.remove('text-gray-500');
    
    renderUI();
}


function updateStatus(id, newStatus) {
    const job = jobs.find(j => j.id === id);
    if (job) {
        job.status = newStatus;
        renderUI();
    }
}


function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    renderUI();
}


function renderUI() {
    updateCounts();
    const container = document.getElementById('jobs-container');
    container.innerHTML = '';

    const filteredJobs = currentTab === 'all' 
        ? jobs 
        : jobs.filter(j => j.status === currentTab);

    
    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-24 bg-white rounded-lg">
                <img src="jobs.png" alt="No Jobs" class="w-24 h-24 mb-4 opacity-70">
                <h3 class="text-2xl font-bold text-blue-950">No jobs available</h3>
                <p class="text-gray-400 mt-1">Check back soon for new job opportunities</p>
            </div>
        `;
        return;
    }

    
    filteredJobs.forEach(job => {
        const card = document.createElement('div');
        card.className = "bg-white p-8 rounded-lg border border-gray-100 mb-6 relative hover:shadow-sm transition-all";
        card.innerHTML = `
            <button onclick="deleteJob(${job.id})" class="absolute top-6 right-8 text-gray-300 hover:text-red-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>

            <h3 class="font-bold text-blue-950 text-xl">${job.company}</h3>
            <p class="text-gray-400 font-medium mb-2">${job.position}</p>
            
            <div class="flex flex-wrap gap-x-2 text-sm text-gray-400 mb-4 font-medium">
                <span>${job.location}</span> • <span>${job.type}</span> • <span>${job.salary}</span>
            </div>

            <div class="inline-block px-4 py-1.5 rounded bg-blue-50 text-blue-700 text-xs font-bold uppercase mb-4 tracking-wider">
                ${job.status === 'all' ? 'NOT APPLIED' : job.status.toUpperCase()}
            </div>

            <p class="text-gray-600 text-sm mb-6 leading-relaxed max-w-4xl">${job.description}</p>

            <div class="flex gap-4">
                <button onclick="updateStatus(${job.id}, 'interview')" class="px-6 py-2 border-2 border-emerald-400 text-emerald-500 rounded-md text-sm font-bold hover:bg-emerald-50 transition uppercase">Interview</button>
                <button onclick="updateStatus(${job.id}, 'rejected')" class="px-6 py-2 border-2 border-red-300 text-red-400 rounded-md text-sm font-bold hover:bg-red-50 transition uppercase">Rejected</button>
            </div>
        `;
        container.appendChild(card);
    });
}

init();