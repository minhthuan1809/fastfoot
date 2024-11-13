import * as XLSX from "xlsx";
export default function ExcelStatisticalProduct({
  data,
  fileName = "Doanh thu sản phẩm",
}) {
  const handleExport = () => {
    const excelData = data.map((item, index) => ({
      STT: index + 1,
      "Tên sản phẩm": item.name,
      "Số lượng sản phẩm": item.total_sold,
      "Tổng tiền": item?.total_revenue.toLocaleString("vi-VN") + " VNĐ",
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
      { wch: 5 }, // STT
      { wch: 50 }, // Tên sản phẩm
      { wch: 20 }, // Số lượng sản phẩm
      { wch: 50 }, // Tổng tiền
    ];
    ws["!cols"] = colWidths;

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Doanh thu sản phẩm");

    // Save file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };
  return (
    <div>
      {" "}
      <button
        onClick={handleExport}
        className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Xuất Excel
      </button>
    </div>
  );
}
