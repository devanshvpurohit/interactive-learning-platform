import { QuestionData, GeneratedAnswer } from "./types";

export function getAcad40Unit3Answer(q: QuestionData): GeneratedAnswer | null {
  const { part, qNo } = q;

  // ==========================================
  // PART A (10 MARKS)
  // ==========================================
  if (part === "PART A") {
    switch (qNo) {
      case 1:
        return {
          summary: "Comprehensive architectural analysis of text parsing techniques for Noun Phrase (NP) detection, Verb Phrase (VP) detection, Subject detection, and Object detection.",
          keyPoints: [
            "Parsing reconstructs hierarchical grammatical constituent structures (Constituency Parsing) and functional arcs (Dependency Parsing).",
            "NP detection isolates nominal arguments via CFG rules (NP -> Det + Adj* + Noun) or regex chunking.",
            "VP detection identifies the finite verb and its complements (VP -> Verb + NP + PP).",
            "Subject and Object detection map syntactic roles to grammatical dependencies (nsubj, dobj)."
          ],
          content: `## 1. Introduction: Syntactic Parsing in NLP
**Syntactic Parsing** is the algorithmic process of analyzing a sentence to determine its grammatical structure with respect to a formal grammar. It transforms flat token arrays into hierarchical trees that explicitly identify **Noun Phrases (NP)**, **Verb Phrases (VP)**, and grammatical relations such as **Subject** and **Object**.

\`\`\`
                          (S)
             ┌─────────────┴─────────────┐
            (NP)                        (VP)
       [Subject: The dog]          ┌─────┴─────┐
                                  (V)         (NP)
                                [barked at] [Object: the mailman]
\`\`\`

---

## 2. In-Depth Detection Techniques

### 1. Noun Phrase (NP) Detection (Chunking)
- **Definition:** An NP is a constituent centered on a noun or pronoun that can function as a subject, object, or prepositional complement.
- **Rule-Based CFG Specification:**
  $$NP \\rightarrow (\\text{DT}) \\ (\\text{JJ})^* \\ (\\text{NN} \\mid \\text{NNS} \\mid \\text{NNP})^+$$
- **Regex Chunking (NLTK):**
  \`\`\`python
  grammar = r"NP: {<DT>?<JJ>*<NN.*>+}"
  \`\`\`
- **Sequence Labeling (IOB Tagging):** Tokens are labeled with Inside-Outside-Beginning tags:
  - *"The"* $\\rightarrow$ \`B-NP\`, *"brown"* $\\rightarrow$ \`I-NP\`, *"fox"* $\\rightarrow$ \`I-NP\`.

### 2. Verb Phrase (VP) Detection
- **Definition:** A syntactic constituent headed by a lexical or auxiliary verb that expresses an action, state, or predicate.
- **CFG Expansion Rules:**
  - Intransitive: $VP \\rightarrow V$ (*"The dog barked"*)
  - Transitive: $VP \\rightarrow V \\ NP$ (*"The dog chased the cat"*)
  - Complex: $VP \\rightarrow V \\ NP \\ PP$ (*"She put the book on the table"*)

### 3. Subject Detection
- **In Constituency Parsing:** The Subject is formally defined as the **external argument**: the NP that is an immediate child of the root sentence node $S$ and sibling to the primary $VP$:
  $$\\text{Subject} = \\{NP \\mid S \\rightarrow NP \\ VP\\}$$
- **In Dependency Parsing:** Identified directly via the typed dependency relation **\`nsubj\`** (nominal subject) pointing from the governing finite verb to the nominal head.

### 4. Object Detection
- **Direct Object (\`dobj\`):** The primary internal argument governed directly by the verb inside the $VP$:
  $$VP \\rightarrow V \\ NP_{\\text{Object}}$$
- **Indirect Object (\`iobj\`):** The recipient in ditransitive constructions (*"She gave [him (iobj)] [a book (dobj)]"*).

---

## 3. Comparison of Parsing Formalisms

| Feature | Constituency Parsing (Phrase Structure) | Dependency Parsing (Functional Grammars) |
| :--- | :--- | :--- |
| **Formalism** | Context-Free Grammars (CFGs) | Directed labeled grammatical graphs |
| **Node Types** | Non-terminals ($S, NP, VP$) and terminals | Words only (no phrasal non-terminals) |
| **Subject Detection** | Sibling of $VP$ under parent $S$ | Direct directed edge labeled \`nsubj\` |
| **Object Detection** | Child of $VP$ alongside head $V$ | Direct directed edge labeled \`dobj\` |
| **Algorithmic Complexity**| $O(n^3)$ (CYK / Chart Parsing) | $O(n)$ (Transition-Based Shift-Reduce) |

---

## 4. Exam Summary
Parsing detects grammatical roles through structural hierarchy: **Noun Phrases** and **Verb Phrases** are chunked via CFG rules or IOB sequence models, while **Subjects** (\`nsubj\`) and **Objects** (\`dobj\`) are extracted as explicit directed dependency relations.`
        };

      case 2:
        return {
          summary: "Precise mathematical derivation of the product of Term Frequency (TF) and Inverse Document Frequency (IDF) for a term 'hello' appearing K times in a document of T terms across a corpus of N documents where it appears in one-third of the total documents.",
          keyPoints: [
            "Given: Total terms in document = T, count of 'hello' in document = K, corpus size = N, document frequency DF = N / 3.",
            "Term Frequency TF = K / T.",
            "Inverse Document Frequency IDF = log(N / DF) = log(N / (N/3)) = log(3).",
            "Final TF-IDF Product = (K / T) * log(3) (approx. 0.4771 * (K/T) with log10, or 1.0986 * (K/T) with ln)."
          ],
          content: `## 1. Problem Formalization & Given Parameters
We are tasked with computing the exact value of the **TF-IDF (Term Frequency-Inverse Document Frequency)** score under the following given parameters:
- **Total documents in corpus:** $N$
- **Total terms in the chosen document $d$:** $T$
- **Occurrences of term $t = \\text{"hello"}$ in document $d$:** $K$
- **Documents containing term $t = \\text{"hello"}$:** Appears in approximately one-third of total documents:
  $$\\text{Document Frequency } DF(t) = \\frac{1}{3} N$$

---

## 2. Step-by-Step Mathematical Derivation

\`\`\`
       Term Frequency (TF)                     Inverse Document Frequency (IDF)
        TF = K / T                                IDF = log( N / DF )
            │                                             │
            │                                             ▼
            │                                   IDF = log( N / (N/3) ) = log(3)
            │                                             │
            └──────────────────────┬──────────────────────┘
                                   │
                                   ▼
                         TF-IDF = (K / T) · log(3)
\`\`\`

### Step 1: Compute Term Frequency ($TF$)
Term Frequency measures the relative density of the term within the specific document:
$$\\text{TF}(t, d) = \\frac{\\text{Count of term } t \\text{ in } d}{\\text{Total number of terms in } d} = \\frac{K}{T}$$

### Step 2: Compute Inverse Document Frequency ($IDF$)
Inverse Document Frequency measures how informative or discriminative the term is across the entire corpus of $N$ documents:
$$\\text{IDF}(t, D) = \\log\\left( \\frac{N}{\\text{DF}(t)} \\right)$$

Substitute $\\text{DF}(t) = \\frac{N}{3}$:
$$\\text{IDF}(t, D) = \\log\\left( \\frac{N}{\\frac{N}{3}} \\right) = \\log\\left( N \\cdot \\frac{3}{N} \\right) = \\log(3)$$

### Step 3: Compute the Product $\\text{TF} \\times \\text{IDF}$
$$\\mathbf{\\text{TF-IDF}(t, d, D)} = \\text{TF}(t, d) \\cdot \\text{IDF}(t, D) = \\mathbf{\\frac{K}{T} \\cdot \\log(3)}$$

---

## 3. Numerical Values across Standard Logarithmic Bases

Depending on the logarithmic convention adopted:
1. **Natural Logarithm ($\\ln$ or $\\log_e$, standard in scikit-learn):**
   $$\\text{IDF} = \\ln(3) \\approx 1.09861 \\implies \\mathbf{\\text{TF-IDF} \\approx 1.0986 \\cdot \\frac{K}{T}}$$
2. **Common Logarithm ($\\log_{10}$, standard in classical Information Retrieval):**
   $$\\text{IDF} = \\log_{10}(3) \\approx 0.47712 \\implies \\mathbf{\\text{TF-IDF} \\approx 0.4771 \\cdot \\frac{K}{T}}$$
3. **Binary Logarithm ($\\log_2$, standard in Information Theory):**
   $$\\text{IDF} = \\log_2(3) \\approx 1.58496 \\implies \\mathbf{\\text{TF-IDF} \\approx 1.5850 \\cdot \\frac{K}{T}}$$

---

## 4. Exam Summary
The exact symbolic value for the product of TF and IDF is:
$$\\mathbf{\\frac{K}{T} \\cdot \\log(3)}$$
Where $\\frac{K}{T}$ represents the local term density and $\\log(3)$ represents the global discriminative weight of a term present in one-third of the collection.`
        };

      case 3:
      case 7:
        return {
          summary: "Comprehensive analysis of how N-gram Language Models improve the accuracy of Automatic Speech Recognition (ASR) and Statistical Machine Translation (SMT).",
          keyPoints: [
            "N-gram language models compute sequence prior probabilities P(W) to resolve acoustic and translational ambiguities.",
            "In ASR: Disambiguates phonetically identical acoustic candidates (homophones like 'recognize speech' vs 'wreck a nice beach').",
            "In SMT: Decodes target language word order, fluency, and idiomatic lexical selections.",
            "Enforces grammatical agreement and lexical collocation via Markov transition probabilities."
          ],
          content: `## 1. Introduction: The Language Model as a Fluency Oracle
An **N-gram Language Model** is a statistical probability distribution over sequences of words. In dual-source NLP architectures such as **Automatic Speech Recognition (ASR)** and **Statistical Machine Translation (SMT)**, the language model functions as an indispensable fluency oracle that ranks competing output hypotheses.

---

## 2. Role in Automatic Speech Recognition (ASR)

In the standard Bayesian formulation of speech recognition:
$$\\hat{W} = \\arg\\max_W \\underbrace{P(A | W)}_{\\text{Acoustic Model}} \\cdot \\underbrace{P(W)}_{\\text{N-gram Language Model}}$$

\`\`\`
Acoustic Waveform: /r ɛ k ə ɡ n aɪ z s p iː tʃ/
         │
         ├──► Hypothesis 1: "wreck a nice beach"  (High Acoustic Score, LOW LM Probability: 10^-9)
         └──► Hypothesis 2: "recognize speech"    (High Acoustic Score, HIGH LM Probability: 10^-4)
                                                  ▲
                                                  │ WINNER! Selected by Language Model
\`\`\`

- **Resolving Homophones:** The acoustic model cannot differentiate between *"hear"* and *"here"*, or *"two"*, *"to"*, and *"too"*. The N-gram model evaluates the context:
  $$P(\\text{"hear"} \\mid \\text{"I can"}) \\gg P(\\text{"here"} \\mid \\text{"I can"})$$

---

## 3. Role in Statistical Machine Translation (SMT)

In the noisy channel model of machine translation:
$$\\hat{E} = \\arg\\max_E \\underbrace{P(F | E)}_{\\text{Translation Model (Fidelity)}} \\cdot \\underbrace{P(E)}_{\\text{Target Language Model (Fluency)}}$$

- **Enforcing Correct Target Word Order:**
  - When translating from German (SOV: *"Ich habe das Buch gelesen"*) to English:
  - The translation model proposes words: \`{I, have, the, book, read}\`.
  - The English trigram model scores:
    $$P(\\text{"I have read the book"}) \\gg P(\\text{"I have the book read"})$$
- **Lexical Collocation:** Ensures natural phrasing: selects *"strong tea"* over *"powerful tea"*, even though both translate the same foreign source term.

---

## 4. Exam Summary
N-gram language models dramatically improve accuracy by supplying the **prior probability $P(W)$**. In **speech recognition**, they resolve phonetically identical homophones; in **machine translation**, they enforce target language grammatical word order and natural phrasing.`
        };

      case 4:
        return {
          summary: "In-depth comparative study of how N-gram size (Unigram, Bigram, Trigram, 4-gram, 5-gram) impacts model performance, balancing context length against severe data sparsity.",
          keyPoints: [
            "Higher-order N-grams capture longer contextual history, dramatically improving fluency and constraint.",
            "Higher-order N-grams suffer from exponential state space explosion (|V|^N) and severe zero-count data sparsity.",
            "Unigrams model bag-of-words without word order; Bigrams model local pairs; Trigrams/4-grams are standard empirical compromises.",
            "Best practices: choose N=3 or N=4 with Kneser-Ney smoothing or backoff for optimal balance."
          ],
          content: `## 1. The Fundamental Trade-off in N-Gram Modeling
The choice of the N-gram context size $N$ represents a classic trade-off in statistical learning between **Contextual Horizon (Richness)** and **Statistical Reliability (Data Sparsity)**:

\`\`\`
   N = 1 (Unigram)     N = 2 (Bigram)       N = 3 (Trigram)       N = 5 (5-Gram)
◄──────────────────────────────────────────────────────────────────────────────►
Zero Context History    Local Context         Industry Standard    Long Dependencies
Zero Sparsity           Low Sparsity          Moderate Sparsity    Extreme Sparsity (Zeros!)
Poor Fluency            Grammatical Pairs     Fluent Phrases       Exploding Memory (|V|^5)
\`\`\`

---

## 2. Mathematical Impact Across N-Gram Sizes

### 1. Unigram ($N = 1$)
- **Formulation:** $P(w_1, w_2, \\dots, w_k) = \\prod_{i=1}^k P(w_i)$.
- **Assumption:** Complete mutual independence. Completely ignores word order and grammar.
- **Result:** Generates incoherent word salad (*"the child book table jumped red"*).

### 2. Bigram ($N = 2$)
- **Formulation:** $P(w_1, \\dots, w_k) = \\prod_{i=1}^k P(w_i | w_{i-1})$.
- **Properties:** Captures local grammatical pairings (determiner-noun, verb-object), but cannot model subject-verb agreement across intervening clauses.

### 3. Trigram ($N = 3$) & 4-Gram ($N = 4$)
- **Formulation:** $P(w_i | w_{i-1}, w_{i-2})$.
- **Properties:** The historical gold standard in ASR and machine translation. Captures idiomatic phrases, local prepositions, and verb tenses with manageable parameter storage.

### 4. 5-Gram and Higher ($N \\ge 5$)
- **Properties:** Exceptional fluency, but **exponentially sparse**. Over 99% of possible 5-grams in natural text have never appeared in any training corpus, requiring aggressive smoothing.

---

## 3. Parameter Space and Memory Explosion

If vocabulary size $|V| = 50,000$:

| Model | Possible Parameter Count ($|V|^N$) | Typical Real-World Sparsity | Storage Footprint |
| :--- | :--- | :--- | :--- |
| **Unigram ($N=1$)** | $50,000$ | 0% | Kilobytes |
| **Bigram ($N=2$)** | $2.5 \\times 10^9$ (2.5 Billion) | ~80% | Megabytes (Sparse) |
| **Trigram ($N=3$)** | $1.25 \\times 10^{14}$ (125 Trillion) | ~98% | Gigabytes |
| **5-Gram ($N=5$)** | $3.125 \\times 10^{23}$ | >99.999% | Terabytes (Requires pruning) |

---

## 4. Best Practices for Selecting N-Gram Size
1. **For constrained or embedded devices (mobile ASR):** Use **Trigrams ($N=3$)** pruned with entropy pruning.
2. **For web-scale corpora (Google N-grams):** Use **5-grams** with **Stupid Backoff**.
3. **Always pair with Smoothing:** Never run an N-gram model with $N \\ge 2$ without **Kneser-Ney** or Modified Kneser-Ney smoothing.

---

## 5. Exam Summary
Selecting $N$ balances fluency against data sparsity. **Low $N$ (1, 2)** lacks context; **high $N$ (5+)** suffers from exponential zero counts ($|V|^N$). The empirical optimum for classical NLP is **Trigram ($N=3$)** or **4-gram** backed by smoothing.`
        };

      case 5:
        return {
          summary: "Comparative evaluation of N-gram Language Models versus Deep Learning Neural Models (RNN, LSTM, Transformers), highlighting Markov limitations and continuous representations.",
          keyPoints: [
            "N-grams rely on discrete frequency counts and finite Markov context windows (N-1 tokens).",
            "Deep Learning models project tokens into continuous dense embedding spaces and attend to unbounded contexts.",
            "N-grams suffer from data sparsity and out-of-vocabulary words; neural models generalize via distributed representations.",
            "N-grams provide ultra-low latency CPU execution, making them ideal for mobile autocomplete and initial ASR lattice rescoring."
          ],
          content: `## 1. Introduction: Two Paradigms of Language Modeling
Language modeling has evolved from discrete count-based **N-gram models** to continuous **Deep Neural Language Models** (RNNs, LSTMs, and self-attention Transformers).

\`\`\`
DISCRETE N-GRAM (Count-Based):
"The cat sat on the [???]" ──► Counts: C("sat on the", w) / C("sat on the") ──► Markov window: 3 tokens

CONTINUOUS TRANSFORMER (Neural Attention):
"The cat sat on the [???]" ──► Dense Embeddings + Multi-Head Self-Attention ──► Global context: 8k+ tokens
\`\`\`

---

## 2. In-Depth Comparative Analysis

### 1. Representation: Discrete Symbols vs. Continuous Vectors
- **N-Gram Models:** Represent words as atomic, discrete symbols. The model has no inherent understanding that *"cat"* and *"kitten"* are semantically related. If *"the kitten sat"* never appeared in the corpus, its count is zero.
- **Deep Learning Models:** Words are embedded into continuous vector spaces $\\mathbb{R}^d$ (Word2Vec, Transformer embeddings). Because $\\vec{v}_{cat} \\approx \\vec{v}_{kitten}$, observations of *"cat"* automatically update and regularize predictions for *"kitten"*.

### 2. Context Window: Finite Markov Assumption vs. Long-Range Attention
- **N-Gram Models:** Constrained by the **Markov Assumption** ($N \\le 5$). They cannot enforce subject-verb agreement across long intervening clauses:
  - *"The **books** that I left at the library yesterday **were** [???]"* $\\rightarrow$ An N-gram only sees *"yesterday were"*, losing the plural subject *"books"*.
- **Transformers:** Multi-head self-attention links tokens across thousands of words in $O(1)$ operations, easily capturing long-range dependencies.

---

## 3. Comparison Matrix

| Attribute | N-Gram Language Models | Deep Learning (Transformers / GPT) |
| :--- | :--- | :--- |
| **Context Horizon** | Short (Strictly $N-1$ words) | Extremely Long (4,096 – 128,000+ tokens) |
| **Feature Representation** | Discrete word counts | Continuous dense vectors in $\\mathbb{R}^d$ |
| **Data Sparsity** | Severe (Zero counts for unseen phrases) | Minimal (Generalizes via vector geometry) |
| **Computational Footprint**| Microseconds on CPU (Hash lookup) | Milliseconds on high-end GPUs |
| **Model Size** | Megabytes to a few Gigabytes | Billions of parameters (Gigabytes to Terabytes) |
| **Training Requirement** | Linear count scan over corpus | Weeks of GPU/TPU backpropagation |

---

## 4. When N-Gram Models are More Effective
1. **Ultra-Low Latency & Edge Devices:** On embedded microcontrollers, smartwatches, and smartphone keyboards (predictive text autocomplete), N-gram models run in sub-millisecond CPU memory.
2. **First-Pass ASR / OCR Decoding:** Generating initial candidate lattices in real-time before passing to an expensive second-pass neural rescorer.
3. **Data-Scarce Domains:** Where only a small domain-specific text sample exists that cannot train neural networks without severe overfitting.

---

## 5. Exam Summary
N-grams rely on **discrete counts** within a **finite Markov window**, suffering from data sparsity. Neural models project text into **continuous embedding spaces** with **unbounded attention**. However, N-grams remain indispensable for ultra-fast, low-power edge autocomplete and real-time lattice generation.`
        };

      case 8:
      case 9:
        return {
          summary: "Comprehensive technical analysis of Huge Language Models and the Stupid Backoff algorithm (Brants et al., 2007) evaluated on web-scale corpora like Google N-grams.",
          keyPoints: [
            "Trained on web-scale corpora (e.g., Google N-gram corpus with 2 trillion tokens).",
            "Stupid Backoff discards true probability normalization to maximize computational throughput on big data.",
            "Backs off to lower-order N-grams multiplied by an empirical penalty factor (alpha = 0.4).",
            "Not a true probability distribution (does not sum to 1), but matches or exceeds Kneser-Ney accuracy at massive scale."
          ],
          content: `## 1. Motivation: Language Modeling at Web Scale
In 2007, Thorsten Brants et al. at Google investigated whether complex smoothing algorithms (e.g., Kneser-Ney) remained necessary when training on massive, multi-billion-word web corpora (Google 2-Trillion Token N-gram corpus). They proved that **massive data beats sophisticated smoothing**, introducing the **Stupid Backoff** algorithm.

\`\`\`
Target: S(w_i | w_{i-k+1}^{i-1})
Is C(w_{i-k+1}^i) > 0?
       ├──► YES: Return Relative Frequency: C(w_{i-k+1}^i) / C(w_{i-k+1}^{i-1})
       └──► NO:  Back off to lower-order: 0.4 · S(w_i | w_{i-k+2}^{i-1})
\`\`\`

---

## 2. The Stupid Backoff Formulation
Unlike Katz Backoff or Kneser-Ney, Stupid Backoff does not discount counts or compute normalization denominators. It defines an inexpensive scoring function $S$:

$$S(w_i | w_{i-k+1}^{i-1}) = \\begin{cases}
\\dfrac{\\text{Count}(w_{i-k+1}^i)}{\\text{Count}(w_{i-k+1}^{i-1})} & \\text{if } \\text{Count}(w_{i-k+1}^i) > 0 \\\\[10pt]
\\alpha \\cdot S(w_i | w_{i-k+2}^{i-1}) & \\text{otherwise}
\\end{cases}$$

- **Base Case (Unigram):**
  $$S(w_i) = \\frac{\\text{Count}(w_i)}{N}$$
- **The Empirical Parameter $\\alpha$:** Brants et al. found that setting $\\alpha = 0.4$ universally yielded optimal performance across web-scale data.

---

## 3. Why Stupid Backoff is NOT a True Probability Distribution
In probability theory, a valid distribution over vocabulary $V$ must satisfy:
$$\\sum_{w \\in V} P(w | w_{prev}) = 1.0$$
Because Stupid Backoff backs off by simply scaling the lower-order score by a fixed constant $\\alpha = 0.4$ without subtracting probability mass from higher-order counts, the sum of scores over all candidate words:
$$\\sum_{w \\in V} S(w | w_{prev}) \\neq 1.0$$
It outputs an **unnormalized ranking score**, NOT a true mathematical probability.

---

## 4. Key Engineering Advantages
1. **Extreme Computational Efficiency:** Requires zero discount calculations or precomputed normalization tables.
2. **Scalability on Distributed Clusters:** Can be trained across thousands of nodes via MapReduce in hours on 2 trillion tokens.
3. **Competitive Performance:** At scale ($N \\ge 5$ on web data), Stupid Backoff achieves translation BLEU scores equal to or higher than heavily parameterized Kneser-Ney models.

---

## 5. Exam Summary
Stupid Backoff replaces complex probability smoothing with an **unnormalized scoring function** that scales backoff to lower-order frequencies by $\\alpha = 0.4$. While **not a true probability distribution**, its computational simplicity enables language modeling across trillions of web tokens.`
        };

      case 10:
        return {
          summary: "Rigorous mathematical explanation of Perplexity and its relationship to Cross-Entropy and Information Theory for evaluating N-gram language models.",
          keyPoints: [
            "Perplexity is the standard intrinsic metric for evaluating language models.",
            "Formally defined as the inverse probability of the test text, normalized by word count.",
            "Mathematically equivalent to 2 raised to the cross-entropy: PP(W) = 2^(H(W)).",
            "Lower perplexity indicates superior predictive capability; represents the effective branching factor."
          ],
          content: `## 1. Intrinsic Evaluation of Language Models
The most definitive intrinsic metric for evaluating how well a language model predicts real-world text is **Perplexity ($PP$)**. Intuitively, perplexity measures how "surprised" the language model is upon reading unseen test text.

---

## 2. Formal Mathematical Definition of Perplexity
Given a test document of $N$ words $W = w_1, w_2, \\dots, w_N$, the perplexity of the model on $W$ is defined as the reciprocal (inverse) probability of the test collection, normalized by sequence length $N$:

$$\\text{Perplexity}(W) = P(w_1, w_2, \\dots, w_N)^{-\\frac{1}{N}} = \\sqrt[N]{\\frac{1}{P(w_1, w_2, \\dots, w_N)}}$$

Applying the chain rule under a bigram assumption:
$$\\text{Perplexity}(W) = \\sqrt[N]{\\prod_{i=1}^N \\frac{1}{P(w_i | w_{i-1})}}$$

---

## 3. Relationship to Cross-Entropy

In information theory, the **Cross-Entropy** $H(W)$ of a language model $M$ on test text $W$ is:
$$H(W) = -\\frac{1}{N} \\log_2 P(w_1, w_2, \\dots, w_N)$$

Notice that:
$$\\text{Perplexity}(W) = 2^{H(W)}$$

\`\`\`
Test Set W ──► [Compute Model Log-Likelihood] ──► Cross-Entropy H(W) ──► Perplexity = 2^H(W)
\`\`\`

- **Interpretation:** Perplexity is simply **2 raised to the cross-entropy**. Minimizing cross-entropy directly minimizes perplexity.

---

## 4. The "Weighted Branching Factor" Intuition
Perplexity represents the **effective branching factor** of the language:
- If a model has a perplexity of **84**, it means that at each word position, the model is as confused as if it were choosing uniformly at random among **84 equally likely words**.
- A perfect model has $\\text{Perplexity} = 1.0$ (it predicts the next word with 100% certainty).
- A completely uninformative model over vocabulary $|V| = 50,000$ assigning uniform probability has $\\text{Perplexity} = 50,000$.

---

## 5. Exam Summary
**Perplexity is $2^{H(W)}$** (2 raised to the cross-entropy). It measures the **inverse geometric mean probability** assigned to test text. **Lower perplexity denotes a superior model**, representing the model's effective branching factor at each token.`
        };
    }
  }

  // ==========================================
  // PART B (10 MARKS) - Remaining questions
  // ==========================================
  if (part === "PART B") {
    switch (qNo) {
      case 2:
        return {
          summary: "Mathematical derivation of the Chain Rule of Probability for computing the joint probability of an entire sentence sequence.",
          keyPoints: [
            "Decomposes joint probability P(w1, w2, ..., wn) into a sequence of conditional probabilities.",
            "Formally derived from the definition of conditional probability.",
            "Markov assumption simplifies the unbounded history to the preceding N-1 words.",
            "Evaluated in log space to prevent numerical floating-point underflow."
          ],
          content: `## 1. The Fundamental Goal: Sequence Probability
In language modeling, the primary objective is to compute the joint probability $P(W) = P(w_1, w_2, \\dots, w_n)$ of an entire sequence of $n$ words forming a coherent sentence.

---

## 2. Derivation of the Chain Rule of Probability

From the elementary definition of conditional probability:
$$P(A \\cap B) = P(A) \\cdot P(B | A)$$

Extending this to three variables:
$$P(A \\cap B \\cap C) = P(A) \\cdot P(B | A) \\cdot P(C | A \\cap B)$$

By mathematical induction, for any arbitrary sequence of $n$ words:
$$\\mathbf{P(w_1, w_2, \\dots, w_n) = \\prod_{k=1}^n P(w_k \\mid w_1, w_2, \\dots, w_{k-1})}$$

Expanding explicitly:
$$P(w_1, \\dots, w_n) = P(w_1) \\cdot P(w_2 | w_1) \\cdot P(w_3 | w_1, w_2) \\dots P(w_n | w_1, \\dots, w_{n-1})$$

---

## 3. The Need for the Markov Assumption
In practice, computing $P(w_n | w_1, \\dots, w_{n-1})$ is impossible for long sentences because the exact sequence $w_1, \\dots, w_{n-1}$ will never have appeared in any training corpus.
- **The Markov Assumption** approximates the infinite historical context by only conditioning on the **preceding $N-1$ words**:
  - *Bigram ($N=2$):* $P(w_n | w_1, \\dots, w_{n-1}) \\approx P(w_n | w_{n-1})$
  - *Trigram ($N=3$):* $P(w_n | w_1, \\dots, w_{n-1}) \\approx P(w_n | w_{n-1}, w_{n-2})$

---

## 4. Log-Space Computation to Prevent Underflow
Because probabilities are numbers between $0$ and $1$, multiplying dozens of probabilities together causes catastrophic **floating-point arithmetic underflow**:
$$\\prod_{i=1}^n P(w_i | w_{i-1}) \\rightarrow 0.0000000000000000...$$
In actual implementations, computations are performed in **Log Space**:
$$\\log P(w_1, \\dots, w_n) = \\sum_{k=1}^n \\log P(w_k \\mid w_{k-1})$$

---

## 5. Exam Summary
The **Chain Rule of Probability** decomposes sequence joint probabilities into conditional products. Applying the **Markov Assumption** bounds the history to the prior $N-1$ tokens, and computations are executed in **log space** to prevent underflow.`
        };

      case 6:
        return {
          summary: "Comprehensive survey of Smoothing Techniques in N-gram models: Laplace (Add-1), Add-k, Good-Turing, Absolute Discounting, and Jelinek-Mercer Interpolation.",
          keyPoints: [
            "Smoothing prevents zero probabilities (zeros) by shaving probability mass from frequent N-grams and reallocating it to unseen events.",
            "Laplace (Add-1) adds 1 to all counts; severely overestimates rare events.",
            "Good-Turing uses the frequency of frequency counts (r*) to estimate unseen probability.",
            "Jelinek-Mercer linearly interpolates trigram, bigram, and unigram probabilities using lambda weights."
          ],
          content: `## 1. The Zero-Probability Problem
Under Maximum Likelihood Estimation (MLE), if an N-gram is never observed in the training corpus ($C(w_{n-1}, w_n) = 0$), the model assigns:
$$P_{MLE}(w_n | w_{n-1}) = \\frac{0}{C(w_{n-1})} = 0$$
When calculating the probability of a test sentence using the chain rule, a single zero count sets the entire sentence probability to zero ($P(W) = 0$) and causes **perplexity to explode to infinity ($\\infty$)**. **Smoothing** solves this.

---

## 2. In-Depth Smoothing Algorithms

\`\`\`
       ┌────────────────────────────────────────────────────────┐
       │                 SMOOTHING TECHNIQUES                   │
       └───────────────────────────┬────────────────────────────┘
           ┌───────────────────────┼────────────────────────┐
           ▼                       ▼                        ▼
  Add-1 / Add-k              Good-Turing            Linear Interpolation
(Adds constant to counts)  (Uses frequency of      (Blends Trigram, Bigram,
                            frequencies: r*)        Unigram via lambdas)
\`\`\`

### 1. Laplace (Add-1) Smoothing
- **Concept:** Pretend each word was observed exactly 1 more time than it actually was.
- **Formula:**
  $$P_{\\text{Laplace}}(w_i | w_{i-1}) = \\frac{C(w_{i-1}, w_i) + 1}{C(w_{i-1}) + |V|}$$
  Where $|V|$ is the total vocabulary size.
- **Limitation:** Shifts far too much probability mass to zero counts. In a vocabulary of 50,000, adding $|V|$ to denominators crushes the probabilities of common words.

### 2. Add-k (Lidstone's) Smoothing
- **Concept:** Replaces $1$ with a small fractional hyperparameter $k \\in (0, 1)$, typically $k = 0.05$:
  $$P_{\\text{Add-k}}(w_i | w_{i-1}) = \\frac{C(w_{i-1}, w_i) + k}{C(w_{i-1}) + k|V|}$$

### 3. Good-Turing Smoothing
- **Concept:** Reallocates probability mass based on $N_r$, the number of N-grams that occur exactly $r$ times.
- **Adjusted Count ($r^*$):**
  $$r^* = (r + 1) \\frac{N_{r+1}}{N_r}$$
- **Probability of an Unseen Event ($r = 0$):**
  $$P_0 = \\frac{N_1}{N}$$
  The probability of all unseen events combined is simply the proportion of singletons ($N_1$, words seen only once) in the corpus!

### 4. Jelinek-Mercer Interpolation
- **Concept:** Linearly interpolates higher-order estimates with lower-order estimates:
  $$P_{JM}(w_i | w_{i-1}, w_{i-2}) = \\lambda_1 P_{MLE}(w_i | w_{i-1}, w_{i-2}) + \\lambda_2 P_{MLE}(w_i | w_{i-1}) + \\lambda_3 P_{MLE}(w_i)$$
  Where $\\sum_i \\lambda_i = 1$ and $\\lambda_i \\ge 0$, optimized via the EM algorithm on held-out validation data.

---

## 3. Exam Summary
Smoothing prevents zero probabilities. **Laplace** adds a constant $k$; **Good-Turing** estimates unseen mass using singleton counts ($N_1/N$); and **Jelinek-Mercer** linearly blends trigram, bigram, and unigram probabilities using learned $\\lambda$ weights.`
        };

      case 7:
        return {
          summary: "Comprehensive mathematical derivation of Kneser-Ney Smoothing, explaining Absolute Discounting, Continuation Probability, and why it is the gold-standard N-gram smoothing algorithm.",
          keyPoints: [
            "Kneser-Ney outperforms all other smoothing methods by utilizing Continuation Probability instead of unigram frequency.",
            "Absolute Discounting subtracts a fixed constant d (0.75) from observed counts.",
            "Continuation probability P_continuation(w) measures how versatile a word is across diverse historical contexts.",
            "Interpolated Kneser-Ney recursively blends discounted higher-order counts with lower-order continuation estimates."
          ],
          content: `## 1. Introduction: Why Standard Unigram Smoothing Fails
Consider the word *"Francisco"*. In any American text corpus, *"Francisco"* appears frequently, almost exclusively preceded by *"San"* (*"San Francisco"*).
- In traditional backoff/interpolation (e.g., Jelinek-Mercer), if the model encounters an unseen bigram like *"vintage [???]"*, it evaluates the unigram probability $P(\\text{"Francisco"})$. Because *"Francisco"* has a high raw count, the model assigns it a high probability:
  $$P_{JM}(\\text{"Francisco"} \\mid \\text{"vintage"}) \\quad \\text{is artificially HIGH!}$$
- This is absurd. *"Francisco"* is not a versatile word; it only follows *"San"*.
- **Kneser-Ney Smoothing (1995)** solves this by replacing unigram frequency with **Continuation Probability**.

---

## 2. In-Depth Mathematical Formulation

\`\`\`
Higher-Order Discounted MLE               Lower-Order Continuation Probability
max(C(w_{i-1}, w_i) - d, 0) / C(w_{i-1})  +  λ(w_{i-1}) · P_continuation(w_i)
\`\`\`

### 1. Continuation Probability ($P_{\\text{continuation}}(w)$)
Measures how likely word $w$ is to complete an *unseen* context by counting the number of distinct word types that precede it:
$$P_{\\text{continuation}}(w) = \\frac{|\\{w' : C(w', w) > 0\\}|}{\\sum_{w''} |\\{w' : C(w', w'') > 0\\}|}$$
- *"Francisco"* has a low continuation probability because it almost only follows *"San"* ($|\\{w' : C(w', \\text{"Francisco"}) > 0\\}| \\approx 1$).
- Words like *"glasses"* follow hundreds of different adjectives (*reading, dark, broken, wine*), yielding a high continuation probability.

### 2. Absolute Discounting
Kneser-Ney subtracts a fixed absolute discount $d \\in (0, 1)$ (empirically $d \\approx 0.75$) from non-zero counts to free up probability mass for lower-order models.

### 3. Interpolated Kneser-Ney Formula
$$P_{KN}(w_i | w_{i-1}) = \\frac{\\max(C(w_{i-1}, w_i) - d, \\ 0)}{C(w_{i-1})} + \\lambda(w_{i-1}) \\cdot P_{\\text{continuation}}(w_i)$$

Where the normalization weight $\\lambda(w_{i-1})$ is:
$$\\lambda(w_{i-1}) = \\frac{d}{C(w_{i-1})} \\cdot |\\{w : C(w_{i-1}, w) > 0\\}|$$

---

## 3. Exam Summary
Kneser-Ney is the superior N-gram smoothing algorithm because it couples **Absolute Discounting** (subtracting $d \\approx 0.75$) with **Continuation Probability** (measuring how versatile a word is across diverse contexts, rather than raw frequency).`
        };

      case 16:
      case 17:
      case 18:
        return {
          summary: "Comprehensive technical analysis of Finite-State Transducers (FST) for morphological parsing, morphotactics, and combining lexicon and orthographic phonological rules.",
          keyPoints: [
            "An FST is a 2-tape finite state automaton that maps an input string to an output string.",
            "Morphological parsing maps surface forms (e.g., 'cats') to lexical forms (e.g., 'cat +N +PL').",
            "Morphotactics models legal morpheme ordering; Orthographic rules model spelling changes (e.g., y -> ies).",
            "FST Composition (Lexicon o Rules) enables bidirectional morphological analysis and generation."
          ],
          content: `## 1. Definition of a Finite-State Transducer (FST)
A **Finite-State Transducer (FST)** is an extension of a Finite-State Automaton that operates on **two tapes**: an input tape and an output tape. It maps or translates between two regular languages.

### Formal 6-Tuple Definition:
$$T = \\langle Q, \\Sigma, \\Delta, q_0, F, \\delta, \\sigma \\rangle$$
- $\\Sigma$: Input alphabet (Surface strings).
- $\\Delta$: Output alphabet (Lexical morphemes and grammatical tags).
- Transitions read an input symbol $a \\in \\Sigma$ and emit an output symbol $b \\in \\Delta$, written as $a : b$.

\`\`\`
LEXICAL TAPE (Underlying):  c   a   t   +N   +PL
                            │   │   │   │     │
TRANSITION LABELS:          c:c a:a t:t ε:^s  ε:#
                            │   │   │   │     │
SURFACE TAPE (Observed):    c   a   t   s     ε
\`\`\`

---

## 2. Morphotactics and the Two-Level Morphology Architecture

Morphological parsing involves two distinct linguistic components:
1. **The Lexicon & Morphotactics:** Specifies which morphemes can follow which other morphemes:
   - \`Stem: cat\` $\\rightarrow$ followed by \`Noun Affix: -s\`.
   - Rejects illegal sequences (e.g., \`un-\` attaching to a noun: \`*un-dog\`).
2. **Orthographic / Phonological Rules:** Models spelling mutations at morpheme boundaries:
   - E-insertion: \`fox\` + \`-s\` $\\rightarrow$ \`foxes\` (inserts 'e' after sibilants).
   - Y-replacement: \`city\` + \`-s\` $\\rightarrow$ \`cities\` ('y' becomes 'ie').

---

## 3. Combining Lexicon and Rules via FST Composition

The foundational breakthrough of Two-Level Morphology (Kimmo Koskenniemi, 1983) was showing that both the lexicon and spelling rules can be represented as separate FSTs and **composed** into a single unified transducer:

$$\\mathbf{T_{\\text{Total}} = T_{\\text{Lexicon}} \\circ T_{\\text{Rules}}}$$

\`\`\`
Lexical Form:     c i t y +N +PL
                        │
                        ▼  [T_Lexicon]
Intermediate:     c i t y ^ s
                        │
                        ▼  [T_Rules: y -> ie before ^s]
Surface String:   c i t i e s
\`\`\`

### Bidirectionality of FSTs:
Because an FST defines a relational mapping between two tapes, the same compiled automaton performs two reciprocal operations:
1. **Morphological Analysis (Parsing):** Ingests surface string *"cities"*, outputs lexical analysis \`city +N +PL\`.
2. **Morphological Generation (Synthesis):** Ingests lexical tag \`city +N +PL\`, outputs surface string *"cities"*.

---

## 4. Exam Summary
An FST is a **two-tape automaton** ($a:b$). In morphological parsing, **$T_{\\text{Lexicon}}$** (morphotactics) is composed with **$T_{\\text{Rules}}$** (orthographic spelling rules) via **$T = T_{\\text{lex}} \\circ T_{\\text{rules}}$**, enabling bidirectional morphological analysis and generation.`
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
          summary: "Role of probability in Automatic Speech Recognition.",
          keyPoints: [
            "Resolves acoustic confusion between phonetically identical words (homophones).",
            "Selects highest likelihood word sequence via Bayes' rule: argmax P(A|W)*P(W)."
          ],
          content: `### Why Probability is Essential in Speech Recognition
Speech signals are inherently noisy and ambiguous:
1. **Homophone Disambiguation:** The acoustic waveform for *"recognize speech"* and *"wreck a nice beach"* sounds identical. Probability assigns $P(\\text{"recognize speech"}) \\gg P(\\text{"wreck a nice beach"})$.
2. **Bayesian Decoding:** ASR decodes words by maximizing the product of the acoustic likelihood and the language model prior:
   $$\\hat{W} = \\arg\\max_W P(\\text{Audio} | W) \\cdot P(W)$$`
        };

      case 2:
        return {
          summary: "Role of probability in Machine Translation.",
          keyPoints: [
            "Enforces target language fluency and word order.",
            "Selects idiomatic translation among hundreds of dictionary candidates."
          ],
          content: `### Why Probability is Essential in Machine Translation
In Machine Translation, a single source word can map to dozens of target words:
1. **Fluency & Word Order:** Probability determines which permutation of target words conforms to natural syntax:
   $$P(\\text{"I have read the book"}) \\gg P(\\text{"I have the book read"})$$
2. **Collocation Ranking:** Probability ensures native phrasing (e.g., selecting *"heavy rain"* over *"strong rain"*).`
        };

      case 3:
      case 4:
        return {
          summary: "Definition of N-gram language models and next-word prediction.",
          keyPoints: [
            "An N-gram model estimates conditional probability of next word given preceding N-1 words.",
            "Uses relative frequency counts under the Markov assumption."
          ],
          content: `### Language Models & Next-Word Prediction
An **N-gram Language Model** models the probability distribution of word sequences. Under an N-gram model, the probability of predicting the next word $w_k$ is conditioned strictly on the preceding $N-1$ words:
$$P(w_k | w_1, \\dots, w_{k-1}) \\approx P(w_k | w_{k-N+1}^{k-1}) = \\frac{C(w_{k-N+1}^k)}{C(w_{k-N+1}^{k-1})}$$
The model predicts the next word by choosing the candidate that maximizes this conditional probability.`
        };

      case 5:
        return {
          summary: "Definition of a bigram with a concrete example.",
          keyPoints: [
            "A bigram is a 2-word sequence (N=2).",
            "Probability conditions on the single immediately preceding word."
          ],
          content: `### Bigram with Example
A **Bigram** is a contiguous sequence of two words ($N = 2$). In a bigram model, the probability of a word depends solely on its immediate predecessor:
$$P(w_i | w_{i-1}) = \\frac{\\text{Count}(w_{i-1}, w_i)}{\\text{Count}(w_{i-1})}$$

### Concrete Example:
In the sentence: *"The cat sat on the mat"*, the bigrams are:
\`{"<s> The", "The cat", "cat sat", "sat on", "on the", "the mat", "mat </s>"}\`.`
        };

      case 6:
        return {
          summary: "The Markov Assumption in N-gram language models.",
          keyPoints: [
            "Approximates full historical context using only the recent N-1 words.",
            "Makes probability estimation computationally tractable."
          ],
          content: `### Markov Assumption in N-grams
The **Markov Assumption** states that the probability of an upcoming word depends only on a short history of the preceding $N-1$ words, rather than the entire preceding text:
$$P(w_k | w_1, w_2, \\dots, w_{k-1}) \\approx P(w_k | w_{k-N+1}^{k-1})$$
- Bigram assumes: $P(w_n | w_1 \\dots w_{n-1}) \\approx P(w_n | w_{n-1})$.
It makes language modeling computationally tractable by eliminating infinite history states.`
        };

      case 7:
      case 8:
        return {
          summary: "Maximum Likelihood Estimation and Relative Frequency in NLP.",
          keyPoints: [
            "MLE estimates probabilities directly from corpus frequency ratios.",
            "Maximizes the likelihood of the training data without smoothing."
          ],
          content: `### Maximum Likelihood Estimation (MLE) & Relative Frequency
In NLP, **Maximum Likelihood Estimation (MLE)** estimates parameter probabilities by matching them directly to the **relative frequency** of events in a training corpus:
$$P_{MLE}(w_i | w_{i-1}) = \\frac{C(w_{i-1}, w_i)}{C(w_{i-1})}$$
It is called "Maximum Likelihood" because this parameter assignment mathematically maximizes the likelihood function of observing the training data.`
        };

      case 9:
      case 10:
        return {
          summary: "Intrinsic vs Extrinsic evaluation of language models.",
          keyPoints: [
            "Extrinsic evaluation measures performance on an end-user downstream task (WER in ASR, BLEU in MT).",
            "Intrinsic evaluation measures model quality independently using Perplexity."
          ],
          content: `### Extrinsic vs. Intrinsic Evaluation of Language Models
1. **Extrinsic (In-Vivo) Evaluation:** Evaluates the language model by embedding it in an actual end-to-end downstream application and measuring end performance:
   - Measuring **Word Error Rate (WER)** in Speech Recognition.
   - Measuring **BLEU score** in Machine Translation.
2. **Intrinsic (In-Vitro) Evaluation:** Evaluates the model independently of any application by computing **Perplexity ($PP$)** or Cross-Entropy on a held-out test dataset.`
        };

      case 11:
        return {
          summary: "Branching factor in relation to perplexity.",
          keyPoints: [
            "Perplexity is the weighted effective branching factor.",
            "Represents how many equally likely words the model must choose between."
          ],
          content: `### Branching Factor and Perplexity
In computer science, a **branching factor** is the number of possible choices at each decision point.
- **Perplexity as Branching Factor:** Perplexity is the **weighted average branching factor** of the language model.
- If a language model has $\\text{Perplexity} = 50$, it means that when predicting the next word, the model is as uncertain as if it were choosing uniformly at random among **50 equally likely candidate words**.`
        };

      case 12:
      case 13:
        return {
          summary: "Data sparsity and smoothing in language models.",
          keyPoints: [
            "Data sparsity occurs when valid N-grams have zero corpus count.",
            "Smoothing redistributes probability mass from frequent events to unseen events."
          ],
          content: `### Data Sparsity & Smoothing
- **The Problem of Sparsity:** Because natural language vocabulary is vast and follows Zipf's law, most valid word combinations never appear in a training corpus, receiving an estimated probability of zero ($P=0$).
- **Smoothing:** Algorithms that shave off a small fraction of probability mass from frequent, observed N-grams and reallocate it to unseen (zero-count) events, preventing infinite perplexity.`
        };

      case 14:
        return {
          summary: "Kneser-Ney smoothing concept and example.",
          keyPoints: [
            "Combines absolute discounting with continuation probability.",
            "Replaces unigram frequency with the count of unique histories."
          ],
          content: `### Kneser-Ney Smoothing
**Kneser-Ney Smoothing** is the gold-standard N-gram smoothing algorithm:
1. **Absolute Discounting:** Subtracts a constant discount $d \\approx 0.75$ from observed counts.
2. **Continuation Probability:** Instead of asking *"how frequent is word w?"*, it asks *"how likely is word w to complete an unseen context?"*
- *Example:* *"Francisco"* has high count but low continuation probability (only follows *"San"*); *"glasses"* has high continuation probability because it follows many adjectives.`
        };

      case 15:
      case 16:
      case 17:
        return {
          summary: "Entropy, Entropy Rate, and Cross-Entropy in language modeling.",
          keyPoints: [
            "Entropy H(X) measures information content and uncertainty.",
            "Entropy rate is the per-word information limit.",
            "Cross-entropy measures model divergence from true distribution; PP = 2^H(W)."
          ],
          content: `### Entropy, Entropy Rate, and Cross-Entropy
1. **Entropy ($H(X)$):** The measure of uncertainty or information content in a probability distribution:
   $$H(X) = -\\sum_{x} P(x) \\log_2 P(x)$$
2. **Entropy Rate:** The average entropy per word as sequence length grows to infinity:
   $$H(L) = \\lim_{n \\rightarrow \\infty} \\frac{1}{n} H(w_1, \\dots, w_n)$$
3. **Cross-Entropy:** Evaluates how well model $M$ approximates the true distribution $P$:
   $$H(W) = -\\frac{1}{N} \\sum_{i=1}^N \\log_2 P_M(w_i | w_{i-1})$$
   Perplexity is directly related: $\\mathbf{\\text{Perplexity} = 2^{H(W)}}$.`
        };

      case 18:
      case 19:
        return {
          summary: "Inflectional morphology and nominalization in derivational morphology.",
          keyPoints: [
            "Inflectional morphology modifies tense and number without changing POS.",
            "Nominalization is derivational morphology that converts verbs/adjectives into nouns."
          ],
          content: `### Inflectional Morphology & Nominalization
- **Inflectional Morphology:** Modifies grammatical features (tense, number, person, case) without changing the word's fundamental lexical category (POS).
  - *Example:* *walk* (Verb) $\\rightarrow$ *walked* (Verb, past).
- **Nominalization (Derivational Morphology):** The morphological process of forming a **Noun** from a Verb, Adjective, or another Noun by adding derivational affixes:
  - *Verb to Noun:* \`destroy\` $\\rightarrow$ \`destruction\`; \`govern\` $\\rightarrow$ \`government\`.
  - *Adjective to Noun:* \`dark\` $\\rightarrow$ \`darkness\`; \`pure\` $\\rightarrow$ \`purity\`.`
        };

      case 20:
        return {
          summary: "Definition of Finite-State Morphological Parsing.",
          keyPoints: [
            "Algorithmic process of mapping surface strings to root morphemes and grammatical tags.",
            "Implemented using Finite-State Transducers (FSTs)."
          ],
          content: `### Finite-State Morphological Parsing in Simple Words
**Finite-State Morphological Parsing** is the automated process of taking a surface word form and using a Finite-State Transducer (FST) to break it into its base root and grammatical feature tags:
$$\\text{Surface Word: } \\textit{"cats"} \\quad \\xrightarrow{\\text{FST Parsing}} \\quad \\text{Lexical Analysis: } \\textit{"cat"} + \\text{[Noun]} + \\text{[Plural]}$$
It allows NLP systems to recognize roots and grammatical functions in linear time.`
        };
    }
  }

  return null;
}
