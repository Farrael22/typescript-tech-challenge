# Back-end coding challenge - TypeScript

# Project Description

## Overview

Your Product Manager has asked you to build **FinTrack**, a lightweight financial‐transactions dashboard, backed by a REST API. FinTrack supports two main views in a single‐page JavaScript app: the Dashboard for reviewing and creating transactions, and the Account page for profile details and transaction history.

### Dashboard

- **Feed of your transactions:**
  Displays your personal history of **incomes**, **refunds**, and **expenses**, showing the ten most recent entries by default. Each item shows type, amount, date, and optional description. As soon as you record a new transaction, it appears instantly at the top of the feed.
- **Type filter control:**
  Provides a dropdown or set of toggles allowing you to narrow the feed to only incomes, only refunds, only expenses, or view all types together, making it easy to focus on one category without losing context.
- **Date‐range filtering:**
  Offers optional start‐date and end‐date pickers so you can limit the displayed transactions to those occurring after a given date, before another date, or between two dates, giving you precise control over the timeframe.
- **Infinite scroll pagination:**
  Automatically fetches and appends older transactions in batches of ten as you scroll to the bottom of the list, ensuring a smooth, continuous browsing experience without manual page changes.
- **Create new transactions:**
  Presents a form with fields for amount, description (up to 255 characters), and transaction type. Upon submission, the entry is persisted and immediately reflected in the feed.

### Account Page

- **User information panel:**
  Shows the username (up to 20 characters) and account creation date (formatted like “May 24, 2025”), alongside a single “net balance” value that summarizes their entire transaction history. It should reflect all purchases, refunds, and expenses in one cohesive metric.
  As for clarification, expenses must be deducted from the balance, while incomes and refunds must be summed.
- **Personal transaction feed:**
  Displays the five most recent transactions for the profile user, with a “Show more” button at the bottom that loads additional records in sets of five, letting users explore their history incrementally.
- **Create new transactions:**
  Users can create new transactions from this view as well.

## Phase 1: Coding (Estimated 3 hours)

- Build out a RESTful API and corresponding backend system to handle the features detailed above. This RESTful API would communicate with a single-page JS app. The API you build should enable all the features on both pages. Feel free to choose your preferred framework, but TypeScript usage is a must.
- You should implement a real, production-ready database, and queries should be performant.
- Do not implement additional features beyond what is explained in the overview.
- Write automated tests for this project.
- Your solution must be containerized and include a Docker Compose file to spin up all required containers to run your solution with a single command (docker compose up)
- Do not build a front-end.
- Do not build an authentication, your API must work with mocked data created during startup.

<br />
⚠️ Submissions that don't include a functional Docker Compose file will be automatically rejected. Make sure to validate your solution before submitting it by testing a fresh setup scenario. All evaluations are performed in Linux-based environments (Ubuntu or macOS).
<br />

## Phase 2: Self-Critique & Scaling (Estimated 30 minutes)

- **Reflect on your implementation:**
  In a **Critique** section of your README, describe what you would improve given more time and explain why those changes matter.
- **Analyze scalability challenges:**
  - If the number of users and transactions grows, which parts of the proposed solution do you think would fail first?
  - In a real-life situation, what steps would you take to scale this product? What other types of technology and infrastructure might you need to use?
  - Provide as much detail as possible, as well as an explanation for each proposed solution, trying to highlight any drawbacks it might have.
