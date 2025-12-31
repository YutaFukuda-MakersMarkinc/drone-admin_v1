export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-md border border-gray-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-gray-900">
          ログイン
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          管理画面へログインしてください
        </p>

        <form action="/dashboard" className="mt-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              パスワード
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <input
            type="submit"
            className="w-full rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            value="ログイン"
          >
          </input>
        </form>
      </div>
    </div>
  );
}
