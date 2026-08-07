import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Loader } from "@/components/Loader";
import { MagneticLink } from "@/components/Magnetic";
import { Toaster } from "@/components/ui/sonner";
import { ReactLenis, useLenis } from "lenis/react";
import { InteractiveAI } from "@/components/InteractiveAI";

function NotFoundComponent() {
  return (
    <main className="noise relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[140px]"
        style={{ background: "radial-gradient(circle, oklch(1 0 0 / 10%), transparent 70%)" }}
      />
      <div className="relative">
        <p className="display-xl leading-none">404</p>
        <h1 className="display-md mt-6">This page went dark</h1>
        <p className="body-lg mx-auto mt-4 max-w-md">
          The page you're looking for doesn't exist or has moved somewhere better.
        </p>
        <div className="mt-10 flex justify-center">
          <MagneticLink to="/">Back to Home</MagneticLink>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="display-md">This page didn't load</h1>
        <p className="body-lg mt-4">Something went wrong on our end. Try again or head back home.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-6 py-3 text-xs font-semibold tracking-[0.18em] text-primary-foreground uppercase"
          >
            Try again
          </button>
          <Link
            to="/"
            className="rounded-full border border-border-strong px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ZUARAK — Premium Software & Digital Transformation" },
      {
        name: "description",
        content:
          "ZUARAK designs and engineers premium software, AI products and digital experiences for businesses worldwide.",
      },
      { name: "author", content: "ZUARAK" },
      { property: "og:site_name", content: "ZUARAK" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#000000" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400..700;1,400..700&family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap",
      },
      { rel: "icon", href: "/fav-z.png", type: "image/png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ZUARAK",
          description:
            "Software development, AI solutions and digital transformation studio based in Kozhikode, India.",
          email: "info@zuarak.com",
          telephone: "+91 8714419511",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Opposite Brand Factory, Nadakkavu",
            addressLocality: "Kozhikode",
            addressRegion: "Kerala",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ScrollRestoration />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ScrollRestorer() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, lenis]);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <ReactLenis root options={{ lerp: 0.05, wheelMultiplier: 0.85, smoothWheel: true }}>
      <ScrollRestorer />
      <QueryClientProvider client={queryClient}>
        <Loader />
        <Cursor />
        <ScrollProgress />
        <Nav />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-xs focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <main id="main">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <div className="hidden md:block">
          <InteractiveAI />
        </div>
        <Footer />
        <Toaster position="bottom-right" />
      </QueryClientProvider>
    </ReactLenis>
  );
}
