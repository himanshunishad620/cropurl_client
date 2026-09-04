export const exportCSV = async (arr) => {
  if (!arr.length) return;
  const { default: Papa } = await import("papaparse");
  const data = arr.map((qr) => ({
    Name: qr.name,
    DestinationURL: qr.destinationURL,
    Status: qr.isActive ? "Active" : "Inactive",
    Date: qr.createdAt,
    Updated: qr.updatedAt,
    Actions: qr.totalEngagement,
    Slug: qr.shortCode,
    QRCode: qr.imgUrl,
  }));

  const csv = Papa.unparse(data);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};
