export function convertToCSV<T extends object>(data: T[]): string {
  if (!data || data.length === 0) {
    return "";
  }

  const headers = Object.keys(data[0]) as Array<keyof T>;

  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((fieldName) => {
          const value = row[fieldName];
          let cell: string;

          if (value === null || value === undefined) {
            cell = "";
          } else if (typeof value !== "string") {
            cell = String(value);
          } else {
            cell = value;
          }

          cell = cell.replace(/"/g, '""');

          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }

          return cell;
        })
        .join(",")
    ),
  ];

  return csvRows.join("\n");
}

function getCurrentTimestamp(): string {
  const now = new Date();

  const year = now.getFullYear().toString().padStart(4, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const milliseconds = now
    .getMilliseconds()
    .toString()
    .padStart(3, "0")
    .substring(0, 2);

  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
}

function appendTimestampToFileName(
  fileName: string,
  timestamp: string
): string {
  const lastDotIndex = fileName.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return `${fileName}${timestamp}`;
  }

  const namePart = fileName.substring(0, lastDotIndex);
  const extensionPart = fileName.substring(lastDotIndex); // Includes the dot

  return `${namePart}${timestamp}${extensionPart}`;
}

export function downloadCSV(
  csvContent: string,
  fileName: string = "data.csv"
): void {
  const timestamp = getCurrentTimestamp();
  const timestampedFileName = appendTimestampToFileName(fileName, timestamp);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", timestampedFileName);

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToCSV<T extends object>(
  data: T[],
  fileName: string = "data.csv"
) {
  const csv = convertToCSV(data);
  downloadCSV(csv, fileName);
}
