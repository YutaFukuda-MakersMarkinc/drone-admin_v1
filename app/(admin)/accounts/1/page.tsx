export default function AccountEditPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">アカウント編集</h1>

      {/* フォームカード */}
      <div className="rounded-md border border-gray-200 bg-white">
        <form className="space-y-6 p-6" action="../accounts">
          {/* ステータス */}
          <Field label="アカウントステータス">
            <select className="input" defaultValue="active">
              <option value="active">有効</option>
              <option value="inactive">無効</option>
            </select>
            <p className="text-xs text-gray-500">
              無効にするとログインできません
            </p>
          </Field>

          {/* メール */}
          <Field label="メールアドレス">
            <input type="email" className="input" defaultValue="admin@example.com"/>
          </Field>

          {/* パスワード */}
          <Field label="パスワード">
            <input
              type="password"
              className="input"
              placeholder="8文字以上"
            />
            <p className="text-xs text-gray-500">
              変更の場合のみ、ご記入ください
            </p>
          </Field>

          {/* 備考 */}
          <Field label="備考">
            <textarea
              className="input"
              rows={3}
              defaultValue={"備考欄を記入"}
            />
          </Field>

          {/* フォームフッター */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
            <a
              href="/accounts"
              className="
                rounded-md
                border border-gray-300
                px-4 py-2
                text-sm text-gray-700
                hover:bg-gray-50
              "
            >
              キャンセル
            </a>

            <input
              type="submit"
              className="
                rounded-md
                bg-emerald-500
                px-4 py-2
                text-sm font-medium
                text-white
                hover:bg-emerald-600
              "
              value="更新"
            >
              
            </input>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Field Component ---------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}
