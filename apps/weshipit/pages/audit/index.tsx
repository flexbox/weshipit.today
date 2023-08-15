import { LinkButton } from '@weshipit/ui';
import { Layout } from '../../components/layout';

export function Audit() {
  return (
    <Layout
      seoTitle="Audit React Native App - Identify and Address Technical Debt"
      seoDescription={
        'Our React Native Audit Package helps organizations identify and address technical debt in their codebase, improving app performance and stability. Book a call today to learn more.'
      }
      withHeader
      withFooter
      withContainer
    >
      <div className="prose prose-lg dark:prose-invert my-12">
        <h1>Audit React Native Codebase</h1>
        <p>
          React Native Audit Package is directed to organizations that struggle
          with technical debt due to a lack of expertise or capacity within
          their team. We can support your team by conducting the audit and
          allowing your organization to focus on its priorities without a drop
          in its development pace.
        </p>
        <LinkButton href="/onboarding" size="xl" className="no-underline">
          Book a call
        </LinkButton>
        <section>
          <h2>React Native Audit Package</h2>
          <p>
            Audit your React Native codebase to identify and address technical
            debt and improve app performance.
          </p>
        </section>
        <h2>What is React Native Audit?</h2>
        <p>
          Are you seeking someone to review your work and provide specific
          recommendations regarding performance, structure, and tools?
        </p>
        <p>
          Our team has been focused on React Native since 2016, and we can help
          you by conducting an audit or review of your application. Based on the
          findings, we can work together to address any issues, taking into
          account availability and cost. We can also provide recommendations for
          improving your application.
        </p>
        <h2>How does the service work?</h2>
        <p>
          Our service is a fixed fee that covers a one-time project. The process
          typically takes up to 2 weeks to complete. If you require more
          personalized work, you have the option to add additional working hours
          to your package.
        </p>
        <p>
          <em>Here’s how it works:</em>
        </p>
        <h3>Phase 1</h3>
        <ul>
          <li>
            We investigate your codebase and estimate the project (2 working
            days).
          </li>
          <li>
            We write down notes and recommendations, and share the Notion
            database with you.
          </li>
        </ul>
        <h3>Phase 2</h3>
        <ol>
          <li>We upgrade 3rd-party libraries and tools.</li>
          <li>We prepare the upgrade process and share the plan with you.</li>
          <ol>
            <li>
              We decide whether to upgrade to the latest React Native version or
              Expo SDK.
            </li>
            <li>
              We use tools like `dep-check` and `@rnx-kit/align-deps` to
              identify compatibility issues for your app dependencies.
            </li>
          </ol>
          <li>
            Based on our suggestions we add new features and tools to improve
            your stack.
          </li>
          <li>We run tests to ensure a successful upgrade:</li>
          <ol>
            <li>
              this step ideally engages your existing test suite and testing
              team.
            </li>
            <li>
              if necessary we can engage our QA engineers for manual testing.
            </li>
          </ol>
          <li>
            We help you upload the upgraded version to App Store Connect and
            Google Play Store if necessary.
          </li>
        </ol>
        <h2>What can you gain with our React Native Audit Package?</h2>
        <p>
          Auditing the version of your React Native app can provide the
          following benefits:
        </p>
        <ol>
          <li>
            Reduced time and effort - unfortunately, auditing some React Native
            apps can be quite complex, so we can save your time and own the
            entire process to allow you to focus on other important aspects of
            your project.
          </li>
          <li>
            Make sure your app is compatible with libraries - The React Native
            ecosystem is constantly evolving with various libraries, tools, and
            community resources. Ensuring that you have the latest version of
            React Native will make your app compatible with the latest versions
            of these dependencies, reduce compatibility issues, and make it
            easier to integrate new functionalities into your app.
          </li>
          <li>Unblocked release process for App Store and Google Play.</li>
          <li>Access new features and improve DX:</li>
          <ol>
            <li>faster JS execution with the newest Hermes,</li>
            <li>
              easier debugging with React DevTools and better error messages
            </li>
            <li>better web-dev compatibility with flexbox gap support</li>
            <li>
              and many more feature form the changelog
              https://github.com/facebook/react-native/blob/main/CHANGELOG.md
            </li>
          </ol>
        </ol>
        <h2>What else can we do for you?</h2>
        <h3>Long-term maintenance</h3>
        <p>
          You gain peace of mind by freeing yourself from the task of ensuring
          that the product is always available for users. This allows you to
          focus on growing the product instead.
        </p>
        <h3>Improved performance and stability</h3>
        <p>
          Our team ensures that your app uses the most stable and optimized
          version of React Native (RN). By doing so, your app will not only be
          more stable but will also offer better performance for its users.
        </p>
        <LinkButton href="/onboarding" size="xl" className="no-underline">
          Book a call
        </LinkButton>
      </div>
    </Layout>
  );
}

export default Audit;
