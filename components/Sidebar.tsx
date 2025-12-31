"use client";

import { useEffect, useState } from "react";

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside
      className="shrink-0"
      dangerouslySetInnerHTML={{
        __html: `
<div x-data="sidebarState()" class="h-full">

  <!-- ========================= -->
  <!-- Mobile Header -->
  <!-- ========================= -->
  <div class="flex items-center justify-between p-4 md:hidden border-b border-gray-200">
    <button @click="mobileOpen = true" class="text-xl text-gray-600">☰</button>
  </div>

  <!-- ========================= -->
  <!-- Desktop Sidebar -->
  <!-- ========================= -->
  <nav class="hidden md:block w-64 h-full bg-gray-50 border-r border-gray-200 p-4 space-y-2">

    <a href="/dashboard" :class="isActive('/dashboard')" class="block rounded-md px-3 py-2 text-sm hover:bg-gray-100">
      🏠 ダッシュボード
    </a>

    <div>
      <button @click="toggle('schedules')" class="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-gray-100">
        ⏰ フライトスケジュール
      </button>
      <div x-show="isOpen('schedules')" x-transition class="pl-6 text-xs text-gray-600 space-y-1">
        <a href="/schedules" class="block py-1 hover:underline">編集</a>
      </div>
    </div>

    <div>
      <button @click="toggle('report')" class="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-gray-100">
        📷 フライトレポート
      </button>
      <div x-show="isOpen('report')" x-transition class="pl-6 text-xs text-gray-600 space-y-1">
        <a href="/report" class="block py-1 hover:underline">一覧</a>
      </div>
    </div>

    <div>
      <button @click="toggle('alart')" class="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-gray-100">
        ❗ 通知先設定
      </button>
      <div x-show="isOpen('alart')" x-transition class="pl-6 text-xs text-gray-600 space-y-1">
        <a href="/alart" class="block py-1 hover:underline">編集</a>
      </div>
    </div>

    <div>
      <button @click="toggle('accounts')" class="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-gray-100">
        👦 アカウント管理
      </button>
      <div x-show="isOpen('accounts')" x-transition class="pl-6 text-xs text-gray-600 space-y-1">
        <a href="/accounts" class="block py-1 hover:underline">一覧</a>
        <a href="/accounts/new" class="block py-1 hover:underline">新規追加</a>
      </div>
    </div>

    <a href="/" :class="isActive('/dashboard')" class="block rounded-md px-3 py-2 text-sm hover:bg-gray-100">
      🚪 ログアウト
    </a>

  </nav>

  <!-- ========================= -->
  <!-- Mobile Sidebar Overlay -->
  <!-- ========================= -->
  <div x-show="mobileOpen" x-transition class="fixed inset-0 z-40 md:hidden">

    <!-- Background -->
    <div class="absolute inset-0 bg-black/40" @click="mobileOpen = false"></div>

    <!-- Sidebar -->
    <nav class="relative bg-gray-50 w-full h-full p-4 space-y-2">

      <div class="flex items-center justify-between mb-4">
        <span class="font-semibold text-gray-900">メニュー</span>
        <button @click="mobileOpen = false" class="text-xl text-gray-600">✕</button>
      </div>

      <a href="/dashboard" class="block rounded-md px-3 py-2 text-sm hover:bg-gray-100">
        🚪 ダッシュボード
      </a>

      <div>
        <button @click="toggle('schedules')" class="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-gray-100">
          ⏰ フライトスケジュール
        </button>
        <div x-show="isOpen('schedules')" x-transition class="pl-6 text-xs text-gray-600 space-y-1">
          <a href="/schedules" class="block py-1">一覧</a>
          <a href="/schedules/new" class="block py-1">新規追加</a>
        </div>
      </div>

      <div>
        <button @click="toggle('report')" class="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-gray-100">
          📷 フライトレポート
        </button>
        <div x-show="isOpen('report')" x-transition class="pl-6 text-xs text-gray-600 space-y-1">
          <a href="/report" class="block py-1">一覧</a>
        </div>
      </div>

      <div>
        <button @click="toggle('alart')" class="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-gray-100">
          ❗ 通知先設定
        </button>
        <div x-show="isOpen('alart')" x-transition class="pl-6 text-xs text-gray-600 space-y-1">
          <a href="/alart" class="block py-1">編集</a>
        </div>
      </div>

      <div>
        <button @click="toggle('accounts')" class="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-gray-100">
          👦 アカウント管理
        </button>
        <div x-show="isOpen('accounts')" x-transition class="pl-6 text-xs text-gray-600 space-y-1">
          <a href="/accounts" class="block py-1">一覧</a>
          <a href="/accounts/new" class="block py-1">新規追加</a>
        </div>
      </div>

    </nav>
  </div>

</div>
        `,
      }}
    />
  );
}
