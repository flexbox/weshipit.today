import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import light from '../Theme/light';

Font.register({
  family: 'Source Code Pro',
  src: 'https://fonts.gstatic.com/s/sourcecodepro/v6/mrl8jkM18OlOQN8JLgasD9zbP97U9sKh0jjxbPbfOKg.ttf',
});

// Styles for the PDF
const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  page: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    padding: 8,
    flex: 1,
    gap: 12,
  },
  box: {},
  h1: {
    paddingHorizontal: 8,
    fontSize: 18,
  },
  h1small: {
    fontSize: 14,
    color: light.text.quarternary,
  },
  h2: {
    fontSize: 14,
    marginBottom: 5,
  },
  body: {
    fontSize: 10,
    marginBottom: 2,
    color: light.text.quarternary,
  },
  code: {
    fontSize: 10,
    fontFamily: 'Source Code Pro',
    color: light.accent.pink,
  },
  link: {
    fontSize: 10,
    color: light.accent.blue,
    textDecoration: 'underline',
  },
});

// Component to generate the PDF
const EasCheatSheetPDF = () => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.flex}>
        <Text style={styles.h1}>
          EAS CLI Command Cheat Sheet
          <Text style={styles.h1small}> by David Leuliette</Text>
        </Text>
        <Text style={styles.link}>davidl.fr/bootcamp</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.box}>
            <Text style={styles.h2}>Installation</Text>
            <Text style={styles.body}>
              Run the latest EAS CLI without pinning a global:
            </Text>
            <Text style={styles.code}>npx eas-cli@latest --version</Text>
            <Text style={styles.body}>Or install globally:</Text>
            <Text style={styles.code}>npm install -g eas-cli</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Authentication</Text>
            <Text style={styles.body}>Manage your EAS account access:</Text>
            <Text style={styles.code}>eas login</Text>
            <Text style={styles.code}>eas logout</Text>
            <Text style={styles.code}>eas whoami</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Project Configuration</Text>
            <Text style={styles.body}>
              Set up and configure your Expo project for EAS:
            </Text>
            <Text style={styles.code}>eas init</Text>
            <Text style={styles.code}>eas build:configure</Text>
            <Text style={styles.code}>eas update:configure</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Builds</Text>
            <Text style={styles.body}>
              Create builds for your app on EAS Build:
            </Text>
            <Text style={styles.code}>eas build</Text>
            <Text style={styles.code}>eas build --platform=ios</Text>
            <Text style={styles.code}>eas build --platform=android</Text>
            <Text style={styles.code}>eas build --profile=preview</Text>
            <Text style={styles.code}>eas build --auto-submit</Text>
            <Text style={styles.code}>eas build --local</Text>
            <Text style={styles.code}>eas build:list</Text>
            <Text style={styles.code}>eas build:view</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Submissions</Text>
            <Text style={styles.body}>Submit your app to app stores:</Text>
            <Text style={styles.code}>eas submit --platform=ios</Text>
            <Text style={styles.code}>eas submit --platform=android</Text>
            <Text style={styles.body}>
              Shortcut to build + submit to TestFlight:
            </Text>
            <Text style={styles.code}>npx testflight</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Updates</Text>
            <Text style={styles.body}>
              Manage over-the-air updates for your app:
            </Text>
            <Text style={styles.code}>eas update</Text>
            <Text style={styles.code}>eas update --branch [branch-name]</Text>
            <Text style={styles.code}>
              eas update --message &quot;Update message&quot;
            </Text>
            <Text style={styles.code}>eas update:list</Text>
            <Text style={styles.code}>eas update:view</Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.box}>
            <Text style={styles.h2}>Device Management</Text>
            <Text style={styles.body}>Manage devices for iOS development:</Text>
            <Text style={styles.code}>eas device:create</Text>
            <Text style={styles.code}>eas device:list</Text>
            <Text style={styles.code}>eas device:delete</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Channels</Text>
            <Text style={styles.body}>
              Manage update channels for your app:
            </Text>
            <Text style={styles.code}>eas channel:create</Text>
            <Text style={styles.code}>eas channel:edit</Text>
            <Text style={styles.code}>eas channel:view</Text>
            <Text style={styles.code}>eas channel:list</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Branches</Text>
            <Text style={styles.body}>
              Work with different branches of your project:
            </Text>
            <Text style={styles.code}>eas branch:create</Text>
            <Text style={styles.code}>eas branch:delete</Text>
            <Text style={styles.code}>eas branch:list</Text>
            <Text style={styles.code}>eas branch:rename</Text>
            <Text style={styles.code}>eas branch:view</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Environment Variables</Text>
            <Text style={styles.body}>Modern env vars (replaces secrets):</Text>
            <Text style={styles.code}>eas env:create</Text>
            <Text style={styles.code}>eas env:list</Text>
            <Text style={styles.code}>eas env:update</Text>
            <Text style={styles.code}>eas env:delete</Text>
            <Text style={styles.code}>eas env:pull</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Webhooks</Text>
            <Text style={styles.body}>
              Set up and manage webhooks for automated workflows:
            </Text>
            <Text style={styles.code}>eas webhook:create</Text>
            <Text style={styles.code}>eas webhook:delete</Text>
            <Text style={styles.code}>eas webhook:list</Text>
            <Text style={styles.code}>eas webhook:update</Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.box}>
            <Text style={styles.h2}>Hosting (Web)</Text>
            <Text style={styles.body}>Deploy a web export to EAS Hosting:</Text>
            <Text style={styles.code}>npx expo export -p web</Text>
            <Text style={styles.code}>eas deploy</Text>
            <Text style={styles.code}>eas deploy --prod</Text>
            <Text style={styles.code}>eas deploy:list</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Workflows (CI/CD)</Text>
            <Text style={styles.body}>
              Run pipelines from .eas/workflows/*.yml:
            </Text>
            <Text style={styles.code}>eas workflow:run release.yml</Text>
            <Text style={styles.code}>eas workflow:list</Text>
            <Text style={styles.code}>eas workflow:view</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Metadata & Diagnostics</Text>
            <Text style={styles.code}>eas metadata:pull</Text>
            <Text style={styles.code}>eas metadata:push</Text>
            <Text style={styles.code}>eas diagnostics</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Troubleshooting</Text>
            <Text style={styles.body}>Align dependencies:</Text>
            <Text style={styles.code}>npx expo install --check</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.h2}>Debug your build</Text>
            <Text style={styles.body}>Run the native app locally:</Text>
            <Text style={styles.code}>npx expo run:ios</Text>
            <Text style={[styles.code, { marginBottom: 12 }]}>
              npx expo run:android
            </Text>

            <Text style={styles.body}>Pick a device:</Text>
            <Text style={styles.code}>npx expo run:ios --device</Text>
            <Text style={styles.code}>npx expo run:android --device</Text>
          </View>

          <Text style={styles.body}>
            Run `eas help [command]` for details on any command.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

// PDF viewer component
const PDFGenerator = () => (
  <PDFViewer width="100%" height="1024px">
    <EasCheatSheetPDF />
  </PDFViewer>
);

export default PDFGenerator;
