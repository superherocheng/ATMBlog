export const articles = [
  {
    id: 1,
    title: 'Building a Personal Wiki-Style Blog with React',
    excerpt: 'A deep dive into architecting a wiki-style blog using React, Tailwind CSS, and Vite — covering component design, routing patterns, and dark mode implementation.',
    date: '2026-05-20',
    readTime: '8 min read',
    tag: 'Frontend',
  },
  {
    id: 2,
    title: 'Quantitative Finance 101: Mean-Variance Optimization',
    excerpt: 'An introduction to modern portfolio theory, mean-variance optimization, and the efficient frontier with Python implementation examples.',
    date: '2026-05-15',
    readTime: '12 min read',
    tag: 'Finance',
  },
  {
    id: 3,
    title: 'Dockerizing a Vite + React Application',
    excerpt: 'Step-by-step guide to containerizing a Vite-based React application with multi-stage Docker builds, Nginx serving, and docker-compose orchestration.',
    date: '2026-05-10',
    readTime: '10 min read',
    tag: 'DevOps',
  },
  {
    id: 4,
    title: 'Understanding Large Language Models: A Technical Overview',
    excerpt: 'A technical deep dive into transformer architectures, attention mechanisms, and how LLMs like GPT and Claude process and generate text.',
    date: '2026-05-05',
    readTime: '15 min read',
    tag: 'AI',
  },
  {
    id: 5,
    title: 'Open-Source Infrastructure: Building with Linux Containers',
    excerpt: 'Exploring the ecosystem of open-source container technologies including Docker, Podman, and containerd, and how they power modern infrastructure.',
    date: '2026-04-28',
    readTime: '10 min read',
    tag: 'Infrastructure',
  },
  {
    id: 6,
    title: 'Systems Engineering: Reliability Patterns for Distributed Systems',
    excerpt: 'A survey of key reliability patterns including circuit breakers, retries, bulkheads, and chaos engineering for building robust distributed systems.',
    date: '2026-04-20',
    readTime: '12 min read',
    tag: 'Systems',
  },
  {
    id: 7,
    title: 'Tailwind CSS Dark Mode: Strategies and Best Practices',
    excerpt: 'How to implement dark mode in Tailwind CSS using class-based strategies, system preference detection, and persistent user preferences.',
    date: '2026-04-12',
    readTime: '7 min read',
    tag: 'Frontend',
  },
  {
    id: 8,
    title: 'Python for Algorithmic Trading: Backtesting Frameworks',
    excerpt: 'Comparing popular Python backtesting frameworks like Backtrader, Zipline, and vectorbt for developing and evaluating trading strategies.',
    date: '2026-04-05',
    readTime: '11 min read',
    tag: 'Finance',
  },
  {
    id: 9,
    title: 'The Transformer Revolution: From Attention to GPT',
    excerpt: 'Tracing the evolution of transformer models from the original "Attention Is All You Need" paper to modern GPT architectures and beyond.',
    date: '2026-03-28',
    readTime: '14 min read',
    tag: 'AI',
  },
];

export const timelineEvents = [
  { date: '2026-05', event: 'Launched ATM Blog v1 with React, Vite, and Tailwind CSS' },
  { date: '2026-04', event: 'Published series on quantitative finance and algorithmic trading' },
  { date: '2026-03', event: 'Completed deep-dive series on Large Language Model architectures' },
  { date: '2026-02', event: 'Transitioned blog infrastructure to Docker-based deployment' },
  { date: '2026-01', event: 'Started ATM Blog project — personal wiki-style knowledge base' },
  { date: '2025-12', event: 'Open-sourced multiple infrastructure tooling projects on GitHub' },
  { date: '2025-11', event: 'Presented on distributed systems reliability at local meetup' },
  { date: '2025-10', event: 'Contributed to open-source container orchestration tools' },
  { date: '2025-09', event: 'Began systematic study of quantitative finance and trading systems' },
];

export const websitesData = [
  {
    id: 1,
    name: 'ATM Blog',
    url: 'https://atmblog.example.com',
    description: 'Personal wiki-style blog covering AI, infrastructure, quantitative finance, and systems engineering.',
    tech: 'React, Vite, Tailwind CSS, Docker',
    status: 'active',
  },
];

export const navLinks = [
  { label: 'Home', path: 'home' },
  { label: 'Articles', path: 'articles' },
  { label: 'Timeline', path: 'timeline' },
  { label: 'Websites', path: 'websites' },
];

export const articleBodies = {
  1: `
    <h2>Introduction</h2>
    <p>Building a personal blog is a rite of passage for many developers. But building a <em>wiki-style</em> blog — one that emphasizes interconnected knowledge, clean typography, and a reading experience reminiscent of Wikipedia — requires thoughtful architecture.</p>
    <p>In this article, we walk through the design and implementation of ATM Blog, a wiki-style blog built with React 18, Vite, and Tailwind CSS.</p>
    <h2>Architecture Overview</h2>
    <p>The application follows a single-page application (SPA) pattern with client-side navigation. Rather than using a heavy router library like React Router, we implement a lightweight view-switching mechanism using React state.</p>
    <h3>Component Tree</h3>
    <p>The main layout consists of a left sidebar for navigation, a right sidebar for contextual information, a main content area, and mobile-specific navigation elements. This layout adapts responsively across desktop, tablet, and mobile viewports.</p>
    <h2>Dark Mode Implementation</h2>
    <p>Dark mode is implemented using Tailwind's <code>dark:</code> variant with a class-based strategy. The user's preference is persisted in localStorage and defaults to the system preference via <code>prefers-color-scheme</code>.</p>
    <h2>Conclusion</h2>
    <p>Building a wiki-style blog with React and Vite provides a fast, maintainable foundation for sharing technical knowledge. The architecture can scale from a simple personal blog to a more comprehensive knowledge base.</p>
  `,
  2: `
    <h2>Introduction</h2>
    <p>Modern portfolio theory (MPT), introduced by Harry Markowitz in 1952, provides a mathematical framework for constructing investment portfolios that maximize expected return for a given level of risk.</p>
    <h2>The Efficient Frontier</h2>
    <p>The efficient frontier represents the set of portfolios that offer the highest expected return for each level of risk. Portfolios below the frontier are suboptimal — they offer lower returns for the same risk.</p>
    <h2>Mean-Variance Optimization</h2>
    <p>Mean-variance optimization (MVO) is the mathematical process of finding portfolios on the efficient frontier. Given expected returns, variances, and covariances of assets, we solve for portfolio weights that minimize variance at each return level.</p>
    <pre><code>import numpy as np

def efficient_frontier(mu, Sigma, n_points=100):
    n = len(mu)
    w = np.random.randn(n_points, n)
    w = w / w.sum(axis=1, keepdims=True)
    returns = w @ mu
    vols = np.sqrt((w @ Sigma) * w).sum(axis=1)
    return returns, vols, w
</code></pre>
    <h2>Conclusion</h2>
    <p>Mean-variance optimization remains a cornerstone of quantitative portfolio management. While it has limitations — sensitivity to input estimates, assumption of normal returns — it provides a rigorous foundation for portfolio construction.</p>
  `,
  3: `
    <h2>Introduction</h2>
    <p>Containerizing a Vite + React application is a common requirement for production deployments. This guide walks through creating a production-ready Docker setup with multi-stage builds.</p>
    <h2>Multi-Stage Builds</h2>
    <p>A multi-stage Docker build separates the build environment from the runtime environment. The first stage installs dependencies and builds the application; the second stage serves the built files using a lightweight web server like Nginx.</p>
    <h3>Dockerfile</h3>
    <pre><code># Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
</code></pre>
    <h2>Docker Compose</h2>
    <p>Docker Compose orchestrates the application alongside any required services. For a simple blog, a single service may suffice, but the pattern scales to include databases, caches, and reverse proxies.</p>
    <h2>Conclusion</h2>
    <p>Dockerizing a Vite + React app with multi-stage builds produces small, secure, production-ready images. The pattern is straightforward and suitable for both personal projects and enterprise deployments.</p>
  `,
  4: `
    <h2>Introduction</h2>
    <p>Large Language Models (LLMs) have revolutionized natural language processing. This article provides a technical overview of how these models work, from the transformer architecture to training and inference.</p>
    <h2>Transformer Architecture</h2>
    <p>The transformer architecture, introduced in the landmark paper "Attention Is All You Need," replaces recurrent layers with self-attention mechanisms. This allows parallel processing of sequences and captures long-range dependencies effectively.</p>
    <h3>Attention Mechanism</h3>
    <p>The attention mechanism computes a weighted sum of values, where weights are determined by the compatibility of queries and keys. Multi-head attention runs multiple attention operations in parallel, capturing different relationship types.</p>
    <h2>Training Process</h2>
    <p>LLMs are typically trained in two phases: pre-training on large text corpora using self-supervised objectives, and fine-tuning on specific tasks with supervised learning or reinforcement learning from human feedback (RLHF).</p>
    <h2>Conclusion</h2>
    <p>Understanding the transformer architecture and training process provides a foundation for working effectively with LLMs. As the field evolves, new architectures and techniques continue to push the boundaries of what these models can achieve.</p>
  `,
  5: `
    <h2>Introduction</h2>
    <p>Linux containers have transformed how we build, ship, and run software. This article explores the open-source ecosystem of container technologies and how they power modern infrastructure.</p>
    <h2>Container Runtimes</h2>
    <p>Docker popularized containers, but the ecosystem has expanded to include runc (the OCI reference implementation), containerd (used by Docker and Kubernetes), and Podman (a daemonless alternative).</p>
    <h3>OCI Standards</h3>
    <p>The Open Container Initiative (OCI) defines standards for container images and runtimes, ensuring interoperability across the ecosystem. Any OCI-compliant image can run on any OCI-compliant runtime.</p>
    <h2>Container Orchestration</h2>
    <p>Kubernetes has emerged as the dominant container orchestration platform, automating deployment, scaling, and management of containerized applications. Alternatives like Docker Swarm and Nomad serve specific niches.</p>
    <h2>Conclusion</h2>
    <p>The open-source container ecosystem provides robust, standards-based tools for building and operating modern infrastructure. Understanding the landscape helps in choosing the right tools for each use case.</p>
  `,
  6: `
    <h2>Introduction</h2>
    <p>Distributed systems face unique challenges: network latency, partial failures, and unpredictable load. Reliability patterns help build systems that remain available and correct despite these challenges.</p>
    <h2>Circuit Breaker Pattern</h2>
    <p>The circuit breaker pattern prevents cascading failures by detecting when a downstream service is unhealthy and temporarily stopping requests to it. When the circuit is open, requests fail fast rather than timing out.</p>
    <h2>Retry with Backoff</h2>
    <p>Transient failures are common in distributed systems. Retry with exponential backoff allows operations to succeed after temporary failures without overwhelming the system.</p>
    <h2>Bulkhead Pattern</h2>
    <p>The bulkhead pattern isolates resources into separate pools, preventing a failure in one part of the system from exhausting resources needed by other parts. This is analogous to watertight compartments on a ship.</p>
    <h2>Chaos Engineering</h2>
    <p>Chaos engineering proactively introduces failures into a system to test its resilience. Tools like Chaos Monkey randomly terminate instances to ensure the system can tolerate failures gracefully.</p>
    <h2>Conclusion</h2>
    <p>Reliability patterns are essential building blocks for distributed systems. Combining multiple patterns provides defense in depth against the many ways distributed systems can fail.</p>
  `,
  7: `
    <h2>Introduction</h2>
    <p>Dark mode has become an expected feature in modern web applications. Tailwind CSS provides excellent support for implementing dark mode with minimal overhead.</p>
    <h2>Strategy Selection</h2>
    <p>Tailwind supports three dark mode strategies: <code>media</code> (based on system preference), <code>class</code> (manual toggle), and hybrid approaches. The class strategy offers the most flexibility, allowing user override of system preference.</p>
    <h3>Class Strategy Setup</h3>
    <pre><code>// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
</code></pre>
    <h2>Persistent Preferences</h2>
    <p>Store the user's dark mode preference in localStorage and apply it on page load. Default to the system preference using the <code>prefers-color-scheme</code> media query.</p>
    <h2>Conclusion</h2>
    <p>Tailwind CSS makes dark mode implementation straightforward. The class-based strategy provides the best user experience by respecting both system preferences and manual overrides.</p>
  `,
  8: `
    <h2>Introduction</h2>
    <p>Backtesting is a critical step in developing algorithmic trading strategies. Python offers several mature frameworks for simulating strategy performance on historical data.</p>
    <h2>Backtrader</h2>
    <p>Backtrader is a popular Python framework for backtesting and live trading. It provides a flexible event-driven architecture with built-in support for indicators, analyzers, and data feeds.</p>
    <h2>Zipline</h2>
    <p>Zipline, originally developed by Quantopian, is a Pythonic backtesting library that emphasizes data-driven development. It integrates well with financial data providers and includes a comprehensive event system.</p>
    <h2>VectorBT</h2>
    <p>VectorBT takes a vectorized approach to backtesting, operating on entire arrays of data rather than iterating event-by-event. This makes it significantly faster for certain types of strategies.</p>
    <h2>Conclusion</h2>
    <p>Choosing a backtesting framework depends on your specific needs: event-driven simulation (Backtrader), data-driven research (Zipline), or high-performance vectorized testing (VectorBT).</p>
  `,
  9: `
    <h2>Introduction</h2>
    <p>The transformer architecture, introduced in 2017, fundamentally changed natural language processing. This article traces the evolution from the original paper to today's large language models.</p>
    <h2>Attention Is All You Need</h2>
    <p>The original transformer paper proposed an architecture based entirely on attention mechanisms, eliminating recurrence and convolution. The model achieved state-of-the-art translation quality with faster training times.</p>
    <h3>Key Innovations</h3>
    <ul>
      <li>Self-attention: Each token attends to all other tokens in the sequence</li>
      <li>Multi-head attention: Multiple attention patterns captured in parallel</li>
      <li>Positional encoding: Sequence position information preserved without recurrence</li>
    </ul>
    <h2>From BERT to GPT</h2>
    <p>BERT (Bidirectional Encoder Representations from Transformers) introduced masked language modeling for pre-training. GPT (Generative Pre-trained Transformer) demonstrated that decoder-only transformers could generate coherent text at scale.</p>
    <h2>The Scaling Era</h2>
    <p>As models grew from millions to billions of parameters, emergent abilities appeared: in-context learning, chain-of-thought reasoning, and instruction following. Scaling laws describe how performance improves with model size, data, and compute.</p>
    <h2>Conclusion</h2>
    <p>The transformer revolution continues. From 2017 to today, the architecture has evolved remarkably, but the core insight — that attention mechanisms alone are sufficient for sequence modeling — remains foundational.</p>
  `,
};