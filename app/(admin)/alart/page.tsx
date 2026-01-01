// app/alart/page.tsx

export const metadata = {
  title: "通知先設定 | ドローン撮影画像（画像・動画）のAI解析システム",
};

import AlertSettingClient from "./AlertSettingClient";

export default function AlertSettingPage() {
  return <AlertSettingClient />;
}
