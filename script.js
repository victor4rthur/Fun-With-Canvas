// Select the canvas element and get its 2D rendering context
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set initial drawing settings
ctx.strokeStyle = '#BADA55'; // Stroke color
ctx.shadowColor = 'grey'; // Shadow color
ctx.shadowOffsetX = 50; // Horizontal shadow offset
ctx.shadowOffsetY = 50; // Vertical shadow offset
ctx.shadowBlur = 5; // Shadow blur
ctx.lineJoin = 'round'; // Line join style
ctx.lineCap = 'round'; // Line cap style

// Variables to track drawing state
let isDrawing = false; // Indicates whether the user is currently drawing
let lastX = 0; // X coordinate of the last drawing point
let lastY = 0; // Y coordinate of the last drawing point
let hue = 0; // Hue value for stroke color
let direction = true; // Flag to determine whether to increase or decrease line width

// Function to handle the drawing logic
function draw(e) {
    // Exit the function if the mouse isn't clicked
    if (!isDrawing) return;

    // Set the stroke color using HSL representation with a changing hue
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    // Begin a new path and move to the last drawing point
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);

    // Draw a line to the current mouse position and stroke the path
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    // Update the last drawing point to the current mouse position
    [lastX, lastY] = [e.offsetX, e.offsetY];

    // Increment the hue value for a changing stroke color
    hue++;

    // Reset the hue to 0 when it reaches 360
    if (hue >= 360) {
        hue = 0;
    }

    // Check if the line width is within a specific range and update direction accordingly
    if (ctx.lineWidth >= 10 || ctx.lineWidth <= 1) {
        direction = !direction;
    }

    // Adjust the line width based on the direction flag
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

// Event listener for the 'mousedown' event to start drawing
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    // Set the initial drawing point to the current mouse position
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Event listener for the 'mousemove' event to continuously draw
canvas.addEventListener('mousemove', draw);

// Event listener for the 'mouseup' event to stop drawing
canvas.addEventListener('mouseup', () => isDrawing = false);

// Event listener for the 'mouseout' event to stop drawing if the mouse leaves the canvas
canvas.addEventListener('mouseout', () => isDrawing = false);
