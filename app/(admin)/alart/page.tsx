"use client";

import { useState } from "react";

export default function AlertSettingPage() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [lineEnabled, setLineEnabled] = useState(false);

  const [email, setEmail] = useState("admin@example.com");
  const [phone, setPhone] = useState("");
  const [lineLinked, setLineLinked] = useState(false); // 仮ステータス

  return (
    <div className="space-y-8">
       <form className="space-y-6 p-6" action="../dashboard">

      {/* タイトル */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          通知先設定
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          異常検知時の通知手段と連絡先を設定します
        </p>
      </div>

      {/* メール通知 */}
      <div className="rounded-md border border-gray-200 bg-white p-4 space-y-3">
        <label className="flex items-center flex-start gap-3">
          <input
            type="checkbox"
            checked={emailEnabled}
            onChange={(e) => setEmailEnabled(e.target.checked)}
          />
          <h2 className="text-medium font-bold text-gray-700">
            メール通知
          </h2>
        </label>

        {emailEnabled && (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        )}
      </div>

      {/* SMS通知 */}
      <div className="rounded-md border border-gray-200 bg-white p-4 space-y-3">
        <label className="flex items-center flex-start gap-3">

          <input
            type="checkbox"
            checked={smsEnabled}
            onChange={(e) => setSmsEnabled(e.target.checked)}
          />
          <h2 className="text-medium font-bold text-gray-700">
            SMS通知
          </h2>
          
        </label>

        {smsEnabled && (
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09012345678"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        )}

        <p className="text-xs text-gray-500">
          ※ SMSは送信コストが発生します
        </p>
      </div>

      {/* LINE通知 */}
      <div className="rounded-md border border-gray-200 bg-white p-4 space-y-3">
        <label className="flex items-center flex-start gap-3">
        
          <input
            type="checkbox"
            checked={lineEnabled}
            onChange={(e) => setLineEnabled(e.target.checked)}
          />
          <h2 className="text-medium font-bold text-gray-700">
            LINE通知
          </h2>
        </label>

        {lineEnabled && (
          <>
            {!lineLinked ? (
              <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm">
                <p className="text-yellow-800">
                  LINE通知を利用するには、公式アカウントを
                  友だち追加してください。
                </p>
                <button
                  type="button"
                  className="mt-2 inline-block text-sm text-emerald-600 hover:underline"
                >
                  ▶ 友だち追加（QRコード表示）
                </button>
              </div>
            ) : (
              <p className="text-sm text-emerald-600">
                ✔ LINE連携済み
              </p>
            )}
          </>
        )}

        <p className="text-xs text-gray-500">
          ※ LINEは即時性が高く、現場対応向きです
        </p>
      </div>

      {/* ボタン */}
      <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">

        <a href="/dashboard" className="rounded-md border border-gray-300 px-4 py-2 text-sm">
          キャンセル
        </a>
        <input type="submit" value="保存" className="rounded-md bg-emerald-500 px-4 py-2 text-sm text-white"></input>
      </div>
      </form>
    </div>
  );
}
