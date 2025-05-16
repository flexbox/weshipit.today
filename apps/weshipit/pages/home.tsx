import { Text, Button, Card, Avatar } from '@weshipit/ui';
import { Layout } from '../components/layout';
import {
  CalendarIcon,
  CheckCircleIcon,
  StarIcon,
} from '@heroicons/react/20/solid';

export default function HomePage() {
  return (
    <Layout
      withContainer
      withFooter
      seoTitle="React Native Experts"
      seoDescription="At our React Native Development Agency, we specialize in creating high-quality, performant, and scalable mobile applications using the latest technologies and best practices. Our team of experienced developers can help you bring your idea to life and deliver a seamless user experience across all platforms. Contact us today to discuss your project and get a free quote."
      ogImageTitle="React Native Experts"
      callToActionButton={{ name: 'Work with us', href: '/' }}
    >
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <div className="space-y-6 text-center">
          <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-medium">
            Elite React Native Development
          </div>
          <Text as="h1" variant="h1">
            Break free from
            <br />
            the <span className="text-red-600">99% App failure rate</span>
          </Text>
          <Text as="p" variant="p1" className="max-w-2xl mx-auto">
            Users make their decision in just <strong>5 seconds</strong>. Don't
            let broken design and poor UX kill your app before it has a chance
            to succeed.
          </Text>
        </div>

        {/* Expert Credentials */}
        <Card>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex -space-x-4">
              <Avatar
                email="dleuliette@gmail.com"
                className="w-20 h-20 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-slate-500"
                name="David Leuliette"
              />

              <div className="w-20 h-20 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-slate-500">
                MD
              </div>
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <StarIcon
                  className="h-5 w-5 text-yellow-500"
                  fill="currentColor"
                />
                <Text as="h2" variant="h4">
                  Join the Top 1% of Mobile Apps
                </Text>
              </div>
              <p className="text-slate-700">
                I'm <strong>David</strong>, a top 20 Stack Overflow contributor
                with 9 years of specialized React Native expertise. Together
                with <strong>Matthys</strong>, we transform struggling apps into
                user-retaining experiences that dominate the market.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  France-based
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  English communication
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100 space-y-4">
            <h3 className="text-xl font-bold">No Lock-In Contracts</h3>
            <p className="text-slate-600">
              Forget those 6-month minimum commitments and mountains of
              paperwork. Our service is available on-demand—start, pause, or
              cancel anytime. Get expert development exactly when you need it.
            </p>
            <div className="pt-4">
              <Button>
                <CalendarIcon className="mr-2 h-4 w-4" /> Schedule Flexible
                Support
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100 space-y-4">
            <h3 className="text-xl font-bold">Custom Partnership Options</h3>
            <p className="text-slate-600">
              Choose between ongoing development partnership or targeted
              skill-building workshops for your team. We adapt our services to
              match exactly what your project requires.
            </p>
            <div className="pt-4">
              <Button>Explore Workshops</Button>
            </div>
          </div>
        </div>

        {/* Urgency CTA */}
        <div className="text-center space-y-6 bg-gradient-to-r from-blue-50 to-indigo-50 py-10 px-6 rounded-2xl">
          <h2 className="text-3xl font-bold">
            Don't Let Your App Become Another Statistic
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            It's {new Date().toLocaleTimeString()} for us right now, but we're
            ready to discuss how we can transform your app into a user-magnet.
          </p>
          <Button size="lg">Book Your Free Strategy Call</Button>
          <p className="text-sm text-slate-500">
            No obligation. Discover if we're the right fit for your project.
          </p>
        </div>

        {/* Navigation Hint */}
        <div className="text-center text-slate-600">
          <p>
            Continue scrolling to see partnership details or{' '}
            <a
              href="#workshops"
              className="text-indigo-600 font-medium hover:underline"
            >
              jump directly to workshops →
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
