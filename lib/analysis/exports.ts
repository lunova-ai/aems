import html2canvas from "html2canvas";

// ---------------------------------------------------------
// PNG Export – Screenshot eines beliebigen Elements
// ---------------------------------------------------------

export async function exportElementAsPng(
  element: HTMLElement
): Promise<string> {
  if (!element) throw new Error("Element not found for PNG export.");

  // Warten bis das DOM sicher gerendert wurde
  await new Promise((res) => requestAnimationFrame(res));

  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: window.devicePixelRatio > 1 ? 2 : 1,
    useCORS: true,
    logging: false
  });

  return canvas.toDataURL("image/png");
}

// ---------------------------------------------------------
// PNG herunterladen
// ---------------------------------------------------------

export function downloadPng(name: string, dataUrl: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = name.endsWith(".png") ? name : `${name}.png`;

  // Safari- & iOS-Support: element muss im DOM sein
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ---------------------------------------------------------
// JSON Export
// ---------------------------------------------------------

export function exportJson(name: string, data: unknown) {
  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], {
    type: "application/json;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = name.endsWith(".json") ? name : `${name}.json`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------
// CSV Export (RFC4180-konform + Excel-kompatibel)
// ---------------------------------------------------------

export function exportCsv(name: string, rows: string[][]) {
  const esc = (v: string) => {
    if (v == null) return "";
    const safe = String(v).replace(/"/g, '""');
    return `"${safe}"`;
  };

  const csv = rows.map((r) => r.map(esc).join(",")).join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = name.endsWith(".csv") ? name : `${name}.csv`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
