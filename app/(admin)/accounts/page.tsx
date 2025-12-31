export default function AccountsPage() {
  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">アカウント管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            管理画面にアクセスできるユーザーの管理
          </p>
        </div>

        <a
          href="/accounts/new"
          className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          新規登録
        </a>
      </div>

      {/* 検索・絞り込み */}
      <div className="
        flex flex-col gap-3 sm:flex-row sm:items-center
        rounded-md border border-gray-200 bg-white
        p-3
      ">
        {/* 検索 */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="メールアドレス・備考で検索"
            className="
              w-full
              rounded-md
              border border-gray-300
              px-3 py-2
              text-sm
              focus:outline-none
              focus:ring-1
              focus:ring-emerald-500
            "
          />
        </div>

        {/* ステータス絞り込み */}
        <div className="sm:w-40">
          <select
            className="
              w-full
              rounded-md
              border border-gray-300
              px-3 py-2
              text-sm
              bg-white
              focus:outline-none
              focus:ring-1
              focus:ring-emerald-500
            "
          >
            <option>すべて</option>
            <option>有効</option>
            <option>無効</option>
          </select>
        </div>
      </div>


      {/* 一覧テーブル */}
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">ステータス</th>
              <th className="px-4 py-3 text-left">メールアドレス</th>
              <th className="px-4 py-3 text-left">備考</th>
              <th className="px-4 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody>
            <AccountRow
              status="有効"
              email="admin@example.com"
              note="管理者"
            />
            <AccountRow
              status="無効"
              email="viewer@example.com"
              note="現地確認用"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AccountRow({
  status,
  email,
  note,
}: {
  status: "有効" | "無効";
  email: string;
  note: string;
}) {
  const statusColor =
    status === "有効" ? "text-emerald-600" : "text-gray-400";

  return (
    <tr className=" border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition">
      <td className={`px-4 py-3 ${statusColor}`}>
        {status}
      </td>
      <td className="px-4 py-3">
        <a
          href={`/accounts/1`}
          className="hover:underline hover:text-emerald-600"
        >
          {email}
        </a>
      </td>
      <td className="px-4 py-3 text-gray-600">
        {note}
      </td>
      <td className="px-4 py-3 flex gap-1 justify-end">
        <a href={`/accounts/1`} className="rounded-md border border-emerald-200 px-2 py-1 text-xs text-emerald-600 hover:bg-emerald-50 transition">編集</a>
        <button className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 transition">削除</button>
      </td>
    </tr>
  );
}
