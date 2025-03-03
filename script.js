// Set dark mode as default theme
const currentTheme = localStorage.getItem('theme') || 'dark';
const themeToggleBtn = document.getElementById('theme-toggle');

// Apply theme on page load
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggleBtn.textContent = '🌙';
} else {
    themeToggleBtn.textContent = '☀️';
}

// Theme toggle functionality
themeToggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    
    // Update button text
    themeToggleBtn.textContent = isLightMode ? '🌙' : '☀️';
    
    // Save preference to localStorage
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});

  