/* eslint-disable react/prop-types */
import React from "react";
import * as XLSX from "xlsx";
export default function ExceHistory({ data, fileName = "Lịch sử mua hàng" }) {
  const handleExport = () => {
    // Transform data for Excel format
    const excelData = data.map((history, index) => ({
      STT: index + 1,
      "Mã đơn hàng": history.id,
      "Tên khách hàng": history.username,
      "Ngày đặt hàng": history.created_at.split(" ")[0],
      "Giờ đặt hàng": history.created_at.split(" ")[1],
      "Tổng tiền": history.total_price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
      "Trạng thái": history.status
        .replace("Completed", "Hoàn thành")
        .replace("Cancel", "Đã hủy"),
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
      { wch: 5 }, // STT
      { wch: 30 }, // Mã đơn hàng
      { wch: 40 }, // Tên khách hàng
      { wch: 30 }, // Ngày đặt hàng
      { wch: 30 }, // Giờ đặt hàng
      { wch: 20 }, // Tổng tiền
      { wch: 15 }, // Trạng thái
    ];
    ws["!cols"] = colWidths;

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Lịch sử mua hàng");

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
