import jsPDF from "jspdf";
import config from "../config/config";

export const downloadAsPDF = async (
  imgUrl,
  name,
  shortCode,
  websiteUrl = config.clickUrl,
) => {
  if (!imgUrl || !shortCode) {
    throw new Error("imgUrl and shortCode are required to generate a PDF");
  }
  const base64Image = imgUrl;

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Card container
  const cardMargin = 25;
  const cardWidth = pageWidth - cardMargin * 2;
  const cardY = 25;
  const cardHeight = 190;

  pdf.setDrawColor(220, 220, 220);
  pdf.setFillColor(250, 250, 250);
  pdf.roundedRect(cardMargin, cardY, cardWidth, cardHeight, 4, 4, "FD");

  // Title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(20, 20, 20);
  pdf.text("Here is my QR", pageWidth / 2, cardY + 20, { align: "center" });

  // Description
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(90, 90, 90);
  pdf.text("Scan the QR code to visit:", pageWidth / 2, cardY + 30, {
    align: "center",
  });

  // QR code (with white backing in case the PNG has transparency)
  const qrSize = 100;
  const qrX = (pageWidth - qrSize) / 2;
  const qrY = cardY + 40;
  pdf.setFillColor(255, 255, 255);
  pdf.rect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 10, "F");
  pdf.addImage(base64Image, "PNG", qrX, qrY, qrSize, qrSize);

  // Short URL
  const shortUrl = `${config.clickUrl}/q/${shortCode}`;
  pdf.setFontSize(11);
  pdf.setTextColor(40, 40, 40);
  pdf.text(shortUrl, pageWidth / 2, qrY + qrSize + 15, { align: "center" });

  // CTA
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(20, 20, 20);
  pdf.text("Scan Me!", pageWidth / 2, qrY + qrSize + 27, { align: "center" });

  // Website (new)
  if (websiteUrl) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(90, 90, 90);
    pdf.text(websiteUrl, pageWidth / 2, qrY + qrSize + 37, { align: "center" });
  }

  // Footer
  pdf.setFontSize(9);
  pdf.setTextColor(150, 150, 150);
  pdf.text("Powered by CropURL", pageWidth / 2, pageHeight - 15, {
    align: "center",
  });

  pdf.save(`${name || "qr-code"}-${shortCode}.pdf`);
  return true;
};

export const downloadImage = async (imageUrl, name, shortCode) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}-${shortCode}.png`;
  document.body.appendChild(a);
  a.click();

  a.remove();
  URL.revokeObjectURL(url);
};
