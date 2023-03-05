export function render(el) {
  el.innerHTML += `
    <div style="color: blue; font-size:16px; font-weight: 500;">content: ${__dirname}, ${__filename}}</div>
  `
}