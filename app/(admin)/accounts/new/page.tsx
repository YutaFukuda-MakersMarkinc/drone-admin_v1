// アカウント新規登録
export const metadata = {
  title: "アカウント新規登録 | ドローン撮影画像（画像・動画）のAI解析システム",
};

export default function AccountCreatePage() {
  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          アカウント新規登録
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          管理画面にアクセスできるユーザーを追加します
        </p>
      </div>

      {/* フォームカード */}
      <div className="rounded-md border border-gray-200 bg-white">
        <form className="space-y-6 p-6" action="../accounts">
          {/* ステータス */}
          <Field label="アカウントステータス">
            <select className="input">
              <option value="active">有効</option>
              <option value="inactive">無効</option>
            </select>
            <p className="text-xs text-gray-500">
              無効にするとログインできません
            </p>
          </Field>

          {/* メール */}
          <Field label="メールアドレス">
            <input
              type="email"
              className="input"
              placeholder="user@example.com"
            />
          </Field>

          {/* パスワード */}
          <Field label="パスワード">
            <input
              type="password"
              className="input"
              placeholder="8文字以上"
            />
            <p className="text-xs text-gray-500">
              初回ログイン時に変更させる運用も可能です
            </p>
          </Field>

          {/* 備考 */}
          <Field label="備考">
            <textarea
              className="input"
              rows={3}
              placeholder="日本語メモ（任意）"
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
