"use client";
import Layout from "@/components/Layout";
import styles from "@/styles/pages/Terms.module.scss";

function TermsPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Terms of Use</h1>
        <p>
          Please read these Terms of Use carefully before using the{" "}
          <a href="https://recipeglobal.in">website</a>.
        </p>
        <p>
          Your access to and use of the Service is conditioned on your
          acceptance of and compliance with these Terms. These Terms apply to
          all visitors, users and others who access or use the Service.
        </p>
        <p>
          By accessing or using the Service you agree to be bound by these
          Terms. If you disagree with any part of the terms then you may not
          access the Service.
        </p>
        <h2>Accounts</h2>
        <p>
          When you create an account with us, you must provide us information
          that is accurate, complete, and current at all times. Failure to do so
          constitutes a breach of the Terms, which may result in immediate
          termination of your account on our Service.
        </p>
        <p>
          You are responsible for safeguarding the password that you use to
          access the Service and for any activities or actions under your
          password, whether your password is with our Service or a third-party
          service.
        </p>
        <p>
          You agree not to disclose your password to any third party. You must
          notify us immediately upon becoming aware of any breach of security or
          unauthorized use of your account.
        </p>
        <h2>Links To Other Web Sites</h2>
        <p>
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by Recipe Global.
        </p>
        <p>
          Recipe Global has no control over, and assumes no responsibility for,
          the content, privacy policies, or practices of any third party web
          sites or services. You further acknowledge and agree that Recipe
          Global shall not be responsible or liable, directly or indirectly, for
          any damage or loss caused or alleged to be caused by or in connection
          with use of or reliance on any such content, goods or services
          available on or through any such web sites or services.
        </p>
        <p>
          We strongly advise you to read the terms and conditions and privacy
          policies of any third-party web sites or services that you visit.
        </p>
      </div>
    </Layout>
  );
}

export default TermsPage;
