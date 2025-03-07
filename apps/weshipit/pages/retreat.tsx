import { Button, Card, Hero, Prose, Text } from '@weshipit/ui';
import { Layout } from '../components/layout';
import React from 'react';
import { linksApi } from './api/links';

export default function CodingRetreat() {
  return (
    <Layout
      withFooter
      seoTitle="Indie Hackers Coding Retreat"
      seoDescription="Looking to take your project to the next level? Join our Indie Hackers Coding Retreat for a week of immersive coding, learning, and networking. Get personalized guidance from experienced developers and connect with like-minded indie hackers."
      ogImageTitle="Join our next coding retreat!"
      callToActionButton={{ name: 'Work with us', href: '/' }}
    >
      <div className="relative">
        <video
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 z-0 h-[150px] w-auto min-w-full max-w-full bg-slate-800 object-cover opacity-20 md:h-[550px]"
          style={{ zIndex: -1 }}
        >
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/849077469/rendition/1080p/file.mp4?loc=external&signature=4d9740bee6a0997e8358e6e039238313d6cf22ff06d6a5a0c6b537368a466e56"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <Hero title="">
          <Text
            as="h1"
            variant="h1"
            className="mt-12 text-center uppercase tracking-tight text-black md:tracking-widest"
          >
            Indie Hackers
            <br />
            <small className="tracking-tight md:tracking-wide">
              Coding Retreat
            </small>
          </Text>

          <div className="mt-12 flex justify-center">
            <Button
              href={linksApi.airtable.CODING_RETREAT_FORM}
              as="a"
              isExternalLink={true}
              size="xl"
            >
              Join our next coding retreat!
            </Button>
          </div>
        </Hero>

        <Prose className="mx-auto max-w-3xl">
          <Card>
            <Text as="p" style={{ marginTop: 0 }}>
              Escape the distractions and dive deep into your coding project at
              our annual Indie Hackers Coding Retreat. Spend a week in a
              beautiful, serene location surrounded by fellow indie hackers and
              experienced developers.
            </Text>
            <Text as="p">
              Our retreat is designed to help you focus, learn, and grow.
            </Text>
            <Text as="p">
              The principle is simple: 1 week, 1 project, 1 goal.
            </Text>
            <ul>
              <li>
                ✍️ Share your goals, challenges, and specific questions before
                the retreat.
              </li>
              <li>
                🧠 We review your materials and create a personalized game plan
                to help you achieve your vision.
              </li>
              <li>
                🗣️ Participate in daily interactive sessions with our team and
                other attendees.
              </li>
              <li>🛠️ Take part in hands-on workshops and coding sessions.</li>
              <li>
                📓 Leave the retreat with actionable advice and a clear path
                forward for your project.
              </li>
              <li>
                💬 Enjoy ongoing support through direct messaging after the
                retreat.
              </li>
            </ul>
            <Text as="p">
              Our goal is to make this retreat the most productive and inspiring
              experience for you. Join us to collaborate, learn, and make
              significant progress on your project in a supportive and focused
              environment.
            </Text>
          </Card>
        </Prose>

        <Prose className="mx-auto mt-12 max-w-3xl">
          <Card>
            <Text as="p">➡️ Next Retreat</Text>
            <Text as="p">📍 Marrakech</Text>
            <Text as="p" style={{ marginTop: 0 }}>
              We’re excited to announce that our next coding retreat will take
              place in Marrakech, a vibrant city that offers the perfect
              backdrop for creativity and focus. From stunning landscapes to
              rich cultural experiences, Marrakech has it all.
            </Text>
            <Text as="p">
              <strong>Date:</strong> October, 2024
            </Text>
            <Text as="p">
              <strong>Location:</strong> A beautiful Riad in the heart of
              Marrakech, Morocco
            </Text>
            <Text as="p">
              <strong>What’s Included:</strong>
            </Text>
            <ul>
              <li>🏡 Accommodation in a traditional Moroccan Riad</li>
              <li>👩‍🏫 Daily interactive sessions</li>
              <li>💻 High-speed internet and workspace</li>
              <li>🚶‍♂️ Cultural excursions and activities</li>
              <li>🧘 Wellness activities like yoga and meditation</li>
              <li>🎉 Networking events and social gatherings</li>
            </ul>
            <Text as="p">
              Don’t miss this opportunity to take your project to the next level
              while enjoying an unforgettable experience in Marrakech. Spaces
              are limited, so be sure to secure your spot early!
            </Text>
            <div className="mt-8 flex justify-center">
              <Button
                href={linksApi.airtable.CODING_RETREAT_FORM}
                isExternalLink={true}
                size="xl"
              >
                Secure Your Spot Now!
              </Button>
            </div>
          </Card>
        </Prose>
      </div>
    </Layout>
  );
}
