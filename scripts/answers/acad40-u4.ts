import { QuestionData, GeneratedAnswer } from "./types";

export function getAcad40Unit4Answer(q: QuestionData): GeneratedAnswer | null {
  const { part, qNo } = q;

  // ==========================================
  // PART A (10 MARKS)
  // ==========================================
  if (part === "PART A") {
    switch (qNo) {
      case 1:
      case 3:
        return {
          summary: "Comprehensive architectural framework for addressing lexical ambiguity and polysemy in NLP via Word Sense Disambiguation (WSD) algorithms.",
          keyPoints: [
            "Lexical ambiguity arises from homonymy (unrelated senses) and polysemy (related senses).",
            "Supervised WSD models words as multiclass classification using Naive Bayes, SVMs, or fine-tuned Transformers.",
            "Dictionary-based algorithms (Lesk) evaluate word overlap between dictionary glosses and local context windows.",
            "Unsupervised WSD performs sense induction via clustering distributional context vectors."
          ],
          content: `## 1. Introduction: The Polysemy & Ambiguity Challenge
In natural language, the mapping between surface words and semantic concepts is many-to-many. A word exhibiting **Polysemy** has multiple, subtly related semantic senses (e.g., *"bank"* as a financial institution vs. the physical branch building). **Word Sense Disambiguation (WSD)** is the algorithmic process of determining which specific sense of an ambiguous word is activated in a given context.

\`\`\`
                                  WSD APPROACHES
        ┌───────────────────────────────┼───────────────────────────────┐
        ▼                               ▼                               ▼
Supervised WSD                  Knowledge-Based / Lesk           Unsupervised WSD
(Classifier trained on          (Measures overlap between       (Context-group clustering;
Senseval / SemCor corpora)       WordNet glosses & context)      Word Sense Induction)
\`\`\`

---

## 2. Primary WSD Algorithmic Paradigms

### 1. Supervised Machine Learning Approaches
- **Mechanism:** Treat WSD as standard multi-class classification. For target word $w$, train a model on sense-annotated corpora (e.g., **SemCor**, Princeton WordNet glosses).
- **Features Extracted:**
  - *Collocational Features:* Exact words appearing at offsets $\\{-2, -1, +1, +2\\}$ and their POS tags.
  - *Bag-of-Words Context:* Unordered set of content words within a $\\pm 25$-word window.
- **Naive Bayes Formulation:**
  $$\\hat{s} = \\arg\\max_{s_k \\in \\text{Senses}(w)} P(s_k) \\prod_{j=1}^m P(f_j \\mid s_k)$$

### 2. Dictionary & Knowledge-Based Approaches (The Lesk Algorithm)
- **Simplified Lesk Algorithm (Kilgarriff & Rosenzweig, 2000):**
  - Given ambiguous target word $w$ and context window $C$:
  - For each sense $s_k \\in \\text{WordNet}(w)$:
    $$\\text{Score}(s_k) = |\\text{Words}(\\text{Gloss}(s_k) \\cup \\text{Examples}(s_k)) \\cap \\text{Words}(C)|$$
  - Choose sense $s^*$ that maximizes the token overlap count.

### 3. Modern Contextual Transformer Embeddings
- In models like BERT and RoBERTa, identical surface tokens produce different continuous vector representations based on attention:
  $$\\vec{v}_{\\text{"bank" in "deposit cash"}} \\neq \\vec{v}_{\\text{"bank" in "river shore"}}$$
- Disambiguation is performed by computing cosine similarity against pre-computed sense centroid vectors in embedding space.

---

## 3. Comparative Synthesis

| WSD Paradigm | Knowledge Source | Accuracy | Scalability / Bottleneck |
| :--- | :--- | :--- | :--- |
| **Supervised** | Hand-annotated SemCor | High (75%–85%) | Knowledge Acquisition Bottleneck |
| **Dictionary (Lesk)**| WordNet / OED definitions | Moderate (55%–65%) | Short, sparse definitions; brittle overlap |
| **Unsupervised** | Raw unannotated text | Moderate (Clusters) | Induced senses do not map to standard dictionaries |
| **Contextual Vectors**| Transformer Pretraining | State-of-the-Art (80%+) | High compute / GPU requirements |

---

## 4. Exam Summary
Ambiguity and polysemy are resolved by **Word Sense Disambiguation**: **Supervised classifiers** achieve highest accuracy but suffer from manual annotation bottlenecks; **Lesk algorithms** utilize dictionary gloss overlaps; and **Transformer embeddings** project words into contextual vector clusters.`
        };

      case 2:
        return {
          summary: "Techniques for optimizing Word Sense Disambiguation (WSD) accuracy when contextual clues are extremely sparse or absent.",
          keyPoints: [
            "Sparse context occurs in search queries, titles, bullet points, and social media micro-posts.",
            "The Most Frequent Sense (MFS) baseline provides a formidable prior when context is null.",
            "Expanded graph-based semantic random walks across WordNet hierarchies propagate distant relational activation.",
            "External topic modeling and document-level discourse constraints (one sense per discourse) inject macro context."
          ],
          content: `## 1. The Sparse-Context Bottleneck in WSD
Standard WSD algorithms assume a rich surrounding window of $\\pm 20$ to $50$ words. In modern web settings (search engine queries, mobile SMS, Twitter/X headlines, product titles), an ambiguous word often appears surrounded by only 1 to 3 words:
> *Example:* Search query: *"jaguar speed"* (Automobile vs. Big Cat vs. Operating System).

---

## 2. Strategies for Resolving WSD under Sparse Context

\`\`\`
Sparse Query: "jaguar speed"
              │
              ├──► 1. WordNet Graph Random Walk (Personalized PageRank)
              ├──► 2. External Document / Session Context Integration
              ├──► 3. One Sense Per Collocation Constraint ("speed" -> Animal/Vehicle)
              └──► 4. Most Frequent Sense (MFS) Fallback Prior
\`\`\`

### 1. Most Frequent Sense (MFS) Baseline
- Empirical studies on the SemCor corpus prove that sense distributions follow a steep power law (Zipfian). For almost all words, the primary sense accounts for **65% to 85%** of all occurrences.
- When contextual evidence drops below a confidence threshold $\\theta$, falling back to the **Most Frequent Sense** is mathematically optimal and prevents erratic classifications.

### 2. Graph-Based Semantic Random Walks (Personalized PageRank)
- Models the entire WordNet lexical database as a directed graph $G = (V, E)$, where synsets are nodes and relations (hypernyms, meronyms) are edges.
- **UKB Algorithm (Agirre et al.):** Even with only 2 words (*"jaguar"*, *"speed"*), probability mass is initialized at the candidate nodes and pumped through the graph using Personalized PageRank. Paths intersecting related synsets (*"feline"*, *"velocity"*, *"panther"*) reinforce the intended sense.

### 3. Session and Document-Level Discourse Constraints
- **One Sense Per Discourse (Gale, Church, Yarowsky):** If a user types *"jaguar"* in a search session where prior queries included *"car parts"* or *"dealership"*, cross-query discourse priors immediately resolve the sense to **Automobile**.

---

## 3. Exam Summary
When context is sparse: fall back to the **Most Frequent Sense (MFS)** prior, apply **graph-based Personalized PageRank** over WordNet hierarchies to amplify subtle relational paths, and leverage **cross-session discourse constraints**.`
        };

      case 9:
        return {
          summary: "Comprehensive framework for evaluating Word Sense Disambiguation algorithms, detailing standard benchmarks (Senseval, SemEval), upper bounds (human agreement), and lower bounds (MFS).",
          keyPoints: [
            "Standard evaluation benchmarks include Senseval-1/2/3 and SemEval WSD tasks.",
            "Lower Bound: Most Frequent Sense (MFS) baseline (~65-75% accuracy).",
            "Upper Bound: Human Inter-Annotator Agreement (Cohen's kappa, ~95% for homonyms, ~70% for fine-grained polysemy).",
            "Metrics: Precision, Recall, F1-Score, and Coverage across all-words vs lexical-sample tasks."
          ],
          content: `## 1. Introduction: Evaluation Formalisms in WSD
Evaluating Word Sense Disambiguation requires rigorously establishing baseline performance expectations through **Lower Bounds** (heuristics an algorithm must surpass to be deemed useful) and **Upper Bounds** (the theoretical ceiling imposed by human annotator agreement).

---

## 2. Bounds of Performance

\`\`\`
100% ────────────────────────────────────────────────────────── Absolute Ceiling
 95% ──► UPPER BOUND: Inter-Annotator Agreement on Coarse Homonyms (Gale et al.)
 80% ──► State-of-the-Art Neural WSD Models (BiLSTM / BERT)
 70% ──► LOWER BOUND: Most Frequent Sense (MFS) / Random Baseline
  0% ──────────────────────────────────────────────────────────
\`\`\`

### 1. The Lower Bound: Most Frequent Sense (MFS)
- The algorithm assigns the first WordNet sense ($s_1$) to every occurrence without reading context:
  $$\\text{Baseline}(w) = \\arg\\max_{s} \\text{Count}_{\\text{SemCor}}(w, s)$$
- Because sense distributions are heavily skewed, MFS achieves **65% to 75% accuracy** on English text. Any proposed WSD algorithm that fails to beat the MFS baseline provides negative utility.

### 2. The Upper Bound: Human Inter-Annotator Agreement
- Measures how consistently trained human lexicographers assign senses to the same text using Cohen's Kappa ($\\kappa$):
  - For **Coarse-Grained Homonymy** (e.g., *bank* = river vs. money): Human agreement is **~95%**.
  - For **Fine-Grained WordNet Polysemy** (distinguishing 12 subtle senses of *play*): Human agreement plummets to **68%–75%**, demonstrating that fine-grained WordNet senses are often artificial.

---

## 3. Evaluation Tasks & Mathematical Metrics

1. **Lexical Sample Task:** Systems are evaluated on a small preselected set of 50–100 ambiguous target words with hundreds of labeled instances.
2. **All-Words Task:** Systems must disambiguate every single content word in a running text document.

### Mathematical Metrics:
$$\\text{Precision} = \\frac{\\text{Correctly Disambiguated Words}}{\\text{Total Words Attempted}}$$
$$\\text{Recall} = \\frac{\\text{Correctly Disambiguated Words}}{\\text{Total Target Words in Test Set}}$$
$$\\text{Coverage} = \\frac{\\text{Total Words Attempted}}{\\text{Total Target Words in Test Set}}$$
$$\\text{F1-Score} = \\frac{2 \\cdot \\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}$$

---

## 4. Exam Summary
WSD systems are evaluated between a **Lower Bound** (Most Frequent Sense baseline: ~70%) and an **Upper Bound** (Human Inter-Annotator Agreement: 75%–95%). Standard metrics are **Precision, Recall, and F1-score** on Senseval/SemEval benchmarks.`
        };
    }
  }

  // ==========================================
  // PART B (10 MARKS)
  // ==========================================
  if (part === "PART B") {
    switch (qNo) {
      case 1:
        return {
          summary: "Step-by-step methodology for constructing an artificial training and test dataset for WSD evaluation using Pseudowords (Schütze 1992, Gale et al. 1992).",
          keyPoints: [
            "Hand-labeling word senses is prohibitively expensive (Knowledge Acquisition Bottleneck).",
            "Pseudowords conflate two unrelated words (e.g., 'banana' and 'door' -> 'banana_door') across unannotated corpora.",
            "Creates an unlimited, perfectly ground-truthed training and evaluation corpus with zero human annotation effort.",
            "Used to test whether classifiers can reconstruct original word identities purely from context."
          ],
          content: `## 1. Motivation: The Knowledge Acquisition Bottleneck
Training and evaluating supervised WSD systems requires thousands of manually sense-annotated sentences. Because manual lexicographical annotation costs millions of dollars, Gale, Church & Yarowsky (1992) and Hinrich Schütze (1992) introduced **Pseudowords** to simulate ambiguity automatically without human intervention.

---

## 2. Step-by-Step Construction Procedure

\`\`\`
Step 1: Select two distinct, unambiguous words (e.g., W_1 = "banana", W_2 = "door")
Step 2: Collect all sentences from a large unannotated corpus containing W_1 or W_2
Step 3: Record the true ground truth label for each sentence
Step 4: Conflate both words into a single artificial pseudoword: "banana_door"
Step 5: Partition into Training Set (80%) and Test Set (20%)
Step 6: Challenge the WSD classifier to predict whether "banana_door" represents W_1 or W_2
\`\`\`

### Concrete Dataset Example:
- **Corpus Sentence A:** *"He peeled the **banana** and ate the fruit."*
- **Corpus Sentence B:** *"She opened the front **door** with her key."*

### Transformation:
- **Synthetic Sentence A:** *"He peeled the **banana_door** and ate the fruit."* $\\rightarrow$ Label: \`banana\`
- **Synthetic Sentence B:** *"She opened the front **banana_door** with her key."* $\\rightarrow$ Label: \`door\`

---

## 3. Advantages of Pseudowords in Research
1. **Infinite Scale:** Generates millions of labeled training instances overnight across any language or domain without paying human annotators.
2. **Absolute Ground Truth (Zero Label Noise):** Ground-truth labels are 100% unambiguous, eliminating inter-annotator disagreement.
3. **Controlled Experimental Variables:** Researchers can artificially pair words with equal frequencies, controlled semantic distances, or skewed distributions to stress-test classifier behavior.

---

## 4. Exam Summary
**Pseudowords** create artificial WSD benchmarks by conflating two words (*banana* + *door* $\\rightarrow$ *banana_door*) in raw text. This provides an **infinite, cost-free, perfectly ground-truthed dataset** for evaluating classifier architectures.`
        };

      case 2:
      case 19:
        return {
          summary: "Critical linguistic and statistical evaluation of the extent to which Pseudowords accurately model natural semantic ambiguity, contrasting homonymy against polysemy and co-activated senses.",
          keyPoints: [
            "Pseudowords model homonymy well because unrelated conflated words have distinct lexical distributions.",
            "Pseudowords model polysemy and co-activated senses poorly because related senses share semantic distributions.",
            "In natural polysemy, senses overlap (e.g., 'chicken' as animal vs meat).",
            "Classifiers evaluated on pseudowords exhibit artificially inflated accuracy that does not transfer to real WordNet polysemy."
          ],
          content: `## 1. Introduction: Are Pseudowords Realistic?
While pseudowords solve the data acquisition bottleneck, computational linguists (e.g., Manning & Schütze) emphasize that **pseudowords provide an overly optimistic, artificially easy evaluation of WSD**. Their ability to model true natural ambiguity is severely limited.

---

## 2. Where Pseudowords Succeed: Modeling Homonymy
- **Homonyms** are etymologically distinct words sharing accidental orthographic spelling (*"bank"* = financial vs. river edge).
- When a pseudoword conflates two completely unrelated words (*"banana"* + *"door"* or *"slug"* + *"missile"*):
  - The contextual vocabularies are completely disjoint: *"peeled, fruit, yellow"* vs. *"opened, locked, hinge"*.
  - The classifier easily draws linear decision boundaries, achieving **95%–99% accuracy**.
- **Conclusion:** Pseudowords are an accurate model for **homonym disambiguation**.

---

## 3. Where Pseudowords Fail: Modeling Polysemy & Co-Activated Senses
In natural language, most ambiguity involves **Polysemy** (closely related senses) or **Co-activated Senses**:

\`\`\`
HOMONYMY (Cleanly separated):
[Sense 1: Banana] <══════════════ Very Distant ══════════════> [Sense 2: Door]

POLYSEMY (Overlapping distributions):
[Sense 1: Chicken (Animal)] <─── High Overlap / Co-activation ───> [Sense 2: Chicken (Food)]
Shared Context: "farm", "feed", "organic", "cook", "fresh"
\`\`\`

1. **Shared Contextual Distributions:** Consider *"chicken"* (the live bird) vs. *"chicken"* (the culinary meat). Context words like *"farm"*, *"organic"*, *"feed"*, and *"healthy"* co-occur with **both senses**, confounding feature extraction.
2. **Co-Activation (Puns and Metaphor):** A single sentence can intentionally activate both senses simultaneously:
   - *"The newspaper fired its editor after publishing a controversial story."* (Newspaper as corporate organization AND physical print company).
   - Pseudowords cannot model sentences where both conflated meanings apply at once.
3. **Artificially Inflated Benchmark Scores:** A classifier scoring **98% on pseudoword tests** typically drops to **65% on real WordNet polysemy tasks**.

---

## 4. Exam Summary
Pseudowords model **homonymy** well because unrelated words have disjoint contextual distributions. However, they model **polysemy and co-activated senses poorly** because real word senses share overlapping vocabularies, giving researchers an artificially inflated measure of classifier capability.`
        };

      case 4:
      case 15:
        return {
          summary: "Comprehensive evaluation of the 'One Sense Per Discourse' constraint (Gale, Church, Yarowsky 1992), detailing empirical validity across homonyms vs polysemy and failure modes.",
          keyPoints: [
            "One Sense Per Discourse states that an ambiguous word strongly preserves a single sense throughout a coherent document.",
            "Empirical testing on the Brown Corpus / Wall Street Journal demonstrated 98% validity for homonyms.",
            "Valid for homonyms and major senses; breaks down on puns, poetic metaphors, and contrastive discussions.",
            "Acts as a powerful unsupervised document-level regularizer in bootstrapping algorithms (e.g., Yarowsky algorithm)."
          ],
          content: `## 1. Definition: The "One Sense Per Discourse" Constraint
Formulated empirically by William Gale, Kenneth Church, and David Yarowsky (1992):
> **The One Sense Per Discourse Hypothesis:** Within a single coherent discourse (document, article, or conversation), an ambiguous word almost always exhibits only one of its possible senses across all occurrences.

---

## 2. Empirical Validation and Statistical Support

\`\`\`
Corpus Study (Gale, Church, Yarowsky, 1992):
Analyzed 106,000 ambiguous instances across WSJ news articles.
Result: 98% of ambiguous word repetitions in the same article shared the identical sense!
\`\`\`

- **Mechanism:** In human communication, speakers choose words to convey specific information within a coherent domain. A financial analyst writing an article about banks does not switch mid-paragraph to discuss the grassy banks of the Mississippi River.
- **Bootstrapping Power:** If an algorithm confidently disambiguates just **one** instance of an ambiguous word in an article (e.g., because it is surrounded by high-confidence collocations), it can safely propagate that same sense label to **all other instances** of that word in the document.

---

## 3. Validity Breakdown Across Ambiguity Types

| Ambiguity Type | Empirical Validity | Explanation |
| :--- | :--- | :--- |
| **Homonymy** (*bank, crane, bat*) | **~98% (Extremely High)** | Unrelated concepts rarely cross-pollinate within one article |
| **Coarse Polysemy** (*branch, cell*) | **~90% (High)** | Clear contextual topic boundaries dominate |
| **Fine Polysemy** (*play, make*) | **~70% (Moderate)** | Authors naturally slide between subtle shades of meaning |
| **Puns / Creative Writing** | **<50% (Fails)** | The author deliberately exploits multiple senses for humor |

---

## 4. Exam Summary
The **One Sense Per Discourse** constraint holds with **98% empirical validity for homonyms**. It is a cornerstone of unsupervised WSD, allowing high-confidence local predictions to regularize all other occurrences across an entire document.`
        };

      case 5:
        return {
          summary: "Concrete case study constructing examples where the 'One Sense Per Discourse' constraint succeeds brilliantly and where it fails catastrophically.",
          keyPoints: [
            "Success cases: Technical, journalistic, and academic articles with clear topical focus.",
            "Failure cases: Intentional puns, marketing slogans, comparative linguistic articles, and literary metaphors.",
            "Illustrates the boundaries of statistical discourse heuristics."
          ],
          content: `## 1. Introduction
While the "One Sense Per Discourse" constraint achieves 98% validity on journalistic corpora, it is a heuristic rather than an inviolable law of grammar. Understanding its exact failure and success boundaries is essential for NLP system design.

---

## 2. Examples Where the Constraint Performs Flawlessly

### Example 1: Financial News Report (Target Word: "bank")
> *"The Federal Reserve raised interest rates yesterday, putting pressure on Silicon Valley **Bank**. Analysts noted that the **bank** held massive unrealized losses on long-term bonds. Depositors fled the **bank** within 48 hours."*
- **Discourse Analysis:** All three occurrences of *"bank"* refer strictly to \`bank.n.02\` (financial depository). The constraint holds with **100% precision**.

### Example 2: Biology Scientific Paper (Target Word: "crane")
> *"The whooping **crane** is an endangered avian species native to North America. Wildlife biologists tracked the **crane** during its annual migration across the wetlands."*
- **Discourse Analysis:** Both occurrences refer exclusively to \`crane.n.05\` (bird). The construction vehicle sense never appears.

---

## 3. Examples Where the Constraint Fails Catastrophically

### Failure Case 1: Puns, Double Entendres & Humor
> *"I went to the **bank** to deposit money, but slipped and fell into the river **bank**."*
- **Failure:** In a single sentence, the author deliberately employs both senses of *"bank"* for narrative contrast. The constraint forces both to share one label, ensuring at least 50% error.

### Failure Case 2: Comparative / Encyclopedic Disambiguation Articles
> *"The word '**crane**' can refer either to a large bird with long legs or to a heavy piece of construction machinery used for lifting steel beams."*
- **Failure:** In educational, lexicographical, or linguistic discourse, multiple senses are explicitly juxtaposed for definition.

### Failure Case 3: Metaphorical Alternation (Metonymy)
> *"The company is a **dinosaur** that cannot innovate, but its founder collects actual **dinosaur** fossils."*
- **Failure:** Senses shift between metaphorical abstraction (outdated entity) and literal paleontology.

---

## 4. Exam Summary
The constraint succeeds in **topically homogeneous articles** (technical reports, news articles), but fails catastrophically on **puns**, **metaphors**, **contrastive comparisons**, and **lexicographical definitions** where multiple senses are deliberately juxtaposed.`
        };

      case 9:
        return {
          summary: "In-depth mathematical formulation and execution trace of the Flip-Flop Algorithm (Brown et al., 1991) for mutual information indicator clustering in WSD.",
          keyPoints: [
            "Developed by IBM Research (Brown et al., 1991) for statistical machine translation.",
            "Iterative hill-climbing algorithm that partitions vocabulary into two clusters to maximize Mutual Information.",
            "Iteratively freezes word partitions to optimize context partitions, then flips.",
            "Guarantees monotonic convergence to a local mutual information maximum."
          ],
          content: `## 1. Introduction: The Information-Theoretic Approach
In statistical machine translation, Peter Brown et al. (1991) formulated WSD as an information-theoretic optimization problem. They introduced the **Flip-Flop Algorithm** to automatically partition contextual indicator words into distinct classes that maximize **Mutual Information $I(X; Y)$** with target word translations.

---

## 2. Mathematical Objective
Let $t$ be an ambiguous word with two target translations (senses) $T_1$ and $T_2$. We observe a set of contextual indicator features $X = \\{x_1, x_2, \\dots, x_k\\}$.
We seek a binary partition of the contextual features into two subsets $C_1$ and $C_2$ such that the **Mutual Information** between the sense partition and context partition is maximized:

$$I(C; T) = \\sum_{c \\in \\{C_1, C_2\\}} \\sum_{t \\in \\{T_1, T_2\\}} P(c, t) \\log_2 \\frac{P(c, t)}{P(c) P(t)}$$

---

## 3. The Flip-Flop Iterative Procedure

\`\`\`
Step 1: Randomly initialize the binary context partition C = {C_1, C_2}
Step 2: [FLOP] Freeze context partition C. For every translation sense, assign it to T_1
        or T_2 to maximize Mutual Information I(C; T).
Step 3: [FLIP] Freeze translation partition T. For every contextual indicator word x_i,
        assign it to C_1 or C_2 to maximize Mutual Information I(C; T).
Step 4: Repeat [FLOP] and [FLIP] until no indicators switch partitions (Convergence).
\`\`\`

- **Monotonic Convergence:** Because Mutual Information is strictly bounded and each step either increases or maintains $I(C; T)$, the algorithm is **guaranteed to converge** to a local maximum in a finite number of iterations.

---

## 4. Exam Summary
The **Flip-Flop Algorithm** is an information-theoretic hill-climbing procedure that alternates between **freezing the sense partition** to optimize contextual indicator sets, and **freezing indicators** to optimize sense sets, monotonically maximizing **Mutual Information $I(C; T)$**.`
        };

      case 13:
      case 20:
        return {
          summary: "Comprehensive technical analysis of Yarowsky's Unsupervised Bootstrapping Algorithm (1995), combining decision lists with 'One Sense Per Collocation' and 'One Sense Per Discourse'.",
          keyPoints: [
            "Overcomes the knowledge acquisition bottleneck: requires only a tiny set of seed words or collocations.",
            "Trains a Decision List sorted by log-likelihood ratio.",
            "Applies 'One Sense Per Collocation' to extract candidate features and 'One Sense Per Discourse' to prune errors.",
            "Iteratively expands the labeled training pool until the entire corpus is disambiguated with >96% accuracy."
          ],
          content: `## 1. Introduction: The Yarowsky Bootstrapping Breakthrough
In 1995, David Yarowsky published a landmark unsupervised WSD algorithm that achieved **96.5% accuracy** (rivaling supervised models) without requiring hand-annotated training corpora. The algorithm bootstraps from a tiny set of seed words by pairing **One Sense Per Collocation** with **One Sense Per Discourse**.

---

## 2. The Step-by-Step Bootstrapping Algorithm

\`\`\`
Raw Corpus ──► [Seed Collocations: "life plant" -> Bio; "manufacturing plant" -> Industry]
                                │
                                ▼
         ┌────────────► [Train Decision List Classifier]
         │                      │
         │                      ▼
         │      [Classify Unlabeled Instances in Corpus]
         │                      │
         │                      ▼
         │      [Apply "One Sense Per Discourse" Pruning / Expansion]
         │                      │
         └─────────────── [Iterate until Convergence]
                                │
                                ▼
                   Final Disambiguated Corpus
\`\`\`

### Step 1: Identify Seed Words
For target word *"plant"*, specify an initial seed heuristic:
- Sense A (Living Plant): Co-occurs with *"life"*, *"flora"*.
- Sense B (Manufacturing Plant): Co-occurs with *"manufacturing"*, *"assembly"*.

### Step 2: Train a Decision List Classifier
Search a large unannotated corpus for sentences containing the target word and seed collocations. Train a **Decision List** that ranks collocation rules by log-likelihood ratio:
$$\\text{Score}(f) = \\left| \\log \\frac{P(\\text{Sense A} \\mid f)}{P(\\text{Sense B} \\mid f)} \\right|$$

### Step 3: Classify & Expand
Use the decision list to classify unlabeled instances of the ambiguous word in the corpus. Add instances with high confidence scores to the growing labeled training set.

### Step 4: Apply "One Sense Per Discourse"
Check all documents. If 90% of instances of *"plant"* in an article are tagged as **Industry**, re-tag the remaining 10% ambiguous instances in that article as **Industry** as well, correcting noisy misclassifications.

### Step 5: Repeat
Iterate Steps 2 through 4. With each cycle, the decision list learns new, subtle collocations (*"chemical plant"*, *"nuclear plant"*) until the entire corpus is labeled and the classifier stabilizes.

---

## 3. Exam Summary
**Yarowsky’s algorithm** is an unsupervised bootstrapping engine. It starts with minimal seeds, iteratively trains a **Decision List** using **One Sense Per Collocation**, and prunes noise using **One Sense Per Discourse**, achieving human-level 96.5% accuracy without labeled training data.`
        };
    }
  }

  // ==========================================
  // PART C (2 MARKS)
  // ==========================================
  if (part === "PART C") {
    switch (qNo) {
      case 1:
        return {
          summary: "Definition of supervised disambiguation based on labeled training sets.",
          keyPoints: [
            "WSD trained on sense-annotated corpora (SemCor).",
            "Models word sense selection as a supervised classification task."
          ],
          content: `### Supervised Disambiguation
**Supervised Word Sense Disambiguation** is the approach where a machine learning classifier (e.g., Naive Bayes, SVM) is trained on a manually sense-annotated corpus (such as **SemCor**).
- Each ambiguous word in the training text has been explicitly tagged by a human lexicographer with its exact WordNet sense.
- High accuracy, but severely constrained by the **Knowledge Acquisition Bottleneck** (expensive human labeling).`
        };

      case 2:
      case 11:
        return {
          summary: "Definition of dictionary-based disambiguation using lexical resources.",
          keyPoints: [
            "Leverages definitions and glosses from dictionaries/thesauri (WordNet).",
            "Evaluates text overlap via the Lesk algorithm."
          ],
          content: `### Dictionary-Based Disambiguation
**Dictionary-Based Disambiguation** relies directly on machine-readable lexical resources (e.g., Princeton WordNet, Oxford English Dictionary):
- **Mechanism (Lesk Algorithm):** Compares the words in the surrounding context window against the definitions (**glosses**) and usage examples of each candidate sense.
- Selects the sense with the highest lexical overlap count, requiring zero annotated training text.`
        };

      case 3:
      case 14:
        return {
          summary: "Definition of unsupervised disambiguation based on unlabeled corpora.",
          keyPoints: [
            "Word Sense Induction via clustering.",
            "Groups occurrences into sense clusters without predefined dictionaries."
          ],
          content: `### Unsupervised Disambiguation (Word Sense Induction)
**Unsupervised Disambiguation** operates on raw, unannotated text without predefined sense inventories or human labels:
- Uses distributional semantics to cluster vector representations of word contexts.
- Occurrences that share similar surrounding vocabularies are grouped into distinct clusters, where each cluster represents an emergent induced sense.`
        };

      case 8:
      case 9:
      case 10:
        return {
          summary: "Bayes Decision Rule and Naive Bayes assumption in WSD.",
          keyPoints: [
            "Bayes decision rule minimizes classification error by choosing maximum posterior P(s|f).",
            "Naive Bayes assumes contextual features are conditionally independent given the sense."
          ],
          content: `### Bayes Decision Rule & Naive Bayes Assumption in WSD
1. **Bayes Decision Rule:** Minimizes the probability of error by selecting the sense $\\hat{s}$ that maximizes the posterior probability given observed contextual features $f_1, \\dots, f_m$:
   $$\\hat{s} = \\arg\\max_{s_k} P(s_k \\mid f_1, \\dots, f_m) = \\arg\\max_{s_k} P(s_k) P(f_1, \\dots, f_m \\mid s_k)$$
2. **Naive Bayes Conditional Independence Assumption:** Assumes all context features are strictly conditionally independent given the sense:
   $$\\mathbf{\\hat{s} = \\arg\\max_{s_k} P(s_k) \\prod_{j=1}^m P(f_j \\mid s_k)}$$`
        };

      case 12:
      case 17:
        return {
          summary: "Thesaurus-based disambiguation and semantic categorization.",
          keyPoints: [
            "Groups words into broad thematic subject categories (Roget's Thesaurus).",
            "Scores candidate senses using category word overlap."
          ],
          content: `### Thesaurus-Based Disambiguation
**Thesaurus-Based Disambiguation** (e.g., Masterman 1957, Yarowsky 1992) uses a thesaurus (such as Roget's Thesaurus) to categorize words into broad semantic categories (e.g., \`TOOLS\`, \`ANIMALS\`, \`FINANCE\`):
- Scores candidate categories by counting how many words in the context window belong to each semantic heading.
- Disambiguates by assigning the category that has the strongest thematic representation in the surrounding passage.`
        };

      case 19:
        return {
          summary: "Upper and Lower bounds in WSD algorithm evaluation.",
          keyPoints: [
            "Lower bound is the Most Frequent Sense (MFS) baseline (~70%).",
            "Upper bound is Human Inter-Annotator Agreement (~95% homonymy, ~70% fine polysemy)."
          ],
          content: `### Upper and Lower Bounds in WSD
- **Lower Bound:** The performance of a naive heuristic that any useful algorithm must surpass. In WSD, the standard lower bound is the **Most Frequent Sense (MFS)** baseline (~65–75%).
- **Upper Bound:** The theoretical ceiling determined by **Human Inter-Annotator Agreement** (Cohen's $\\kappa$). A computer model cannot be expected to agree with human ground truth more often than two humans agree with each other (~95% on homonyms, ~70% on fine-grained polysemy).`
        };

      case 20:
        return {
          summary: "Definition of pseudowords in Word Sense Disambiguation.",
          keyPoints: [
            "Artificial compound created by merging two unrelated words (e.g., 'banana_door').",
            "Generates unlimited perfectly labeled evaluation data without human annotation."
          ],
          content: `### Pseudowords in WSD
A **Pseudoword** is an artificial compound created by conflating two or more unrelated words into a single synthetic token (e.g., merging *"banana"* and *"door"* into *"banana_door"*) across a raw text corpus:
- Creates an **unlimited, cost-free, perfectly ground-truthed dataset** for evaluating WSD classifiers without human manual labeling.
- Models homonymy well, but models real polysemy poorly due to lack of overlapping context.`
        };
    }
  }

  return null;
}
