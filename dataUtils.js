import jsPDF from "jspdf";
import "jspdf-autotable";

export  const exportAllEmployeesToPDF = (data) => {
  const unit = "pt";
  const size = "A4"; 
  const orientation = "portrait"; 
  const marginLeft = 210;
  const doc = new jsPDF(orientation, unit, size);
  doc.setFontSize(25);
  const title = "Registered Employees";
  const headers = [["First Name", "Last Name", "Gender", "Email", "Registered at"]];
  const dataToPDF = data.map(elt=> [elt.firstName, elt.lastName,elt.Gender, elt.email, elt.date]);
  let content = {
    startY: 50,
    head: headers,
    body: dataToPDF
  };
  doc.text(title, marginLeft, 40);
  doc.autoTable(content);
  doc.save("Employees.pdf")
}

export const exportData = (data) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "Employees.json";
  link.click();
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};