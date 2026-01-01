import "./globals.css";

export const metadata = {
  title: {
    default: "ドローン撮影画像（画像・動画）のAI解析システム",
    template: "%s | ドローン撮影画像（画像・動画）のAI解析システム",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        {/* Alpine */}
        <script
          defer
          src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
        />

        {/* Alpine helpers */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function normalize(path) {
                return path.replace(/\\/$/, "");
              }

              function sidebarState() {
                const current = normalize(window.location.pathname);

                const autoOpen = (() => {
                  if (current.startsWith('/dashboard')) return 'dashboard';
                  if (current.startsWith('/schedules')) return 'schedules';
                  if (current.startsWith('/report')) return 'report';
                  if (current.startsWith('/alart')) return 'alart';
                  if (current.startsWith('/accounts')) return 'accounts';
                  return null;
                })();

                return {
                  mobileOpen: false,
                  openKey: autoOpen,

                  toggle(key) {
                    this.openKey = this.openKey === key ? null : key;
                  },

                  isOpen(key) {
                    return this.openKey === key;
                  },

                  isActive(path) {
                    const currentPath = normalize(window.location.pathname);
                    const target = normalize(path);
                    return currentPath === target || currentPath.startsWith(target + '/')
                      ? 'bg-gray-100 font-medium'
                      : '';
                  }
                };
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
