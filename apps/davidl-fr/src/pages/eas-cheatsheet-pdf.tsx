import dynamic from 'next/dynamic';

const PDFGenerator = dynamic(
  () => import('../components/Workshop/EasPDFGenerator'),
  {
    ssr: false,
  },
);

const EasCheatSheetPDFPage = () => <PDFGenerator />;

export default EasCheatSheetPDFPage;
