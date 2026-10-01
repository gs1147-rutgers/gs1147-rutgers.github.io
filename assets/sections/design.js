/* ==================================================================
   DESIGN WORK (portfolio > design tab)
   Edit only this file to change this section. Other sections are unaffected.

   Uses the same format as development.js, so see the template there.
   - The page shows the first 4 designs. "show more" reveals 4 more each time.
   - The card shows a sliding carousel of the images list.
   - Images go in assets/img/projects/<id>/ and are listed by file name.
   ================================================================== */
CONFIG.design = [
  {
    id: "cpq-renewal-automation",
    title: "CPQ Renewal Automation",
    when: "2026",
    role: "Salesforce Solution Architect",
    tags: ["Salesforce CPQ", "Apex", "LWC", "Flow", "Batch & Queueable Apex", "Platform Events", "MuleSoft"],
    overview: "A Salesforce CPQ solution that turns every expiring contract into a priced, primary renewal quote, with no manual cloning or re-pricing. A monthly scheduled job finds contracts ending within 90 days, clones each one's primary quote and lines, prices it through the <b>CPQ Quote API</b> so contracted prices and discount schedules are kept, then marks it primary and closes the renewal opportunity. Reps get a renewal console and a one-click quote action. RevOps gets a full audit trail, and closed renewals sync to billing in Zuora or NetSuite through MuleSoft.",
    tasks: [
      "<b>Async orchestration</b>: Scheduled Apex (<code>RenewalScheduler</code>) starts a Batch Apex job (<code>RenewalCandidateBatch</code>) that scopes contracts ending within the renewal horizon. Each contract is handed to its own Queueable (<code>RenewalQuoteJob</code>), so one heavy CPQ calculation never uses up another contract's governor limits.",
      "<b>Pricing through the CPQ Quote API</b>: quotes are calculated with <code>SBQQ.ServiceRouter</code> (the CPQ calculator API) rather than by writing prices directly. That keeps price rules, contracted prices, discount schedules and renewal uplift all inside the CPQ pricing engine.",
      "<b>Finalizer step</b>: a Queueable finalizer (<code>RenewalFinalizeJob</code>) runs whether the job succeeds or fails. It marks the quote primary, closes the opportunity, and records the outcome.",
      "<b>Configuration without code</b>: uplift %, renewal horizon and batch size live in Custom Metadata (<code>Renewal_Config__mdt</code>), so RevOps can tune the run without a deployment",
      "<b>Multicurrency</b>: each quote keeps its contract's currency and price book, with dated exchange rates (<code>DatedConversionRate</code>) used for USD roll-ups",
      "<b>Error handling that never stops the run</b>: a savepoint and rollback for each contract, a retry queue for lock contention (<code>UNABLE_TO_LOCK_ROW</code>), and failures logged to <code>Renewal_Log__c</code> and published as a <code>Renewal_Error__e</code> platform event for admin alerts",
      "<b>Declarative option</b>: designed a schedule-triggered Flow version, in which the Flow runs the loop and eligibility decision and invocable Apex does the CPQ cloning and pricing. Ineligible contracts become a CSM review task, and RevOps gets a run summary by email.",
      "<b>Lightning Web Components</b>: <code>renewalPipeline</code> (a renewal console) and <code>quickRenewal</code> (a one-click quick action on the Contract record)",
      "<b>Integration and compliance</b>: closed renewals sync to Zuora or NetSuite through MuleSoft, and the solution is designed to be safe to re-run (idempotent) and to keep change evidence for SOX"
    ],
    features: [
      "<b>System architecture</b>: three layers. Async Apex orchestration sits on top of the CPQ data layer (subscriptions, cloned quotes and quote lines, price books and FX rates), with logging, LWCs and billing sync in the bottom lane.",
      "<b>Renewal Pipeline console (LWC)</b>: KPI tiles, a multicurrency upcoming-renewals table with status badges (Quote ready, Priced, Queued, Pricing failed, Closed won), a live batch-run monitor, and an exceptions panel that names the actual CPQ error for each failure",
      "<b>Schedule-triggered Flow</b>: a monthly start, Get Records, a loop, an \"auto-renew eligible?\" decision, Apex actions to clone and price, and a fault path that logs the error and moves on to the next contract",
      "<b>One-click renewal quick action</b>: a modal on the Contract record built from the primary quote. Term, start date, uplift %, price book and reason are editable, currency is locked to the contract, and a line preview shows the result (USD 412,800 → 433,440 at +5%) before the quote is generated."
    ],
    tech: [
      "<code>Salesforce CPQ</code> (<code>SBQQ__Quote__c</code>, <code>SBQQ__QuoteLine__c</code>, <code>SBQQ__Subscription__c</code>) and the CPQ Quote API (<code>SBQQ.ServiceRouter</code>)",
      "<code>Apex</code>: Schedulable, Database.Batchable, Queueable with a Transaction Finalizer, and Invocable methods",
      "<code>Lightning Web Components</code>, <code>Flow</code> (schedule-triggered), <code>Custom Metadata</code>, <code>Platform Events</code>",
      "<code>MuleSoft</code> integration to <code>Zuora</code> and <code>NetSuite</code>"
    ],
    extra: [
      { heading: "Design Decisions", list: [
        "<b>One Queueable per contract</b>: CPQ calculations use a lot of CPU and SOQL. Isolating each contract keeps the run within governor limits and contains any failure to that one contract.",
        "<b>Price through the API, never with direct DML</b>: writing prices onto quote lines skips the CPQ pricing waterfall. The Quote API keeps renewals consistent with how reps price deals by hand.",
        "<b>Errors as data</b>: each failure becomes a <code>Renewal_Log__c</code> row and a platform event. Platform events can publish even when the transaction rolls back, so failures are never silent and the exceptions panel can show the exact cause.",
        "<b>Clicks and code</b>: Flow handles the readable business process, and Apex handles the CPQ-specific heavy work, so admins can change eligibility rules without a developer"
      ] }
    ],
    images: [
      { src: "renewal-pipeline.jpg", caption: "Renewal Pipeline LWC console: KPIs, multicurrency renewals, batch-run monitor and exceptions" },
      { src: "scheduled-flow.jpg", caption: "Monthly Renewal Run: schedule-triggered Flow with Apex actions and a fault path" },
      { src: "architecture.jpg", caption: "System architecture: scheduled, batch and queueable Apex through the CPQ Quote API, over the CPQ data layer, with logging, LWCs and billing sync" },
      { src: "quick-renewal.jpg", caption: "One-click renewal quick action: a renewal quote built from the contract's primary quote" }
    ],
    links: { website: "" }
  },
  {
    id: "lead-routing",
    title: "Lead-to-SDR Routing Automation",
    when: "2026",
    role: "Salesforce Solution Architect",
    tags: ["Sales Cloud", "Apex", "LWC", "Flow", "Omni-Channel", "Lead Scoring", "Sales Engagement"],
    overview: "A top-of-funnel automation that gets every inbound lead to the right SDR within minutes. Each new lead is cleaned, deduplicated, enriched with company details and scored, then routed by territory and capacity-aware round-robin. An SLA clock runs on first contact. SDRs work from a queue ranked by score that explains why each lead was assigned to them, and managers watch speed-to-lead and SDR capacity live. The goal is less time sorting leads and more time selling. Designed for speed-to-lead under 5 minutes.",
    tasks: [
      "<b>Intake</b>: a single pipeline for leads from web forms, events, chat (Web-to-Lead and MuleSoft) and CSV imports, with campaign attribution (source, UTM, first touch)",
      "<b>Clean before save</b>: a before-save trigger (<code>LeadIntakeHandler</code>) standardises fields, checks consent, and uses Matching and Duplicate Rules to catch duplicates and match leads to existing accounts",
      "<b>Enrichment</b>: a Queueable callout (<code>LeadEnrichmentJob</code>) fetches company size, industry and tech stack through Named Credentials, cached in <code>Company_Profile__c</code> to avoid repeat API calls",
      "<b>Scoring</b>: <code>LeadScoreService</code> combines <b>fit (60%)</b>, how well the lead matches the ideal customer profile, with <b>intent (40%)</b>, based on activity such as demo requests and pricing-page visits. Weights and the MQL threshold of 70 live in Custom Metadata (<code>Scoring_Model__mdt</code>), so they can be tuned without code.",
      "<b>Routing</b>: <code>LeadRouter</code> applies four rules in order from <code>Lead_Routing_Rule__mdt</code>: (1) named or existing accounts go to the account team's SDR; (2) enterprise leads with 1,000+ employees go to the Enterprise pod; (3) Mid-Market and SMB leads that qualify as MQLs are assigned by company size with weighted round-robin; (4) everything else goes to nurture, and errors go to an overflow queue",
      "<b>Capacity-aware assignment</b>: work is pushed through <b>Omni-Channel</b>, so leads only go to SDRs who are online and have open capacity, never to someone who is offline or full",
      "<b>SLA enforcement</b>: a record-triggered Flow with a scheduled path re-routes any lead not contacted within 30 minutes and notifies the SDR manager. Every routing decision is written to <code>Lead_Routing_Log__c</code> for auditing.",
      "<b>Engagement</b>: once an SDR accepts a lead, it is enrolled in a Sales Engagement cadence that matches the lead's role and score"
    ],
    features: [
      "<b>System architecture</b>: four stages, intake → enrich → score → route, above a data and configuration layer (duplicate rules, enrichment cache, scoring metadata, Omni-Channel queues), with a lane for SLA monitoring, the LWCs and cadences",
      "<b>SDR Workspace (LWC)</b>: the lead queue ranked by score, with green and amber SLA countdowns and a breached state. The selected lead shows its fit and intent breakdown, a \"why this lead came to you\" panel, company details, recent activity, and Call, Email and Convert buttons. A \"My day\" panel tracks leads assigned, average first contact, meetings booked and SLA met.",
      "<b>Record-triggered Flow</b>: new lead → match to an account → enrich and score → decision \"Score ≥ 70 (MQL)?\" → route through LeadRouter → set the owner and push to Omni-Channel, plus a +30-minute scheduled path for escalation. Leads below the threshold go to nurture, and errors go to an overflow queue.",
      "<b>Routing Control Center (manager view)</b>: speed-to-lead and SLA KPIs, a live SDR roster with status and capacity, the routing rules in order with the share of leads each one handles, a lead simulator, a pause switch, and a live routing log"
    ],
    tech: [
      "<code>Sales Cloud</code>: Leads, Campaigns, Matching & Duplicate Rules, Lead-to-Account matching",
      "<code>Apex</code>: before-save trigger handler, Queueable callouts with <code>Named Credentials</code>, scoring and routing services",
      "<code>Flow</code> (record-triggered, with a scheduled path), <code>Custom Metadata</code>, <code>Omni-Channel</code> routing",
      "<code>Lightning Web Components</code> (<code>sdrWorkspace</code>, <code>routingConsole</code>), <code>Sales Engagement</code> cadences, <code>MuleSoft</code>"
    ],
    extra: [
      { heading: "Why It Improves SDR Productivity", list: [
        "<b>No manual sorting</b>: SDRs open a ready-made queue ranked by score instead of sifting through a shared lead view",
        "<b>Speed-to-lead</b>: leads are routed seconds after creation, and the 30-minute SLA path makes sure no hot lead sits untouched",
        "<b>Fair, capacity-aware distribution</b>: weighted round-robin through Omni-Channel stops the busiest SDRs from being overloaded while others sit idle",
        "<b>Trust in the routing</b>: \"why this lead came to you\" and the audit log answer the \"why did I get this?\" question before anyone asks"
      ] },
      { heading: "Design Decisions", list: [
        "<b>Rules in metadata, not code</b>: scoring weights, MQL threshold and routing rules can be changed by admins and tested with the lead simulator",
        "<b>Async enrichment</b>: callouts can't run inside a before-save trigger, so enrichment runs in a Queueable and the cache avoids paying for the same company twice",
        "<b>Omni-Channel for capacity</b>: built-in presence status and capacity models, rather than a custom round-robin counter that breaks when SDRs go offline"
      ] }
    ],
    images: [
      { src: "lead-flow.jpg", caption: "Lead Created: record-triggered Flow with MQL decision, LeadRouter action and a 30-minute SLA path" },
      { src: "sdr-workspace.jpg", caption: "SDR Workspace LWC: a lead queue ranked by score with SLA timers, score breakdown and routing explanation" },
      { src: "control-center.jpg", caption: "Routing Control Center: speed-to-lead, live SDR capacity, ordered routing rules and routing log" },
      { src: "architecture.jpg", caption: "System architecture: intake, enrichment, scoring and routing over the data and configuration layer, with SLA, LWC and cadence lanes" }
    ],
    links: { website: "" }
  },
  {
    id: "integration-hub",
    title: "Salesforce Integration with External Enterprise Systems",
    when: "2026",
    role: "Salesforce Integration Architect",
    tags: ["MuleSoft", "Tray.io", "NetSuite", "DocuSign", "ZoomInfo", "Marketo", "Platform Events", "Pub/Sub API"],
    overview: "An event-driven, API-led integration layer that connects Salesforce to the systems around it. <b>MuleSoft</b> handles the business-critical flows: quote-to-cash with <b>NetSuite</b> and e-signature with <b>DocuSign</b>. <b>Tray.io</b> runs the lighter syncs: lead data with <b>Marketo</b> and enrichment from <b>ZoomInfo</b>. Salesforce publishes events and never waits on another system. Every hop is idempotent, retried, logged under one correlation ID, and can be replayed.",
    tasks: [
      "<b>Event-driven design</b>: Salesforce publishes Platform Events (<code>Order_Closed__e</code>, <code>Quote_Approved__e</code>) from Flow and Apex, and MuleSoft subscribes through the <b>Pub/Sub API</b>. Reps are never blocked by a slow or unavailable ERP.",
      "<b>API-led layers in MuleSoft</b>: a process API (<code>order-to-cash-papi</code>) holds the business logic, and system APIs (<code>netsuite-sapi</code>, <code>docusign-sapi</code>) wrap each external platform, so either side can change without breaking the other",
      "<b>Quote-to-cash with NetSuite</b>: a closed-won order is checked for duplicates using an idempotency key, transformed with DataWeave, and upserted to NetSuite through SuiteTalk REST (customer by external ID, then sales order and lines). The invoice number and billing status are written back to the Salesforce Order and Account.",
      "<b>E-signature with DocuSign</b>: an approved CPQ quote becomes an envelope built from a template, with signers, routing order and tabs, sent with JWT authentication. DocuSign Connect webhooks are HMAC-verified before the signed PDF is attached and the Contract activated. A declined envelope creates an AE task and a Slack alert.",
      "<b>Lead enrichment with ZoomInfo (Tray.io)</b>: Change Data Capture on new leads and accounts triggers a Tray.io workflow. It skips records enriched in the last 90 days to save credits, matches on email and domain, and writes company details and intent data back to <code>Company_Profile__c</code> to feed lead scoring and routing.",
      "<b>Marketing sync with Marketo (Tray.io)</b>: lead changes sync every 15 minutes from a watermark, and Marketo scores and MQL status flow back to Salesforce",
      "<b>Reliability</b>: 3 retries with backoff, a dead-letter queue on Anypoint MQ, one-click replay, and a correlation ID logged to <code>Integration_Log__c</code> on every hop",
      "<b>Security</b>: Named and External Credentials in Salesforce, token-based authentication for NetSuite, JWT for DocuSign, and no secrets in code"
    ],
    features: [
      "<b>Integration Hub architecture</b>: three zones (the Salesforce platform, the integration layer, and external platforms) showing how each system connects and which direction data flows",
      "<b>Quote-to-Cash → NetSuite</b>: an 8-step swimlane across Salesforce, MuleSoft and NetSuite, with an error path that retries and sends failures to the dead-letter queue",
      "<b>Quote E-Signature → DocuSign</b>: an 8-step swimlane from approved quote to activated contract, with the declined-envelope exception path",
      "<b>Lead Enrichment → ZoomInfo</b>: an 8-step Tray.io swimlane with the 90-day credit guard, a skip path, and write-back that feeds the lead routing design"
    ],
    tech: [
      "<code>MuleSoft Anypoint</code>: process and system APIs, <code>DataWeave</code>, Anypoint MQ, Anypoint Monitoring",
      "<code>Tray.io</code> workflows with Salesforce, Marketo, ZoomInfo and Slack connectors",
      "<code>Salesforce</code>: Platform Events, REST/SOAP API, Change Data Capture, Apex REST, Named & External Credentials",
      "<code>NetSuite SuiteTalk REST</code>, <code>DocuSign eSignature REST</code> + Connect, <code>ZoomInfo Enrich API</code>, <code>Marketo REST API</code>"
    ],
    extra: [
      { heading: "Why Two Integration Tools", list: [
        "<b>MuleSoft</b> for flows that touch money and contracts: they need reusable APIs, strong error handling, guaranteed delivery and a full audit trail",
        "<b>Tray.io</b> for marketing and data-enrichment syncs: they change often and benefit from a low-code builder the RevOps team can maintain themselves",
        "<b>Shared rules</b> for both: events in, idempotent writes, retries, one correlation ID, and alerts in Slack"
      ] }
    ],
    images: [
      { src: "hub.jpg", caption: "Integration architecture: Salesforce events through MuleSoft and Tray.io to NetSuite, DocuSign, Marketo and ZoomInfo" },
      { src: "netsuite.jpg", caption: "Quote-to-Cash → NetSuite: order to customer, sales order and invoice, with billing status written back" },
      { src: "docusign.jpg", caption: "Quote E-Signature → DocuSign: approved quote to signed PDF and activated contract" },
      { src: "zoominfo.jpg", caption: "Lead Enrichment → ZoomInfo: Tray.io workflow with a 90-day credit guard, feeding scoring and routing" }
    ],
    links: { website: "" }
  },
 
];
