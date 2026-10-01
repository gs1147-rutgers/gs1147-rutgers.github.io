/* ==================================================================
   DEVELOPMENT PROJECTS (portfolio > development tab)
   Edit only this file to change this section. Other sections are unaffected.

   - The page shows the first 3 projects. "show more" reveals 3 more each time.
     Put your strongest projects first.
   - Every field except title is optional. Leave out or empty ("" or []) to hide it.
   - Text fields may use <b>bold</b> and <code>code</code>.

   IMAGES, the standard way:
   1. Make a folder named after the project's id:  assets/img/projects/<id>/
   2. Drop the screenshots in it, e.g.  assets/img/projects/careerlens/moodboard.png
   3. List the file names under images, each with an optional caption.
   - "cover" is the card thumbnail. If left "", the first gallery image is used.
   - A missing image never breaks the page. Cards show a placeholder and
     gallery entries without a file are simply skipped.

   COPY THIS TEMPLATE to add a project (paste it inside the [ ] below):

  {
    id: "my-project",                       // folder name in assets/img/projects/
    title: "My Project",
    when: "Jan, 2025 - Mar, 2025",
    role: "Full Stack Developer",
    tags: ["Python", "AWS"],
    cover: "cover.png",
    overview: "Two or three sentences on what it is and why it matters.",
    tasks: ["What you did", "What else you did"],            // "Tasks Performed"
    features: ["<b>Feature name</b>: what it does"],          // "Core Features"
    tech: ["<code>Python</code>, <code>Pandas</code>"],       // "Technologies & Libraries Used"
    results: ["Measured outcome, with a number"],             // "Results"
    extra: [{ heading: "Challenges", list: ["..."] }],        // any extra sections you want
    images: [
      { src: "screen-1.png", caption: "Home screen" },
      { src: "screen-2.png", caption: "Admin view" }
    ],
    links: { github: "https://github.com/...", website: "", demo: "" }
  },
   ================================================================== */
CONFIG.development = [
  {
    id: "hms-eeg",
    title: "TCS-Net: AI-Assisted EEG Screening for Critical Care",
    when: "Jan, 2026 - May, 2026",
    role: "ML Researcher",
    tags: ["PyTorch", "EEG", "Deep Learning", "EfficientNetV2", "timm", "Cross-Modal Attention", "Signal Processing", "TensorFlow / Keras", "librosa", "scikit-learn", "NumPy", "Pandas", "Matplotlib", "Jupyter", "vast.ai (RTX 5090)"],
    cover: "cover.jpg",
    overview: "ICU patients on continuous <b>EEG</b> can have seizures that no one sees for hours, because every recording waits for a neurologist to read it. I built <b>TCS-Net</b>, a 29.6M-parameter model that reads raw EEG and spectrograms together through a new <b>cross-modal attention</b> layer, and outputs probabilities for six harmful brain-activity patterns. I benchmarked it against two published baselines on identical patient splits, using ten metrics in place of a single leaderboard score. Master's project, Rutgers University.",
    tasks: [
      "Worked with the <b>HMS / Massachusetts General Hospital</b> dataset: 1,950 patients, 17,089 EEGs and 106,800 segments, each voted on by about 12 neurologists",
      "Treated the label as the expert <b>vote distribution</b> (soft target) and trained against it with a vote-weighted KL-divergence loss, so the model learns when experts disagree",
      "Built the EEG pipeline: bipolar banana montage (19 electrodes → 16 channels), 0.5–40 Hz Butterworth bandpass, MAD normalization, and downsampling from 200 to 50 Hz",
      "Built an 8-channel spectrogram input by stacking the 10-minute Kaggle spectrograms with 50-second EEG-derived spectrograms made with Deotte's exact <code>librosa</code> parameters",
      "Designed and implemented TCS-Net in PyTorch: an EEG encoder (SumToOne stem, ResNet1D, causal transformer with RoPE) and a spectrogram encoder (EfficientNetV2-S), joined by Cross-Modal Token Attention",
      "Trained in three stages (warmup on all data, fine-tune on high-quality labels, polish), with EMA weights, SpecAugment, mixup and per-fold temperature scaling",
      "Re-trained <b>VIPEEGNet</b> (npj Digital Medicine, 2025) and a Deotte-style <b>EfficientNetB0</b> on one shared 5-fold patient-grouped split, so all three models are tested on the same patients",
      "Wrote an evaluation suite beyond KLD: AUROC and AUPRC with bootstrap CIs, false alarms at fixed recall, ECE, threshold drift, hard-miss curves, soft-label fidelity and selective prediction"
    ],
    features: [
      "<b>Cross-Modal Token Attention (CMTA)</b>: 50 EEG time tokens and 32 spectrogram patches attend to each other over two layers. Every top HMS competition solution simply concatenated the two branches.",
      "<b>Frequency Band Gate</b>: EEG context reweights the delta, theta, alpha and beta bands of the spectrogram features, a built-in prior from clinical neurophysiology",
      "<b>Calibrated soft outputs</b>: one probability per pattern (Seizure, LPD, GPD, LRDA, GRDA, Other), not a single forced label",
      "<b>Leak-proof fair comparison</b>: one deterministic <code>patient_folds.csv</code> built with <code>GroupKFold</code> and loaded by every model, plus a check that no patient appears in two folds",
      "<b>Inference</b>: fold ensemble, 4-way test-time augmentation (time reverse and brain flip) and per-fold temperature scaling"
    ],
    tech: [
      "<code>PyTorch 2.x</code>, <code>timm</code> (EfficientNetV2-S), <code>torch.amp</code> mixed precision for TCS-Net",
      "<code>TensorFlow</code> / <code>Keras</code> for the baselines, kept identical to their public reference code",
      "<code>librosa</code> for mel spectrograms, <code>SciPy</code> for filtering",
      "<code>scikit-learn</code> for GroupKFold, AUROC/AUPRC and Platt/isotonic calibration",
      "<code>NumPy</code>, <code>Pandas</code>, <code>Matplotlib</code>, <code>seaborn</code>, <code>Jupyter Lab</code>",
      "Single <b>NVIDIA RTX 5090</b> rented on vast.ai: about 28 GPU-hours, under $5 for the whole project"
    ],
    results: [
      "<b>KL divergence</b> on 5,939 high-quality EEGs (lower is better): VIPEEGNet <b>0.220</b>, TCS-Net <b>0.376</b>, EfficientNetB0 <b>0.673</b>",
      "<b>Best calibration</b>: TCS-Net ECE <b>0.0135</b> vs 0.0141 for VIPEEGNet and 0.139 for EfficientNetB0 (10× worse)",
      "<b>Fewest false alarms</b>: at a 0.5 threshold TCS-Net raised <b>14</b> false seizure alerts across 5,681 non-seizure EEGs (about 1 in 400), vs 31 for VIPEEGNet and 632 for EfficientNetB0",
      "<b>Most stable predictions</b>: <b>6× less jitter</b> across neighbouring segments of the same EEG (median std 0.0017 vs 0.0101), and a decision threshold that moves only <b>1.6×</b> between patient groups vs 12.9× for VIPEEGNet",
      "<b>Where it falls short</b>: at a 0.5 threshold TCS-Net catches only 25% of seizures (precision 82%), compared with 44% for VIPEEGNet and 73% for EfficientNetB0. VIPEEGNet also leads on AUROC (0.946 vs 0.913) and AUPRC (0.667 vs 0.565).",
      "<b>Clinical workload</b>: at 95% selective accuracy, VIPEEGNet clears <b>466 of 1,000</b> EEGs from a neurologist's queue, TCS-Net 211 and EfficientNetB0 63",
      "<b>Ensemble headroom</b>: 42 seizures were missed at 95% recall, and no single seizure was missed by all three models, so an OR-ensemble could catch more"
    ],
    extra: [
      { heading: "Key Findings", list: [
        "<b>One number hides the trade-offs.</b> KLD ranks the models, but only the other metrics show <i>how</i> each one fails. TCS-Net is the cautious guard (few alarms, many misses), EfficientNetB0 is trigger-happy, and VIPEEGNet is balanced.",
        "<b>The models miss the cases experts argue about.</b> In all three models, missed seizures had clearly lower expert agreement than caught ones. That is the safest way for a screening tool to fail.",
        "<b>Preprocessing beat architecture.</b> Switching spectrograms from <code>scipy</code> to <code>librosa</code> with Deotte's parameters cut KLD from 0.82 to 0.34. That one change mattered more than any change to the model.",
        "<b>Recommendation:</b> deploy VIPEEGNet as the primary screener. Ship EfficientNetB0 only with Platt recalibration (ECE 0.108 → 0.025). Keep TCS-Net as a research model whose attention weights could show clinicians which seconds and frequencies drove each alert."
      ] },
      { heading: "Challenges & Fixes", list: [
        "<b>Patient leakage</b>: early folds split by class, not by patient, which gave a falsely good 0.21 KLD. Fixed with patient-grouped <code>GroupKFold</code>.",
        "<b>EMA divergence</b>: a fixed 0.999 EMA from epoch 0 averaged in near-random weights. Starting it in Stage 2 and ramping decay 0.9 → 0.999 made the EMA model beat the raw model by 0.01–0.03 KLD per fold.",
        "<b>8-channel stem</b>: averaging the ImageNet RGB weights across all 8 channels lost pretrained knowledge. Copying RGB weights per region and mean-filling the rest fixed it."
      ] },
      { heading: "Future Work", list: [
        "An asymmetric loss to raise seizure recall, and per-class calibration in place of one global temperature",
        "Self-supervised pre-training on the Temple University EEG corpora (TUAB/TUEV) and external validation at another hospital",
        "Streaming inference, and a clinician-facing view of CMTA attention for interpretability"
      ] },
      { heading: "Dataset", text: "HMS – Harmful Brain Activity Classification (Harvard Medical School / MGH, 2024), public on <a href=\"https://www.kaggle.com/competitions/hms-harmful-brain-activity-classification/data\" target=\"_blank\" rel=\"noopener\">Kaggle</a>. 200 Hz, 19-electrode EEG with 10-minute spectrograms, six classes from multi-expert votes." }
    ],
    images: [
      { src: "cover.jpg", caption: "The input: 10-minute spectrograms for four brain regions (left) beside the 50-second bipolar EEG of a seizure (right)" },
      { src: "architecture.jpg", caption: "TCS-Net architecture (29.6M parameters): EEG and spectrogram encoders fused by Cross-Modal Token Attention" },
      { src: "cmta.png", caption: "Cross-Modal Token Attention, step by step: each modality queries the other over two layers" },
      { src: "kld-folds.jpg", caption: "Per-fold and out-of-fold KL divergence on the shared high-quality subset" },
      { src: "roc.png", caption: "ROC curves for seizure detection (n = 5,939 EEGs)" },
      { src: "pr-curve.png", caption: "Precision-recall curves, with operating points at recall 0.90 and 0.95" },
      { src: "false-alarms.png", caption: "Cost of meeting clinical recall targets: false alarms and alerts per true seizure" },
      { src: "calibration.png", caption: "Reliability diagrams: raw outputs vs Platt, isotonic and temperature calibration" },
      { src: "threshold-drift.png", caption: "Decision-threshold drift across 5 patient-disjoint folds (TCS-Net is the most stable)" },
      { src: "hard-misses.png", caption: "Missed seizures as the alarm threshold rises" },
      { src: "missed-vs-caught.png", caption: "Missed seizures sit where expert agreement is lowest" },
      { src: "three-guards.png", caption: "The recall trade-off: three guards, three models" },
      { src: "selective-prediction.png", caption: "Clinical workflow: EEGs each model can auto-answer at 95% accuracy" }
    ],
    links: { github: "", website: "" }
  },
  {
    id: "spend-forecast",
    title: "Super Bowls to Spend Lifts: Aramark Event Forecasting",
    when: "Apr, 2026",
    role: "Data Scientist",
    tags: ["Machine Learning", "Forecasting", "Python", "scikit-learn", "Plotly", "Pandas", "SVR", "Gradient Boosting", "Random Forest", "Ridge Regression", "Ensemble Models", "Data Visualization"],
    cover: "overview.jpg",
    overview: "An event-aligned forecasting system for Aramark's <b>$7.79B</b> US spend portfolio. It explains and predicts spend by state, client segment and purchase category, using major events (Super Bowl LX, FIFA World Cup 2026), seasonal patterns and state economic indicators. A weighted ensemble of four ML models produces the forecasts, and a six-view interactive dashboard presents them for planning decisions.",
    tasks: [
      "Set the analytical focus: <b>which external factors drive spend, and by how much in each state?</b> Then cleaned and restructured monthly spend data by state, client segment (about 30) and purchase category.",
      "<b>Events</b>: built a 2025–2026 calendar of major events by state and month (Super Bowl LX, FIFA World Cup 2026, Coachella, the Masters, the Boston Marathon and others). I scored each one from 0 to 100 for expected demand and combined them into a monthly event score per state. This feeds the Event Heatmap, the event bars under each state forecast, and the event vs spend-lift bubble chart.",
      "<b>Weather & seasonality</b>: modelled the regular monthly and quarterly rhythm of spend, such as summer and holiday dips and the academic calendar behind Institutional Food Service falling to about $20M in June–July. This keeps the model from mistaking a normal seasonal swing for an event effect, and it drives the Segment Deep-Dive and Quarterly Analysis views.",
      "<b>Economic drivers</b>: added state population and GDP to separate a state's size from real growth. GDP sets the bubble size on the event-lift chart, and the forecast cards show population and GDP for context.",
      "<b>Historical momentum</b>: used 2025 monthly actuals and Jan–Mar 2026 actuals as the baseline, and measured year-over-year and quarter-over-quarter change. These figures power the State Rankings and the QoQ heatmap.",
      "<b>Client segment mix</b>: split spend across about 30 segments (Institutional Food Service, Hospitality, Hotel/Lodging, Healthcare, Sports & Entertainment and more) to show which business lines drive growth. This feeds the segment share donut, the stacked quarterly trend and the H1 2026 forecast for each segment.",
      "<b>Purchase category mix</b>: compared each segment's spend across 13 categories (Food, Beverage, Maintenance & Engineering, Disposables and others) with the national average. This feeds the Category DNA radar, the treemap and the over/under-index chart.",
      "<b>Modelling</b>: trained Gradient Boosting, Random Forest, Ridge and SVR (RBF) regressors on log spend and compared them with cross-validation. I combined them into an ensemble weighted by each model's accuracy, and showed a min–max band so model disagreement is visible.",
      "<b>Delivery</b>: forecast Apr–Jun 2026 by state and segment, and built an interactive dashboard that drills from portfolio totals down to one state, segment or category"
    ],
    features: [
      "<b>State Forecast</b>: actual vs forecast monthly spend for any state, with each model's line, the ensemble and the events behind each spike",
      "<b>Event Heatmap</b>: every state × month event score from 2025 through the forecast window, plus a bubble chart of event score vs predicted spend lift",
      "<b>Segment Deep-Dive</b>: monthly trend and H1 2026 forecast for any client segment, with a confidence range",
      "<b>State Rankings</b>: top-10 and bottom-10 states by forecast growth, each linked to the event driving it",
      "<b>Quarterly Analysis</b>: segment share, a quarter-over-quarter change heatmap and a stacked trend for the top 10 segments",
      "<b>Category DNA</b>: a radar \"fingerprint\" and treemap showing where a segment over- or under-spends by category compared with the national average"
    ],
    tech: [
      "<code>Python</code>, <code>Pandas</code>, <code>NumPy</code> for data preparation",
      "<code>scikit-learn</code>: <code>GradientBoostingRegressor</code>, <code>RandomForestRegressor</code>, <code>Ridge</code>, <code>SVR</code>, cross-validation",
      "<code>Plotly</code> for the interactive charts (line, heatmap, bubble, donut, radar, treemap)"
    ],
    results: [
      "<b>Best single model</b>: SVR (RBF), with a cross-validation log-RMSE of <b>0.375</b> among the four models",
      "<b>Apr–Jun 2026 forecast</b>: <b>$1.65B</b> across the portfolio, <b>+9.6%</b> on the same quarter of 2025",
      "<b>Events show up in spend</b>: in California, Super Bowl LX lines up with the highest forecast month (<b>$93.0M</b>, about <b>+$17.5M</b> attributed to events). The FIFA World Cup adds about <b>+$15.0M</b> in June.",
      "<b>Growth leaders</b>: NY <b>+43.1%</b> (U.S. Open Golf), TX <b>+35.5%</b>, WA <b>+35.3%</b> and NJ <b>+33.8%</b>. The last three are all FIFA World Cup host states. HI, AK and WV trail at about −10%.",
      "<b>Event score tracks lift</b>: states with higher Apr–Jun event scores have larger predicted lifts. TX leads at about <b>+$53M</b>.",
      "<b>Biggest segment</b>: Institutional Food Service, forecast at <b>$607M</b> for H1 2026, <b>+24.9%</b> on H2 2025",
      "<b>Category gaps</b>: Senior Living spends <b>14.3 points more</b> than average on maintenance & engineering and <b>17.6 points less</b> on food, a cue for cross-sell"
    ],
    extra: [
      { heading: "Why It Matters", list: [
        "Spend planning usually looks backward. Tying forecasts to a public event calendar gives sales and supply teams a reason, and a lead time, for each spike.",
        "Ranking states by growth and naming the event behind each one tells account teams where to staff, stock and sell first.",
        "Category DNA turns raw purchase mix into specific cross-sell openings for each client segment."
      ] },
      { heading: "Data & Confidentiality", text: "The dataset is private and was provided for this project, so it can't be shared. The screenshots show results only." }
    ],
    images: [
      { src: "overview.jpg", caption: "At a glance: forecast Apr–Jun 2026 growth by state, with the major events behind the leaders (FIFA World Cup host states, U.S. Open Golf in NY, Super Bowl LX in CA)" },
      { src: "kpis.png", caption: "Dashboard headline: 2025 portfolio spend, Apr–Jun 2026 ensemble forecast, best model and top event state" },
      { src: "state-forecast.png", caption: "State Forecast (California): four models and the weighted ensemble, with event impact scores beneath" },
      { src: "event-drivers.png", caption: "Upcoming events behind each forecast month and the estimated spend boost" },
      { src: "event-heatmap.png", caption: "Event Heatmap: event scores by state and month, actuals through the forecast window" },
      { src: "event-vs-lift.png", caption: "Event score vs predicted spend lift (bubble size = state GDP)" },
      { src: "segment-deep-dive.png", caption: "Segment Deep-Dive: Institutional Food Service trend and H1 2026 forecast" },
      { src: "segments-h1.png", caption: "H1 2026 forecast for every client segment" },
      { src: "state-rankings.png", caption: "State Rankings: top 10 and bottom 10 states by forecast year-over-year growth" },
      { src: "rankings-table.png", caption: "Forecast details by state, with the top event driving each one" },
      { src: "quarterly.png", caption: "Quarterly Analysis: segment share and quarter-over-quarter change by segment" },
      { src: "quarterly-stacked.png", caption: "Quarterly spend trend for the top 10 segments, Q1 2025 to Q2 2026" },
      { src: "category-dna.png", caption: "Category DNA: Senior Living's category fingerprint vs the national average" },
      { src: "over-under-index.png", caption: "Over- and under-index by category vs the national average (Senior Living)" }
    ],
    links: { github: "", website: "" }
  },
  {
    id: "pii-detection",
    title: "PII Detection & Redaction in Student Essays",
    when: "Jan, 2024 - May, 2024",
    role: "ML Engineer",
    tags: ["NLP", "DeBERTa", "Python", "PyTorch", "spaCy", "Hugging Face Transformers", "Named Entity Recognition", "LSTM", "GloVe", "Logistic Regression", "TF-IDF", "scikit-learn", "Faker", "LLM Data Augmentation", "CUDA"],
    cover: "cover.jpg",
    overview: "A token-level NLP system that finds and removes personally identifiable information from student essays, so the essays can be shared for research without exposing students. It tags seven PII types (student names, emails, usernames, ID numbers, phone numbers, personal URLs and street addresses), and it can tell a student's name apart from a cited author. A fine-tuned <b>DeBERTa</b> model reaches <b>0.987 F1</b> and <b>0.987 recall</b>. Master's project, Rutgers University.",
    tasks: [
      "Framed PII removal as <b>token classification</b> with BIO tags (B-, I-, O) across 7 PII types, using the Kaggle \"PII Detection & Removal from Educational Data\" essays",
      "Analysed the data and found a severe imbalance: about 5,862 of the original essays had no PII, and some types appeared only a handful of times (4 phone numbers, 2 street addresses)",
      "Augmented the corpus with about <b>4,000 extra essays</b> (about 10,000 in total), using LLM-generated student-style writing plus <code>Faker</code>-injected names, emails, phone numbers and addresses to rebalance rare types",
      "Tokenized with spaCy's English tokenizer and re-aligned labels to sub-word tokens for the transformer, so a name split into pieces keeps its B-/I- labels",
      "Built a <b>Logistic Regression</b> baseline on TF-IDF, word n-grams and part-of-speech features (proper nouns as a name signal)",
      "Built an <b>LSTM / bidirectional GRU</b> model on 100-d GloVe embeddings with sequences padded to 300 tokens, to capture the context around each word",
      "Fine-tuned <b>DeBERTa</b> (disentangled attention) for token classification with Hugging Face Transformers on a CUDA GPU (3 epochs, about 45 minutes)",
      "Evaluated with k-fold cross-validation and a held-out test set, plus a separate real-world sample, using recall, precision, F1, F-beta, MCC, ROC-AUC and confusion matrices"
    ],
    features: [
      "<b>Recall-first metric (F-beta, β = 5)</b>: missing one piece of PII is a privacy leak, so recall counts about 25× more than precision when choosing models",
      "<b>Context-aware names</b>: separates sensitive names (the student) from public names (cited authors, famous people), which general NER tools struggle with",
      "<b>Seven PII types</b>: NAME_STUDENT, EMAIL, USERNAME, ID_NUM, PHONE_NUM, URL_PERSONAL and STREET_ADDRESS, each with begin and inside tags",
      "<b>Sub-word label alignment</b>: labels follow DeBERTa's sub-word tokens and map back to the original words, so the output can be redacted cleanly",
      "<b>Built for unstructured text</b>: long, informal essays, where enterprise tools aimed at structured data (Presidio, Comprehend, Cloud DLP) fall short"
    ],
    tech: [
      "<code>Hugging Face Transformers</code> (DeBERTa, Trainer), <code>PyTorch</code>, <code>CUDA</code> / <code>cuDNN</code>",
      "<code>spaCy</code> for tokenization and POS tags, <code>GloVe</code> embeddings for the LSTM",
      "<code>scikit-learn</code> for Logistic Regression, TF-IDF, cross-validation and metrics",
      "<code>Faker</code> and LLM-generated text for synthetic PII augmentation",
      "<code>Pandas</code>, <code>NumPy</code>, <code>Matplotlib</code>, <code>Plotly</code>, <code>Jupyter</code>"
    ],
    results: [
      "<b>DeBERTa</b>: <b>0.987 recall</b>, <b>0.986 precision</b>, <b>0.987 F1</b> on validation after 3 epochs, with validation loss still falling (0.0053 → 0.0049)",
      "<b>Per-class ROC-AUC 0.97–1.00</b> for every PII tag except I-URL_PERSONAL, which has only 7 examples in the whole corpus",
      "<b>Clear progression across three models</b>: F1 rose from 0.58 (Logistic Regression, AUC 0.91) to 0.76 (LSTM, AUC 0.96) to 0.987 (DeBERTa)",
      "<b>LSTM vs baseline</b>: MCC 0.79 vs 0.60, and recall 0.76 vs 0.58, showing how much word context matters for PII",
      "<b>Augmentation paid off</b>: rare types grew to thousands of labelled tokens (e.g. 35,436 B-NAME_STUDENT and 6,119 B-STREET_ADDRESS)"
    ],
    extra: [
      { heading: "Why It Matters", list: [
        "PII is the main barrier to releasing educational datasets and to running anonymous peer review. Today the most reliable fix is manual review, which is slow and costly.",
        "An accurate, recall-first redactor lets institutions share student writing for research while staying within FERPA and GDPR."
      ] },
      { heading: "Challenges & Learnings", list: [
        "<b>Imbalance</b>: most tokens are non-PII (\"O\", about 4.7M tokens), so I generated synthetic data with care to keep it realistic",
        "<b>False positives vs leaks</b>: tuning the precision-recall trade-off so the model catches all real PII without over-redacting public names",
        "<b>GPU setup</b>: configured CUDA and cuDNN to train transformer models, and managed long training runs"
      ] },
      { heading: "Future Work", list: [
        "Multilingual and culturally diverse names, and rare or unseen names",
        "Real-time redaction, a web interface or open-source API, and a user-feedback loop for continuous retraining",
        "Model distillation, pruning and quantization for cheaper deployment, and extending to medical (HIPAA) text"
      ] },
      { heading: "Dataset", text: "Kaggle: <a href=\"https://www.kaggle.com/competitions/pii-detection-removal-from-educational-data\" target=\"_blank\" rel=\"noopener\">PII Detection & Removal from Educational Data</a> (student essays from a massive open online course), plus external and synthetic essays." }
    ],
    images: [
      { src: "cover.jpg", caption: "What the system does: PII detected in a student essay (left) and redacted for sharing (right), with the cited author kept. Below, F1 rising from 0.58 to 0.987 across three models." },
      { src: "sample-pii.jpg", caption: "Detected PII highlighted in a student essay: names, street address, phone number and personal URL" },
      { src: "dataset.jpg", caption: "Dataset structure: full text, spaCy tokens, trailing whitespace and BIO labels" },
      { src: "label-distribution.png", caption: "Label distribution after augmentation (log scale)" },
      { src: "subword-labels.jpg", caption: "Aligning BIO labels to DeBERTa sub-word tokens" },
      { src: "f-beta.png", caption: "How β shifts the F-score toward recall (β = 0.11, 1 and 4.56 shown). This project uses β = 5." },
      { src: "lr-roc.png", caption: "Logistic Regression baseline: 5-fold ROC (mean AUC 0.91)" },
      { src: "lr-confusion.png", caption: "Logistic Regression confusion matrix" },
      { src: "lstm-roc.png", caption: "LSTM: 5-fold ROC (mean AUC 0.96)" },
      { src: "lstm-confusion.png", caption: "LSTM confusion matrix" },
      { src: "deberta-roc.png", caption: "DeBERTa: ROC curves by PII class" },
      { src: "deberta-confusion.png", caption: "DeBERTa confusion matrix across all PII tags" }
    ],
    links: { github: "", website: "" }
  },
  {
    id: "ai-crm",
    title: "AI CRM: A Salesforce-Inspired CRM, Rebuilt Lean",
    when: "2026",
    role: "Full Stack Developer",
    tags: ["Next.js", "PostgreSQL", "React", "TypeScript", "Vercel", "Claude API", "OpenAI API", "CRM", "Salesforce Data Model", "Reports & Dashboards", "AI Lead Scoring"],
    cover: "cover.jpg",
    overview: "A full-stack CRM modelled on the Salesforce platform, built for small revenue teams that need pipeline, contacts and reporting without enterprise cost or setup. Leads, Customers, Contacts, Opportunities, Products, Price Books and Quotes all work end to end, alongside custom reports, dashboards and AI-assisted lead scoring. It's live: anyone can <a href=\"https://ai-crm-sepia.vercel.app/\" target=\"_blank\" rel=\"noopener\">sign up and start using it</a>.",
    tasks: [
      "Designed the data model after Salesforce's core objects: <b>Leads → Customers (Accounts) → Contacts → Opportunities</b>, with <b>Products, Price Books and Quotes</b> for the quote-to-cash flow",
      "Built the application in <b>Next.js</b> on a <b>PostgreSQL</b> database, with sign-up, sign-in and separate <b>workspaces</b> so each team's data stays isolated",
      "Built full create, read, update and delete for every object, with list views, search, stage and source filters, and record pages",
      "Built a lead pipeline view with stage tracking (New → Contacted → Qualified → Proposal → Negotiation) and live KPIs: total leads, qualified leads, conversion rate and pipeline value",
      "Built a <b>report builder and dashboards</b> so users can create their own views of revenue, win rate and pipeline",
      "Integrated <b>AI lead scoring and insights</b> through the Claude or OpenAI API, using a key the user supplies (bring your own key), so no AI cost sits with the platform",
      "Added global search across customers, deals and contacts, plus notifications and a workspace switcher",
      "Deployed on <b>Vercel</b> with a public marketing site and self-serve sign-up"
    ],
    features: [
      "<b>Core CRM objects</b>: Leads, Customers, Contacts, Opportunities, Products, Price Books and Quotes, all fully working",
      "<b>Sales pipeline</b>: stage-by-stage counts and values, with conversion rate and pipeline totals at a glance",
      "<b>Reports & Dashboards</b>: build, save and view custom reports, plus an analytics page",
      "<b>AI Insights & lead scoring</b>: ranks leads and suggests next steps using Claude or OpenAI, with the user's own API key",
      "<b>Multi-workspace</b>: create and switch between workspaces, each with its own data",
      "<b>Self-serve</b>: public landing page, sign-up and instant access, with no setup or implementation project"
    ],
    tech: [
      "<code>Next.js</code> (React) for the frontend and server routes",
      "<code>PostgreSQL</code> for the relational CRM data model",
      "<code>Anthropic Claude API</code> and <code>OpenAI API</code> for AI lead scoring and insights",
      "<code>Vercel</code> for hosting and deployment"
    ],
    results: [
      "<b>Live and public</b> at <a href=\"https://ai-crm-sepia.vercel.app/\" target=\"_blank\" rel=\"noopener\">ai-crm-sepia.vercel.app</a>: anyone can sign up and use every object",
      "<b>7 working CRM objects</b> covering the path from first lead to quote",
      "<b>Optional AI with no platform cost</b>: users plug in their own Claude or OpenAI key to switch on lead scoring and insights"
    ],
    extra: [
      { heading: "Why I Built It", list: [
        "Years of Salesforce implementation work showed me that small teams use a fraction of the platform but pay for all of it, in licences, setup time and complexity.",
        "AI CRM keeps the parts teams actually use (pipeline, contacts, quotes and reporting) and adds AI where it saves time: deciding which lead to call next."
      ] },
      { heading: "Try It", text: "Open <a href=\"https://ai-crm-sepia.vercel.app/\" target=\"_blank\" rel=\"noopener\">ai-crm-sepia.vercel.app</a>, sign up, and create a lead. To try AI scoring, add a Claude or OpenAI API key in the app." }
    ],
    images: [
      { src: "landing.png", caption: "Public landing page with self-serve sign-up" },
      { src: "pipeline.png", caption: "Product tour: the sales pipeline" },
      { src: "reports-contacts.png", caption: "Product tour: reports and the contact activity timeline" },
      { src: "ai-features.png", caption: "AI-powered features: insights, instant reports and automation" },
      { src: "ai-scoring.png", caption: "AI Scoring: calibrated 0–100 lead scores from a rules engine, with AI-written explanations and a score distribution" },
      { src: "forecasting.png", caption: "Forecasting: commit, best-case and worst-case scenarios, pipeline aging and win rate by stage" },
      { src: "ai-assistant.png", caption: "AI Assistant: ask questions about the workspace. It reads only your data, and write actions need your confirmation." }
    ],
    links: { github: "", website: "https://ai-crm-sepia.vercel.app/" }
  },
  {
    id: "service-hub",
    title: "ServiceHub: Local Services Marketplace",
    when: "2026",
    role: "Full Stack Developer",
    tags: ["Next.js", "MongoDB", "React", "Google Maps", "Vercel", "Geolocation", "Marketplace", "Bookings", "Authentication", "Two-Sided Platform"],
    cover: "cover.jpg",
    overview: "A two-sided marketplace that connects people with verified local service providers, from plumbing and cleaning to legal, accounting and photography. Customers find providers near them on a live map and book online, and businesses register to list their services. Built with Next.js and MongoDB, and <a href=\"https://service-hub-smoky.vercel.app/\" target=\"_blank\" rel=\"noopener\">live for anyone to try</a>.",
    tasks: [
      "Designed a <b>two-sided platform</b> with separate sign-up flows: customers who book services, and businesses who register and list them",
      "Modelled providers, services, categories, bookings and reviews in <b>MongoDB</b>, with each listing storing its location",
      "Built <b>location-based discovery</b>: an interactive Google Map shows every verified provider near you as a pin, with search by service or keyword, category and zip-code filters, and click-through details",
      "Built browsing across <b>12 service categories</b> (Home, Legal, Accounting, Repairs, Automotive, Childcare, Healthcare, Photography, Tech Support, Beauty, Education and Creative)",
      "Built provider profile pages with a photo gallery, rating and reviews, response time, starting price, credentials and contact details",
      "Built the <b>booking flow</b> from \"Book Now\" through a customer's <b>My Bookings</b> page",
      "Built the app in <b>Next.js</b> (React) and deployed it on <b>Vercel</b>"
    ],
    features: [
      "<b>Map-first search</b>: providers shown by location, filtered by category, zip code or keyword",
      "<b>Two roles</b>: customer accounts for booking, business accounts for listing services",
      "<b>Rich provider pages</b>: image carousel, ratings, response time, pricing, verification badges and contact information",
      "<b>Bookings</b>: book instantly from a listing and track every booking in one place",
      "<b>Category browsing</b>: 12 categories, each showing how many providers it has"
    ],
    tech: [
      "<code>Next.js</code> (React) for the frontend and server routes",
      "<code>MongoDB</code> for users, providers, listings and bookings",
      "<code>Google Maps</code> for the interactive provider map",
      "<code>Vercel</code> for hosting and deployment"
    ],
    results: [
      "<b>Live and public</b> at <a href=\"https://service-hub-smoky.vercel.app/\" target=\"_blank\" rel=\"noopener\">service-hub-smoky.vercel.app</a>: sign up as a customer or register as a business",
      "<b>Full marketplace loop</b> working end to end: list a service, find it on the map, open the profile and book it"
    ],
    extra: [
      { heading: "How It Works", list: [
        "<b>Search & browse</b>: find a service and see verified providers in your area",
        "<b>Compare & choose</b>: read profiles and reviews, and compare prices",
        "<b>Book</b>: schedule online or request a quote for custom work",
        "<b>Rate & review</b>: leave feedback that helps the next customer"
      ] },
      { heading: "Try It", text: "Open <a href=\"https://service-hub-smoky.vercel.app/\" target=\"_blank\" rel=\"noopener\">service-hub-smoky.vercel.app</a> and sign up as a customer to browse and book, or choose <b>Register as Business</b> to list a service." }
    ],
    images: [
      { src: "map.jpg", caption: "Explore services near you: verified providers on an interactive map, with search and category filters" },
      { src: "home-categories.jpg", caption: "Home page: location search and 12 service categories" },
      { src: "how-it-works.png", caption: "How ServiceHub works: search, compare, book and review" }
    ],
    links: { github: "", website: "https://service-hub-smoky.vercel.app/" }
  },
  {
    id: "nodebase",
    title: "Nodebase: Visual Workflow Automation",
    when: "2026",
    role: "Full Stack Developer",
    tags: ["OpenAI", "Anthropic", "Gemini", "Stripe", "Slack", "Workflow Automation", "Webhooks", "DeepSeek", "Grok", "Perplexity", "Discord", "Telegram", "WhatsApp"],
    cover: "cover.jpg",
    overview: "A node-based workflow automation platform in the spirit of n8n and Zapier. Users drag nodes onto a canvas and connect them into their own workflows: a trigger starts the flow, an AI model processes the data, and an action delivers the result to Slack, Discord, WhatsApp or social media. It offers 16 nodes, including 6 AI models, and is <a href=\"https://nodebase-delta-liard.vercel.app/\" target=\"_blank\" rel=\"noopener\">live for anyone to try</a>.",
    tasks: [
      "Built a <b>visual workflow editor</b>: an infinite canvas where users add, connect, configure and delete nodes, with zoom, fit-to-view, a minimap and a lock",
      "Designed a node model in three stages, <b>trigger → AI → action</b>, that lets any output connect to the next node's input, including branching to several actions",
      "Built <b>4 trigger and input nodes</b>: a manual \"Execute Workflow\" button, Google Form submissions, Stripe events, and generic HTTP requests to call any API",
      "Integrated <b>6 AI model providers</b> as interchangeable nodes: OpenAI, Anthropic, Gemini, DeepSeek, xAI's Grok and Perplexity (with live web search)",
      "Built <b>6 action nodes</b> that deliver results: messages to Slack, Discord, Telegram and WhatsApp, an image post with caption to Instagram, and a tweet on X",
      "Built the <b>execution engine</b> that runs a saved workflow node by node, passing each node's output to the next, with real-time monitoring of each run",
      "Added per-node setup (credentials and settings), a \"Not Configured\" status for incomplete nodes, saving workflows, and user accounts with sign-up and login"
    ],
    features: [
      "<b>Drag-and-drop builder</b>: connect nodes visually, with no code needed",
      "<b>Event-driven triggers</b>: start a flow manually, from a Google Form, from a Stripe payment event, or through HTTP",
      "<b>Swappable AI models</b>: change the AI provider in a workflow by replacing one node",
      "<b>Multi-channel output</b>: one workflow can post to Slack, Discord, Telegram, WhatsApp, Instagram and X",
      "<b>Real-time execution</b>: run a workflow and watch it move through each node"
    ],
    tech: [
      "Integrations: <code>OpenAI</code>, <code>Anthropic</code>, <code>Google Gemini</code>, <code>DeepSeek</code>, <code>xAI Grok</code>, <code>Perplexity</code> APIs",
      "Triggers and actions: <code>Google Forms</code>, <code>Stripe</code> webhooks, <code>Slack</code>, <code>Discord</code>, <code>Telegram</code>, <code>WhatsApp</code>, <code>Instagram</code> and <code>X</code> APIs"
    ],
    results: [
      "<b>Live and public</b> at <a href=\"https://nodebase-delta-liard.vercel.app/\" target=\"_blank\" rel=\"noopener\">nodebase-delta-liard.vercel.app</a>: sign up and build your first workflow",
      "<b>16 working nodes</b> across triggers, AI models and actions",
      "<b>Example flow</b>: a Google Form submission goes to Anthropic for a summary, then Perplexity for research, then posts to Discord and Slack, all without writing code"
    ],
    extra: [
      { heading: "Example Use Cases", list: [
        "<b>Lead follow-up</b>: a new Google Form response is qualified by an AI model, and the team is alerted in Slack",
        "<b>Payment alerts</b>: a Stripe event triggers a WhatsApp or Telegram message to the customer or the team",
        "<b>Content pipeline</b>: Perplexity researches a topic, Claude drafts the post, and it's published to X and Instagram"
      ] },
      { heading: "Try It", text: "Open <a href=\"https://nodebase-delta-liard.vercel.app/\" target=\"_blank\" rel=\"noopener\">nodebase-delta-liard.vercel.app</a>, sign up, create a workflow, and add a trigger, an AI model and an action. Click <b>Execute Workflow</b> to run it." }
    ],
    images: [
      { src: "canvas.png", caption: "Workflow editor: a Google Form or manual trigger goes to Anthropic, then Perplexity and Discord, with a branch to Slack" },
      { src: "node-library.png", caption: "The node library: 4 triggers and inputs, 6 AI models and 6 actions" },
      { src: "landing.png", caption: "Landing page" },
      { src: "features.png", caption: "Key features: fast execution, visual builder, integrations and real-time monitoring" }
    ],
    links: { github: "", website: "https://nodebase-delta-liard.vercel.app/" }
  },
  {
    id: "meet-ai",
    title: "Meet.AI: AI Agents That Join Your Meetings",
    when: "2026",
    role: "Full Stack Developer",
    tags: ["AI Agents", "LLM", "Video Calls", "Transcription", "AI Summaries", "Vercel"],
    cover: "cover.jpg",
    overview: "A platform for creating custom AI agents that join your video meetings and act on your instructions. Give an agent a name and a personality, such as an interview assistant, sales coach, language tutor or legal scribe, and it takes part in the call, then produces the transcript, notes and a summary afterwards. It's <a href=\"https://meetai-zk62.vercel.app/\" target=\"_blank\" rel=\"noopener\">live for anyone to try</a>.",
    tasks: [
      "Built <b>agent creation</b>: users name an agent and write plain-language instructions that set its role and tone (for example, \"You are a hustle coach… be direct, hype-driven\")",
      "Built <b>meeting management</b>: create a meeting, assign an agent, and track its status (Upcoming, Completed or Cancelled) and duration, with search and filters by name, status and agent",
      "Built the <b>in-app video call</b>, with a pre-join lobby to set up camera and microphone before entering the call with the AI agent",
      "Built the <b>post-meeting pipeline</b>: once a call ends, the recording is transcribed and an AI model writes an overview and notes broken into sections with timestamps",
      "Built <b>meeting detail pages</b> showing the agent, date, duration, AI summary and notes",
      "Added a <b>free-trial plan with usage limits</b> (agents and meetings used, shown as progress bars) and an upgrade path",
      "Added user accounts and deployed the app on <b>Vercel</b>"
    ],
    features: [
      "<b>Custom AI agents</b>: any role or personality, defined by your own instructions",
      "<b>Agents on live calls</b>: the agent joins the meeting and responds in character",
      "<b>Automatic notes</b>: transcript, overview and notes with timestamps after every call",
      "<b>Meeting dashboard</b>: every meeting with its agent, status and duration, with search and filters",
      "<b>Usage-based plans</b>: a free trial with agent and meeting quotas, and an upgrade flow"
    ],
    tech: [],
    results: [
      "<b>Live and public</b> at <a href=\"https://meetai-zk62.vercel.app/\" target=\"_blank\" rel=\"noopener\">meetai-zk62.vercel.app</a>: sign up, create an agent and start a meeting",
      "<b>Full loop</b> working end to end: create an agent, start a meeting, talk with the agent, then get the summary and notes"
    ],
    extra: [
      { heading: "Example Agents", list: [
        "<b>Interview Assistant</b> for technical interview practice",
        "<b>Sales Coach</b> for rehearsing enterprise sales calls",
        "<b>Language Tutor</b> for conversation practice",
        "<b>Legal and Medical Scribes</b> that take structured notes during consultations"
      ] },
      { heading: "Try It", text: "Open <a href=\"https://meetai-zk62.vercel.app/\" target=\"_blank\" rel=\"noopener\">meetai-zk62.vercel.app</a>, sign up, create an agent with your own instructions, and start a meeting with it." }
    ],
    images: [
      { src: "meetings.jpg", caption: "My Meetings: each meeting with its agent, status and duration" },
      { src: "new-agent.jpg", caption: "New Agent: set a name and plain-language instructions" },
      { src: "join-call.jpg", caption: "Ready to join: pre-call lobby to set up camera and microphone before the agent joins" },
      { src: "summary.jpg", caption: "After the call: AI overview and notes with timestamps" }
    ],
    links: { github: "", website: "https://meetai-zk62.vercel.app/" }
  }
];
