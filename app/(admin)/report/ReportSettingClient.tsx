"use client";

import { useState } from "react";

type Report = {
  id: number;
  start: string;
  end: string;
  drone: string;
  level: "安全" | "注意" | "危険";
  thumbnail: string;
  video: string;
};

const thumbnails = ["./video1.jpg", "./video2.jpg", "./video3.jpg"];
const videos = ["./video1.mp4", "./video2.mp4", "./video3.mp4"];

const dummyReports: Report[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  start: `2025-02-${String((i % 5) + 1).padStart(2, "0")} 06:00`,
  end: `2025-02-${String((i % 5) + 1).padStart(2, "0")} 06:20`,
  drone: i % 2 === 0 ? "DJI-001" : "DJI-002",
  level: i % 3 === 0 ? "危険" : i % 3 === 1 ? "注意" : "安全",

  thumbnail: thumbnails[i % thumbnails.length],
  video: videos[i % videos.length],
}));


const PAGE_SIZE = 15;

export default function ReportPage() {
  /* 検索 */
const [level, setLevel] = useState("すべて");
const [drone, setDrone] = useState("");
const [startFrom, setStartFrom] = useState("");
const [startTo, setStartTo] = useState("");
const [page, setPage] = useState(1);

  /* モーダル */
  const [selected, setSelected] = useState<Report | null>(null);

  /* フィルタ */
    const filtered = dummyReports.filter((r) => {
      // 警戒レベル
      if (level !== "すべて" && r.level !== level) return false;
    
      // 機体名
      if (drone && !r.drone.includes(drone)) return false;
    
      // 開始日時（From）
      if (startFrom) {
        const from = new Date(startFrom);
        const startDate = new Date(r.start.replace(" ", "T"));
        if (startDate < from) return false;
      }
  
      // 開始日時（To）
      if (startTo) {
        const to = new Date(startTo);
        const startDate = new Date(r.start.replace(" ", "T"));
        if (startDate > to) return false;
      }
  
      return true;
    });


  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  /* 色定義 */
  const rowBg = (level: Report["level"]) => {
    switch (level) {
      case "危険":
        return "bg-red-50";
      case "注意":
        return "bg-yellow-50";
      default:
        return "";
    }
  };

  const badge = (level: Report["level"]) => {
    switch (level) {
      case "危険":
        return "bg-red-100 text-red-700";
      case "注意":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-emerald-100 text-emerald-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* タイトル */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          フライトレポート
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          ドローンのフライト結果と解析内容を確認できます
        </p>
      </div>

        {/* 検索 */}
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <div className="grid gap-4 sm:grid-cols-4 items-end">
            {/* 警戒レベル */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                警戒レベル
              </label>
              <select
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option>すべて</option>
                <option>安全</option>
                <option>注意</option>
                <option>危険</option>
              </select>
            </div>
            
            {/* 機体名 */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                機体名
              </label>
              <input
                type="text"
                placeholder="DJI-001"
                value={drone}
                onChange={(e) => {
                  setDrone(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            
            {/* 開始日時 From */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                開始日時（From）
              </label>
              <input
                type="datetime-local"
                value={startFrom}
                onChange={(e) => {
                  setStartFrom(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            
            {/* 開始日時 To */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                開始日時（To）
              </label>
              <input
                type="datetime-local"
                value={startTo}
                onChange={(e) => {
                  setStartTo(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>


      {/* 一覧 */}
      <div className="overflow-x-auto rounded-md border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">開始</th>
              <th className="px-4 py-2 text-left">終了</th>
              <th className="px-4 py-2 text-left">機体</th>
              <th className="px-4 py-2 text-left">警戒</th>
              <th className="px-4 py-2 text-left">映像</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((r) => (
              <tr
                key={r.id}
                className={`border-t border-gray-200 ${rowBg(r.level)}`}
              >
                <td className="px-4 py-2">{r.start}</td>
                <td className="px-4 py-2">{r.end}</td>
                <td className="px-4 py-2">{r.drone}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded px-2 py-1 text-xs ${badge(r.level)}`}
                  >
                    {r.level}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelected(r)}
                    className="text-emerald-600 hover:underline"
                  >
                    動画を見る
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paged.length === 0 && (
          <div className="p-4 text-center text-sm text-gray-500">
            該当するレポートはありません
          </div>
        )}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-8 w-8 rounded text-sm ${
                page === i + 1
                  ? "bg-emerald-500 text-white"
                  : "border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* モーダル */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-3xl rounded-md bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium">
                フライト映像（{selected.drone}）
              </h2>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>
            <video
              src={selected.video}
              controls
              className="w-full rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
