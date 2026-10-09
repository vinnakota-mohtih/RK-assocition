import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'RK Associates Pvt. Ltd. | Smart Insurance, Instant Quotes & 99.4% Settlement',
  description: 'RK Associates Pvt. Ltd. provides comprehensive health, life, motor, home, and travel insurance with 15-minute cashless approvals and transparent zero-deductible options.',
  keywords: 'RK Associates, RK Associates Pvt Ltd, insurance, health insurance, life insurance, car insurance, cashless claims, instant quote',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                
                var isExtensionNoise = function(e) {
                  var file = (e && e.filename) || '';
                  var msg = (e && e.message) || (e && typeof e.reason === 'string' ? e.reason : (e && e.reason && e.reason.message)) || '';
                  var stack = (e && e.error && e.error.stack) || (e && e.reason && e.reason.stack) || '';
                  var str = (file + ' ' + msg + ' ' + stack).toLowerCase();
                  
                  return (
                    str.indexOf('chrome-extension:') !== -1 ||
                    str.indexOf('moz-extension:') !== -1 ||
                    str.indexOf('embed_script.js') !== -1 ||
                    str.indexOf('oihbmmeelledioenpfcfehdjhdnlfibj') !== -1 ||
                    str.indexOf('minified react error #299') !== -1
                  );
                };

                window.addEventListener('error', function(e) {
                  if (isExtensionNoise(e)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(e) {
                  if (isExtensionNoise(e)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                }, true);

                // Filter noisy extension logs from console.error
                var originalError = console.error;
                console.error = function() {
                  var args = Array.prototype.slice.call(arguments);
                  var text = args.map(function(a) { return String(a || ''); }).join(' ').toLowerCase();
                  if (
                    text.indexOf('chrome-extension:') !== -1 ||
                    text.indexOf('moz-extension:') !== -1 ||
                    text.indexOf('embed_script.js') !== -1 ||
                    text.indexOf('oihbmmeelledioenpfcfehdjhdnlfibj') !== -1 ||
                    text.indexOf('minified react error #299') !== -1
                  ) {
                    return;
                  }
                  return originalError.apply(console, arguments);
                };
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <div className="site-wrapper" suppressHydrationWarning>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}
