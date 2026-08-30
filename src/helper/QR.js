import jsPDF from "jspdf";
import config from "../config/config";
export const downloadAsPDF = (imgUrl, name, shortCode) => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imgUrl;

  img.onload = () => {
    const pdf = new jsPDF();

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Title
    pdf.setFontSize(20);
    pdf.text("Here is my QR", pageWidth / 2, 30, {
      align: "center",
    });

    // Description
    pdf.setFontSize(12);
    pdf.text("Scan the QR code to visit:", pageWidth / 2, 42, {
      align: "center",
    });

    // QR
    const qrSize = 120;
    const qrX = (pageWidth - qrSize) / 2;
    const qrY = 55;

    pdf.addImage(img, "PNG", qrX, qrY, qrSize, qrSize);

    // URL
    pdf.setFontSize(11);
    pdf.text(
      `${config.baseUrl}/qr/${shortCode}`,
      pageWidth / 2,
      qrY + qrSize + 15,
      {
        align: "center",
      },
    );

    // CTA
    pdf.setFontSize(14);
    pdf.text("Scan Me!", pageWidth / 2, qrY + qrSize + 32, {
      align: "center",
    });

    // Footer
    pdf.setFontSize(9);
    pdf.text("Powered by QRPilot", pageWidth / 2, pageHeight - 20, {
      align: "center",
    });

    pdf.save(`${name}-${shortCode}.pdf`);
  };
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
