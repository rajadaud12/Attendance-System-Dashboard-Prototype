 let students = JSON.parse(localStorage.getItem('students')) || [
    { rollNumber: '#123456', name: 'Mudassar Hussain', fatherName: 'Father Name here ...', status: 'present' },
    { rollNumber: '#123457', name: 'Rehan', fatherName: 'Father Name here ...', status: 'absent' },
    { rollNumber: '#123458', name: 'Shehryar', fatherName: 'Father Name here ...', status: 'leave' }
];

function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

function renderStudents() {
    const studentsList = document.getElementById('studentsList');
    if (studentsList) {
        studentsList.innerHTML = '';
        
        students.forEach(student => {
            const row = `
                <tr>
                    <td>${student.rollNumber}</td>
                    <td>${student.name}</td>
                    <td>${student.fatherName}</td>
                    <td>
                        <div class="attendance-buttons">
                            <button class="btn present ${student.status === 'present' ? 'active' : ''}" 
                                onclick="updateAttendance('${student.rollNumber}', 'present')">Present</button>
                            <button class="btn absent ${student.status === 'absent' ? 'active' : ''}" 
                                onclick="updateAttendance('${student.rollNumber}', 'absent')">Absent</button>
                            <button class="btn leave ${student.status === 'leave' ? 'active' : ''}" 
                                onclick="updateAttendance('${student.rollNumber}', 'leave')">Leave</button>
                        </div>
                    </td>
                </tr>
            `;
            studentsList.innerHTML += row;
        });
    }
}

// Update attendance status
function updateAttendance(rollNumber, status) {
    students = students.map(student => {
        if (student.rollNumber === rollNumber) {
            return { ...student, status: status };
        }
        return student;
    });
    saveStudents();
    renderStudents();
}


function openModal() {
    const modal = document.getElementById('studentModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('studentModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('studentForm').reset();
}

function addStudent(event) {
    event.preventDefault();
    
    const rollNumber = document.getElementById('roll-number').value;
    const name = document.getElementById('student-name').value;
    const fatherName = document.getElementById('father-name').value;
    const studentClass = document.getElementById('student-class').value;
    const section = document.getElementById('student-section').value;

    if (!rollNumber || !name || !fatherName || !studentClass || !section) {
        showToast('Please fill all fields');
        return;
    }

    const newStudent = {
        rollNumber: '#' + rollNumber,
        name: name,
        fatherName: fatherName,
        class: studentClass,
        section: section,
        status: 'present'
    };

    students.push(newStudent);
    saveStudents();
    
    showToast('Student added successfully');
    closeModal();
    renderStudents();
}

function exportAttendance() {
    window.print();
}

document.addEventListener('DOMContentLoaded', function() {
    renderStudents();
    
    const modal = document.getElementById('studentModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
});

function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

function deleteStudent(rollNumber) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(student => student.rollNumber !== rollNumber);
        saveStudents();
        renderStudents();
        showToast('Student deleted successfully');
    }
}

function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.classList.add("show");
    toast.textContent = message;
    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Render students list on attendance page
function renderStudents() {
    const studentsList = document.getElementById('studentsList');
    if (studentsList) {
        studentsList.innerHTML = '';
        
        students.forEach(student => {
            const row = `
                <tr>
                    <td>${student.rollNumber}</td>
                    <td>${student.name}</td>
                    <td>${student.fatherName}</td>
                    <td>
                        <div class="attendance-buttons">
                            <button class="btn present ${student.status === 'present' ? 'active' : ''}" 
                                onclick="updateAttendance('${student.rollNumber}', 'present')">Present</button>
                            <button class="btn absent ${student.status === 'absent' ? 'active' : ''}" 
                                onclick="updateAttendance('${student.rollNumber}', 'absent')">Absent</button>
                            <button class="btn leave ${student.status === 'leave' ? 'active' : ''}" 
                                onclick="updateAttendance('${student.rollNumber}', 'leave')">Leave</button>
                            <button class="delete-btn" onclick="deleteStudent('${student.rollNumber}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            studentsList.innerHTML += row;
        });
    }
}

// Update attendance status
function updateAttendance(rollNumber, status) {
    students = students.map(student => {
        if (student.rollNumber === rollNumber) {
            return { ...student, status: status };
        }
        return student;
    });
    saveStudents();
    renderStudents();
    showToast(`Attendance marked as ${status}`);
}

// Modal Functions
function openModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Modal element not found');
    }
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('studentForm').reset();
    }
}

// Add new student
function addStudent(event) {
    event.preventDefault();
    
    const rollNumber = document.getElementById('roll-number').value;
    const name = document.getElementById('student-name').value;
    const fatherName = document.getElementById('father-name').value;
    const studentClass = document.getElementById('student-class').value;
    const section = document.getElementById('student-section').value;

    if (!rollNumber || !name || !fatherName || !studentClass || !section) {
        showToast('Please fill all fields');
        return;
    }

    // Check if roll number already exists
    if (students.some(student => student.rollNumber === '#' + rollNumber)) {
        showToast('Roll number already exists');
        return;
    }

    const newStudent = {
        rollNumber: '#' + rollNumber,
        name: name,
        fatherName: fatherName,
        class: studentClass,
        section: section,
        status: 'present'
    };

    students.push(newStudent);
    saveStudents();
    renderStudents();
    
    showToast('Student added successfully');
    closeModal();
}

function exportAttendance() {
    window.print();
}

document.addEventListener('DOMContentLoaded', function() {
    renderStudents();

    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    const addStudentBtn = document.querySelector('.add-student-btn');
    if (addStudentBtn) {
        addStudentBtn.onclick = openModal;
    }

    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--text);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            animation: slideIn 0.3s ease-out;
            z-index: 2000;
        }

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

        @media print {
            .add-student-btn,
            .export-btn,
            .attendance-buttons,
            .modal-overlay {
                display: none !important;
            }
            
            .container {
                width: 100%;
                max-width: none;
                margin: 0;
                padding: 20px;
            }
        }
    `;
    document.head.appendChild(style);
});



document.addEventListener('DOMContentLoaded', function() {
    const submenuItems = document.querySelectorAll('.menu-item.has-submenu');
    
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            submenuItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                }
            });
            
            item.classList.toggle('expanded');
        });
    });
});