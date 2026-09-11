import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Layout & Components
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChatWidget } from '@/components/ui/ChatWidget';

// Pages - code split for faster initial load
const Home = lazy(() => import('@/pages/Home'));
const Programs = lazy(() => import('@/pages/Programs'));
const About = lazy(() => import('@/pages/About'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Membership = lazy(() => import('@/pages/Membership'));
const Contact = lazy(() => import('@/pages/Contact'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);
  return null;
}

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-black focus:px-4 focus:py-2 focus:font-heading focus:uppercase focus:tracking-widest">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <Layout>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <Switch>
            <Route path="/" component={() => <Suspense fallback={<PageLoader />}><Home /></Suspense>} />
            <Route path="/programs" component={() => <Suspense fallback={<PageLoader />}><Programs /></Suspense>} />
            <Route path="/about" component={() => <Suspense fallback={<PageLoader />}><About /></Suspense>} />
            <Route path="/gallery" component={() => <Suspense fallback={<PageLoader />}><Gallery /></Suspense>} />
            <Route path="/membership" component={() => <Suspense fallback={<PageLoader />}><Membership /></Suspense>} />
            <Route path="/contact" component={() => <Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
            <Route component={NotFound} />
          </Switch>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
          <ChatWidget />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
