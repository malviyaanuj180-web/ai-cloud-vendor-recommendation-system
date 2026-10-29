import { useTranslation } from "react-i18next";
import { Bookmark, Bell, UserRound } from "lucide-react";
import { Save } from "lucide-react";

import SetupGuide from "./setupguide.jsx";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import "./dashboard.css";

const providers = [
  {
    
    name: "AWS",
    icon: "a",
    className: "aws",
    description: "A broad cloud platform for computing, storage, databases and AI.",
    website: "https://aws.amazon.com/",
    console: "https://console.aws.amazon.com/",
    overview:
      "Amazon Web Services (AWS) provides cloud infrastructure and managed services for applications of different sizes, from small projects to large enterprise systems.",
    services: [
      { name: "Amazon EC2", category: "Compute", description: "Run virtual servers in the cloud." },
      { name: "Amazon S3", category: "Storage", description: "Store files, backups and application data." },
      { name: "Amazon RDS", category: "Database", description: "Use managed relational databases." },
      { name: "Amazon EKS", category: "Containers", description: "Run and manage Kubernetes applications." },
      { name: "Amazon SageMaker", category: "AI & ML", description: "Build, train and deploy machine learning models." },
    ],
    advantages: [
      "Broad selection of cloud services",
      "Flexible infrastructure and scaling options",
      "Large ecosystem of tools and integrations",
    ],
    useCases: [
      "Web and mobile applications",
      "Scalable APIs and backend systems",
      "Data processing and machine learning",
      "Backup and disaster recovery",
    ],
    pricing:
      "Pay-as-you-go options are available for many services. Costs depend on resource size, running time, storage, data transfer and region. Free offers and eligibility can vary.",
    bestFor: "Teams needing a broad range of cloud services and flexible infrastructure.",
  },
  {
    name: "Microsoft Azure",
    icon: "A",
    className: "azure",
    description: "Cloud services for application development and enterprise workloads.",
    website: "https://azure.microsoft.com/",
    console: "https://portal.azure.com/",
    overview:
      "Microsoft Azure offers cloud computing, data, AI and application services. It can be especially useful for organizations already using Microsoft technologies.",
    services: [
      { name: "Azure Virtual Machines", category: "Compute", description: "Run Windows or Linux virtual machines." },
      { name: "Azure Blob Storage", category: "Storage", description: "Store unstructured data and files." },
      { name: "Azure SQL Database", category: "Database", description: "Use a managed relational database service." },
      { name: "Azure Kubernetes Service", category: "Containers", description: "Deploy and manage Kubernetes workloads." },
      { name: "Azure AI Foundry", category: "AI", description: "Build and manage AI applications and solutions." },
    ],
    advantages: [
      "Strong integration with Microsoft services",
      "Options for hybrid and enterprise environments",
      "A wide range of data and AI services",
    ],
    useCases: [
      "Enterprise applications",
      "Applications using Microsoft technologies",
      "Hybrid cloud deployments",
      "Data analytics and AI solutions",
    ],
    pricing:
      "Pricing varies by service, region, resource configuration and usage. Some services offer consumption-based billing, while others offer reserved or committed-use options.",
    bestFor: "Organizations that value Microsoft ecosystem integration and hybrid-cloud options.",
  },
  {
    name: "Google Cloud",
    icon: "G",
    className: "google",
    description: "Cloud infrastructure with strong data analytics, Kubernetes and AI offerings.",
    website: "https://cloud.google.com/",
    console: "https://console.cloud.google.com/",
    overview:
      "Google Cloud provides infrastructure, managed databases, data analytics, container services and AI tools for building and operating modern applications.",
    services: [
      { name: "Compute Engine", category: "Compute", description: "Run virtual machines on Google infrastructure." },
      { name: "Cloud Storage", category: "Storage", description: "Store objects, files and backups." },
      { name: "Cloud SQL", category: "Database", description: "Use managed relational databases." },
      { name: "Google Kubernetes Engine", category: "Containers", description: "Deploy and manage containerized applications." },
      { name: "Vertex AI", category: "AI & ML", description: "Develop and deploy machine learning and AI solutions." },
    ],
    advantages: [
      "Strong data analytics and AI capabilities",
      "Managed Kubernetes services",
      "Tools for modern cloud-native applications",
    ],
    useCases: [
      "Data analytics and processing",
      "AI and machine learning applications",
      "Containerized applications",
      "Web services and scalable backends",
    ],
    pricing:
      "Costs depend on service usage, region, resource configuration, storage and network traffic. Eligible services may have free usage allowances or commitment-based discounts.",
  
    bestFor: "Teams focused on analytics, AI, Kubernetes and cloud-native development.",
  },
  {
    name: "Oracle Cloud",
    icon: "O",
    className: "oracle",
    description: "Cloud infrastructure for enterprise applications, databases and workloads.",
    website: "https://www.oracle.com/cloud/",
    console: "https://cloud.oracle.com/",
    overview: "Oracle Cloud Infrastructure provides compute, storage, networking, database and AI services for enterprise workloads.",
    services: [
      { name: "OCI Compute", category: "Compute", description: "Run virtual machines and compute instances." },
      { name: "Object Storage", category: "Storage", description: "Store files, backups and application data." },
      { name: "Autonomous Database", category: "Database", description: "Use an automated Oracle database service." },
      { name: "OKE", category: "Containers", description: "Manage Kubernetes applications." },
      { name: "OCI AI Services", category: "AI", description: "Build applications using cloud AI services." },
    ],
    advantages: ["Strong Oracle database ecosystem", "Flexible compute infrastructure", "Enterprise-focused cloud services"],
    useCases: ["Enterprise applications", "Database workloads", "Data analytics", "Backup and recovery"],
    pricing: "Costs depend on the selected services, region, configuration and usage. Check Oracle's official pricing for current rates.",
    bestFor: "Organizations using Oracle databases and enterprise applications.",
  },
  {
    name: "IBM Cloud",
    icon: "I",
    className: "ibm",
    description: "Enterprise cloud services with hybrid-cloud and AI capabilities.",
    website: "https://www.ibm.com/cloud",
    console: "https://cloud.ibm.com/",
    overview: "IBM Cloud offers infrastructure, managed services, data tools and AI capabilities for business workloads.",
    services: [
      { name: "Virtual Servers", category: "Compute", description: "Provision cloud virtual servers." },
      { name: "Cloud Object Storage", category: "Storage", description: "Store and retrieve unstructured data." },
      { name: "IBM Cloud Databases", category: "Database", description: "Use managed database services." },
      { name: "Red Hat OpenShift", category: "Containers", description: "Deploy and manage containerized applications." },
      { name: "watsonx", category: "AI", description: "Explore IBM's AI and data platform." },
    ],
    advantages: ["Hybrid-cloud capabilities", "Enterprise-focused services", "AI and data tools"],
    useCases: ["Enterprise systems", "Hybrid-cloud applications", "Data and AI workloads", "Containerized applications"],
    pricing: "Costs vary by service, region and consumption. Check IBM's official pricing for current rates.",
    bestFor: "Businesses seeking hybrid-cloud and enterprise solutions.",
  },
  {
    name: "DigitalOcean",
    icon: "D",
    className: "digitalocean",
    description: "Developer-friendly cloud infrastructure for applications and startups.",
    website: "https://www.digitalocean.com/",
    console: "https://cloud.digitalocean.com/",
    overview: "DigitalOcean offers straightforward cloud infrastructure and managed services for developers and growing businesses.",
    services: [
      { name: "Droplets", category: "Compute", description: "Run virtual machines for applications." },
      { name: "Spaces", category: "Storage", description: "Store and serve object data." },
      { name: "Managed Databases", category: "Database", description: "Use managed database clusters." },
      { name: "Kubernetes", category: "Containers", description: "Deploy containerized applications." },
      { name: "App Platform", category: "Application Hosting", description: "Deploy applications without managing servers." },
    ],
    advantages: ["Developer-friendly interface", "Simple deployment workflows", "Useful managed hosting options"],
    useCases: ["Web applications", "Startups and prototypes", "APIs and backends", "Development environments"],
    pricing: "Costs depend on the selected resources, storage, traffic and managed services. Verify current rates on DigitalOcean's website.",
    bestFor: "Developers, startups and small-to-medium applications.",
  },
  {
    name: "Akamai Cloud",
    icon: "A",
    className: "akamai",
    description: "Cloud computing with a focus on distributed infrastructure and edge delivery.",
    website: "https://www.akamai.com/",
    console: "https://cloud.linode.com/",
    overview: "Akamai's cloud computing offerings include infrastructure and services associated with its Linode cloud platform.",
    services: [
      { name: "Cloud Compute", category: "Compute", description: "Run cloud virtual machines." },
      { name: "Object Storage", category: "Storage", description: "Store application files and data." },
      { name: "Managed Databases", category: "Database", description: "Use managed database offerings where available." },
      { name: "Kubernetes Engine", category: "Containers", description: "Run containerized workloads." },
      { name: "Edge Services", category: "Edge", description: "Deliver applications and content closer to users." },
    ],
    advantages: ["Distributed infrastructure options", "Edge delivery expertise", "Developer-oriented cloud services"],
    useCases: ["Web hosting", "APIs and application backends", "Content delivery", "Globally distributed applications"],
    pricing: "Pricing varies by product, configuration and usage. Check the relevant Akamai cloud product page for current rates.",
    bestFor: "Applications that benefit from cloud infrastructure and edge delivery.",
  },
  {
    name: "Alibaba Cloud",
    icon: "A",
    className: "alibaba",
    description: "Cloud infrastructure, data and AI services with a strong Asia-Pacific presence.",
    website: "https://www.alibabacloud.com/",
    console: "https://home-intl.console.aliyun.com/",
    overview: "Alibaba Cloud provides compute, storage, database, networking and AI services for businesses and applications.",
    services: [
      { name: "Elastic Compute Service", category: "Compute", description: "Run scalable cloud instances." },
      { name: "Object Storage Service", category: "Storage", description: "Store files, backups and object data." },
      { name: "ApsaraDB", category: "Database", description: "Use managed database services." },
      { name: "Container Service for Kubernetes", category: "Containers", description: "Manage Kubernetes workloads." },
      { name: "Machine Learning Platform for AI", category: "AI & ML", description: "Develop and operate machine learning workflows." },
    ],
    advantages: ["Broad cloud service catalogue", "Strong regional presence in Asia", "Compute, database and AI offerings"],
    useCases: ["Web applications", "Data processing", "Enterprise systems", "Applications serving Asian markets"],
    pricing: "Costs depend on region, configuration, service and usage. Consult Alibaba Cloud's official pricing pages for current rates.",
    bestFor: "Businesses needing cloud infrastructure, particularly for Asian markets.",
  },
];


const navItems = [
  { id: "overview", icon: "▦", labelKey: "Overview" },
  { id: "recommendations", icon: "✧", labelKey: "Recommendations" },
  { id: "comparison", icon: "⇄", labelKey: "Compare Providers" },
  { id: "cost", icon: "₹", labelKey: "Cost Estimator" },
  {
    id: "saved",
    icon: <Bookmark size={20} />,
    labelKey: "Saved Recommendations",
  },
  { id: "settings", icon: "⚙", labelKey: "Settings" },
];
const initialForm = {
  provider: "AWS",
  region: "ap-south-1",
  plan: "On-demand",
  cpu: "2",
  ram: "4",
  instances: "1",
  hoursPerDay: "24",
  storage: "50",
  storageType: "SSD",
  database: true,
  databaseType: "sql",
  databaseSize: "small",
  databaseStorage: "20",
  databaseBackupDays: "7",
  outboundGB: "50",
  workload: "Web Application",
  traffic: "Medium",
  budget: "100",
  priority: "Balanced",
};
const monthlyCostData = [
  { month: "Jan", cost: 18000 },
  { month: "Feb", cost: 21500 },
  { month: "Mar", cost: 19500 },
  { month: "Apr", cost: 24800 },
  { month: "May", cost: 22500 },
  { month: "Jun", cost: 28000 },
];

const providerCostData = [
  { provider: "AWS", cost: 24000 },
  { provider: "Azure", cost: 22000 },
  { provider: "Google Cloud", cost: 20000 },
];


export default function Dashboard({ user, onLogout }) {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(
  () => localStorage.getItem("cloudwiseTheme") || "light"
);
const [showAllResults, setShowAllResults] = useState(false);
const [notificationsOpen, setNotificationsOpen] = useState(false);
const [profileOpen, setProfileOpen] = useState(false);

const notificationUserKey = (
  user?.email || user?.name || "guest"
).toLowerCase();

const notificationStorageKey =
  `cloudwiseNotifications_${notificationUserKey}`;

const [notifications, setNotifications] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem(notificationStorageKey) || "[]"
    );
  } catch {
    return [];
  }
});

function addNotification(notification) {
  setNotifications((previous) => [
    {
      id: `${Date.now()}-${Math.random()}`,
      ...notification,
      read: false,
      time: new Date().toLocaleString(),
    },
    ...previous,
  ]);
}

function markAllNotificationsRead() {
  setNotifications((previous) =>
    previous.map((notification) => ({
      ...notification,
      read: true,
    }))
  );
}

const handleThemeChange = (newTheme) => {
  setTheme(newTheme);
  localStorage.setItem("cloudwiseTheme", newTheme);
};

useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);

  const navigate = useNavigate();
  const [page, setPage] = useState("overview");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  
const [costEstimate, setCostEstimate] = useState(null);
const [costLoading, setCostLoading] = useState(false);
const [costError, setCostError] = useState("");

  const [results, setResults] = useState([]);
  const [setupProvider, setSetupProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("cloudwiseSaved") || "[]"
      );
    } catch {
      return [];
    }
  });
const removeSaved = (id) => {
  const updatedSaved = saved.filter(
    (item) => String(item.id) !== String(id)
  );

  setSaved(updatedSaved);

  localStorage.setItem(
    "cloudwiseSaved",
    JSON.stringify(updatedSaved)
  );
};
  const API_URL = import.meta.env.VITE_API_URL || "";

 
useEffect(() => {
  localStorage.setItem(
    notificationStorageKey,
    JSON.stringify(notifications)
  );
}, [notifications, notificationStorageKey]);

useEffect(() => {
  const welcomeKey =
    `cloudwiseWelcomeShown_${notificationUserKey}`;

  if (!localStorage.getItem(welcomeKey)) {
    localStorage.setItem(welcomeKey, "true");

    addNotification({
      type: "welcome",
      title: "Welcome to CloudWise!",
      message:
        "Explore cloud recommendations and compare providers to find the right option for your workload.",
    });
  }
}, [notificationUserKey]);


  const changePage = (id) => {
    setPage(id);
    setMenuOpen(false);
    setError("");
  };
const openProvider = (provider) => {
  setSelectedProvider(provider);
  setPage("provider-details");
  setMenuOpen(false);
  setError("");
};
  const updateForm = (event) => {
    setForm((old) => ({
      ...old,
      [event.target.name]: event.target.value,
    }));
  };

function calculateCloudCost(event) {
  event.preventDefault();

  setCostLoading(true);
  setCostError("");
  setCostEstimate(null);

  try {
    const cpu = Number(form.cpu);
    const ram = Number(form.ram);
    const instances = Number(form.instances);
    const hoursPerDay = Number(form.hoursPerDay);
    const storage = Number(form.storage);
    const databaseStorage = form.database
      ? Number(form.databaseStorage)
      : 0;
    const outboundGB = Number(form.outboundGB);

    if (
      cpu <= 0 ||
      ram <= 0 ||
      instances <= 0 ||
      hoursPerDay <= 0 ||
      hoursPerDay > 24 ||
      storage < 0 ||
      databaseStorage < 0 ||
      outboundGB < 0
    ) {
      throw new Error("Please enter valid resource values.");
    }

    // Illustrative rates only — not actual provider prices.
    const computeCost = cpu * 0.03 * hoursPerDay * 30 * instances;
    const memoryCost = ram * 0.004 * hoursPerDay * 30 * instances;
    const storageCost = storage * 0.02;
    const databaseCost = databaseStorage * 0.10;
    const trafficCost = outboundGB * 0.05;

    const monthlyCost =
      computeCost +
      memoryCost +
      storageCost +
      databaseCost +
      trafficCost;

    setCostEstimate({
      provider: form.provider,
      region: form.region,
      pricing_plan: form.plan,
      monthly_cost: Number(monthlyCost.toFixed(2)),
      currency: "USD",
      demo: true,
      breakdown: {
        compute: Number(computeCost.toFixed(2)),
        memory: Number(memoryCost.toFixed(2)),
        storage: Number(storageCost.toFixed(2)),
        database: Number(databaseCost.toFixed(2)),
        outbound_traffic: Number(trafficCost.toFixed(2)),
      },
    });
  } catch (err) {
    setCostError(err.message || "Unable to estimate the cost.");
  } finally {
    setCostLoading(false);
  }
}


function generateRecommendations(event) {
  event.preventDefault();
  setError("");
  setLoading(true);
  setResults([]);

  try {
    const workload = form.workload;
    const priority = form.priority;
    const budget = Number(form.budget);
    const cpu = Number(form.cpu);
    const ram = Number(form.ram);
    const storage = Number(form.storage);
    const traffic = form.traffic;

    // Local cloud service catalogue for the demo.
    const catalogue = {
      "Web Application": [
        {
          provider: "AWS",
          service: "AWS App Runner",
          fit: 10,
          cost: 8,
          performance: 8,
          scalability: 9,
          reliability: 9,
          reason: "Managed deployment for web applications and APIs.",
        },
        {
          provider: "Microsoft Azure",
          service: "Azure App Service",
          fit: 10,
          cost: 8,
          performance: 8,
          scalability: 9,
          reliability: 9,
          reason: "Managed hosting with deployment and scaling features.",
        },
        {
          provider: "Google Cloud",
          service: "Cloud Run",
          fit: 9,
          cost: 9,
          performance: 8,
          scalability: 10,
          reliability: 9,
          reason: "Serverless containers that scale with application traffic.",
        },
      ],

      "Mobile Application": [
        {
          provider: "AWS",
          service: "AWS Amplify",
          fit: 9,
          cost: 8,
          performance: 8,
          scalability: 9,
          reliability: 9,
          reason: "Tools for building and hosting mobile application backends.",
        },
        {
          provider: "Microsoft Azure",
          service: "Azure App Service",
          fit: 8,
          cost: 8,
          performance: 8,
          scalability: 9,
          reliability: 9,
          reason: "Managed backend hosting for mobile application APIs.",
        },
        {
          provider: "Google Cloud",
          service: "Firebase",
          fit: 10,
          cost: 9,
          performance: 8,
          scalability: 9,
          reliability: 9,
          reason: "Mobile-focused backend services, authentication and data tools.",
        },
      ],

      "Machine Learning": [
        {
          provider: "AWS",
          service: "Amazon SageMaker AI",
          fit: 10,
          cost: 6,
          performance: 10,
          scalability: 9,
          reliability: 9,
          reason: "Managed tools for training, deploying and managing ML models.",
        },
        {
          provider: "Microsoft Azure",
          service: "Azure Machine Learning",
          fit: 10,
          cost: 6,
          performance: 10,
          scalability: 9,
          reliability: 9,
          reason: "A managed platform for ML experiments and model deployment.",
        },
        {
          provider: "Google Cloud",
          service: "Vertex AI",
          fit: 10,
          cost: 7,
          performance: 10,
          scalability: 10,
          reliability: 9,
          reason: "Managed ML development, training and inference services.",
        },
      ],

      "Data Analytics": [
        {
          provider: "AWS",
          service: "Amazon Athena",
          fit: 9,
          cost: 9,
          performance: 8,
          scalability: 9,
          reliability: 9,
          reason: "Query data in S3 without managing database servers.",
        },
        {
          provider: "Microsoft Azure",
          service: "Azure Synapse Analytics",
          fit: 9,
          cost: 7,
          performance: 9,
          scalability: 9,
          reliability: 9,
          reason: "Analytics services for querying and processing large datasets.",
        },
        {
          provider: "Google Cloud",
          service: "BigQuery",
          fit: 10,
          cost: 8,
          performance: 10,
          scalability: 10,
          reliability: 9,
          reason: "Managed analytics for large-scale data queries.",
        },
      ],

      "Database": [
        {
          provider: "AWS",
          service: "Amazon RDS",
          fit: 10,
          cost: 8,
          performance: 9,
          scalability: 9,
          reliability: 9,
          reason: "Managed relational database service.",
        },
        {
          provider: "Microsoft Azure",
          service: "Azure SQL Database",
          fit: 10,
          cost: 8,
          performance: 9,
          scalability: 9,
          reliability: 9,
          reason: "Managed SQL database with built-in administration features.",
        },
        {
          provider: "Google Cloud",
          service: "Cloud SQL",
          fit: 10,
          cost: 8,
          performance: 9,
          scalability: 9,
          reliability: 9,
          reason: "Managed relational databases with simplified maintenance.",
        },
      ],

      "Development & Testing": [
        {
          provider: "AWS",
          service: "AWS Lightsail",
          fit: 9,
          cost: 9,
          performance: 7,
          scalability: 7,
          reliability: 8,
          reason: "Simplified cloud infrastructure for development and testing.",
        },
        {
          provider: "Microsoft Azure",
          service: "Azure App Service",
          fit: 9,
          cost: 8,
          performance: 8,
          scalability: 9,
          reliability: 9,
          reason: "Managed application hosting for test and development environments.",
        },
        {
          provider: "Google Cloud",
          service: "Cloud Run",
          fit: 9,
          cost: 9,
          performance: 8,
          scalability: 10,
          reliability: 9,
          reason: "Run containerized applications without managing servers.",
        },
      ],

      "Storage & Backup": [
        {
          provider: "AWS",
          service: "Amazon S3",
          fit: 10,
          cost: 9,
          performance: 8,
          scalability: 10,
          reliability: 10,
          reason: "Object storage for files, backups and application data.",
        },
        {
          provider: "Microsoft Azure",
          service: "Azure Blob Storage",
          fit: 10,
          cost: 9,
          performance: 8,
          scalability: 10,
          reliability: 10,
          reason: "Scalable object storage for unstructured data and backups.",
        },
        {
          provider: "Google Cloud",
          service: "Cloud Storage",
          fit: 10,
          cost: 9,
          performance: 8,
          scalability: 10,
          reliability: 10,
          reason: "Object storage for application files, datasets and backups.",
        },
      ],
    };

   
const baseServices = catalogue[workload];

if (!baseServices) {
  throw new Error("Please select a valid workload type.");
}

const additionalProviderProfiles = [
  {
    provider: "Oracle Cloud",
    fit: 9,
    cost: 9,
    performance: 9,
    scalability: 9,
    reliability: 9,
    serviceNames: {
      "Web Application": "OCI Compute",
      "Mobile Application": "OCI Compute",
      "Machine Learning": "OCI Data Science",
      "Data Analytics": "OCI Analytics",
      "Database": "Autonomous Database",
      "Development & Testing": "OCI Compute",
      "Storage & Backup": "OCI Object Storage",
    },
    reason: "Offers enterprise infrastructure and database services.",
  },
  {
    provider: "IBM Cloud",
    fit: 8,
    cost: 7,
    performance: 9,
    scalability: 8,
    reliability: 9,
    serviceNames: {
      "Web Application": "IBM Cloud Code Engine",
      "Mobile Application": "IBM Cloud Code Engine",
      "Machine Learning": "watsonx",
      "Data Analytics": "IBM Analytics Engine",
      "Database": "IBM Cloud Databases",
      "Development & Testing": "IBM Cloud Virtual Servers",
      "Storage & Backup": "IBM Cloud Object Storage",
    },
    reason: "Provides enterprise cloud, data and hybrid-cloud capabilities.",
  },
  {
    provider: "DigitalOcean",
    fit: 9,
    cost: 9,
    performance: 8,
    scalability: 8,
    reliability: 8,
    serviceNames: {
      "Web Application": "App Platform",
      "Mobile Application": "App Platform",
      "Machine Learning": "Cloud Compute",
      "Data Analytics": "Cloud Compute",
      "Database": "Managed Databases",
      "Development & Testing": "Droplets",
      "Storage & Backup": "Spaces Object Storage",
    },
    reason: "Offers straightforward infrastructure for developers and growing applications.",
  },
  {
    provider: "Akamai Cloud",
    fit: 8,
    cost: 9,
    performance: 8,
    scalability: 8,
    reliability: 8,
    serviceNames: {
      "Web Application": "Cloud Compute",
      "Mobile Application": "Cloud Compute",
      "Machine Learning": "Cloud Compute",
      "Data Analytics": "Cloud Compute",
      "Database": "Cloud Compute",
      "Development & Testing": "Cloud Compute",
      "Storage & Backup": "Object Storage",
    },
    reason: "Offers developer-oriented infrastructure and distributed cloud capabilities.",
  },
  {
    provider: "Alibaba Cloud",
    fit: 9,
    cost: 8,
    performance: 9,
    scalability: 9,
    reliability: 9,
    serviceNames: {
      "Web Application": "Elastic Compute Service",
      "Mobile Application": "Function Compute",
      "Machine Learning": "Machine Learning Platform for AI",
      "Data Analytics": "MaxCompute",
      "Database": "ApsaraDB",
      "Development & Testing": "Elastic Compute Service",
      "Storage & Backup": "Object Storage Service",
    },
    reason: "Provides a broad cloud service catalogue, including compute, storage and data services.",
  },
];

const services = [
  ...baseServices,
  ...additionalProviderProfiles.map((profile) => ({
    provider: profile.provider,
    service: profile.serviceNames[workload],
    fit: profile.fit,
    cost: profile.cost,
    performance: profile.performance,
    scalability: profile.scalability,
    reliability: profile.reliability,
    reason: profile.reason,
  })),
];


    if (!services) {
      throw new Error("Please select a valid workload type.");
    }

    if (
      !Number.isFinite(budget) ||
      budget <= 0 ||
      !Number.isFinite(cpu) ||
      cpu < 1 ||
      !Number.isFinite(ram) ||
      ram < 1 ||
      !Number.isFinite(storage) ||
      storage < 1
    ) {
      throw new Error(
        "Enter a valid budget and positive CPU, RAM and storage values."
      );
    }

    // The weights change according to the user's selected priority.
    const weightsByPriority = {
      Balanced: {
        fit: 0.40,
        cost: 0.35,
        scalability: 0.25,
        performance: 0,
        reliability: 0,
      },
      "Lowest Cost": {
        fit: 0.25,
        cost: 0.50,
        scalability: 0.15,
        performance: 0.05,
        reliability: 0.05,
      },
      Performance: {
        fit: 0.25,
        cost: 0.15,
        scalability: 0.15,
        performance: 0.35,
        reliability: 0.10,
      },
      Scalability: {
        fit: 0.25,
        cost: 0.15,
        scalability: 0.40,
        performance: 0.15,
        reliability: 0.05,
      },
      Reliability: {
        fit: 0.25,
        cost: 0.15,
        scalability: 0.15,
        performance: 0.10,
        reliability: 0.35,
      },
    };

    const weights = {
      ...(weightsByPriority[priority] ||
        weightsByPriority.Balanced),
    };

    // Higher traffic increases the importance of scalability.
    if (traffic === "High" || traffic === "Very High") {
      weights.scalability += 0.10;
      weights.cost -= 0.05;
      weights.fit -= 0.05;
    }

    const ranked = services.map((item) => {
      // Each catalogue rating is on a 1–10 scale.
      // Convert the weighted result into a percentage.
      const weightedScore =
        (
          item.fit * weights.fit +
          item.cost * weights.cost +
          item.scalability * weights.scalability +
          item.performance * weights.performance +
          item.reliability * weights.reliability
        ) * 10;

      const score = Math.round(weightedScore);

      const priorityExplanation = {
        Balanced:
          "balances workload suitability, cost suitability and scalability",
        "Lowest Cost":
          "gives extra weight to the catalogue's cost-suitability rating",
        Performance:
          "gives extra weight to performance and workload suitability",
        Scalability:
          "gives extra weight to scalability for changing workloads",
        Reliability:
          "gives extra weight to the catalogue's reliability rating",
      }[priority] || "balances workload suitability, cost and scalability";

      const trafficExplanation = {
        Low: "You selected low expected traffic.",
        Medium: "You selected medium expected traffic.",
        High: "You selected high expected traffic.",
        "Very High": "You selected very high expected traffic.",
      }[traffic];

      const personalizedReason =
        `For your ${workload.toLowerCase()}, this service has a ` +
        `${item.fit}/10 workload-fit rating and a ` +
        `${item.scalability}/10 scalability rating. ` +
        `${priorityExplanation}. ` +
        `${trafficExplanation} ` +
        `Your budget is ${budget} in the currency you entered, ` +
        `and your requested resources are ${cpu} CPU core(s), ` +
        `${ram} GB RAM and ${storage} GB storage. ` +
        `These resource requirements should be verified against ` +
        `the service's actual configuration and pricing before deployment.`;

      return {
        ...item,
        score,
        reason: item.reason,
        personalizedReason,
        workload,
        priority,
        traffic,
        budget,
        cpu,
        ram,
        storage,
        scoreBreakdown: {
          workloadFit: Math.round(item.fit * 10),
          costSuitability: Math.round(item.cost * 10),
          scalability: Math.round(item.scalability * 10),
          performance: Math.round(item.performance * 10),
          reliability: Math.round(item.reliability * 10),
        },
        monthly_cost: null,
        demo: true,
      };
    });

    ranked.sort((a, b) => b.score - a.score);

    
const estimatedMonthlyCost =
  cpu * 0.03 * 24 * 30 +
  ram * 0.004 * 24 * 30 +
  storage * 0.02;

setResults(ranked);

addNotification({
  type: "recommendation",
  title: "Recommendations ready",
  message: `Found ${ranked.length} cloud options for your ${workload} workload.`,
});

if (estimatedMonthlyCost > budget) {
  if (!sessionStorage.getItem("cloudwiseRecommendationsNotified")) {
  addNotification({
    type: "recommendation",
    title: "Recommendations ready",
    message: `Found ${ranked.length} cloud options for your ${workload} workload.`,
  });

  sessionStorage.setItem("cloudwiseRecommendationsNotified", "true");
}
}

  } catch (err) {
    setError(
      err.message || "Could not generate recommendations."
    );
  } finally {
    setLoading(false);
  }
}


  function saveResult(item) {
    const name =
      item.provider ||
      item.provider_name ||
      item.name ||
      "Cloud option";

    const exists = saved.some(
      (entry) =>
        entry.name === name &&
        JSON.stringify(entry.details) === JSON.stringify(item)
    );

    if (exists) return;

    
setSaved((old) => [
  ...old,
  {
    id: `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`,
    name,
    details: item,
    date: new Date().toLocaleDateString(),
  },
]);

addNotification({
  type: "saved",
  title: "Recommendation saved",
  message: `${name} has been added to your saved recommendations.`,
});

  }
function isRecommendationSaved(item) {
  return saved.some(
    (entry) =>
      entry.details?.provider === item.provider &&
      entry.details?.service === item.service &&
      entry.details?.workload ===
        (item.workload || form.workload)
  );
}
const title =
  page === "provider-details"
    ? selectedProvider?.name || t("providerDetails")
    : t(
        navItems.find((item) => item.id === page)?.labelKey ||
          "overview"
      );
if (setupProvider) {
  return (
    <SetupGuide
      provider={setupProvider}
      onBack={() => setSetupProvider(null)}
    />
  );
}
  return (
    <div className="cw-layout">
      {menuOpen && (
  <button
    type="button"
    className="cw-overlay"
    aria-label="Close navigation"
    onClick={() => setMenuOpen(false)}
  />
)}

      <aside
        className={`cw-sidebar ${
          menuOpen ? "cw-sidebar-open" : ""
        }`}
      >
        <a href="/" className="cw-brand">
          <span className="cw-brand-icon">☁</span>
          <span>
            Cloud<span className="cw-brand-accent">Wise</span>
          </span>
        </a>

        <p className="cw-nav-label">WORKSPACE</p>

        <nav className="cw-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`cw-nav-item ${
                page === item.id ? "active" : ""
              }`}
              onClick={() => changePage(item.id)}
            >
              <span className="cw-nav-icon">{item.icon}</span>
              <span>{t(item.labelKey)}</span>

              {item.id === "saved" && saved.length > 0 && (
                <span className="cw-count">
                  {saved.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="cw-sidebar-bottom">
         

          <div className="cw-user">
            

            <button
  type="button"
  className="cw-logout-button"
  onClick={onLogout}
>
   Logout
</button>
          </div>
        </div>
      </aside>

      <div className="cw-main">
        <header className="cw-topbar">
          <button
            className="cw-menu-toggle"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          <div className="cw-breadcrumb">
            <span>CloudWise</span>
            <span>/</span>
            <strong>{title}</strong>
          </div>

         
<div className="cw-topbar-actions">
  


<div className="cw-notification-wrapper">
  <button
    type="button"
    className="cw-topbar-icon cw-notification-button"
    aria-label="Notifications"
    title="Notifications"
    onClick={() => setNotificationsOpen(!notificationsOpen)}
  >
    <Bell size={21} strokeWidth={1.8} />
   {notifications.some((item) => !item.read) && (
  <span className="cw-notification-dot" />
)}
  </button>

{notificationsOpen && (
  <div className="cw-notification-dropdown">
    <div className="cw-notification-heading">
      <strong>Notifications</strong>

      <button
        type="button"
        onClick={markAllNotificationsRead}
      >
        Mark all read
      </button>
    </div>

    {notifications.length === 0 ? (
      <div className="cw-notification-empty">
        <span>🔔</span>
        <p>You're all caught up!</p>
        <small>No notifications yet.</small>
      </div>
    ) : (
      <div className="cw-notification-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`cw-notification-item ${
              notification.read ? "is-read" : "is-unread"
            }`}
          >
            <span className="cw-notification-symbol">
              {notification.type === "budget"
                ? "💰"
                : notification.type === "saved"
                  ? "🔖"
                  : notification.type === "recommendation"
                    ? "☁️"
                    : "👋"}
            </span>

            <div>
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
              <small>{notification.time}</small>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}

</div>


<div className="cw-profile-wrapper">
  <button
    type="button"
    className="cw-topbar-profile"
    aria-label="Open profile menu"
    title={user?.name || user?.username || "Profile"}
    onClick={() => setProfileOpen(!profileOpen)}
  >
    {(user?.name || user?.username || user?.email || "U")
      .trim()
      .charAt(0)
      .toUpperCase()}
  </button>

  {profileOpen && (
    <div className="cw-profile-dropdown">
      <div className="cw-profile-details">
        <strong>
          {user?.name || user?.username || "CloudWise User"}
        </strong>
        <span>{user?.email || "Email not available"}</span>
      </div>

      <div className="cw-profile-divider" />

      <button
        type="button"
        className="cw-switch-account"
        onClick={() => {
          setProfileOpen(false);
          onLogout?.();
        }}
      >
        <span>＋</span>
        Sign in with another account
      </button>
    </div>
  )}
</div>

</div>

        </header>

        <main className="cw-content">
          {/* OVERVIEW */}
          {page === "overview" && (
            <>
              <PageHeading
                eyebrow="YOUR CLOUD WORKSPACE"
                
                action={
                  <button
                    className="cw-button cw-primary"
                    onClick={() =>
                      changePage("recommendations")
                    }
                  >
                    ✧ Get recommendations
                  </button>
                }
              />

              {/* SUMMARY CARDS */}
              <div className="cw-stats">
                <Stat
                  icon="☁"
                  label="Cloud providers"
                  value="08"
                  note="Platforms to explore"
                />

                <Stat
                  icon="✧"
                  label="Recommendations"
                  value={results.length}
                  note="Local demo results"
                />

                <Stat
  icon={<Bookmark size={20} />}
  label="Saved options"
  value={saved.length}
  note="Saved in this browser"
/>
              </div>

              {/* GRAPHS: positioned between stats and providers */}
              <section className="cloud-insights">
                <div className="insights-heading">
                  <div>
                    <p className="cw-eyebrow">
                      COST & PERFORMANCE OVERVIEW
                    </p>
                    <h2>{t("cloudInsights")}</h2>
                    <p>
                      Track estimated spending and compare
                      cloud provider costs.
                    </p>
                  </div>

                  <span className="demo-label">
                    Demo data
                  </span>
                </div>

                <div className="charts-grid">
                  {/* MONTHLY COST TREND */}
                  <article className="chart-card">
                    <div className="chart-card-heading">
                      <div>
                        <h3>Monthly Cloud Cost Trend</h3>
                        <p className="chart-description">
                          Estimated cost over six months
                        </p>
                      </div>
                      <span className="chart-icon">↗</span>
                    </div>

                    <div className="chart-container">
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <LineChart
                          data={monthlyCostData}
                          margin={{
                            top: 10,
                            right: 10,
                            left: 5,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e2e8f0"
                            vertical={false}
                          />

                          <XAxis
                            dataKey="month"
                            tick={{
                              fontSize: 12,
                              fill: "#64748b",
                            }}
                            axisLine={false}
                            tickLine={false}
                          />

                          <YAxis
                            tickFormatter={(value) =>
                              `₹${value / 1000}k`
                            }
                            tick={{
                              fontSize: 11,
                              fill: "#64748b",
                            }}
                            axisLine={false}
                            tickLine={false}
                            width={48}
                          />

                          <Tooltip
                            contentStyle={{
                              borderRadius: "10px",
                              border: "1px solid #e2e8f0",
                              boxShadow:
                                "0 4px 14px rgba(15,23,42,0.08)",
                            }}
                            formatter={(value) => [
                              `₹${Number(
                                value
                              ).toLocaleString("en-IN")}`,
                              "Estimated monthly cost",
                            ]}
                          />

                          <Line
                            type="monotone"
                            dataKey="cost"
                            name="Monthly cost"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{
                              r: 4,
                              fill: "#6366f1",
                              strokeWidth: 2,
                              stroke: "#ffffff",
                            }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <p className="chart-footnote">
                      Illustrative monthly estimates in INR.
                    </p>
                  </article>

                  {/* PROVIDER COST COMPARISON */}
                  <article className="chart-card">
                    <div className="chart-card-heading">
                      <div>
                        <h3>Provider Cost Comparison</h3>
                        <p className="chart-description">
                          Estimated cost for the same workload
                        </p>
                      </div>
                      <span className="chart-icon">⇄</span>
                    </div>

                    <div className="chart-container">
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <BarChart
                          data={providerCostData}
                          margin={{
                            top: 10,
                            right: 10,
                            left: 5,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e2e8f0"
                            vertical={false}
                          />

                          <XAxis
                            dataKey="provider"
                            tick={{
                              fontSize: 11,
                              fill: "#64748b",
                            }}
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                          />

                          <YAxis
                            tickFormatter={(value) =>
                              `₹${value / 1000}k`
                            }
                            tick={{
                              fontSize: 11,
                              fill: "#64748b",
                            }}
                            axisLine={false}
                            tickLine={false}
                            width={48}
                          />

                          <Tooltip
                            contentStyle={{
                              borderRadius: "10px",
                              border: "1px solid #e2e8f0",
                              boxShadow:
                                "0 4px 14px rgba(15,23,42,0.08)",
                            }}
                            formatter={(value) => [
                              `₹${Number(
                                value
                              ).toLocaleString("en-IN")}`,
                              "Estimated monthly cost",
                            ]}
                          />

                          <Bar
                            dataKey="cost"
                            name="Monthly cost"
                            fill="#6366f1"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={58}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <p className="chart-footnote">
                      Example costs for an identical hypothetical
                      workload.
                    </p>
                  </article>
                </div>

                <p className="chart-note">
                  These charts use illustrative data, not live
                  cloud prices or billing information. Actual
                  costs depend on services, region, configuration,
                  and usage.
                </p>
              </section>
             
              {/* PROVIDER CARDS */}
 

              {/* QUICK ACTIONS */}
              <div className="cw-action-grid">
                <ActionCard
                  icon="✧"
                  title="Find the right cloud"
                  description="Enter your workload requirements to explore suitable cloud services."
                  action="Configure workload"
                  onClick={() =>
                    changePage("recommendations")
                  }
                />

                <ActionCard
                  icon="₹"
                  title="Plan your cloud budget"
                  description="Estimate resource costs and explore the factors that affect pricing."
                  action="Open cost estimator"
                  onClick={() => changePage("cost")}
                />
              </div>
            </>
          )}

{/* INDIVIDUAL PROVIDER DETAILS */}
{page === "provider-details" && selectedProvider && (
  <>
    <button
      className="cw-button cw-outline provider-back-button"
      onClick={() => changePage("comparison")}
    >
      ← Back to Compare Providers
    </button>

    <section className="provider-detail-hero">
      <div
        className={`cw-provider-logo ${selectedProvider.className}`}
      >
        {selectedProvider.icon}
      </div>

      <div className="provider-detail-intro">
        <p className="cw-eyebrow">CLOUD PROVIDER PROFILE</p>
        <h1>{selectedProvider.name}</h1>
        <p>{selectedProvider.description}</p>
      </div>

      <a
        className="cw-button cw-primary provider-website-button"
        href={selectedProvider.website}
        target="_blank"
        rel="noreferrer"
      >
        Official website ↗
      </a>
    </section>

    <section className="cw-panel provider-overview-panel">
      <SectionHeading
        title="Provider overview"
        description={`Get to know ${selectedProvider.name}.`}
      />
      <p className="provider-overview-text">
        {selectedProvider.overview}
      </p>

      <div className="provider-best-for">
        <strong>Best suited for</strong>
        <p>{selectedProvider.bestFor}</p>
      </div>
    </section>

    <SectionHeading
      title="Key cloud services"
      description="Explore commonly used services across different categories."
    />

    <div className="provider-services-grid">
      {selectedProvider.services.map((service) => (
        <article
          className="cw-panel provider-service-card"
          key={service.name}
        >
          <span className="provider-service-category">
            {service.category}
          </span>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </article>
      ))}
    </div>

    <div className="provider-detail-columns">
      <section className="cw-panel provider-info-panel">
        <SectionHeading
          title="Main advantages"
          description="Strengths to consider when comparing providers."
        />

        <ul className="provider-benefit-list">
          {selectedProvider.advantages.map((advantage) => (
            <li key={advantage}>
              <span className="provider-check">✓</span>
              {advantage}
            </li>
          ))}
        </ul>
      </section>

      <section className="cw-panel provider-info-panel">
        <SectionHeading
          title="Common use cases"
          description="Examples of workloads this platform can support."
        />

        <ul className="provider-benefit-list">
          {selectedProvider.useCases.map((useCase) => (
            <li key={useCase}>
              <span className="provider-check">✓</span>
              {useCase}
            </li>
          ))}
        </ul>
      </section>
    </div>

    <section className="cw-panel provider-pricing-panel">
      <div className="provider-pricing-icon">₹</div>

      <div>
        <h2>Understanding pricing</h2>
        <p>{selectedProvider.pricing}</p>
        <p className="cw-muted">
          This is a general overview, not a live price quote.
          Check the provider's pricing calculator before making
          a purchasing decision.
        </p>

        <a
          className="cw-text-button"
          href={
            selectedProvider.name === "AWS"
              ? "https://calculator.aws/"
              : selectedProvider.name === "Microsoft Azure"
                ? "https://azure.microsoft.com/pricing/calculator/"
                : "https://cloud.google.com/products/calculator"
          }
          target="_blank"
          rel="noreferrer"
        >
          Open pricing calculator ↗
        </a>
      </div>
    </section>

    <div className="provider-detail-footer">
      <button
        className="cw-button cw-outline"
        onClick={() => changePage("comparison")}
      >
        ← Compare all providers
      </button>

      <button
        className="cw-button cw-primary"
        onClick={() => changePage("recommendations")}
      >
        Get cloud recommendations →
      </button>
    </div>
  </>
)}

          {/* RECOMMENDATIONS */}
          {page === "recommendations" && (
            <>
              <PageHeading
                eyebrow="SMART CLOUD PLANNING"
                title="Cloud recommendations"
                description="Tell us about your workload to find suitable cloud options."
              />

              <div className="cw-two-column">
                <form
                  className="cw-panel cw-form"
                  onSubmit={generateRecommendations}
                >
                  <SectionHeading
                    title="Workload requirements"
                    description="Configure your infrastructure needs."
                  />

                  <div className="cw-form-grid">
                    <Field label="Workload type">
                      <select
                        name="workload"
                        value={form.workload}
                        onChange={updateForm}
                      >
                        {[
                          "Web Application",
                          "Mobile Application",
                          "Machine Learning",
                          "Data Analytics",
                          "Database",
                          "Development & Testing",
                          "Storage & Backup",
                        ].map((option) => (
                          <option key={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Monthly budget (USD)">
                      <input
                        name="budget"
                        type="number"
                        min="1"
                        required
                        value={form.budget}
                        onChange={updateForm}
                      />
                    </Field>

                    <Field label="CPU cores">
                      <input
                        name="cpu"
                        type="number"
                        min="1"
                        max="256"
                        required
                        value={form.cpu}
                        onChange={updateForm}
                      />
                    </Field>

                    <Field label="RAM (GB)">
                      <input
                        name="ram"
                        type="number"
                        min="1"
                        required
                        value={form.ram}
                        onChange={updateForm}
                      />
                    </Field>

                    <Field label="Storage (GB)">
                      <input
                        name="storage"
                        type="number"
                        min="1"
                        required
                        value={form.storage}
                        onChange={updateForm}
                      />
                    </Field>

                    <Field label="Expected traffic">
                      <select
                        name="traffic"
                        value={form.traffic}
                        onChange={updateForm}
                      >
                        {[
                          "Low",
                          "Medium",
                          "High",
                          "Very High",
                        ].map((option) => (
                          <option key={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Primary priority">
                      <select
                        name="priority"
                        value={form.priority}
                        onChange={updateForm}
                      >
                        {[
                          "Balanced",
                          "Lowest Cost",
                          "Performance",
                          "Scalability",
                          "Reliability",
                        ].map((option) => (
                          <option key={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {error && (
                    <p className="cw-error" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                  type="submit"
                    className="cw-button cw-primary cw-full"
                    disabled={loading}
                  >
                    {loading
                      ? "Generating..."
                      : "Generate recommendations →"}
                  </button>
                </form>

              </div>

{results.length > 0 && (
  <section className="cw-results-section">
    <div className="cw-results-heading">
      <div>
        <h2>Recommendation results</h2>
        <p>
          Cloud options matched to your workload and priorities.
        </p>
      </div>
      <span className="cw-results-count">
        {results.length} options analyzed
      </span>
    </div>

    {(() => {
     const sortedResults = [...results].sort(
  (a, b) => (Number(b.score) || 0) - (Number(a.score) || 0)
);

const best = sortedResults[0];

const getMonthlyCost = (item) =>
  item?.monthly_cost ??
  item?.estimated_cost ??
  item?.monthly_total ??
  item?.monthly_cost_usd ??
  item?.estimated_monthly_cost ??
  item?.cost ??
  item?.price ??
  null;

const recommendationMonthlyCost = getMonthlyCost(best);
const alternatives = sortedResults.slice(1).map((item, index) => ({
  ...item,
  title: "ALTERNATIVE " + (index + 1),
  description: item.reason,
  tradeoff:
    "Review actual pricing, regional availability and service limits before deployment.",
  setup: item.provider,
}));
      const bestName =
        best.provider ||
        best.provider_name ||
        best.name ||
        "Recommended cloud option";

      const bestDescription =
        best.description ||
        best.reason ||
        best.service ||
        "A cloud option selected for your workload requirements.";

      const bestScore = Math.max(
        0,
        Math.min(100, Number(best.score) || 0)
      );

      return (
        <>
         
<article className="cw-featured-result">
  <div className="cw-featured-left">
    <span className="cw-eyebrow">BEST CLOUD MATCH</span>

    <h2 className="cw-recommended-cloud-name">
      {bestName}
    </h2>

    <p className="cw-recommended-service">
      {best.service || "Recommended cloud service"}
    </p>

<div className="cw-match-section">
  <div
    className="cw-match-circle"
    style={{ "--score": `${bestScore}%` }}
    role="progressbar"
    aria-label="Workload match"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={bestScore}
  >
    <div className="cw-match-circle-inner">
      <strong>{bestScore}%</strong>
      <span>Match</span>
    </div>
  </div>

   <p className="cw-match-caption">
    Overall workload match
  </p>
</div>

{/* Cost and setup button on the LEFT */}
<div className="cw-featured-actions">
  
<div className="cw-direct-cost">
  <span>Estimated monthly cost</span>

<strong>
  {recommendationMonthlyCost != null
    ? `$${recommendationMonthlyCost.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })}`
    : "Enter resource details"}
</strong>
<small>Demo estimate</small>


  <small>USD / month</small>

  {costEstimate && (
    <small>
      Based on {costEstimate.provider} · {costEstimate.region}
    </small>
  )}
</div>

  <button
    type="button"
    className="cw-button cw-primary"
    onClick={() =>
      setSetupProvider(best.provider || bestName)
    }
  >
    View setup steps →
  </button>
  <button
  type="button"
  className={`cw-button cw-outline cw-save-icon ${
    isRecommendationSaved(best) ? "is-saved" : ""
  }`}
  
onClick={() => {
  if (isRecommendationSaved(best)) {
    setSaved((prev) => {
      const updatedSaved = prev.filter(
        (entry) =>
          !(
            entry.details?.provider === best.provider &&
            entry.details?.service === best.service &&
            entry.details?.workload === best.workload
          )
      );

      localStorage.setItem(
        "cloudwiseSaved",
        JSON.stringify(updatedSaved)
      );

      return updatedSaved;
    });
  } else {
    saveResult(best);
  }
}}

  title={
    isRecommendationSaved(best)
      ? "Recommendation saved"
      : "Save recommendation"
  }
  aria-label="Save recommendation"
>
 <Bookmark size={20} />
</button>
</div>

</div>

<div className="cw-featured-right">
  
<div className="cw-workload-details">
  <h3>Workload overview</h3>

  <div className="cw-workload-point">
    <div className="cw-fit-row">
      <strong className="cw-fit-label">Workload</strong>
      <div className="cw-fit-track">
        <div className="cw-fit-fill" style={{ width: "95%" }} />
      </div>
      <span className="cw-fit-percentage">95%</span>
    </div>
    
  </div>

  <div className="cw-workload-point">
    <div className="cw-fit-row">
      <strong className="cw-fit-label">Resources</strong>
      <div className="cw-fit-track">
        <div className="cw-fit-fill" style={{ width: "90%" }} />
      </div>
      <span className="cw-fit-percentage">90%</span>
    </div>
    
  </div>

  <div className="cw-workload-point">
    <div className="cw-fit-row">
      <strong className="cw-fit-label">Priority</strong>
      <div className="cw-fit-track">
        <div className="cw-fit-fill" style={{ width: "88%" }} />
      </div>
      <span className="cw-fit-percentage">88%</span>
    </div>
  
  </div>
</div>


   <div className="cw-why-fits">
  <h3>Why it fits</h3>
  <p>{best.reason || bestDescription}</p>
  <p>
    This recommendation matches your selected workload,
    resource requirements, budget, and priorities.
  </p>
</div>
  </div>
</article>

          <div className="cw-alternatives-heading">
            <div>
              <h2>Other options</h2>
            </div>
          </div>

          <div className="cw-alternatives-grid">
            {(showAllResults
  ? alternatives
  : alternatives.slice(0, 2)
).map((item) => (
              <article
                className="cw-alternative-card"
                key={item.provider}
              >
                <div className="cw-alternative-top">
                  <span className="cw-alternative-label">
                    {item.title}
                  </span>
                  <div className="cw-alternative-score">
                    <strong>{item.score}%</strong>
                    <span>match</span>
                  </div>
                </div>

                <h3>{item.provider}</h3>
                <p className="cw-alternative-service">
                  {item.service}
                </p>
                
                <p className="cw-alternative-description">
                  {item.description}
                </p>

                <div className="cw-alternative-tradeoff">
                  <strong>Trade-off:</strong> {item.tradeoff}
                </div>

                

<div className="cw-alternative-actions">

  <div className="cw-direct-cost">
    <span>Estimated monthly cost</span>

    <strong>
      {getMonthlyCost(item) != null
        ? `$${Number(getMonthlyCost(item)).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}`
        : "Unavailable"}
    </strong>

    <small>USD / month</small>
  </div>

  <button
    type="button"
    className="cw-button cw-primary cw-text-button"
    onClick={() => setSetupProvider(item.setup)}
  >
    View setup steps →
  </button>
  
<button
  type="button"
  className={`cw-button cw-outline cw-save-icon ${
    isRecommendationSaved({
      ...item,
      workload: form.workload,
    })
      ? "is-saved"
      : ""
  }`}
 onClick={() => {
  const recommendation = {
    ...item,
    workload: form.workload,
    priority: form.priority,
    budget: Number(form.budget),
    cpu: Number(form.cpu),
    ram: Number(form.ram),
    storage: Number(form.storage),
    demo: true,
  };

  if (isRecommendationSaved(recommendation)) {
    setSaved((prev) =>
      prev.filter(
        (entry) =>
          !(
            entry.details?.provider === recommendation.provider &&
            entry.details?.service === recommendation.service &&
            entry.details?.workload === recommendation.workload
          )
      )
    );
  } else {
    saveResult(recommendation);
  }
}}
  title={
    isRecommendationSaved({
      ...item,
      workload: form.workload,
    })
      ? "Recommendation saved"
      : "Save recommendation"
  }
  aria-label="Save recommendation"
>
  <Bookmark size={20} />
</button>


</div>



              </article>
            ))}
          </div>
              
{alternatives.length > 2 && (
  <div className="cw-view-more-container">
    <button
      type="button"
      className="cw-button cw-outline"
      onClick={() =>
        setShowAllResults((previous) => !previous)
      }
    >
      {showAllResults
        ? "View fewer options ↑"
        : `View more options ↓ (${alternatives.length - 2} more)`}
    </button>
  </div>
)}

          <p className="cw-results-disclaimer">
            Illustrative alternative scores. AWS and Azure have
            not been independently benchmarked by this demo.
            Verify current pricing before deployment.
          </p>
        </>
      );
    })()}
  </section>
)}

            </>
          )}

          {/* PROVIDER COMPARISON */}
          {page === "comparison" && (
            <>
              <PageHeading
      
                title="Compare providers"
                description="Explore common cloud services offered by the major platforms."
              />

              <div className="cw-provider-grid">
                {providers.map((provider) => (
                 <ProviderCard
  key={provider.name}
  provider={provider}
  onClick={() => openProvider(provider)}
/>
                ))}
              </div>

              <div className="cw-panel cw-table-panel">
                <SectionHeading
                  title="Platform capabilities"
                  description="General service overview, not a live benchmark."
                />

                <div className="cw-table-wrap">
                  <table className="cw-table">
                                      <thead>
                      <tr>
                        <th>Capability</th>
                        <th>AWS</th>
                        <th>Azure</th>
                        <th>Google Cloud</th>
                        <th>Oracle Cloud</th>
                        <th>IBM Cloud</th>
                        <th>DigitalOcean</th>
                        <th>Akamai Cloud</th>
                        <th>Alibaba Cloud</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Compute</td>
                        <td>Amazon EC2</td>
                        <td>Azure Virtual Machines</td>
                        <td>Compute Engine</td>
                        <td>OCI Compute</td>
                        <td>Virtual Servers</td>
                        <td>Droplets</td>
                        <td>Cloud Compute</td>
                        <td>Elastic Compute Service</td>
                      </tr>
                      <tr>
                        <td>Object storage</td>
                        <td>Amazon S3</td>
                        <td>Blob Storage</td>
                        <td>Cloud Storage</td>
                        <td>Object Storage</td>
                        <td>Cloud Object Storage</td>
                        <td>Spaces</td>
                        <td>Object Storage</td>
                        <td>Object Storage Service</td>
                      </tr>
                      <tr>
                        <td>Kubernetes</td>
                        <td>Amazon EKS</td>
                        <td>AKS</td>
                        <td>Google Kubernetes Engine</td>
                        <td>OKE</td>
                        <td>Red Hat OpenShift</td>
                        <td>Kubernetes</td>
                        <td>Kubernetes Engine</td>
                        <td>Container Service for Kubernetes</td>
                      </tr>
                      <tr>
                        <td>AI services</td>
                        <td>AWS AI services</td>
                        <td>Azure AI services</td>
                        <td>Vertex AI</td>
                        <td>OCI AI Services</td>
                        <td>watsonx</td>
                        <td>AI services vary by offering</td>
                        <td>AI offerings vary by product</td>
                        <td>Machine Learning Platform for AI</td>
                      </tr>
                      <tr>
                        <td>Managed databases</td>
                        <td>Amazon RDS</td>
                        <td>Azure SQL Database</td>
                        <td>Cloud SQL</td>
                        <td>Autonomous Database</td>
                        <td>IBM Cloud Databases</td>
                        <td>Managed Databases</td>
                        <td>Managed database offerings</td>
                        <td>ApsaraDB</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="cw-disclaimer">
                  Pricing and service availability vary by
                  region and configuration.
                </p>
              </div>
            </>
          )}

          {/* COST ESTIMATOR */}
          {page === "cost" && (
            <>
              <PageHeading
                
                title="Cloud cost estimator"
                description="Configure your infrastructure and request provider pricing for a monthly estimate."
              />

              <form
                className="cw-panel cw-form"
                onSubmit={calculateCloudCost}
              >
                {/* CLOUD CONFIGURATION */}
                <SectionHeading
                  title="Cloud configuration"
                  description="Choose your provider, region and pricing plan."
                />

                <div className="cw-form-grid">
                  <Field label="Cloud provider">
                    <select
                      value={form.provider}
                      onChange={(e) => {
                        const provider = e.target.value;

                        setForm((old) => ({
                          ...old,
                          provider,
                          region:
  provider === "AWS"
    ? "ap-south-1"
    : provider === "Microsoft Azure"
      ? "centralindia"
      : provider === "Google Cloud"
        ? "asia-south1"
        : provider === "Oracle Cloud"
          ? "ap-mumbai-1"
          : provider === "IBM Cloud"
            ? "in-che"
            : provider === "DigitalOcean"
              ? "blr1"
              : provider === "Akamai Cloud"
                ? "ap-south"
                : "ap-south-1",
                        }));

                        setCostEstimate(null);
                      }}
                    >
                      <option value="AWS">Amazon Web Services</option>
                      <option value="Microsoft Azure">Microsoft Azure</option>
                      <option value="Google Cloud">Google Cloud</option>
                      <option value="Oracle Cloud">Oracle Cloud</option>
<option value="IBM Cloud">IBM Cloud</option>
<option value="DigitalOcean">DigitalOcean</option>
<option value="Akamai Cloud">Akamai Cloud</option>
<option value="Alibaba Cloud">Alibaba Cloud</option>
                    </select>
                  </Field>

                  <Field label="Region">
                    <select
                      value={form.region}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          region: e.target.value,
                        }))
                      }
                    >
                      {(
                        form.provider === "AWS"
                          ? [
                              ["ap-south-1", "Mumbai, India"],
                              ["ap-south-2", "Hyderabad, India"],
                              ["us-east-1", "US East"],
                            ]
                          : form.provider === "Microsoft Azure"
                            ? [
                                ["centralindia", "Central India"],
                                ["southindia", "South India"],
                                ["eastus", "US East"],
                              ]
                            : [
                                ["asia-south1", "Mumbai, India"],
                                ["asia-south2", "Delhi, India"],
                                ["us-central1", "Iowa, US"],
                              ]
                      ).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Pricing plan">
                    <select
                      value={form.plan}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          plan: e.target.value,
                        }))
                      }
                    >
                      <option value="On-demand">On-demand</option>
                      <option value="1-year-commitment">
                        1-year commitment
                      </option>
                      <option value="3-year-commitment">
                        3-year commitment
                      </option>
                    </select>
                  </Field>
                </div>

                {/* COMPUTE RESOURCES */}
                <SectionHeading
                  title="Compute resources"
                  description="Specify virtual machine capacity and usage."
                />

                <div className="cw-form-grid">
                  <Field label="CPU cores per instance">
                    <input
                      type="number"
                      min="1"
                      max="256"
                      required
                      value={form.cpu}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          cpu: e.target.value,
                        }))
                      }
                    />
                  </Field>

                  <Field label="RAM per instance (GB)">
                    <input
                      type="number"
                      min="1"
                      max="4096"
                      required
                      value={form.ram}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          ram: e.target.value,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Number of instances">
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      required
                      value={form.instances}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          instances: e.target.value,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Running hours per day">
                    <input
                      type="number"
                      min="1"
                      max="24"
                      required
                      value={form.hoursPerDay}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          hoursPerDay: e.target.value,
                        }))
                      }
                    />
                  </Field>
                </div>

                {/* STORAGE */}
                <SectionHeading
                  title="Storage configuration"
                  description="Specify the storage capacity and storage type."
                />

                <div className="cw-form-grid">
                  <Field label="Storage capacity (GB)">
                    <input
                      type="number"
                      min="1"
                      required
                      value={form.storage}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          storage: e.target.value,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Storage type">
                    <select
                      value={form.storageType}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          storageType: e.target.value,
                        }))
                      }
                    >
                      <option value="SSD">SSD</option>
                      <option value="HDD">HDD</option>
                    </select>
                  </Field>
                </div>

                {/* DATABASE CONFIGURATION */}
                <SectionHeading
                  title="Database configuration"
                  description="Configure your database type, capacity, storage and backup retention."
                />

                <div className="cw-form-grid">
                  <Field label="Database type">
                    <select
                      value={form.databaseType}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          databaseType: e.target.value,
                        }))
                      }
                    >
                      <option value="sql">Relational (SQL)</option>
                      <option value="nosql">NoSQL</option>
                    </select>
                  </Field>

                  <Field label="Database capacity">
                    <select
                      value={form.databaseSize}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          databaseSize: e.target.value,
                        }))
                      }
                    >
                      <option value="small">
                        Small — Development / Student Project
                      </option>
                      <option value="medium">
                        Medium — Regular Application
                      </option>
                      <option value="large">
                        Large — Heavy Workload
                      </option>
                    </select>
                  </Field>

                  <Field label="Database storage (GB)">
                    <input
                      type="number"
                      min="1"
                      required
                      value={form.databaseStorage}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          databaseStorage: e.target.value,
                        }))
                      }
                    />
                  </Field>

                  <Field label="Backup retention">
                    <select
                      value={form.databaseBackupDays}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          databaseBackupDays: e.target.value,
                        }))
                      }
                    >
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                    </select>
                  </Field>
                </div>

                {/* NETWORK USAGE */}
                <SectionHeading
                  title="Network usage"
                  description="Estimate monthly outbound data transfer."
                />

                <div className="cw-form-grid">
                  <Field label="Outbound data transfer (GB/month)">
                    <input
                      type="number"
                      min="0"
                      required
                      value={form.outboundGB}
                      onChange={(e) =>
                        setForm((old) => ({
                          ...old,
                          outboundGB: e.target.value,
                        }))
                      }
                    />
                  </Field>
                </div>

                {costError && (
                  <p className="cw-error" role="alert">
                    {costError}
                  </p>
                )}

                <button
                  className="cw-button cw-primary"
                  type="submit"
                  disabled={costLoading}
                >
                  {costLoading
                    ? "Retrieving provider prices..."
                    : "Calculate monthly cloud cost →"}
                </button>
              </form>

              {/* COST RESULTS */}
              {costEstimate && (
                <section className="cw-panel cw-form">
                  <SectionHeading
                    title="Estimated monthly cost"
                    description={`${form.provider} · ${form.region}`}
                  />

                  <h2>
                    {costEstimate.currency || "USD"}{" "}
                    {costEstimate.monthly_total.toLocaleString(
                      "en-US",
                      { maximumFractionDigits: 2 }
                    )}
                  </h2>

                  <p className="cw-muted">
                    Pricing status:{" "}
                    {costEstimate.pricing_status || "Not specified"}
                  </p>

                  {costEstimate.pricing_as_of && (
                    <p className="cw-muted">
                      Prices retrieved: {costEstimate.pricing_as_of}
                    </p>
                  )}

                  <div className="cw-form-grid">
                    {[
                      ["Compute", costEstimate.breakdown.compute],
                      ["Storage", costEstimate.breakdown.storage],
                      ["Database", costEstimate.breakdown.database],
                      ["Networking", costEstimate.breakdown.network],
                    ].map(([label, amount]) => (
                      <article
                        className="cw-stat-card"
                        key={label}
                      >
                        <p>{label}</p>
                        <strong>
                          {costEstimate.currency || "USD"}{" "}
                          {Number(amount || 0).toLocaleString(
                            "en-US",
                            { maximumFractionDigits: 2 }
                          )}
                        </strong>
                      </article>
                    ))}
                  </div>

                  <p className="cw-muted">
                    Estimates may exclude taxes, discounts, support,
                    licensing, and other charges. Confirm the final
                    amount using the provider's pricing calculator.
                  </p>
                </section>
              )}
            </>
          )}


          {/* SAVED RECOMMENDATIONS */}
          {page === "saved" && (
            <>
              <PageHeading
                eyebrow="YOUR COLLECTION"
                title="Saved recommendations"
                description="Review cloud options saved in this browser."
              />

              {saved.length === 0 ? (
                <EmptyState
                  title="Nothing saved yet"
                  description="Generate recommendations and save the options you want to revisit."
                  action={() =>
                    changePage("recommendations")
                  }
                />
              ) : (
                <div className="cw-saved-list">
                  {saved.map((entry) => (
                    <article
                      className="cw-panel cw-saved-item"
                      key={entry.id}
                    >
                      <div className="cw-provider-logo aws">
                        ☁
                      </div>

                      <div className="cw-saved-info">
                        <h3>{entry.name}</h3>
                        <p>Saved on {entry.date}</p>
                        <p>
                          {entry.details.description ||
                            entry.details.service ||
                            entry.details.instance_type ||
                            "Cloud configuration"}
                        </p>
                      </div>

                      <button
                        className="cw-button cw-outline"
                        onClick={() =>
                          setSaved((old) =>
                            old.filter(
                              (item) => item.id !== entry.id
                            )
                          )
                        }
                      >
                        Remove
                      </button>
                    </article>
                  ))}
                </div>
              )}

              <p className="cw-muted">
                Saved items are stored locally in this browser
                and are not synced across devices.
              </p>
            </>
          )}

          {/* SETTINGS */}
          {page === "settings" && (
            <>
              <PageHeading
            
                title="Settings"
                
              />

              <div className="cw-panel cw-form cw-settings">
                <SectionHeading
                  title="Profile information"
                  
                />

                <Field label="Full name">
                  <input
                    value={user?.name || ""}
                    readOnly
                  />
                </Field>

                <Field label="Email address">
                  <input
                    value={user?.email || ""}
                    readOnly
                  />
                </Field>

                <p className="cw-muted">
                  Profile editing can be enabled when your
                  backend provides a profile update endpoint.
                </p>

<SectionHeading
  title="Appearance"
/>

<div className="cw-appearance-row">
  <div className="cw-appearance-info">
    <span className="cw-appearance-icon">
      {theme === "dark" ? "☾" : "☀"}
    </span>

    <div>
      
      <p>
        {theme === "dark" ? "Dark mode" : "Light mode"}
      </p>
    </div>
  </div>

  <button
    type="button"
    className={`cw-mode-switch ${theme === "dark" ? "is-dark" : ""}`}
    onClick={() =>
      handleThemeChange(theme === "dark" ? "light" : "dark")
    }
    role="switch"
    aria-checked={theme === "dark"}
    aria-label="Toggle dark mode"
  >
    <span className="cw-mode-knob" />
  </button>
</div>


                <button
                  className="cw-button cw-outline"
                  onClick={onLogout}
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </main>

        <footer className="cw-footer">
          <span>© 2026 CloudWise</span>
          <span>Cloud planning, made simpler.</span>
        </footer>
      </div>
    </div>
  );
}

/* REUSABLE COMPONENTS */

function PageHeading({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="cw-page-heading">
      <div>
        <p className="cw-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

function SectionHeading({ title, description }) {
  return (
    <div className="cw-section-heading">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Stat({ icon, label, value, note }) {
  return (
    <article className="cw-stat-card">
      <div className="cw-stat-icon">{icon}</div>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{note}</span>
    </article>
  );
}

const providerLogoUrls = {
  AWS: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/aws/default.svg",
  "Amazon Web Services": "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/aws/default.svg",
 
"Microsoft Azure": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Microsoft_icon.svg",

  "Google Cloud": "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud/default.svg",
  "Oracle Cloud": "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/oracle/default.svg",
"IBM Cloud": "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/ibm/default.svg",
  DigitalOcean: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/digitalocean/default.svg",
  "Akamai Cloud": "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/akamai/default.svg",
  "Alibaba Cloud": "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/alibaba-cloud/default.svg",
};

function ProviderCard({ provider, onClick }) {
  const logoUrl = providerLogoUrls[provider.name];

  return (
    <article className="cw-provider-card">
      <div className={`cw-provider-logo ${provider.className}`}>
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${provider.name} logo`}
            className="cw-provider-logo-image"
          />
        ) : (
          provider.icon
        )}
      </div>

      <h3>{provider.name}</h3>
      <p>{provider.description}</p>

      <button
        className="cw-text-button"
        onClick={onClick}
      >
        Explore provider <span>→</span>
      </button>
    </article>
  );
}


function ActionCard({
  icon,
  title,
  description,
  action,
  onClick,
}) {
  return (
    <article className="cw-panel cw-action-card">
      <div className="cw-action-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>

      <button
        className="cw-text-button"
        onClick={onClick}
      >
        {action} →
      </button>
    </article>
  );
}

function Field({ label, children }) {
  return (
    <label className="cw-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Tip({ title, text }) {
  return (
    <div className="cw-tip">
      <span>✓</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function RecommendationCard({ item, onSave, onSetup }) {
  const name =
    item.provider ||
    item.provider_name ||
    item.name ||
    "Cloud option";

  const cost =
  item.monthly_cost ??
  item.estimated_cost ??
  null;

  const description =
    item.description ||
    item.reason ||
    item.service ||
    "Recommended cloud configuration.";

  return (
    <article className="cw-provider-card cw-recommendation-card">
      <span className="cw-result-tag">
  {item.role || "CLOUD RECOMMENDATION"}
</span>

      <h3>{name}</h3>
      <p>{description}</p>

      
<div className="cw-result-cost">
  {cost != null
    ? `Estimated cost: $${cost}/month`
    : "Cost estimate unavailable"}
</div>

      {item.instance_type && (
        <p>Instance: {item.instance_type}</p>
      )}

      {item.region && <p>Region: {item.region}</p>}

      <button
        type="button"
        className="cw-button cw-primary"
        onClick={onSetup}
      >
        See setup steps →
      </button>

      <button
        type="button"
        className="cw-button cw-outline"
        onClick={onSave}
      >
         Save recommendation
      </button>
    </article>
  );
}


function EmptyState({ title, description, action }) {
  return (
    <div className="cw-panel cw-empty">
      
      <h2>{title}</h2>
      <p>{description}</p>

      <button
        className="cw-button cw-primary"
        onClick={action}
      >
        Explore recommendations →
      </button>
    </div>
  );
}
