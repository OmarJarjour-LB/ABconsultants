document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');

    // Position the cursor element centered at the mouse pointer
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
    cursor.style.transform = 'translate(-50%, -50%)';
});
