import type { Subject } from "./utils";

export const parseGradesFromPdf = async (file: File): Promise<Array<Subject>> => {
  if (file.type !== "application/pdf") {
    throw new Error("Only PDF files are allowed.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/parse_pdf`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Upload failed: ${errorData.detail}`);
  }

  const data = await response.json();
  return data;
};
