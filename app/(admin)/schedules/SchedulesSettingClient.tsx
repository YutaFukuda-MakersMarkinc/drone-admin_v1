"use client";

import { useState } from "react";

export default function SchedulePage() {
  /* -----------------------------
   * フライト回数・時間
   * ----------------------------- */
  const [flightCount, setFlightCount] = useState(3);
  const [flightTimes, setFlightTimes] = useState<string[]>([
    "06:00",
    "10:00",
    "14:00",
  ]);

  const handleFlightCountChange = (count: number) => {
    setFlightCount(count);
    setFlightTimes((prev) => {
      const next = [...prev];
      while (next.length < count) next.push("06:00");
      return next.slice(0, count);
    });
  };

  /* -----------------------------
   * カレンダー
   * ----------------------------- */
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  /** 個別指定の休日 */
  const [disabledDates, setDisabledDates] = useState<string[]>([]);

  /** 曜日指定の休日（0:日〜6:土） */
  const [disabledWeekdays, setDisabledWeekdays] = useState<number[]>([]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const formatKey = (day: number) =>
    `${year}-${month + 1}-${day}`;

  const toggleDate = (key: string) => {
    setDisabledDates((prev) =>
      prev.includes(key)
        ? prev.filter((d) => d !== key)
        : [...prev, key]
    );
  };

  const isDisabledByWeekday = (day: number) => {
    const date = new Date(year, month, day);
    return disabledWeekdays.includes(date.getDay());
  };

  return (
    <div className="space-y-8">
      <form className="space-y-6 p-6" action="../dashboard">
        {/* タイトル */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            フライトスケジュール
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            ドローンの自動フライトスケジュールを設定します
          </p>
        </div>

        {/* フライト回数 */}
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            一日あたりのフライト回数
          </label>
          <input
            type="number"
            min={1}
            max={24}
            value={flightCount}
            onChange={(e) =>
              handleFlightCountChange(Number(e.target.value))
            }
            className="w-32 rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        {/* フライト開始時間 */}
        <div className="rounded-md border border-gray-200 bg-white p-4 space-y-3">
          <h2 className="text-sm font-medium text-gray-700">
            フライト開始時間
          </h2>

          {flightTimes.map((time, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                {index + 1}回目
              </span>
              <input
                type="time"
                value={time}
                onChange={(e) => {
                  const next = [...flightTimes];
                  next[index] = e.target.value;
                  setFlightTimes(next);
                }}
                className="w-64 rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          ))}
        </div>

        {/* カレンダー */}
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <h2 className="text-sm font-medium text-gray-700 mb-3">
            休日設定
          </h2>

          {/* 月切替 */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() =>
                setCurrentMonth(new Date(year, month - 1, 1))
              }
              className="text-sm text-gray-500 hover:underline"
            >
              ← 前月
            </button>

            <h2 className="text-sm font-medium text-gray-700">
              {year}年 {month + 1}月
            </h2>

            <button
              type="button"
              onClick={() =>
                setCurrentMonth(new Date(year, month + 1, 1))
              }
              className="text-sm text-gray-500 hover:underline"
            >
              次月 →
            </button>
          </div>

          {/* 曜日一括指定 */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {["日", "月", "火", "水", "木", "金", "土"].map(
              (label, index) => {
                const active = disabledWeekdays.includes(index);

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setDisabledWeekdays((prev) =>
                        prev.includes(index)
                          ? prev.filter((d) => d !== index)
                          : [...prev, index]
                      );
                    }}
                    className={`px-3 py-1 rounded-full text-xs border
                      ${
                        active
                          ? "bg-red-100 border-red-300 text-red-600"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {label}
                  </button>
                );
              }
            )}
          </div>

          {/* 曜日表示 */}
          <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
            {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* 日付 */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: lastDate }).map((_, i) => {
              const day = i + 1;
              const key = formatKey(day);

              const disabled =
                disabledDates.includes(key) ||
                isDisabledByWeekday(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDate(key)}
                  className={`h-10 rounded-md border text-sm
                    ${
                      disabled
                        ? "bg-red-100 border-red-300 text-red-600"
                        : "border-gray-200 hover:bg-emerald-50"
                    }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-xs text-gray-500">
            ※ 赤色にマーキングされている日程は、フライトしません。
          </p>
        </div>

        {/* ボタン */}
        <div className="flex gap-3 justify-end">
          <a
            href="/dashboard"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm"
          >
            キャンセル
          </a>
          <input
            type="submit"
            value="保存"
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm text-white"
          />
        </div>
      </form>
    </div>
  );
}
