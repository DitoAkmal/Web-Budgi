
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="main-bg">{children}</body>
      <footer className="text-center py-6 mt-10 text-sm text-gray-600">
        © 2026 Budgi. All rights reserved.
      </footer>
    </html>
      
  );
  
}
