const canvas = document.getElementById("jscanvas");
const ctx = canvas.getContext("2d");
const paintBtn = document.querySelector(".paintBtn");
const input = document.querySelector(".inputValue");
const colors = document.querySelector(".colors");
const saveBtn = document.querySelector(".saveBtn");

const CANVAS_SIZE = 700;

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.lineWidth = 5;
ctx.strokeStyle = "black";
input.value = ctx.lineWidth;

let painting = false;

function handleSave() {
  const url = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = url;
  link.download = "PaintJS";
  link.click();
}

function handleCanvas(event) {
  event.preventDefault();
}

function handleColors(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
}

function handleInput(event) {
  ctx.lineWidth = event.target.value;
}

function handleFIll(event) {
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handlePaintBtn(event) {
  if (paintBtn.innerHTML === "PAINT") {
    paintBtn.innerHTML = "FILL";
    canvas.addEventListener("click", handleFIll);
  } else {
    paintBtn.innerHTML = "PAINT";
    canvas.removeEventListener("click", handleFIll);
  }
}

function handleMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

colors.addEventListener("click", handleColors);
paintBtn.addEventListener("click", handlePaintBtn);
input.addEventListener("input", handleInput);
saveBtn.addEventListener("click", handleSave);

if (canvas) {
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCanvas);
}
