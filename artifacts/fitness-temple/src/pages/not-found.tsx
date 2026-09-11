import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useSEO } from '@/hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: "404 - Page Not Found | Fitness Temple Gym Pundri",
    description: "Oops! The page you're looking for doesn't exist. Head back to Fitness Temple Gym Pundri to explore strength training, CrossFit, Zumba and membership plans.",
    robots: "noindex, follow",
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] text-white pt-24">
      <Card className="w-full max-w-md mx-4 bg-[#111] border border-white/10 text-white">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">
              404 Page Not Found
            </h1>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            The page you are looking for does not exist or has been moved. Let us get you back on track.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 bg-primary text-black font-heading tracking-widest uppercase text-sm px-6 py-3 rounded-sm hover:bg-white transition-colors"
          >
            Back to Home <ArrowRight className="w-4 h-4" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
