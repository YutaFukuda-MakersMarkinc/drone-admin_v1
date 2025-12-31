export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* ページタイトル */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          ダッシュボード
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          ドローンによる自動巡回・検知状況の概要
        </p>
      </div>

      {/* ステータスカード */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="現在の警戒レベル"
          value="🔴 危険"
          valueColor="text-red-600"
          sub="熊検知あり"
        />

        <StatusCard
          title="最終フライト実績"
          value="06:00"
          sub="2025-10-01"
        />

        <StatusCard
          title="直近の検知"
          value="北東方向"
          sub="信頼度 91%"
        />

        <StatusCard
          title="本日のフライト数"
          value="2 回"
          sub="予定：3 回"
        />
      </div>

      {/* メインコンテンツ */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 検知サマリー */}
        <div className="lg:col-span-2 rounded-md border border-gray-200 bg-white p-4">
          <h2 className="text-sm font-medium text-gray-900 mb-3">
            最新の検知サマリー
          </h2>

          <div className="space-y-3 text-sm">
            <DetectionRow
              time="06:07"
              direction="北東"
              confidence="91%"
            />
            <DetectionRow
              time="05:42"
              direction="東"
              confidence="88%"
            />
          </div>
        </div>

        {/* ドローン撮影動画 */}
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <h2 className="text-sm font-medium text-gray-900 mb-3">
            最新フライト映像
          </h2>
          
          <div className="relative overflow-hidden rounded bg-black">
            <video
              className="w-full h-48 object-cover"
              controls
              muted
              playsInline
              poster="/video-poster.jpg"
            >
              <source src="/sample-drone.mp4" type="video/mp4" />
              お使いのブラウザは動画再生に対応していません。
            </video>
          </div>
          
          <p className="mt-2 text-xs text-gray-500">
            ※ 自動巡回フライト中に撮影された映像（ダミー）
          </p>
        </div>

      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function StatusCard({
  title,
  value,
  sub,
  valueColor = "text-gray-900",
}: {
  title: string;
  value: string;
  sub?: string;
  valueColor?: string;
}) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-4">
      <p className="text-xs text-gray-500">{title}</p>
      <p className={`mt-2 text-xl font-semibold ${valueColor}`}>
        {value}
      </p>
      {sub && (
        <p className="mt-1 text-xs text-gray-500">
          {sub}
        </p>
      )}
    </div>
  );
}

function DetectionRow({
  time,
  direction,
  confidence,
}: {
  time: string;
  direction: string;
  confidence: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-2">
      <div className="text-gray-700">
        {time} / {direction}
      </div>
      <div className="text-xs text-gray-500">
        信頼度 {confidence}
      </div>
    </div>
  );
}
