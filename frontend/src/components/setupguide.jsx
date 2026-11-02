
import { useLocation, useNavigate } from "react-router-dom";
import "./setupguide.css";

const deploymentGuides = {
  aws: {
    providerName: "AWS",
    serviceName: "AWS Elastic Beanstalk",
    steps: [
      {
        title: "Prepare your application",
        description:
          "Test your application locally. Identify its runtime, dependencies, build process, and required environment variables.",
      },
      {
        title: "Open AWS and configure access",
        description:
          "Sign in to the AWS Management Console. Configure appropriate IAM permissions and review your billing settings.",
      },
      {
        title: "Create an Elastic Beanstalk application",
        description:
          "Open AWS Elastic Beanstalk, create an application, and choose an environment for your web application.",
      },
      {
        title: "Configure your application environment",
        description:
          "Select a supported platform, configure environment properties, and prepare your deployment bundle or source package.",
      },
      {
        title: "Deploy your application",
        description:
          "Upload your application version and deploy it to the Elastic Beanstalk environment. Review events and logs if deployment fails.",
      },
      {
        title: "Test and monitor",
        description:
          "Open the environment URL, test your application, check its health status, and review monitoring and billing.",
      },
    ],
    docs: "https://docs.aws.amazon.com/elasticbeanstalk/",
  },

  azure: {
    providerName: "Microsoft Azure",
    serviceName: "Azure App Service",
    steps: [
      {
        title: "Prepare your web application",
        description:
          "Test your project locally and identify the framework, runtime version, build command, and environment variables.",
      },
      {
        title: "Open the Azure portal",
        description:
          "Sign in to the Azure portal, select an appropriate subscription, and review your resource group and budget settings.",
      },
      {
        title: "Create an Azure App Service",
        description:
          "Create a Web App, select the resource group, region, runtime stack, and an appropriate App Service plan.",
      },
      {
        title: "Configure deployment",
        description:
          "Connect your supported GitHub repository or use another supported deployment method. Configure the build and startup settings when required.",
      },
      {
        title: "Deploy your application",
        description:
          "Run the deployment and inspect deployment logs. Configure environment variables and application settings in the portal.",
      },
      {
        title: "Verify and monitor",
        description:
          "Open your Web App URL, test the application, review logs and health, and monitor resource usage and costs.",
      },
    ],
    docs: "https://learn.microsoft.com/en-us/azure/app-service/",
  },

  google: {
    providerName: "Google Cloud",
    serviceName: "Google Cloud Run",
    steps: [
      {
        title: "Prepare your application",
        description:
          "Test your application locally and identify its runtime, dependencies, listening port, and environment variables.",
      },
      {
        title: "Create a Google Cloud project",
        description:
          "Open Google Cloud Console, select or create a project, configure billing, and choose a supported deployment region.",
      },
      {
        title: "Prepare the deployment source",
        description:
          "Prepare a Dockerfile or use Cloud Run's supported source deployment workflow. Ensure the application listens on the port provided by the platform.",
      },
      {
        title: "Configure Cloud Run",
        description:
          "Create a Cloud Run service, select your source or container image, configure the region, resources, access, and environment variables.",
      },
      {
        title: "Deploy the service",
        description:
          "Deploy your application and review the build and runtime logs. Configure authentication and service permissions according to your needs.",
      },
      {
        title: "Test and monitor",
        description:
          "Open the service URL, test the endpoints, inspect logs and metrics, and monitor request usage and billing.",
      },
    ],
    docs: "https://cloud.google.com/run/docs",
  },
};

const genericGuide = {
  providerName: "Selected cloud",
  serviceName: "the provider's application hosting service",
  steps: [
    {
      title: "Prepare your project",
      description:
        "Test the application locally and identify its runtime, dependencies, build command, and startup command.",
    },
    {
      title: "Configure your cloud account",
      description:
        "Select your project or subscription, configure access permissions, and review billing settings.",
    },
    {
      title: "Choose a hosting service",
      description:
        "Choose a managed application platform that supports your framework and deployment requirements.",
    },
    {
      title: "Configure the application",
      description:
        "Set the runtime, environment variables, build settings, startup command, and required service permissions.",
    },
    {
      title: "Deploy the application",
      description:
        "Use the hosting service's supported source, repository, or container deployment workflow and review its logs.",
    },
    {
      title: "Test and monitor",
      description:
        "Open the deployed URL, test the application, check its logs and health, and review costs.",
    },
  ],
  docs: "https://cloud.google.com/docs",
};

function getGuide(provider) {
  const value = String(provider || "").toLowerCase();

  if (
    value.includes("aws") ||
    value.includes("amazon") ||
    value.includes("elastic beanstalk") ||
    value.includes("app runner")
  ) {
    return deploymentGuides.aws;
  }

  if (
    value.includes("azure") ||
    value.includes("microsoft")
  ) {
    return deploymentGuides.azure;
  }

  if (
    value.includes("google") ||
    value.includes("gcp") ||
    value.includes("cloud run") ||
    value.includes("cloud build")
  ) {
    return deploymentGuides.google;
  }

  return {
    ...genericGuide,
    providerName: provider || genericGuide.providerName,
  };
}

export default function SetupGuide({ provider: selectedProvider, onBack }) {
  const navigate = useNavigate();
  const location = useLocation();

  const provider =
  selectedProvider ||
  location.state?.provider ||
  location.state?.cloud ||
  "Selected cloud";

  const guide = getGuide(provider);
  console.log("Selected provider:", provider);
console.log("Selected guide:", guide.providerName, guide.serviceName);

  return (
    <main className="cw-setup-page">
      <button
       className="cw-setup-back"
  onClick={() => onBack ? onBack() : navigate(-1)}
>
  Back to Recommendations
</button>

      <section className="cw-setup-hero">
        <span className="cw-setup-eyebrow">
          CLOUDWISE DEPLOYMENT GUIDE
        </span>

        <h1>Deploy your project on {guide.providerName}</h1>

        <p>
          Follow the deployment steps for {guide.serviceName}.
          Instructions are specific to the selected cloud platform.
        </p>

        <p>
          <strong>Recommended service:</strong>{" "}
          {guide.serviceName}
        </p>
      </section>

      <section className="cw-setup-content">
        <h2>Deployment steps</h2>

        <p className="cw-setup-subtitle">
          Complete each step before moving to the next one.
        </p>

        <div className="cw-setup-steps">
          {guide.steps.map((step, index) => (
            <article
              className="cw-setup-step"
              key={step.title}
            >
              <div className="cw-setup-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="cw-setup-step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="cw-setup-note">
          <strong>Before you deploy</strong>
          <p>
            Review current pricing, supported regions, permissions,
            and security settings. Never commit passwords, API keys,
            or other secrets to your source code.
          </p>
        </div>

        <button
          type="button"
          className="cw-setup-primary"
          onClick={() =>
            window.open(
              guide.docs,
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          Read official documentation â†—
        </button>
      </section>
    </main>
  );
}

