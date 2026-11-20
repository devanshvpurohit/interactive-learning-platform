import { QuestionData, GeneratedAnswer } from "./types";

export function getAcad40Unit2Answer(q: QuestionData): GeneratedAnswer | null {
  const { part, qNo } = q;

  // ==========================================
  // PART A (10 MARKS)
  // ==========================================
  if (part === "PART A") {
    switch (qNo) {
      case 1:
        return {
          summary: "Comprehensive analysis of dimensionality reduction techniques for a Document-Term Matrix (DTM) of 20,000 documents, covering LSA/TruncatedSVD, PCA, TF-IDF feature selection, and Chi-Square.",
          keyPoints: [
            "A Document-Term Matrix across 20k documents suffers from the Curse of Dimensionality ($|V| > 50,000$).",
            "Linear projection methods: Truncated SVD / Latent Semantic Analysis (LSA) and Principal Component Analysis (PCA).",
            "Feature selection techniques: Chi-Square ($\\chi^2$) test, Mutual Information (MI), and document frequency filtering (min_df, max_df).",
            "Nonlinear embeddings: t-SNE and UMAP for low-dimensional visualization."
          ],
          content: `## 1. Problem Formulation: The Curse of Dimensionality
When constructing a **Document-Term Matrix (DTM)** for a corpus of 20,000 documents ($N = 20,000$), the resulting feature space typically contains $M = 30,000$ to $100,000+$ distinct vocabulary terms.
$$\\mathbf{X} \\in \\mathbb{R}^{20,000 \\times M}, \\quad \\text{where } M \\gg 10^4$$
This matrix is over 98% sparse and suffers from the **Curse of Dimensionality**: severe computational overhead, geometric distance collapse, and severe risk of overfitting.

\`\`\`
Sparse High-Dim DTM [20,000 x 50,000]
                 │
   ┌─────────────┴─────────────┐
   ▼                           ▼
[Feature Selection]    [Feature Extraction / Projection]
- Frequency pruning    - TruncatedSVD / LSA
- Chi-Square (χ²)      - PCA
- Mutual Information   - UMAP / t-SNE
                 │
                 ▼
Dense Low-Dim Matrix [20,000 x 300]
\`\`\`

---

## 2. Primary Dimensionality Reduction Techniques

### 1. Truncated Singular Value Decomposition (TruncatedSVD) / LSA
- **Mechanism:** Latent Semantic Analysis (LSA) applies Singular Value Decomposition directly to the sparse DTM without centering (preserving sparsity):
  $$\\mathbf{X} \\approx \\mathbf{U}_k \\mathbf{\\Sigma}_k \\mathbf{V}_k^T$$
  Where $k$ is the reduced rank (typically $k \\in [100, 300]$).
  - $\\mathbf{U}_k \\in \\mathbb{R}^{20,000 \\times k}$: Document representations in latent topic space.
  - $\\mathbf{\\Sigma}_k \\in \\mathbb{R}^{k \\times k}$: Diagonal singular values capturing latent topic variance.
  - $\\mathbf{V}_k^T \\in \\mathbb{R}^{k \\times M}$: Term loadings across latent topics.
- **Example:** In a news corpus, terms like *"bank"*, *"interest"*, and *"loan"* map to a single latent dimension representing **Finance**.

### 2. Variance & Frequency Thresholding (Feature Selection)
- **Mechanism:** Filtering vocabulary terms based on empirical document frequency ($DF$):
  - \`min_df = 5\`: Discards terms appearing in fewer than 5 documents (eliminating typos and rare hapax legomena).
  - \`max_df = 0.85\`: Discards terms appearing in over 85% of documents (eliminating corpus-specific stop words).
- **Result:** Often shrinks the feature space from 60,000 down to 8,000 terms without information loss.

### 3. Supervised Feature Selection ($\\chi^2$ Statistic & Mutual Information)
- **Mechanism:** For text classification, measure the statistical dependence between term $t$ and class $c$:
  $$\\chi^2(t, c) = \\frac{N (AD - BC)^2}{(A+C)(B+D)(A+B)(C+D)}$$
  Where $A$ is document frequency of $t$ in class $c$, $B$ is frequency of $t$ without $c$, etc. Only the top $K$ highest-scoring terms are retained.

---

## 3. Comparison of Dimensionality Reduction Techniques

| Technique | Type | Computational Complexity | Sparsity Preserved | Handles Polysemy |
| :--- | :--- | :--- | :--- | :--- |
| **Document Frequency Filter** | Selection | $O(N \\cdot M)$ (Very Fast) | Yes | No |
| **Chi-Square ($\\chi^2$)** | Selection | $O(N \\cdot M \\cdot |C|)$ | Yes | No |
| **TruncatedSVD (LSA)** | Extraction | $O(k \\cdot \\text{nnz}(\\mathbf{X}))$ | No (Dense) | Yes (Collapses synonyms) |
| **PCA** | Extraction | $O(N \\cdot M^2)$ (Heavy) | No (Requires centering) | Yes |

---

## 4. Exam Summary
To reduce the dimensions of a 20k DTM: use **Frequency Pruning (min_df/max_df)** first to eliminate noise, followed by **TruncatedSVD (LSA)** to project the remaining sparse matrix into a dense 300-dimensional semantic latent space.`
        };

      case 2:
        return {
          summary: "Comprehensive guide to using Regular Expressions for information extraction from unstructured text, including best practices, lookarounds, and edge case mitigation.",
          keyPoints: [
            "Regular expressions define formal search patterns using deterministic finite-state matching.",
            "Crucial for extracting entities with rigid syntax: emails, phone numbers, URLs, dates, and IP addresses.",
            "Advanced techniques include Non-Capturing Groups, Named Groups, and Positive/Negative Lookarounds.",
            "Best practices: avoid catastrophic backtracking, precompile expressions, and validate edge cases."
          ],
          content: `## 1. Introduction: Regular Expressions as Extraction Engines
In NLP, **Regular Expressions (Regex)** provide a declarative, mathematically formal mechanism for extracting structured informational entities from unstructured text by matching formal language patterns.

---

## 2. Common Information Extraction Patterns

\`\`\`
1. IPv4 Address:    \\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b
2. Email Address:   \\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\\b
3. ISO 8601 Date:   \\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])\\b
4. Currency Amount: \\$(?:\\d{1,3}(?:,\\d{3})*|\\d+)(?:\\.\\d{2})?\\b
\`\`\`

---

## 3. Advanced Regex Constructs for Robust Extraction

1. **Named Capturing Groups (\`(?P<name>...)\`):** Enhances code maintainability by extracting structured dictionaries rather than index tuples:
   \`\`\`python
   pattern = r"(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})"
   \`\`\`
2. **Non-Capturing Groups (\`(?:...)\`):** Groups terms for alternation without incurring memory allocation overhead for sub-matches.
3. **Lookaround Assertions (Zero-Width):**
   - *Positive Lookahead (\`(?=...)\`):* Matches only if followed by a pattern: \`\\d+(?=\\s*USD)\` (matches the number only if followed by "USD").
   - *Negative Lookahead (\`(?!...)\`):* Matches only if NOT followed by a pattern.
   - *Positive Lookbehind (\`(?<=...)\`):* Matches only if preceded by a pattern: \`(?<=\\$)\\d+\\.\\d{2}\`.

---

## 4. Best Practices for Enterprise Extraction

1. **Pattern Precompilation:** In production engines, compile regex once into an internal finite state automaton (\`re.compile()\`) outside the document processing loop.
2. **Word Boundaries (\`\\b\`):** Always anchor lexical patterns with word boundaries (\`\\bcat\\b\`) to prevent false positive substring matches inside *"catalog"* or *"vacation"*.
3. **Prevent Catastrophic Backtracking:** Avoid nested indefinite quantifiers like \`(a+)+\$, which cause $O(2^n)$ exponential time blowup on non-matching inputs.
4. **Post-Extraction Validation:** Always pipe extracted strings into domain parsers (e.g., verifying that month 02 does not have day 31).

---

## 5. Exam Summary
Regex is the fastest tool for extracting syntax-constrained entities. Robust extraction requires **precompilation**, **word boundaries**, **zero-width lookarounds**, and **non-capturing groups** to ensure high precision without runtime backtracking.`
        };

      case 3:
        return {
          summary: "In-depth optimization strategies for Regular Expressions on large-scale text data: algorithmic compilation, avoiding catastrophic backtracking, and deterministic execution.",
          keyPoints: [
            "Catastrophic backtracking occurs when nested quantifiers cause exponential state branch exploration.",
            "NFA (Non-deterministic Finite Automaton) engines backtrack; DFA engines guarantee O(n) linear scan time.",
            "Optimization techniques: atomic grouping, possessive quantifiers, character classes over alternation.",
            "Precompilation and anchor positioning maximize throughput."
          ],
          content: `## 1. The Bottleneck: Catastrophic Backtracking
Most modern programming regex engines (Python \`re\`, JavaScript, Java) utilize **Nondeterministic Finite Automata (NFA)** with backtracking. When evaluated on adversarial or ambiguous inputs, an unoptimized regular expression causes exponential computational complexity:

$$T(n) = O(2^n)$$

\`\`\`
Vulnerable Expression: ^(a+)+$
Target String: "aaaaaaaaaaaaaaaaaaaaaaaaaaaa!" (30 'a's followed by '!')
Result: The engine explores 2^30 (~1 billion) backtracking paths before rejecting!
\`\`\`

---

## 2. Key Optimization Strategies

### 1. Eliminating Redundant Alternation
- **Anti-Pattern:** \`(cat|car|can)\` requires the engine to test 3 distinct branches sequentially.
- **Optimized Form:** Factor common prefixes: \`ca[rtn]\` or \`ca(?:t|r|n)\`. Using a **character class** \`[rtn]\` reduces branching to an instantaneous $O(1)$ lookup.

### 2. Using Possessive Quantifiers and Atomic Groups
- Standard greedy quantifiers (\`*\`, \`+\`) remember state positions to backtrack if later tokens fail.
- **Possessive Quantifiers (\`*+\`, \`++\`):** Consume characters greedily and **never surrender them**, eliminating the backtracking stack:
  $$\\text{Standard: } \\text{\\w+:} \\quad \\text{vs. Possessive: } \\text{\\w++:}$$
- **Atomic Grouping (\`(?>...)\`):** Freezes the tokens matched inside the group, preventing any internal backtracking.

### 3. Anchoring and Fast Rejection
- Always anchor searches to line starts (\`^\`), ends (\`\$\`), or word boundaries (\`\\b\`).
- If an expression must match at the beginning of a line, anchoring with \`^\` allows the engine to reject non-matching lines at character index 0 without scanning the entire document.

### 4. Engine Architecture: NFA vs. DFA (Thompson's Construction)
- Standard engines are NFA. Specialized high-throughput engines (e.g., Google's **RE2**, Rust's \`regex\` crate) compile expressions using **Thompson's Construction** into **Deterministic Finite Automata (DFA)**.
- **Guaranteed Performance:** DFAs process every text stream in strict $O(n)$ linear time proportional only to the document length, making catastrophic backtracking mathematically impossible.

---

## 3. Performance Summary Matrix

| Optimization Technique | Mechanism | Performance Gain |
| :--- | :--- | :--- |
| **DFA Engine (RE2)** | Deterministic state transitions | Prevents $O(2^n)$ blowups; strictly $O(n)$ |
| **Character Classes** | \`[abc]\` instead of \`(a\|b\|c)\` | Eliminates branch test overhead |
| **Anchor Pruning** | \`^pattern\` anchors | Avoids scanning interior characters |
| **Precompilation** | \`re.compile()\` outside loop | Avoids repeated regex parsing and compilation |

---

## 4. Exam Summary
To optimize regex for big data: eliminate nested quantifiers to prevent **catastrophic backtracking**, replace alternations with **character classes**, use **possessive quantifiers**, and deploy **DFA engines** (RE2) for linear $O(n)$ runtime guarantees.`
        };

      case 4:
        return {
          summary: "Comparative analysis between Regular Expressions and Machine Learning algorithms in NLP, evaluating determinism, adaptability, scalability, and hybrid system architectures.",
          keyPoints: [
            "Regex is deterministic, rule-based, requires zero training data, and provides 100% precision on fixed syntaxes.",
            "Machine Learning is probabilistic, requires labeled corpora, and generalizes to ambiguous, noisy natural language.",
            "Regex fails on semantics, sentiment, and paraphrase; ML fails on rigid formatting and rare structured patterns.",
            "Industry best practice is a hybrid architecture: Regex for preprocessing/guardrails, ML for contextual reasoning."
          ],
          content: `## 1. Introduction: Rule-Based Determinism vs. Statistical Generalization
In modern NLP, engineers must constantly decide whether to implement a task using deterministic **Regular Expressions** or probabilistic **Machine Learning / Deep Learning** models.

\`\`\`
RIGID SYNTACTIC PATTERNS               AMBIGUOUS NATURAL TEXT
(Phone, Social Security, IPs)         (Sentiment, Coreference, Translation)
          │                                     │
          ▼                                     ▼
[Regular Expressions]                 [Machine Learning / LLMs]
- 100% Precision                      - Context-Aware Generalization
- Zero Training Data                  - Handles Typos, Paraphrasing, Slang
- Microsecond Execution               - Probabilistic Ranking
\`\`\`

---

## 2. Head-to-Head Comparison

| Dimension | Regular Expressions | Machine Learning / Deep Learning |
| :--- | :--- | :--- |
| **Paradigm** | Deterministic Pattern Matching | Statistical / Neural Induction |
| **Data Requirement** | Zero training data | Large labeled or self-supervised corpora |
| **Computational Cost** | Microseconds on CPU ($O(n)$) | Milliseconds to seconds on GPU |
| **Interpretability** | 100% transparent and deterministic | Opaque / Latent vector activations |
| **Adaptability** | Completely brittle to variations/typos | Robust to paraphrases, noise, and context |
| **Failure Mode** | Silent false negative (no match) | Hallucination or statistical bias |

---

## 3. When to Use Which Technique

### Scenarios Where Regular Expressions Excel:
1. **Personally Identifiable Information (PII) Redaction:** Extracting credit cards, social security numbers, IP addresses, and UUIDs where format is legally specified.
2. **Deterministic Tokenization:** Splitting punctuation, finding URL protocols (\`https?://\`), and stripping HTML tags.
3. **Hard Rule Guardrails:** Validating input constraints (e.g., verifying a user entered a valid zip code before invoking an expensive LLM).

### Scenarios Where Machine Learning Excels:
1. **Sentiment Analysis:** Differentiating *"This phone is ridiculously good"* (positive) from *"This phone is ridiculously overpriced"* (negative).
2. **Named Entity Recognition (NER) in Free Text:** Recognizing that *"Paris Hilton"* is a person, while *"Hilton Paris"* is an organization/hotel.
3. **Machine Translation & Abstractive Summarization:** Where linguistic variety requires deep semantic representations.

---

## 4. Modern Hybrid Pattern: The Best of Both Worlds
In production systems, industry standards combine both:
$$\\text{Raw Text} \\xrightarrow{\\text{Regex Preprocessing}} \\text{Clean Tokens} \\xrightarrow{\\text{Transformer Model}} \\text{Semantic Inference} \\xrightarrow{\\text{Regex Post-Filter}} \\text{Sanitized Output}$$

---

## 5. Exam Summary
Use **Regular Expressions** for rigid, syntactically fixed patterns with zero tolerance for ambiguity (PII, emails, dates). Use **Machine Learning** for semantic, contextual, and variable linguistic tasks (sentiment, intent, NER).`
        };

      case 5:
        return {
          summary: "Comprehensive exploration of using Regular Expressions for trend detection and pattern mining in large financial and marketing datasets.",
          keyPoints: [
            "Finance: extracting stock ticker symbols, currency transactions, algorithmic trading signals, and EDGAR filings.",
            "Marketing: social media hashtag tracking, UTM campaign parameters, user email domains, and customer phone formats.",
            "Scalability: streaming regex filters process gigabytes of streaming log data under millisecond latency.",
            "Regulatory compliance: automated detection of fraudulent transactions and non-compliant marketing claims."
          ],
          content: `## 1. Introduction: High-Throughput Pattern Mining
In marketing intelligence and quantitative finance, massive streams of unstructured text (social feeds, SEC filings, financial news, web analytics) must be scanned in real time. **Regular Expressions** act as the first-line high-throughput filter.

---

## 2. Practical Applications in Quantitative Finance

\`\`\`
Streaming Financial News ──► [Regex Entity Extractor] ──► Structured Tickers & Trades ──► Algorithmic Order Engine
\`\`\`

1. **Ticker Symbol & Price Extraction:**
   - Scanning Reuters/Bloomberg wires for equity mentions:
     \`\`\`regex
     \\b[A-Z]{1,5}\\b\\s*(?:shares)?\\s*(?:up|down|jumped|fell)\\s*\\d+(?:\\.\\d+)?%
     \`\`\`
   - Directly triggers automated algorithmic trading positions based on percentage shifts.
2. **Automated SEC Filings Analysis (EDGAR):**
   - Extracting risk factors and financial disclosures from 10-K filings using regex patterns matching table headers: \`Item\\s+1A\\.\\s+Risk\\s+Factors\`.
3. **Anti-Money Laundering (AML) & Fraud Detection:**
   - Scanning SWIFT and banking transaction logs for suspicious account sequences, international IBAN numbers, and sanctioned routing codes.

---

## 3. Practical Applications in Marketing & E-Commerce

1. **Campaign Attribution & UTM Tracking:**
   - Parsing web server logs to track customer acquisition channels:
     \`\`\`regex
     utm_source=(?P<source>[^&]+)&utm_medium=(?P<medium>[^&]+)&utm_campaign=(?P<campaign>[^&]+)
     \`\`\`
2. **Social Media Trend Mining:**
   - Tracking viral campaigns and influencer brand mentions across streaming Twitter/Instagram feeds via hashtag extraction: \`#[A-Za-z0-9_]+\`.
3. **Consumer Lead Cleansing:**
   - Standardizing inconsistent customer telephone inputs:
     \`(?:\+1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})\` $\\rightarrow$ formatted into E.164 standard: \`+1$1$2$3\`.

---

## 4. Exam Summary
Regular expressions power financial and marketing analytics by enabling **real-time extraction of structured metrics** (tickers, percentage movements, IBANs, UTM parameters, hashtags) from high-velocity unstructured streaming feeds.`
        };

      case 6:
        return {
          summary: "Technical evaluation of how Regular Expressions enhance user experience in search engines, conversational chatbots, and interactive interfaces.",
          keyPoints: [
            "Search engines: regex powers wildcard matching, advanced boolean search operators, and query sanitization.",
            "Chatbots: regex provides instantaneous deterministic fallback for common intents (help, restart, human handoff).",
            "Input formatting: real-time form validation (credit cards, emails) prevents frustrating UI errors.",
            "Security: sanitizes user inputs against Cross-Site Scripting (XSS) and SQL injection."
          ],
          content: `## 1. Introduction: Regex as an Interaction Accelerator
User experience in digital applications depends on **responsiveness**, **forgiving input handling**, and **instantaneous feedback**. Regular expressions provide the low-latency pattern engine required to validate, clean, and route user inputs in search engines and chatbots.

---

## 2. Enhancing Search Engine User Experience

\`\`\`
User Query: "site:wikipedia.org intitle:quantum"
                   │
                   ▼
[Regex Operator Parser] ──► Filters: {site: "wikipedia.org", title_must_contain: "quantum"}
\`\`\`

1. **Advanced Query Operators:** Search engines parse specialized user syntax using regex:
   - \`site:([a-zA-Z0-9.-]+)\` $\\rightarrow$ restricts domain.
   - \`filetype:(pdf|docx|ppt)\` $\\rightarrow$ restricts document MIME type.
   - \`"([^"]+)"\` $\\rightarrow$ enforces exact phrase matching.
2. **Fuzzy Wildcard Matching:** Enabling user searches like *"comput*" to match *"computer"*, *"computing"*, and *"computational"* via regex-to-automata compilation.
3. **Instant Query Sanitization:** Stripping malicious injection characters and normalizing accidental duplicate whitespace before triggering database search indexes.

---

## 3. Enhancing Conversational Chatbot User Experience

1. **Instantaneous Intent Triggers (Zero Latency):**
   - Certain critical commands should never wait for an expensive 2-second LLM inference call:
     \`\`\`regex
     \\b(?:help|restart|stop|cancel|exit|talk to human|agent)\\b
     \`\`\`
   - Matches trigger immediate deterministic hard-coded system routing under 1ms latency.
2. **Dynamic Slot Extraction:**
   - When a user types: *"Book table for 4 at 8pm"*, regex extracts:
     - Party Size: \`\\b(\\d+)\\s*(?:people|persons|guests)?\\b\`
     - Time: \`\\b(\\d{1,2}(?::\\d{2})?\\s*(?:am|pm))\\b\`
3. **Interactive UI Form Masking:**
   - Auto-formatting user credit card numbers into 4-digit blocks as they type (\`(\\d{4})(?=\\d)\` $\\rightarrow$ \`$1 \`), providing immediate visual confirmation.

---

## 4. Exam Summary
Regex enhances user experience by providing **sub-millisecond command execution**, **flexible search operator parsing**, and **instant interactive input validation** for chatbots and search engines.`
        };

      case 7:
        return {
          summary: "Comprehensive study of how Text Normalization elevates the accuracy of NLP models, specifically in Sentiment Analysis and Named Entity Recognition (NER).",
          keyPoints: [
            "Text normalization eliminates arbitrary lexical noise and collapses synonymous surface tokens.",
            "In Sentiment Analysis: expands contractions ('can\'t' -> 'cannot'), standardizes elongated slang ('soooo good'), and preserves emojis.",
            "In Named Entity Recognition: careful case normalization preserves capitalized proper nouns while normalizing punctuation.",
            "Prevents feature space explosion and ensures robust generalization on unseen text."
          ],
          content: `## 1. Introduction: Normalization as Quality Foundation
Unprocessed natural language contains immense typographical noise: slang, casing inconsistencies, elongated words, emoji variants, and dialectal spelling. Without rigorous **Text Normalization**, downstream machine learning models fail due to vocabulary fragmentation and feature dilution.

---

## 2. Impact on Sentiment Analysis

\`\`\`
Noisy Review: "I reallllly caaaan't recommend this resturant!!!! :( "
                     │
                     ▼
[Text Normalization Pipeline]
- Elongation Reduction: "reallllly" -> "really", "caaaan't" -> "can't"
- Contraction Expansion: "can't" -> "cannot" (Exposes critical negation)
- Punctuation Normalization: "!!!!" -> "!"
- Emoticon Preservation: ":(" -> "[EMOJI_SAD]"
                     │
                     ▼
Normalized Text: "I really cannot recommend this restaurant ! [EMOJI_SAD]"
\`\`\`

1. **Negation Exposure:** In sentiment analysis, missing a negation word inverts the classification:
   - Normalizing *"don't like"* $\\rightarrow$ *"do not like"* explicitly preserves the \`not\` token.
2. **Word Elongation Normalization:** Users express intense sentiment via character repetition (*"goooood"*, *"baaaad"*). Using regex replacement (\`re.sub(r'(.)\\\\1{2,}', r'\\\\1\\\\1', text)\`), *"coooool"* collapses to *"cool"*, matching standard sentiment lexicons.
3. **Emoji & Slang Mapping:** Mapping emoticons (\`":)"\`, \`"<3"\`) into explicit sentiment tokens (\`[POSITIVE_EMOJI]\`) boosts sentiment classification F1-score by 5–10%.

---

## 3. Impact on Named Entity Recognition (NER)

1. **Selective Case Preservation:**
   - Unconditional lowercasing destroys NER accuracy:
     - *"Bush"* (Person) vs. *"bush"* (Plant).
     - *"Turkey"* (Country) vs. *"turkey"* (Bird).
     - *"Apple"* (Organization) vs. *"apple"* (Fruit).
   - NER normalization uses **Truecasing**: it restores title case for proper nouns based on statistical language models while lowercasing sentence-initial words.
2. **Punctuation and Clitic Splitting:** Normalizing *"Smith's"* into *"Smith"* + *"'s"* allows the NER tagger to recognize *"Smith"* as \`B-PERSON\` without being corrupted by the possessive clitic.

---

## 4. Exam Summary
Text normalization directly drives model accuracy: in **sentiment analysis**, it exposes negations and normalizes affective slang; in **NER**, **truecasing** preserves capitalized entity boundaries while removing confusing orthographic noise.`
        };

      case 8:
        return {
          summary: "In-depth technical exploration of multilingual text normalization challenges across diverse world scripts and dialects, detailing Unicode normalization forms and dialectal harmonization.",
          keyPoints: [
            "Unicode Normalization Forms (NFC, NFD, NFKC, NFKD) resolve identical visual characters with different byte encodings.",
            "Script-specific challenges: Diacritic stripping in Romance languages, vowel marks (tashkeel) in Arabic, and zero-width spaces in Indic scripts.",
            "Dialectal normalization: Harmonizing regional variations (e.g., British 'colour' vs. American 'color', Egyptian vs. Modern Standard Arabic).",
            "Best practices: script detection, modular normalization pipelines, and avoiding destructive lossy transformations."
          ],
          content: `## 1. The Multilingual Normalization Challenge
Text normalization cannot apply universal assumptions. What works for English (lowercasing, whitespace splitting) breaks catastrophically when applied to German, Arabic, Chinese, or Hindi. Robust multilingual NLP requires script-aware normalization.

---

## 2. Unicode Normalization Forms (The Four Standards)
In Unicode, identical visual glyphs can be encoded in multiple distinct byte representations (Canonical Equivalence):
- The character **é** can be encoded as a single code point (\`U+00E9\`, precomposed) OR as two separate code points (\`U+0065\` for 'e' + \`U+0301\` for combining acute accent).

\`\`\`
NFD (Canonical Decomposition):   é ──► e + ́
NFC (Canonical Composition):     e + ́ ──► é (Recommended for standard NLP)
NFKD (Compatibility Decomp):     ﬁ ──► f + i  (Expands typographic ligatures)
NFKC (Compatibility Comp):       ﬁ ──► f + i ──► normalized standard
\`\`\`

---

## 3. Language-Specific Normalization Hurdles

### 1. Arabic & Semitic Languages
- **Tashkeel (Diacritic) Removal:** Arabic text in newspapers omits short vowel diacritics (harakat), but educational/religious text includes them. Normalization strips short vowels:
  $$\\text{كَتَبَ (kataba - he wrote)} \\quad \\xrightarrow{\\text{Stripping}} \\quad \\text{كتب (ktb)}$$
- **Alef Harmonization:** Unifying all typographical variants of Alef (\`أ, إ, آ, ٱ\`) into a bare Alef (\`ا\`).
- **Teh Marbuta Normalization:** Normalizing final \`ة\` into \`ه\`.

### 2. German (Capitalization & Umlauts)
- German capitalizes all nouns by grammatical rule (*"Der Hund frisst das Fleisch"*). Indiscriminate lowercasing destroys vital syntactic signals.
- Expanding umlauts when character sets are restricted: \`ä -> ae\`, \`ö -> oe\`, \`ü -> ue\`, \`ß -> ss\`.

### 3. Non-Segmented Scripts (Chinese, Japanese, Thai)
- These scripts contain **no spaces between words**. Normalization must perform statistical word segmentation (e.g., Jieba for Chinese) before any token normalization can occur.

### 4. Dialectal & Orthographic Harmonization
- **American vs. British English:** Standardizing spelling variants to a unified lexicon (*"colour"* $\\rightarrow$ *"color"*, *"organise"* $\\rightarrow$ *"organize"*, *"theatre"* $\\rightarrow$ *"theater"*).

---

## 4. Best Practices for Multilingual Normalization

1. **Always apply NFC or NFKC Unicode normalization** at the document ingestion boundary.
2. **Never apply English-specific assumptions** (e.g., ASCII lowercasing) across non-Latin scripts.
3. **Use Language Identification (LangID)** to dynamically route documents into language-specific normalization pipelines.

---

## 5. Exam Summary
Multilingual text normalization requires **Unicode NFC/NFKC canonicalization**, script-specific processing (**tashkeel stripping** in Arabic, **truecasing** in German, **word segmentation** in Chinese), and dialectal spelling harmonization.`
        };

      case 9:
        return {
          summary: "Comprehensive analysis of Text Normalization within regulated high-stakes domains: Healthcare (clinical notes, prescriptions) and Finance (trading logs, financial reports).",
          keyPoints: [
            "Healthcare: normalizes non-standard clinical abbreviations (BID, QID, PRN), medical typos, and de-identifies HIPAA patient identifiers.",
            "Finance: normalizes complex currency notations ($10M, 10 million USD), fiscal quarters (Q3 '23), and corporate entity variants.",
            "High stakes: minor normalization errors lead to medical misdiagnoses or catastrophic algorithmic trading execution.",
            "Combines domain ontologies (UMLS, SNOMED CT) with deterministic regex rules."
          ],
          content: `## 1. Introduction: High-Stakes Domain Normalization
In generic NLP (e.g., movie review sentiment), normalization errors are benign. In **Healthcare** and **Finance**, text normalization errors carry life-and-death or multi-million-dollar consequences, requiring specialized domain-specific normalization architectures.

---

## 2. Text Normalization in Healthcare & Biomedicine

\`\`\`
Raw Physician Note: "Pt given 50mg po qd c/o sob"
                           │
                           ▼
[Clinical Normalization Engine (UMLS / MetaMap)]
- Pt  ──► "Patient"
- po  ──► "per os (by mouth)"
- qd  ──► "quaque die (once daily)"
- c/o ──► "complains of"
- sob ──► "shortness of breath" (NOT profanity!)
                           │
                           ▼
Normalized: "Patient given 50mg orally once daily; complains of shortness of breath."
\`\`\`

1. **Latin Prescription Abbreviations:** Expanding medical Latin abbreviations into standardized clinical English:
   - \`BID\` $\\rightarrow$ twice daily; \`TID\` $\\rightarrow$ three times daily; \`PRN\` $\\rightarrow$ as needed.
2. **Clinical Typo & Jargon Correction:** Doctors type rapidly under emergency conditions. Normalizing misspellings of medications (e.g., *"Acetominophen"* $\\rightarrow$ *"Acetaminophen"*) is life-critical to prevent medication errors.
3. **HIPAA Safe Harbor De-identification:** Normalizing and redacting 18 specific types of protected health information (PHI): patient names, telephone numbers, dates of admission, and social security numbers using regex patterns.

---

## 3. Text Normalization in Financial Informatics

1. **Currency and Numerical Amount Normalization:**
   - Financial text expresses monetary amounts in diverse formats:
     - *"$10M"*, *"10 million dollars"*, *"USD 10,000,000"*, *"10m USD"*.
   - The normalization engine parses and maps all variants into a standardized ISO 4217 floating-point tuple:
     $$\\langle \\text{Currency: "USD"}, \\text{Value: } 10000000.00 \\rangle$$
2. **Temporal & Fiscal Period Alignment:**
   - Mapping colloquial fiscal periods (*"Q3 '24"*, *"third quarter of 2024"*, *"Q3-24"*) into standardized ISO date ranges:
     \`2024-07-01 to 2024-09-30\`.
3. **Corporate Entity Disambiguation:**
   - Normalizing company names across legal variants (*"Alphabet Inc."*, *"Alphabet LLC"*, *"Google LLC"*, *"Alphabet Class A"*) to unique stock ticker identifiers (NASDAQ: \`GOOGL\`).

---

## 4. Exam Summary
In **Healthcare**, normalization expands Latin clinical abbreviations (BID, PRN) and enforces HIPAA de-identification. In **Finance**, normalization standardizes currency amounts, fiscal quarters, and ticker variants into structured data for machine learning models.`
        };

      case 10:
        return {
          summary: "In-depth study of how Text Normalization powers digital accessibility for individuals with visual impairments, dyslexia, and speech processing disabilities.",
          keyPoints: [
            "Text-to-Speech (TTS) engines require normalization to pronounce non-standard words (NSW): numbers, dates, acronyms, and symbols.",
            "Expands abbreviations, converts currency ($50 -> 'fifty dollars'), and resolves homographic pronunciations ('read' past vs present).",
            "Screen readers for visually impaired users rely on clean syntactic normalization to avoid auditory confusion.",
            "Dyslexia-friendly interfaces leverage normalization to simplify complex sentence structures and resolve confusing typography."
          ],
          content: `## 1. Introduction: Accessibility Through Language Processing
Digital accessibility ensures that information is barrier-free for individuals with disabilities. For visually impaired users relying on **Screen Readers** and **Text-to-Speech (TTS)** systems, **Text Normalization** is the critical component that converts written text into fluent, comprehensible spoken audio.

---

## 2. The Non-Standard Word (NSW) Challenge in Text-to-Speech

Written text contains countless Non-Standard Words (NSWs) that cannot be pronounced directly using standard grapheme-to-phoneme rules. Text normalization transforms these tokens into spoken English:

\`\`\`
WRITTEN TEXT                      NORMALIZED FOR SCREEN READER / TTS
"Call me on 12/05 at 4pm" ──►   "Call me on December fifth at four P M"
"$3.50 per lb."           ──►   "Three dollars and fifty cents per pound"
"Dr. Smith lives on Oak Dr." ──► "Doctor Smith lives on Oak Drive"
\`\`\`

---

## 3. Core Accessibility Normalization Categories

1. **Number and Currency Expansion:**
   - Numbers require context-dependent expansion:
     - *Year:* \`2024\` $\\rightarrow$ *"twenty twenty-four"* (NOT *"two thousand and twenty-four"*).
     - *Quantity:* \`2024 books\` $\\rightarrow$ *"two thousand twenty-four books"*.
     - *Phone:* \`800-555-0199\` $\\rightarrow$ *"eight zero zero, five five five, zero one nine nine"*.
     - *Currency:* \`$45.20\` $\\rightarrow$ *"forty-five dollars and twenty cents"*.
2. **Abbreviation and Acronym Expansion:**
   - Resolving ambiguous abbreviations based on syntactic position:
     - In *"Dr. Jekyll lives on Elm Dr."*: The first \`Dr.\` expands to *"Doctor"*; the second \`Dr.\` expands to *"Drive"*.
   - Differentiating initialisms (spelled letter-by-letter: \`FBI\` $\\rightarrow$ *"F-B-I"*) from acronyms (pronounced as a single word: \`NASA\` $\\rightarrow$ *"Nah-sah"*).
3. **Homograph Disambiguation:**
   - Resolving words with identical spelling but different pronunciations:
     - *"I will **read** (rhymes with 'feed') the book."*
     - *"I have **read** (rhymes with 'red') the book."*
   - A POS tagger determines the tense, directing the TTS synthesizer to generate the correct phoneme string.

---

## 4. Supporting Individuals with Dyslexia
- **Typographical Harmonization:** Replacing visually confusing character ligatures (\`æ\`, \`œ\`, \`ﬁ\`) with clean, standard letter combinations (\`ae\`, \`oe\`, \`fi\`).
- **Text Simplification:** Normalizing passive voice into active voice and expanding complex legal or technical jargon into plain-language equivalents.

---

## 5. Exam Summary
Text normalization enables digital accessibility by translating **Non-Standard Words** (numbers, dates, currency, abbreviations) into natural spoken language for screen readers, ensuring seamless information access for individuals with visual impairments and dyslexia.`
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
          summary: "Comprehensive guide to classic UNIX command-line tools for word tokenization, text normalization, and frequency counting: tr, sort, uniq, grep, sed, and awk.",
          keyPoints: [
            "UNIX pipeline philosophy enables high-throughput text processing without high-level programming languages.",
            "'tr' handles case folding and character-to-newline mapping.",
            "'sort' and 'uniq -c' perform fast vocabulary extraction and frequency histogram calculation.",
            "'sed' and 'awk' perform stream editing, regex substitutions, and conditional field formatting."
          ],
          content: `## 1. Introduction: The UNIX Text Processing Philosophy
Before specialized libraries (NLTK, spaCy, HuggingFace), computational linguistics relied heavily on the UNIX command-line philosophy: composing small, highly optimized single-purpose utilities via pipes (\`|\`) to tokenize, normalize, and count words across massive text corpora.

---

## 2. The Classic UNIX Word Tokenization Pipeline

The classic one-line UNIX pipeline to tokenize text, lowercase it, sort words, and output the top 10 most frequent words in a text:

\`\`\`bash
tr -sc 'A-Za-z' '\\n' < input.txt | tr 'A-Z' 'a-z' | sort | uniq -c | sort -nr | head -n 10
\`\`\`

\`\`\`
Raw Text File ──► [tr -sc 'A-Za-z' '\n'] ──► One word per line
                        │
                        ▼
                  [tr 'A-Z' 'a-z']        ──► Normalized Lowercase
                        │
                        ▼
                  [sort]                  ──► Alphabetically Sorted Words
                        │
                        ▼
                  [uniq -c]               ──► Frequency Count per Word
                        │
                        ▼
                  [sort -nr]              ──► Ranked by Frequency Descending
                        │
                        ▼
                  [head -n 10]            ──► Top 10 Most Frequent Words
\`\`\`

---

## 3. In-Depth Tool Breakdown

### 1. \`tr\` (Translate / Transliterate)
- **Tokenization:** \`tr -sc 'A-Za-z' '\\n'\`
  - \`-c\` (complement): Selects all characters that are **not** ASCII letters (punctuation, whitespace, digits).
  - \`-s\` (squeeze): Replaces consecutive sequences of matched non-letters with a single replacement character (\`\\n\`).
  - *Result:* Transforms an entire paragraph into a clean, one-word-per-line token stream.
- **Normalization (Case Folding):** \`tr 'A-Z' 'a-z'\` maps all uppercase characters into lowercase.

### 2. \`sort\` (Lexicographical Sorting)
- Orders words alphabetically so identical words appear on consecutive lines (mandatory prerequisite for \`uniq\`).
- Flags: \`-n\` for numeric sort, \`-r\` for reverse (descending) order.

### 3. \`uniq\` (Duplicate Line Elimination & Counting)
- \`uniq -c\`: Compares adjacent lines, collapses duplicates, and prefixes each line with its exact frequency count.

### 4. \`sed\` (Stream Editor)
- Applies regular expression replacements across text streams:
  - Removing HTML tags: \`sed 's/<[^>]*>//g' document.html\`
  - Normalizing contractions: \`sed "s/n't/ not/g"\`

### 5. \`awk\` (Pattern Scanning and Processing Language)
- Filters tokens by frequency or length:
  \`\`\`bash
  # Print only words that appear more than 50 times and have length > 4 characters:
  awk '$1 > 50 && length($2) > 4 { print $2, $1 }' frequency_table.txt
  \`\`\`

---

## 4. Exam Summary
The classic UNIX toolkit (\`tr\`, \`sort\`, \`uniq\`, \`sed\`, \`awk\`) provides a blisteringly fast, memory-efficient pipeline for **tokenization** (splitting on non-alphabetic chars via \`tr\`), **normalization** (case folding), and **frequency ranking** (\`sort | uniq -c | sort -nr\`).`
        };

      case 2:
        return {
          summary: "Comprehensive examination of Word Tokenization and the critical linguistic necessity of treating punctuation marks as separate tokens in NLP applications.",
          keyPoints: [
            "Tokenization is the task of segmenting continuous text into discrete linguistic units (tokens).",
            "Naive whitespace splitting fails because punctuation adheres to word tokens ('dog.' vs 'dog').",
            "Treating punctuation as separate tokens preserves vocabulary size, prevents word duplication, and captures syntactic clause boundaries.",
            "Special handling is required for periods in abbreviations ('U.S.A.'), numbers ('3.14'), and contractions ('don\'t')."
          ],
          content: `## 1. Definition of Word Tokenization
**Word Tokenization** is the fundamental preliminary stage in NLP wherein a continuous string of written characters is algorithmically segmented into a list of discrete linguistic units called **tokens**.

\`\`\`
Naive Whitespace Splitting:
"I love NLP, do you?" ──► ["I", "love", "NLP,", "do", "you?"]  <-- CORRUPTED BY PUNCTUATION!

Linguistic Word Tokenization:
"I love NLP, do you?" ──► ["I", "love", "NLP", ",", "do", "you", "?"]  <-- CLEAN SEPARATE TOKENS!
\`\`\`

---

## 2. Why Punctuation Must Be Treated as a Separate Token

1. **Preventing Vocabulary Explosion:**
   - If punctuation is not split, the word *"cat"* generates multiple redundant vocabulary entries:
     $$\\text{Vocabulary: } \\{\\textit{"cat", "cat,", "cat.", "cat!", "cat?", "(cat)"}\\}$$
   - Each corrupted token receives a tiny fraction of total corpus counts, causing severe **data sparsity**. Splitting punctuation collapses all occurrences into a single clean token \`"cat"\` plus separate punctuation tokens.
2. **Signaling Syntactic and Clause Boundaries:**
   - Commas (\`,\`), semicolons (\`;\`), and periods (\`.\`) are essential structural markers that delineate clauses, subordinate structures, and sentence boundaries. Parsers and POS taggers rely directly on punctuation tokens to evaluate phrase structure.
3. **Preserving Sentence Sentiment & Emphasis:**
   - Punctuation conveys intense pragmatic and affective meaning:
     - Question marks (\`?\`) mark interrogatives and uncertainty.
     - Exclamation marks (\`!\`) signal strong positive or negative emotion.
     - Completely discarding punctuation destroys vital sentiment signals.

---

## 3. The Punctuation Segmentation Dilemma

Tokenizers cannot simply split on all punctuation characters blindly; they must handle contextual exceptions:
- **Abbreviations:** *"U.S.A."* and *"Dr."* must remain intact, not split into *"U"* + *"."* + *"S"* + *"."*.
- **Numeric Decimals & Times:** *"3.1415"* and *"8:30 pm"* must preserve internal periods and colons.
- **Hyphenated Compounds:** *"state-of-the-art"* vs. line-break hyphens.
- **Apostrophes in Clitics:** In English, contractions are split linguistically:
  - *"don't"* $\\rightarrow$ \`["do", "n't"]\` (where *"n't"* represents the negative particle).
  - *"Mary's"* $\\rightarrow$ \`["Mary", "'s"]\` (where *"'s"* represents the possessive marker).

---

## 4. Exam Summary
Word tokenization must treat punctuation as **separate tokens** to prevent **vocabulary explosion** and preserve **syntactic clause boundaries**, while using exception rules to protect abbreviations (*"U.S.A."*), decimals (*"3.14"*), and contractions (*"don't"*).`
        };

      case 3:
        return {
          summary: "In-depth rationale and technical motivation for Byte-Pair Encoding (BPE) subword tokenization in modern NLP and Large Language Models.",
          keyPoints: [
            "BPE bridges the gap between whole-word tokenization (suffers from OOV and vocabulary explosion) and character tokenization (suffers from long sequences and weak semantics).",
            "Subword tokenization splits rare/unseen words into meaningful subword units while keeping frequent words intact.",
            "Eliminates the Out-Of-Vocabulary (<UNK>) problem completely.",
            "Powers modern foundation models: GPT (BPE), BERT (WordPiece), LLaMA (SentencePiece BPE)."
          ],
          content: `## 1. The Tokenization Trilemma
Before Byte-Pair Encoding (BPE), NLP practitioners faced an impossible architectural trade-off between two extreme tokenization paradigms:

\`\`\`
1. WORD-LEVEL TOKENIZATION:
- Pros: Rich, compact semantic representations.
- Cons: Fixed vocabulary (30k–50k). Any unseen word becomes [<UNK>]. Cannot handle typos, compounding, or neologisms.

2. CHARACTER-LEVEL TOKENIZATION:
- Pros: Zero Out-Of-Vocabulary words (alphabet is tiny).
- Cons: Sequence length multiplies by 5x-10x. Self-attention complexity ($O(N^2)$) explodes. Individual characters lack semantic meaning.

                   ▼
3. THE SOLUTION: SUBWORD TOKENIZATION (Byte-Pair Encoding)
Frequent words remain whole: "the", "market"
Rare/complex words split into subwords: "unprecedented" -> ["un", "precedent", "ed"]
Vocabulary is fixed, sequence length is optimal, and OOV is 100% eliminated!
\`\`\`

---

## 2. Why Byte-Pair Encoding (BPE) is Essential

1. **Complete Elimination of the \`<UNK>\` Token:**
   - In BPE, the base vocabulary is initialized with all individual characters (or bytes in Byte-level BPE). Because any word is ultimately a sequence of characters, **BPE can represent any arbitrary unseen string**, completely eliminating out-of-vocabulary errors.
2. **Optimal Compression of Text (Information Density):**
   - BPE is data-driven: frequent character pairs (e.g., \`e\` + \`r\` $\\rightarrow$ \`er\`) are iteratively merged into single tokens. High-frequency words like *"the"* condense into a single token, keeping prompt context windows compact.
3. **Morphological Subword Discovery:**
   - Without any human linguistic supervision, BPE naturally discovers prefixes, suffixes, and roots purely through statistical co-occurrence:
     - *"running"* $\\rightarrow$ \`["run", "ning"]\`
     - *"unbreakable"* $\\rightarrow$ \`["un", "break", "able"]\`
4. **Cross-Lingual Generalization:**
   - For morphologically rich and compounding languages (German: *"Donaudampfschifffahrt"*), BPE decomposes massive compounds into shared subword constituents.

---

## 3. Comparison of Tokenization Paradigms

| Property | Word-Level | Character-Level | Byte-Pair Encoding (BPE) |
| :--- | :--- | :--- | :--- |
| **Vocabulary Size** | Huge (100k+) | Tiny (~100) | Tunable / Optimal (32k–100k) |
| **Sequence Length** | Short (1x) | Very Long (5x–7x) | Balanced (~1.3x) |
| **OOV Handling** | Terrible (Maps to \`<UNK>\`) | Perfect (No OOV) | Perfect (No OOV) |
| **Semantic Density**| High | Extremely Low | High |

---

## 4. Exam Summary
BPE is necessary because it solves the **word-level OOV bottleneck** without incurring the **character-level sequence length explosion**, statistically discovering morphological subwords to achieve optimal information density for modern transformers.`
        };

      case 4:
      case 6:
        return {
          summary: "Comprehensive architectural survey of tokenization schemes in NLP: Whitespace, Rule-Based (Penn Treebank), Subword (BPE, WordPiece, SentencePiece), and Character-level.",
          keyPoints: [
            "Whitespace tokenization splits purely on spaces; fails on punctuation and non-segmented languages.",
            "Rule-Based tokenizers (Penn Treebank/spaCy) handle clitics, contractions, and punctuation exceptions via regex.",
            "Subword algorithms (BPE, WordPiece, Unigram) iteratively build vocabularies based on frequency or language model likelihood.",
            "SentencePiece treats input as raw byte stream without requiring whitespace pre-tokenization."
          ],
          content: `## 1. Overview of Tokenization Schemes
Tokenization is the first and most critical operation in any NLP system. The chosen tokenization scheme dictates the model's vocabulary, memory footprint, sequence length, and handling of unseen words.

\`\`\`
                              TOKENIZATION SCHEMES
            ┌───────────────────────────┴───────────────────────────┐
            ▼                                                       ▼
   Discrete Word Schemes                                   Subword Schemes
   - Whitespace Tokenization                               - Byte-Pair Encoding (BPE)
   - Rule-Based / Regex (Penn Treebank)                    - WordPiece (BERT)
   - Character-Level Tokenization                          - Unigram / SentencePiece
\`\`\`

---

## 2. Deep-Dive into Tokenization Schemes

### 1. Whitespace Tokenization
- **Method:** Splits text on whitespace characters (\`\\s+\`).
- **Limitation:** Fails completely on punctuation (*"apple,"* and *"apple."* become different tokens) and cannot tokenize non-segmented languages (Chinese, Japanese).

### 2. Rule-Based / Regex Tokenization (Penn Treebank Standard)
- **Method:** Uses cascaded regular expressions to split standard punctuation while preserving special tokens:
  - Separates clitics and contractions: *"don't"* $\\rightarrow$ \`["do", "n't"]\`.
  - Preserves abbreviations: *"Ph.D."*, *"e.g."*, *"U.S."*.
  - Keeps monetary amounts and numerical expressions intact.

### 3. Subword Tokenization Schemes

#### A. Byte-Pair Encoding (BPE) (Sennrich et al., 2016; GPT-2/3/4)
- **Mechanism:** Starts with a base character vocabulary. Counts all adjacent symbol pairs in the corpus, merges the single most frequent pair, and adds it to the vocabulary. Repeats for $K$ merge operations.

#### B. WordPiece (Schuster & Nakajima, 2012; Devlin et al. - BERT)
- **Mechanism:** Similar to BPE, but instead of choosing the pair with highest frequency count, WordPiece selects the pair that **maximizes the likelihood of the language model** on the training data:
  $$\\text{Score}_{(u, v)} = \\frac{\\text{count}(uv)}{\\text{count}(u) \\cdot \\text{count}(v)}$$
- Uses \`##\` to mark continuation subwords (*"playing"* $\\rightarrow$ \`["play", "##ing"]\`).

#### C. Unigram & SentencePiece (Kudo, 2018; T5, LLaMA)
- **Mechanism:** Inverts BPE: starts with a massive vocabulary and iteratively prunes tokens that minimize the increase in corpus perplexity.
- **Language Independence:** SentencePiece treats the raw input as a stream of Unicode characters, encoding whitespace explicitly as an underscore (\`_\`), operating seamlessly on Chinese, Japanese, and English without pre-tokenization.

### 4. Character-Level Tokenization
- **Method:** Every individual character is a token ($V \\approx 100$).
- **Trade-off:** Zero Out-Of-Vocabulary words, but sequences become 5x–10x longer, increasing transformer attention computation by $25x-100x$.

---

## 3. Comprehensive Comparison Table

| Tokenization Scheme | Vocabulary Size | OOV Risk | Typical Model | Primary Strength |
| :--- | :--- | :--- | :--- | :--- |
| **Whitespace** | Unbounded | Extreme | Baseline scripts | Simplest possible execution |
| **Penn Treebank** | 50k–100k | High | Classical NLP (NLTK) | Linguistically intuitive |
| **BPE** | 30k–50k | Zero | GPT-2, GPT-4, RoBERTa | Robust, balanced, data-driven |
| **WordPiece** | 30k | Zero | BERT, DistilBERT | Likelihood-optimized subwords |
| **SentencePiece** | 32k | Zero | T5, LLaMA, Mistral | Script-agnostic, preserves spaces |
| **Character-Level** | 100–250 | Zero | Canine, ByT5 | No vocabulary pruning required |

---

## 4. Exam Summary
Modern NLP relies on **Subword Tokenization**: **BPE** merges frequent pairs by count; **WordPiece** merges pairs by likelihood; and **SentencePiece** operates on raw byte streams with whitespace markers (\`_\`), completely eliminating OOV while keeping sequence length optimal.`
        };

      case 5:
        return {
          summary: "Step-by-step implementation walkthrough of the Byte-Pair Encoding (BPE) algorithm, including frequency counting, merge rules, vocabulary expansion, and tokenization execution.",
          keyPoints: [
            "BPE begins with a character vocabulary augmented with end-of-word markers (</w>).",
            "Counts all co-occurring adjacent symbol pairs across the tokenized corpus dictionary.",
            "Iteratively finds the most frequent pair, merges it into a new token, and records the merge rule.",
            "Execution: Unseen text is segmented into characters, then merge rules are applied in historical order."
          ],
          content: `## 1. Introduction: The BPE Algorithm
Originally developed by Philip Gage (1994) for data compression, **Byte-Pair Encoding (BPE)** was adapted by Sennrich et al. (2016) as the standard subword tokenization algorithm for neural networks and large language models.

---

## 2. Algorithmic Implementation Steps

\`\`\`
Step 1: Initialize Vocabulary with unique characters + '</w>' end-of-word tag.
Step 2: Represent corpus as words segmented into characters with frequency counts.
Step 3: Repeat for K iterations:
        a. Count frequencies of all adjacent pairs across all words.
        b. Select the single pair (A, B) with highest frequency.
        c. Merge (A, B) into new token 'AB'.
        d. Add 'AB' to vocabulary and record (A, B) -> 'AB' merge rule.
Step 4: Return learned Vocabulary and ordered Merge Table.
\`\`\`

---

## 3. Concrete Numerical Walkthrough

Suppose our training corpus contains the following words and frequencies:
- \`"low" : 5\`
- \`"lowest" : 2\`
- \`"newer" : 6\`
- \`"wider" : 3\`
- \`"new" : 2\`

### Initialization
1. Add special end-of-word symbol \`</w>\` to mark boundaries.
2. Segment into characters:
   - \`l o w </w> : 5\`
   - \`l o w e s t </w> : 2\`
   - \`n e w e r </w> : 6\`
   - \`w i d e r </w> : 3\`
   - \`n e w </w> : 2\`
3. **Initial Vocabulary:** \`{d, e, i, l, n, o, r, s, t, w, </w>}\` ($|V| = 11$).

### Iteration 1:
- Count all adjacent pairs:
  - \`(e, r)\` appears in \`newer\` (6) + \`wider\` (3) = **9 times**
  - \`(r, </w>)\` appears in \`newer\` (6) + \`wider\` (3) = **9 times**
  - \`(n, e)\` appears in \`newer\` (6) + \`new\` (2) = **8 times**
- Merge the most frequent pair: \`(e, r) \\rightarrow \\text{'er'}\`.
- Update corpus dictionary: \`n e w er </w> : 6\`, \`w i d er </w> : 3\`.
- **Vocabulary:** \`{..., 'er'}\` ($|V| = 12$).

### Iteration 2:
- Next most frequent pair is \`('er', </w>)\` with count = 9.
- Merge \`('er', </w>) \\rightarrow \\text{'er</w>'}\`.
- Update corpus dictionary: \`n e w er</w> : 6\`, \`w i d er</w> : 3\`.
- **Vocabulary:** \`{..., 'er</w>'}\` ($|V| = 13$).

### Iteration 3:
- Pair \`(n, e)\` has count 8.
- Merge \`(n, e) \\rightarrow \\text{'ne'}\`.
- Update corpus: \`ne w er</w> : 6\`, \`ne w </w> : 2\`.
- **Vocabulary:** \`{..., 'ne'}\` ($|V| = 14$).

### Iteration 4:
- Pair \`('ne', w)\` has count 8.
- Merge \`('ne', w) \\rightarrow \\text{'new'}\`.
- **Vocabulary:** \`{..., 'new'}\` ($|V| = 15$).

---

## 4. Tokenizing Unseen Words at Test Time
When the trained BPE model encounters a new word, e.g., *"lower"*:
1. Segment into base characters: \`["l", "o", "w", "e", "r", "</w>"]\`.
2. Apply merge rules in the exact order they were learned:
   - Rule 1: Merge \`(e, r)\` $\\rightarrow$ \`["l", "o", "w", "er", "</w>"]\`.
   - Rule 2: Merge \`('er', </w>)\` $\\rightarrow$ \`["l", "o", "w", "er</w>"]\`.
   - Rule 5 (e.g., \`l, o, w\` merged into \`low\`): $\\rightarrow$ \`["low", "er</w>"]\`.
3. **Result:** *"lower"* is tokenized into \`["low", "er"]\` without ever being seen during training!

---

## 5. Exam Summary
BPE trains by **iteratively merging the most frequent adjacent character pair** across a dictionary of word counts until vocabulary size reaches $K$. At test time, words are split into characters and merged using the ordered rule table.`
        };

      case 7:
        return {
          summary: "Comprehensive theoretical definition of Minimum Edit Distance (Levenshtein Distance) and its role as a fundamental metric of string similarity in NLP.",
          keyPoints: [
            "Minimum Edit Distance is the minimum number of editing operations needed to transform one string into another.",
            "Standard edit operations: Insertion, Deletion, and Substitution.",
            "Levenshtein Distance sets equal unit costs (1) or substitution cost (2).",
            "Foundational for spell-checking, speech recognition evaluation (Word Error Rate), and biological sequence alignment."
          ],
          content: `## 1. Definition of Minimum Edit Distance
The **Minimum Edit Distance** between two strings is defined as the minimum number of elementary editing operations (**Insertion**, **Deletion**, and **Substitution**) required to transform an initial source string $S$ into a target string $T$.

\`\`\`
Source String:  I N T E N T I O N
                │ │ │ │ │ │ │ │ │  (Transformations)
                ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼
Target String:  E X E C U T I O N
\`\`\`

---

## 2. Elementary Editing Operations and Costs

Let $S = s_1 s_2 \\dots s_m$ and $T = t_1 t_2 \\dots t_n$:

1. **Insertion:** Inserting a character into $S$ to match $T$:
   $$\\text{Cost}(\\text{Insert}) = c_{\\text{ins}}$$
2. **Deletion:** Deleting a character from $S$:
   $$\\text{Cost}(\\text{Delete}) = c_{\\text{del}}$$
3. **Substitution:** Replacing a character in $S$ with a different character in $T$:
   $$\\text{Cost}(\\text{Substitute}) = c_{\\text{sub}}$$

### Cost Formulations:
- **Classic Levenshtein Distance (1966):**
  $$c_{\\text{ins}} = 1, \\quad c_{\\text{del}} = 1, \\quad c_{\\text{sub}} = 2 \\quad (\\text{or } 1 \\text{ in unit cost model})$$
  *(Note: A substitution is conceptually 1 deletion followed by 1 insertion, justifying cost 2).*
- **Damerau-Levenshtein Distance:** Adds a fourth operation: **Transposition** of two adjacent characters (e.g., *"teh"* $\\rightarrow$ *"the"*) with cost 1.

---

## 3. String Similarity Metric
Minimum Edit Distance provides an inverse metric of string similarity:
$$\\text{Similarity}(S, T) = 1 - \\frac{\\text{EditDistance}(S, T)}{\\max(|S|, |T|)}$$
If Edit Distance is 0, $\\text{Similarity} = 1.0$ (identical strings). As edit distance approaches the string length, similarity drops to 0.0.

---

## 4. Key NLP Applications

1. **Spelling Correction:** When a user types *"speling"*, compute edit distance against all dictionary candidates. The word with minimum distance (*"spelling"*, distance = 1) is recommended.
2. **Word Error Rate (WER) in Speech Recognition:** Evaluates ASR transcription accuracy by computing edit distance between reference and hypothesis at the word level:
   $$\\text{WER} = \\frac{S + D + I}{N}$$
   Where $S$ is substitutions, $D$ is deletions, $I$ is insertions, and $N$ is total reference words.
3. **Computational Biology:** Aligning DNA nucleotide sequences ($A, C, G, T$) using the Needleman-Wunsch algorithm.

---

## 5. Exam Summary
Minimum Edit Distance measures string distance via the cheapest sequence of **Insertions**, **Deletions**, and **Substitutions**. It is the universal metric for **spelling correction**, **Word Error Rate in ASR**, and string fuzzy matching.`
        };

      case 8:
        return {
          summary: "Detailed mathematical derivation of Dynamic Programming (Wagner-Fischer algorithm) for computing Minimum Edit Distance with tabular recurrence relations.",
          keyPoints: [
            "Brute-force string conversion has exponential time complexity O(3^(m+n)).",
            "Dynamic programming memoizes optimal sub-alignments in an (m+1) x (n+1) matrix in O(mn) time.",
            "Recurrence relation combines deletion, insertion, and substitution costs.",
            "Backtrace pointers trace the optimal path from bottom-right (m, n) to top-left (0, 0)."
          ],
          content: `## 1. Why Dynamic Programming is Required
Given source string $S$ of length $m$ and target string $T$ of length $n$, exploring all possible sequences of insertions, deletions, and substitutions leads to an exponential search tree of complexity $O(3^{m+n})$.

Because the subproblems of matching substrings overlap heavily, **Dynamic Programming (Wagner-Fischer algorithm, 1974)** solves this in polynomial $O(m \\cdot n)$ time and $O(m \\cdot n)$ memory by constructing a matrix $D$.

\`\`\`
Matrix D[i, j] represents the Minimum Edit Distance between:
Source Prefix: S[1 ... i]   and   Target Prefix: T[1 ... j]
\`\`\`

---

## 2. The Dynamic Programming Recurrence Relation

### 1. Base Cases (Initialization):
- Distance from empty source to target prefix of length $j$ requires $j$ insertions:
  $$D[0, j] = j \\cdot c_{\\text{ins}} = j$$
- Distance from source prefix of length $i$ to empty target requires $i$ deletions:
  $$D[i, 0] = i \\cdot c_{\\text{del}} = i$$

### 2. General Recurrence Relation (For $i > 0, j > 0$):
$$D[i, j] = \\min \\begin{cases} 
D[i - 1, j] + c_{\\text{del}} & \\text{(Deletion from source)} \\\\[6pt]
D[i, j - 1] + c_{\\text{ins}} & \\text{(Insertion into target)} \\\\[6pt]
D[i - 1, j - 1] + \\text{cost} & \\text{(Substitution / Match)} 
\\end{cases}$$

Where substitution cost is:
$$\\text{cost} = \\begin{cases} 
0 & \\text{if } S[i] = T[j] \\quad (\\text{Identical characters / Match}) \\\\[4pt]
c_{\\text{sub}} & \\text{if } S[i] \\neq T[j] \\quad (\\text{Mismatch})
\\end{cases}$$

---

## 3. Backtrace and Alignment Recovery

\`\`\`
D[i-1, j-1] (Sub/Match) ──► D[i-1, j] (Delete)
          ▲                      ▲
          │                      │
D[i, j-1]   (Insert)    ──► D[i, j]   (Current Cell)
\`\`\`

1. During table population, each cell records a backpointer to the neighbor that produced the minimum value:
   - Diagonal $(\\nwarrow)$: Match or Substitution.
   - Up $(\\uparrow)$: Deletion.
   - Left $(\\leftarrow)$: Insertion.
2. Once the table reaches $D[m, n]$, we trace backpointers from $D[m, n]$ up to $D[0, 0]$ to reconstruct the exact optimal character alignment.

---

## 4. Complexity Analysis
- **Time Complexity:** $O(m \\cdot n)$ because each cell in the $(m+1) \\times (n+1)$ matrix is computed in $O(1)$ operations.
- **Space Complexity:** $O(m \\cdot n)$ to store the full matrix for backtrace, or $O(\\min(m, n))$ if only the distance score is required (retaining only two rows).

---

## 5. Exam Summary
Dynamic programming computes Minimum Edit Distance in **$O(mn)$ time** by tabulating prefix distances $D[i, j] = \\min(\\text{Delete}, \\text{Insert}, \\text{Substitute})$ and reconstructing the optimal alignment via backtrace.`
        };

      case 9:
        return {
          summary: "Step-by-step numerical computation of the Minimum Edit Distance between 'intention' and 'execution', complete with full 10x10 DP matrix, backtrace alignment, and cost breakdown.",
          keyPoints: [
            "Source: 'intention' (length 9); Target: 'execution' (length 9).",
            "Costs: Insertion = 1, Deletion = 1, Substitution = 2 (Levenshtein standard with sub=2).",
            "Final Minimum Edit Distance: 8 (or 5 under unit sub=1 model).",
            "Full backtrace identifies: Delete 'i', Substitute 'n'->'e', Delete 't', Substitute 'e'->'x', Insert 'c', Substitute 'n'->'u', Match 't-i-o-n'."
          ],
          content: `## 1. Problem Specification
We compute the **Minimum Edit Distance** between:
- **Source String ($S$):** \`"intention"\` ($m = 9$)
- **Target String ($T$):** \`"execution"\` ($n = 9$)
- **Cost Function (Jurafsky & Martin standard):**
  - Insertion Cost: $c_{\\text{ins}} = 1$
  - Deletion Cost: $c_{\\text{del}} = 1$
  - Substitution Cost: $c_{\\text{sub}} = 2$ (if $S[i] \\neq T[j]$), $0$ if match.

---

## 2. Complete 10x10 Dynamic Programming Table

The dynamic programming table $D[i, j]$ is computed row-by-row using:
$$D[i, j] = \\min(D[i-1, j] + 1, \\ D[i, j-1] + 1, \\ D[i-1, j-1] + (S[i]==T[j] ? 0 : 2))$$

| | # | e | x | e | c | u | t | i | o | n |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **#** | **0** | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| **i** | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 6 | 7 | 8 |
| **n** | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 7 | 8 | 7 |
| **t** | 3 | 4 | 5 | 6 | 7 | 8 | 7 | 8 | 9 | 8 |
| **e** | 4 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 9 |
| **n** | 5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 10 |
| **t** | 6 | 5 | 6 | 7 | 8 | 9 | 8 | 9 | 10 | 11 |
| **i** | 7 | 6 | 7 | 8 | 9 | 10 | 9 | 8 | 9 | 10 |
| **o** | 8 | 7 | 8 | 9 | 10 | 11 | 10 | 9 | 8 | 9 |
| **n** | 9 | 8 | 9 | 10 | 11 | 12 | 11 | 10 | 9 | **8** |

*(Note: Under unit substitution cost $c_{\\text{sub}} = 1$, the final edit distance is **5**).*

---

## 3. Backtrace and Optimal Alignment

Tracing backpointers from cell $D[9, 9] = 8$ back to $D[0, 0] = 0$:

\`\`\`
Source:  i  n  t  e  *  n  t  i  o  n
Action:  d  s  d  s  i  s  m  m  m  m
Target:  *  e  *  x  e  c  u  t  i  o  n
\`\`\`

### Step-by-Step Operation Breakdown:
1. **Delete 'i'** from source: Cost = 1 (Running Total = 1)
2. **Substitute 'n' $\\rightarrow$ 'e'**: Cost = 2 (Running Total = 3)
3. **Delete 't'** from source: Cost = 1 (Running Total = 4)
4. **Substitute 'e' $\\rightarrow$ 'x'**: Cost = 2 (Running Total = 6) *(or sub 'e' $\\rightarrow$ 'e' match depending on path)*
5. **Insert 'c'** into target: Cost = 1 (Running Total = 7)
6. **Substitute 'n' $\\rightarrow$ 'u'**: Cost = 2 (Running Total = 8)
7. **Match 't' $\\rightarrow$ 't'**: Cost = 0
8. **Match 'i' $\\rightarrow$ 'i'**: Cost = 0
9. **Match 'o' $\\rightarrow$ 'o'**: Cost = 0
10. **Match 'n' $\\rightarrow$ 'n'**: Cost = 0

$$\\mathbf{\\text{Total Minimum Edit Distance}} = 8$$

---

## 4. Exam Summary
For *"intention"* to *"execution"*, the DP table evaluates all prefix combinations. The bottom-right cell yields **8** (Levenshtein with substitution cost 2), sharing the identical suffix *"tion"* at zero cost.`
        };

      case 10:
      case 11:
        return {
          summary: "Comprehensive technical exploration of Finite State Automata (FSA) and Regular Languages in NLP, detailing formal definitions, state transition diagrams, and text processing applications.",
          keyPoints: [
            "An FSA is a 5-tuple: Q (states), Sigma (alphabet), delta (transition function), q0 (start state), F (accept states).",
            "Kleene's Theorem proves that Regular Expressions, Regular Languages, and FSAs are computationally equivalent.",
            "Deterministic FSA (DFA) has exactly one transition per input symbol; Nondeterministic FSA (NFA) allows multiple paths and epsilon transitions.",
            "NLP applications include tokenizers, morphological analyzers, shallow chunkers, and spelling checkers."
          ],
          content: `## 1. Formal Definition of a Finite State Automaton (FSA)
A **Finite State Automaton (FSA)** is a theoretical mathematical model of computation consisting of a finite set of states and transitions between those states driven by input symbols from an alphabet.

### The Formal 5-Tuple Definition:
An FSA is formally defined as a 5-tuple:
$$M = \\langle Q, \\Sigma, q_0, F, \\delta \\rangle$$
1. $Q$: A finite, non-empty set of **states** $\\{q_0, q_1, \\dots, q_k\\}$.
2. $\\Sigma$: A finite set of input symbols called the **alphabet**.
3. $q_0 \\in Q$: The designated **initial / start state**.
4. $F \\subseteq Q$: The set of **accepting / final states** (denoted by double circles).
5. $\\delta$: The **transition function**:
   - For a Deterministic FSA (DFA): $\\delta: Q \\times \\Sigma \\rightarrow Q$
   - For a Nondeterministic FSA (NFA): $\\delta: Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\rightarrow 2^Q$

---

## 2. Regular Languages and Kleene's Theorem

\`\`\`
       ┌────────────────────────┐
       │   Regular Expression   │
       └───────────▲────────────┘
                   │
         Kleene's  │  Equivalence
          Theorem  │
                   ▼
       ┌────────────────────────┐
       │ Finite State Automaton │ ◄────► [Regular Language]
       └────────────────────────┘
\`\`\`

- **Kleene's Theorem:** A language $L$ is a **Regular Language** if and only if it can be recognized by a Finite State Automaton, and if and only if it can be described by a Regular Expression.
- **Language Accepted:** The language $L(M)$ accepted by an automaton $M$ is the set of all string sequences $w \\in \\Sigma^*$ that transition $M$ from start state $q_0$ into an accept state $q_f \\in F$.

---

## 3. Concrete FSA Diagram Example: Recognizing "baa+!"
Consider sheep vocalizations: *"baa!"*, *"baaa!"*, *"baaaa!"*:

\`\`\`
(q0) ── 'b' ──► (q1) ── 'a' ──► (q2) ── 'a' ──► (q3) ── '!' ──► ((q4))
                                  ▲               │
                                  │               │
                                  └─── 'a' (loop) ┘
\`\`\`
- $q_0$: Start state.
- $q_1$: Seen \`'b'\`.
- $q_2$: Seen \`'ba'\`.
- $q_3$: Seen at least two \`'a'\`s (loops on subsequent \`'a'\`s).
- $q_4$: Double circle accept state entered upon receiving \`'!'\`.

---

## 4. Key Applications of FSA in NLP

1. **Morphological Recognition:** Validating legal combinations of English prefixes, stems, and suffixes (e.g., verifying that \`un-\` attaches to adjectives but not nouns).
2. **Fast Tokenization & Lexing:** Compiling regular expressions into minimal DFAs using the **Subset Construction algorithm** to tokenize megabytes of text per second.
3. **Spelling Correction:** Modeling dictionary lexicons as a single consolidated **Deterministic Acyclic Finite State Automaton (DAFSA)**, enabling sub-millisecond prefix searches.

---

## 5. Exam Summary
An FSA is a 5-tuple $\\langle Q, \\Sigma, q_0, F, \\delta \\rangle$ equivalent to Regular Expressions by **Kleene's Theorem**. In NLP, FSAs power **high-speed tokenizers**, **morphological parsers**, and **lexicon dictionary lookup engines**.`
        };

      case 12:
        return {
          summary: "Formal definition of Regular Languages and proof of their closure properties under union, concatenation, Kleene star, intersection, and complementation.",
          keyPoints: [
            "A Regular Language is a formal language generated by a Regular Grammar or recognized by an FSA.",
            "Closure properties: If L1 and L2 are regular, then L1 U L2, L1 L2, L1*, L1 intersect L2, and L1 complement are all regular.",
            "Closed under Union (OR operator '|').",
            "Closed under Concatenation (sequential appending).",
            "Closed under Kleene Star ('*' repetition zero or more times)."
          ],
          content: `## 1. Definition of Regular Languages
In formal language theory (Chomsky Hierarchy Type 3), a **Regular Language** is defined over an alphabet $\\Sigma$ as any language that can be generated by a regular grammar, recognized by a Finite State Automaton (FSA), or specified by a Regular Expression.

### Inductive Definition:
1. $\\emptyset$ (empty set) is a regular language.
2. $\\{\\epsilon\\}$ (language containing only the empty string) is a regular language.
3. For every $a \\in \\Sigma$, the singleton set $\\{a\\}$ is a regular language.
4. If $L_1$ and $L_2$ are regular languages, then the sets resulting from **Union**, **Concatenation**, and **Kleene Closure** are also regular languages.

---

## 2. Fundamental Operations on Regular Languages

\`\`\`
Operation            Mathematical Notation    Regex Syntax
Union                L_1 ∪ L_2               (R_1 | R_2)
Concatenation        L_1 · L_2               (R_1 R_2)
Kleene Closure       L^*                     (R*)
Intersection         L_1 ∩ L_2               -
Complement           L^c (Σ* - L)            -
\`\`\`

### 1. Union ($L_1 \\cup L_2$)
- **Definition:** The set of strings that belong to either $L_1$ or $L_2$:
  $$L_1 \\cup L_2 = \\{w \\mid w \\in L_1 \\lor w \\in L_2\\}$$
- **Automata Construction:** Create a new start state $q_{start}$ with $\\epsilon$-transitions to the start states of $M_1$ and $M_2$.

### 2. Concatenation ($L_1 \\cdot L_2$)
- **Definition:** The set of strings formed by appending any string from $L_2$ to any string from $L_1$:
  $$L_1 \\cdot L_2 = \\{xy \\mid x \\in L_1 \\land y \\in L_2\\}$$
- **Automata Construction:** Connect all accepting states of $M_1$ with $\\epsilon$-transitions to the start state of $M_2$.

### 3. Kleene Star / Closure ($L^*$)
- **Definition:** The set of strings formed by concatenating zero or more strings from $L$:
  $$L^* = \\bigcup_{i=0}^\\infty L^i = \\{\\epsilon\\} \\cup L \\cup (L \\cdot L) \\cup (L \\cdot L \\cdot L) \\cup \\dots$$
- **Automata Construction:** Add $\\epsilon$-transitions from all accept states of $M$ back to its start state, and make the start state an accept state.

### 4. Intersection ($L_1 \\cap L_2$) and Complement ($\\Sigma^* - L$)
- **Complement:** If $M$ is a DFA, swap all accept states and non-accept states ($F' = Q - F$). The resulting DFA accepts $\\Sigma^* - L$.
- **Intersection:** By De Morgan's Law:
  $$L_1 \\cap L_2 = (L_1^c \\cup L_2^c)^c$$
  Since regular languages are closed under union and complement, they are strictly closed under intersection.

---

## 3. Exam Summary
Regular languages are the formal foundation of NLP text matching. They are closed under **Union**, **Concatenation**, **Kleene Star**, **Intersection**, and **Complement**, meaning any combination of these operations produces a language that can still be processed by a finite state machine in linear $O(n)$ time.`
        };

      case 13:
        return {
          summary: "Comprehensive architectural analysis of raw text extraction from diverse document formats: PDF, DOCX, HTML, and OCR scanned images.",
          keyPoints: [
            "Raw text extraction ingests varied container formats and outputs normalized plain Unicode strings.",
            "PDF extraction requires resolving stream compression, font encoding tables, and two-column layout ordering.",
            "HTML requires DOM parsing, boilerplate removal, and stripping script/style tags.",
            "DOCX requires unzipping XML document archives and parsing paragraph nodes (<w:p>)."
          ],
          content: `## 1. Introduction: Raw Text Ingestion
Before any NLP algorithm can be applied, unstructured human text must be extracted from diverse digital container file formats (**PDF, DOCX, HTML, Scanned Images**) and converted into a clean, unformatted stream of UTF-8 characters.

\`\`\`
[Input Files: PDF, DOCX, HTML, Scans]
                 │
   ┌─────────────┼─────────────┬─────────────┐
   ▼             ▼             ▼             ▼
 [PDF.js]   [Mammoth DOCX]  [BeautifulSoup] [Tesseract OCR]
 (Font Maps) (XML Unzip)     (DOM Stripping) (Binarization)
   └─────────────┬─────────────┴─────────────┘
                 │
                 ▼
     Clean UTF-8 Raw Text Stream
\`\`\`

---

## 2. In-Depth Format Extraction Mechanics

### 1. Portable Document Format (PDF) Extraction
- **The Challenge:** PDFs were designed for visual print layout, not text extraction. Text is stored as arbitrary positioned drawing commands (\`BT ... ET\`) on a 2D canvas without native concepts of words, spaces, or paragraphs.
- **Extraction Obstacles:**
  - *Reading Order Disruption:* In multi-column academic papers, sequential reading across the 2D plane merges Column 1 and Column 2 lines together.
  - *Font Encoding & Ligatures:* Characters may map to private Unicode areas, causing *"fi"* to extract as gibberish unless the ToUnicode CMap table is parsed.
  - *Hyphenation:* Words split across line breaks (*"con- / temporary"*) must be de-hyphenated.

### 2. Microsoft Word (DOCX) Extraction
- **Mechanism:** DOCX files are zipped archives containing XML files. The document text is stored in \`word/document.xml\`.
- **Parsing:** Libraries (e.g., \`mammoth\`) traverse the XML tree, extracting text inside paragraph tags (\`<w:p>\`) and text runs (\`<w:t>\`), mapping tables and bullet lists into plain text equivalents.

### 3. Web Pages (HTML)
- **Mechanism:** Parses the Document Object Model (DOM) to isolate body text while discarding non-content markup:
  - Stripping \`<script>\`, \`<style>\`, \`<nav>\`, and \`<footer>\` tags.
  - Converting block elements (\`<p>\`, \`<div>\`, \`<br>\`) to standard newline delimiters (\`\\n\`).
  - Decoding HTML entities (\`&amp;\` $\\rightarrow$ \`&\`, \`&nbsp;\` $\\rightarrow$ \` \`).

### 4. Optical Character Recognition (OCR) for Scanned Images
- **Mechanism:** When documents are scanned images (TIF, JPG), **Tesseract OCR** applies:
  1. Image preprocessing: Binarization, deskewing, and noise removal.
  2. Line and word box segmentation.
  3. Character classification using deep convolutional/LSTM networks.

---

## 3. Exam Summary
Raw text extraction converts binary visual containers into clean UTF-8 text: **PDFs** require reading-order reconstruction and font CMap decoding; **DOCX** requires XML node extraction; **HTML** requires DOM boilerplate stripping; and **scans** require OCR binarization.`
        };

      case 14:
        return {
          summary: "Comprehensive technical walkthrough of the Text Normalization pipeline in NLP, detailing case folding, lemmatization, contraction expansion, and spelling correction.",
          keyPoints: [
            "Text normalization transforms raw, irregular text into a single canonical, consistent format.",
            "Steps: Case folding, punctuation standardization, contraction expansion, lemmatization/stemming, and spelling correction.",
            "Reduces vocabulary sparsity and collapses synonymous surface representations.",
            "Essential for sentiment analysis, machine translation, and search engine indexing."
          ],
          content: `## 1. Definition and Goal of Text Normalization
**Text Normalization** is the series of linguistic and computational transformations that converts raw, noisy, heterogeneous text into a single standard, canonical representation across an entire corpus.

\`\`\`
Raw Input: "OMG!! Isn't this phone's camera AWESOME?? Check out https://phone.com :)"
                                    │
                                    ▼
[Step 1: Noise Removal]         ──► Strip URLs, HTML, excessive punctuation
[Step 2: Contraction Expansion] ──► "Isn't" -> "Is not"
[Step 3: Slang & Emoji Mapping] ──► "OMG" -> "Oh my god", ":)" -> "[SMILE]"
[Step 4: Case Folding]          ──► "AWESOME" -> "awesome"
[Step 5: Lemmatization]         ──► "phone's" -> "phone", "is" -> "be"
                                    │
                                    ▼
Normalized Output: "Oh my god ! Is not this phone camera awesome ? [SMILE]"
\`\`\`

---

## 2. In-Depth Normalization Stages

### 1. Case Folding (Lowercasing)
- Converts all characters to lowercase to map *"Apple"*, *"apple"*, and *"APPLE"* to a single vocabulary token.
- *Exception:* In Named Entity Recognition (NER), truecasing is used instead to avoid destroying proper noun signals (*"Bush"* vs. *"bush"*).

### 2. Contraction Expansion
- Expands conversational clitics into full grammatical forms:
  - *"can't"* $\\rightarrow$ *"cannot"*
  - *"won't"* $\\rightarrow$ *"will not"*
  - *"they're"* $\\rightarrow$ *"they are"*
- *Crucial Impact:* Exposes negation words (*"not"*) for sentiment analysis.

### 3. Punctuation Standardization & Noise Removal
- Standardizes typographic curly quotes (\`“ \` ”\`) to straight ASCII quotes (\`"\`).
- Collapses repeated punctuation (*"????"* $\\rightarrow$ *"?"*).
- Strips non-informative artifacts: URLs, tracking tags, and markup.

### 4. Stemming and Lemmatization
- Reduces inflected word forms to canonical roots:
  - *Stemming (Porter):* Heuristic suffix stripping (*"traditional"* $\\rightarrow$ *"tradit"*).
  - *Lemmatization (WordNet):* Morphological dictionary reduction (*"better"* with POS \`ADJ\` $\\rightarrow$ *"good"*).

### 5. Automated Spelling Correction
- Detects typographical errors via dictionary lookups and computes candidate corrections with Minimum Edit Distance $\\le 2$ ranked by unigram/bigram language model probabilities.

---

## 3. Exam Summary
Text normalization converts chaotic surface text into clean, standardized tokens through **case folding**, **contraction expansion**, **punctuation standardization**, **noise stripping**, and **lemmatization**, directly reducing vocabulary sparsity.`
        };

      case 15:
        return {
          summary: "Technical examination of the process of extracting meaningful terms and collocations from token streams using stop-word filtering, POS tagging, and association metrics.",
          keyPoints: [
            "Term extraction isolates domain-relevant concepts from raw token arrays.",
            "Filtering stages: Stop-word removal, minimum frequency thresholding, and POS-pattern filtering (e.g., Noun-Noun, Adj-Noun).",
            "Multi-word term extraction identifies collocations using Pointwise Mutual Information (PMI) and Chi-Square tests.",
            "Powers information retrieval indexing, keyword extraction, and ontology learning."
          ],
          content: `## 1. Introduction: From Tokens to Informational Terms
A raw token stream consists predominantly of function words (*"the"*, *"is"*, *"at"*) and fragmented lexical items. **Term Extraction** is the computational process of identifying domain-specific, content-bearing keywords and multi-word phrases (**terms**) that represent the core conceptual content of a document.

\`\`\`
Raw Token Stream: ["The", "deep", "neural", "network", "achieved", "high", "accuracy", "."]
                                         │
                                         ▼
[1. Stop-Word Removal]     ──► Discard "The", "."
[2. POS-Pattern Filtering] ──► Keep Adj + Noun phrases: [("deep", JJ), ("neural", JJ), ("network", NN)]
[3. Collocation Scoring]   ──► PMI("deep neural network") >> threshold
                                         │
                                         ▼
Extracted Technical Term:  "deep neural network"
\`\`\`

---

## 2. The Term Extraction Pipeline

### 1. Stop-Word Removal
- Discards high-frequency closed-class grammatical tokens (articles, prepositions, conjunctions) that carry zero domain specificity.

### 2. Part-of-Speech (POS) Syntactic Filtering (Justeson & Katz)
- High-value technical terms almost universally conform to specific syntactic constituent patterns:
  - $\\text{Noun} + \\text{Noun}$: *"support vector"*, *"credit card"*
  - $\\text{Adjective} + \\text{Noun}$: *"artificial intelligence"*, *"recurrent network"*
  - $\\text{Noun} + \\text{Preposition} + \\text{Noun}$: *"degrees of freedom"*, *"loss of function"*
- A POS tagger filters the token stream to retain only sequences matching these grammatical templates.

### 3. Multi-Word Collocation Identification
To determine if a multi-word sequence is a true technical term rather than an accidental co-occurrence, compute statistical association metrics:

- **Pointwise Mutual Information (PMI):**
  $$\\text{PMI}(w_1, w_2) = \\log_2 \\frac{P(w_1, w_2)}{P(w_1) \\cdot P(w_2)}$$
  If $w_1$ and $w_2$ co-occur far more frequently than expected by random chance (e.g., *"San Francisco"*, *"Monte Carlo"*), PMI is high, identifying them as a bound term.
- **T-Test / Chi-Square Statistic:** Tests the statistical hypothesis that the two tokens appear together more frequently than independent probability dictates.

---

## 3. Exam Summary
Extracting terms from tokens converts unstructured word lists into domain concepts by applying **stop-word removal**, **syntactic POS template filtering** ($Adj+Noun, Noun+Noun$), and **statistical collocation scoring (PMI)**.`
        };

      case 16:
        return {
          summary: "Rigorous linguistic definition and comparison of Words and Patterns in NLP with concrete syntactic and morphological examples.",
          keyPoints: [
            "A Word is a discrete, meaningful linguistic unit composed of phonemes/morphemes.",
            "A Pattern is a generalized template or formal abstraction describing a class of sequences.",
            "Patterns exist at morphological, lexical, and syntactic levels.",
            "NLP models match concrete words against abstract patterns to extract information and parse syntax."
          ],
          content: `## 1. Linguistic Definitions

### 1. Words
- **Definition:** A **word** is a fundamental, discrete linguistic unit of human language that carries semantic or functional meaning, can stand alone in speech or writing, and is typically delimited by whitespace boundaries in written text.
- **Example:** *"apple"*, *"running"*, *"unbelievable"*.
- **Nature:** Concrete, instance-level lexical tokens.

### 2. Patterns
- **Definition:** A **pattern** is a generalized formal rule, regular expression, template, or abstract structural schema that describes, generates, or matches a specific set of words or sequences.
- **Nature:** Abstract, meta-level relational specifications.

---

## 2. Strata of Patterns in NLP

\`\`\`
1. Lexical Pattern:       \\b\\d{3}-\\d{2}-\\d{4}\\b  (Matches all Social Security numbers)
2. Morphological Pattern: Stem + "-able"           (Productive adjective derivation)
3. Syntactic Pattern:     NP -> Det + Adj + Noun   (Noun phrase constituent schema)
4. Semantic Pattern:      X was born in Y          (Place-of-birth relationship template)
\`\`\`

---

## 3. Comparison Matrix

| Dimension | Word | Pattern |
| :--- | :--- | :--- |
| **Abstraction Level** | Concrete instance / token | Abstract generalized template |
| **Cardinality** | Single discrete entry | Matches potentially infinite instances |
| **Specification** | Character string (*"2024-11-20"*) | Formal syntax (\`\\d{4}-\\d{2}-\\d{2}\`) |
| **Role in NLP** | Input data consumed by models | Operational rule / feature used for matching |

---

## 4. Exam Summary
A **word** is a concrete semantic token appearing in text, whereas a **pattern** is an abstract mathematical or structural template (e.g., regular expression, CFG rule) used to identify, extract, or generate classes of words.`
        };

      case 17:
        return {
          summary: "Comprehensive architectural examination of Text Categorization in NLP: Feature extraction, classification algorithms (Naive Bayes, SVM, Logistic Regression), and evaluation metrics.",
          keyPoints: [
            "Text categorization assigns predefined category labels to unstructured documents.",
            "Pipeline: Preprocessing -> Feature Representation (BoW, TF-IDF, Embeddings) -> Classifier Training -> Evaluation.",
            "Core classifiers: Multinomial Naive Bayes, Support Vector Machines (linear kernel), and fine-tuned Transformers.",
            "Evaluated using Precision, Recall, F1-Score, and confusion matrices (Macro vs Micro averaging)."
          ],
          content: `## 1. Problem Formulation: Text Categorization
**Text Categorization (Classification)** is the supervised machine learning task of assigning one or more predefined category labels $c_j \\in C$ to an unstructured text document $d \\in D$.

$$f: D \\rightarrow C$$

\`\`\`
[Training Corpus of Documents] ──► [Feature Extraction: TF-IDF] ──► [Classifier: SVM / BERT] ──► Category Label
\`\`\`

---

## 2. The Four Stages of the Categorization Pipeline

### Stage 1: Document Preprocessing
Tokenization, case normalization, stop-word removal, and lemmatization to clean the raw input documents.

### Stage 2: Feature Representation & Weighting
Transforming text strings into numerical feature vectors:
- **Term Frequency-Inverse Document Frequency (TF-IDF):**
  $$\\text{TF-IDF}(t, d, D) = \\text{TF}(t, d) \\cdot \\log\\left(\\frac{|D|}{|\\{d \\in D : t \\in d\\}|}\\right)$$
  Assigns high weights to terms frequent in document $d$ but rare across the broader corpus $D$.

### Stage 3: Supervised Classification Algorithms
1. **Multinomial Naive Bayes (Generative):** Fast baseline utilizing Bayes' rule with conditional independence assumptions:
   $$c^* = \\arg\\max_{c \\in C} P(c) \\prod_{i=1}^n P(w_i | c)$$
2. **Support Vector Machines (SVM, Discriminative):** Finds the optimal maximum-margin hyperplane separating classes in high-dimensional TF-IDF space:
   $$\\min_{\\mathbf{w}, b} \\frac{1}{2} \\|\\mathbf{w}\\|^2 \\quad \\text{subject to } y_i(\\mathbf{w} \\cdot \\mathbf{x}_i + b) \\ge 1$$
3. **Transformer Encoders (BERT):** Passing text through stacked self-attention layers and taking the \`[CLS]\` embedding through a softmax classification head.

### Stage 4: Evaluation Metrics
- **Precision:** $\\frac{TP}{TP + FP}$ (Exactness of positive predictions).
- **Recall:** $\\frac{TP}{TP + FN}$ (Completeness of retrieved positives).
- **F1-Score:** Harmonic mean: $2 \\cdot \\frac{P \\cdot R}{P + R}$.
- **Macro-Averaging:** Computes F1 independently per class and averages (weights rare classes equally).
- **Micro-Averaging:** Aggregates global true positives, false positives, and false negatives (dominated by frequent classes).

---

## 3. Exam Summary
Text categorization maps documents to predefined classes using **TF-IDF or dense embeddings** fed into **Naive Bayes, SVM, or Transformer classifiers**, evaluated via **Precision, Recall, and Macro/Micro F1-scores**.`
        };

      case 18:
        return {
          summary: "Comprehensive survey of the Natural Language Toolkit (NLTK) in Python, detailing core modules for tokenization, stemming, lemmatization, POS tagging, and corpora management.",
          keyPoints: [
            "NLTK is the foundational Python library for educational and computational linguistics research.",
            "Tokenization via 'nltk.tokenize.word_tokenize' and 'sent_tokenize' (Punkt algorithm).",
            "Stemming & Lemmatization via 'PorterStemmer', 'SnowballStemmer', and 'WordNetLemmatizer'.",
            "Corpus management: Built-in access to Brown Corpus, Gutenberg, Reuters, and WordNet lexical database."
          ],
          content: `## 1. Introduction to NLTK
The **Natural Language Toolkit (NLTK)** is a comprehensive Python library designed specifically for educational computational linguistics and NLP prototyping, offering modular interfaces to algorithms, corpora, and lexical resources.

---

## 2. Core NLTK Modules and Capabilities

\`\`\`
                                  NLTK ECOSYSTEM
      ┌─────────────────┬─────────────────┬─────────────────┬────────────────┐
      ▼                 ▼                 ▼                 ▼                ▼
   Corpora         Tokenization       Stemming        POS Tagging         WordNet
 (Brown, WSJ,    (Punkt Tokenizer,  (PorterStemmer,  (Perceptron Tagger, (Synsets, Paths,
  Stopwords)      RegexpTokenizer)   WordNetLemmat)   Penn Treebank)      Hypernyms)
\`\`\`

### 1. Tokenization (\`nltk.tokenize\`)
- **Sentence Tokenization:** \`sent_tokenize()\` uses the unsupervised **Punkt tokenizer** to segment paragraphs into sentences, reliably handling abbreviation periods.
- **Word Tokenization:** \`word_tokenize()\` implements the Penn Treebank standard, splitting clitics and punctuation.

### 2. Normalization: Stemming and Lemmatization
- **Stemmers:** \`nltk.stem.PorterStemmer\` and \`SnowballStemmer\` for rapid heuristic suffix removal.
- **Lemmatizer:** \`nltk.stem.WordNetLemmatizer\` resolves canonical dictionary lemmas when provided with POS tags.

### 3. POS Tagging (\`nltk.pos_tag\`)
- Uses an averaged perceptron sequence labeler trained on the Penn Treebank to assign grammatical tags (\`NN\`, \`VBZ\`, \`JJ\`) in linear time.

### 4. Corpus Access & WordNet (\`nltk.corpus\`)
- Accesses standardized research corpora: Brown Corpus (categorized text), Gutenberg (public domain literature), Reuters (news articles), and stop-word lists across 20+ languages.
- Direct API to Princeton WordNet: querying synsets, glosses, hypernym paths, and calculating lexical similarity metrics (Path, Leacock-Chodorow, Wu-Palmer).

---

## 3. Exam Summary
NLTK provides an end-to-end Python environment for classical NLP, providing standardized modules for **tokenization (Punkt)**, **normalization (Porter, WordNet)**, **POS tagging (Averaged Perceptron)**, and **lexical semantic traversal (WordNet synsets)**.`
        };

      case 19:
      case 20:
        return {
          summary: "Comprehensive technical analysis of the need for and applications of Regular Expressions in Natural Language Processing.",
          keyPoints: [
            "Regex provides formal deterministic pattern specification over text strings.",
            "Vital for data cleaning: stripping HTML, normalizing whitespace, removing noise.",
            "Powers information extraction for syntax-constrained entities (emails, dates, phone numbers).",
            "Used in shallow syntactic parsing (chunking) and rule-based tokenization."
          ],
          content: `## 1. The Critical Need for Regular Expressions in NLP
Natural language is stored as unstructured character arrays. Without a formal pattern description language, inspecting or manipulating text requires writing thousands of brittle string manipulation loops. **Regular Expressions (Regex)** solve this by providing a declarative, mathematical algebra for matching string patterns.

---

## 2. Core Operational Applications of Regular Expressions in NLP

\`\`\`
                              REGEX IN NLP
       ┌───────────────────────────┼───────────────────────────┐
       ▼                           ▼                           ▼
1. Data Cleaning          2. Information Extraction   3. Shallow Chunking
- Strip HTML markup       - Email addresses           - Noun Phrase chunking
- Normalize whitespace    - Phone numbers & IPs       - Regex-based grammar
- Remove noise / scripts  - Dates & Currencies          rules: NP: {<DT>?<JJ>*<NN>}
\`\`\`

### 1. Data Cleaning & Corpus Preprocessing
- **HTML / XML Tag Removal:** Cleaning web scrapings:
  \`re.sub(r'<[^>]+>', '', raw_html)\`
- **Whitespace Collapsing:** Normalizing tabs, non-breaking spaces, and multi-spaces into single spaces:
  \`re.sub(r'\\s+', ' ', text)\`
- **Typographical Quote Standardization:** Replacing curly quotation marks with standard ASCII equivalents.

### 2. Information Extraction & Named Entity Recognition
- Extracting syntax-constrained entities with 100% precision:
  - *Email:* \`\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b\`
  - *Phone Numbers:* \`\\b(?:\\+1[-.]?)?\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})\\b\`
  - *ISO Dates:* \`\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])\\b\`

### 3. Rule-Based Tokenization and Sentence Segmentation
- The standard **RegexpTokenizer** splits words according to formal character classes, separating punctuation while keeping internal hyphens and contractions intact.

### 4. Regular Expression Chunking (Shallow Parsing)
- In NLTK, shallow syntactic chunking is executed by applying regular expression grammar rules over sequences of POS tags:
  \`\`\`python
  grammar = r"NP: {<DT>?<JJ>*<NN>+}"  # Matches Determiner + optional Adjectives + Nouns
  \`\`\`

---

## 3. Exam Summary
Regular expressions are indispensable in NLP: they automate **corpus cleaning**, provide zero-latency **information extraction** for rigid entities (PII, dates, emails), power **tokenizers**, and enable **shallow grammar chunking** over POS sequences.`
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
          summary: "Definition of a text corpus and overview of the Brown University Corpus.",
          keyPoints: [
            "A corpus is a large, curated, machine-readable collection of authentic texts.",
            "Brown Corpus (1961) was the first computerized general English corpus with 1 million words across 15 genres."
          ],
          content: `### Corpus & The Brown University Corpus
- **Corpus (plural: Corpora):** A large, principled collection of naturally occurring, authentic written or spoken texts stored in machine-readable electronic format for linguistic research.
- **Brown University Corpus (Francis & Kučera, 1961):** The first computerized general corpus of American English.
  - Contains **1 million words** distributed across **500 text samples**.
  - Spans **15 balanced genres** (press reportage, editorial, religious, science fiction, academic prose), famously serving as the primary benchmark for POS tagging and statistical language modeling.`
        };

      case 2:
        return {
          summary: "Classification of datasets in NLP with concrete examples.",
          keyPoints: [
            "Annotated vs Unannotated datasets.",
            "Parallel datasets (bilingual) vs Monolingual corpora."
          ],
          content: `### Types of Datasets in NLP
1. **Raw / Unannotated Corpora:** Plain text used for self-supervised pretraining (e.g., Common Crawl, Wikipedia dumps).
2. **Annotated / Labeled Datasets:** Texts enriched with human linguistic labels:
   - *Treebanks:* Penn Treebank (POS tags and syntactic parse trees).
   - *NER Datasets:* CoNLL-2003 (Person, Org, Location labels).
3. **Parallel / Multimodal Corpora:** Aligned bilingual sentences for machine translation (e.g., Europarl) or image-caption pairs (MS-COCO).`
        };

      case 3:
        return {
          summary: "The fundamental computational need for NLP.",
          keyPoints: [
            "Bridges human linguistic communication with machine execution.",
            "Unlocks massive unstructured text data for automated reasoning."
          ],
          content: `### Basic Need of NLP
The fundamental need for NLP stems from the fact that over **80% of human knowledge** is stored in unstructured natural language (books, clinical notes, legal contracts, web pages):
1. **Bridging the Human-Machine Gap:** Enables non-technical humans to communicate with computers without learning programming languages.
2. **Automating Information Processing:** Enables automated searching, translation, summarization, and extraction from billions of documents at superhuman speed.`
        };

      case 4:
        return {
          summary: "Definition and common applications of regular expressions.",
          keyPoints: [
            "Declarative formal language defining string search patterns.",
            "Applications: input validation, pattern extraction, and data cleaning."
          ],
          content: `### Regular Expressions & Common Uses
A **Regular Expression (Regex)** is a compact declarative formal string of characters that defines a search pattern according to formal language theory.

### Common Uses in NLP:
1. **Text Cleansing:** Stripping HTML tags, scripts, and duplicate punctuation.
2. **Information Extraction:** Extracting emails, dates, phone numbers, and IP addresses.
3. **Tokenization:** Splitting text into words and punctuation using pattern boundaries.`
        };

      case 5:
        return {
          summary: "Definition of tokenization in NLP.",
          keyPoints: [
            "Process of segmenting text into discrete units (tokens).",
            "First foundational stage of the NLP pipeline."
          ],
          content: `### Tokenization in NLP
**Tokenization** is the computational process of breaking a continuous stream of written text into discrete, meaningful linguistic elements called **tokens** (words, punctuation marks, numbers, or subwords).
- *Example:* *"NLP is fun!"* $\\rightarrow$ \`["NLP", "is", "fun", "!"]\`.
It is the foundational entry point for all downstream linguistic processing.`
        };

      case 6:
        return {
          summary: "Definition and mechanism of lemmatization in NLP.",
          keyPoints: [
            "Reduces words to their canonical base dictionary form (lemma).",
            "Leverages morphological analysis and POS context."
          ],
          content: `### Lemmatization in NLP
**Lemmatization** is the algorithmic reduction of a word to its canonical base or dictionary citation form (known as the **lemma**) through morphological analysis and vocabulary lookup.
- *Mechanism:* Requires Part-of-Speech context:
  - *"saw"* with POS \`VERB\` $\\rightarrow$ lemma: *"see"*.
  - *"saw"* with POS \`NOUN\` $\\rightarrow$ lemma: *"saw"*.
  - *"better"* with POS \`ADJ\` $\\rightarrow$ lemma: *"good"* (always produces a valid dictionary word).`
        };

      case 7:
        return {
          summary: "Core differences between Lemmatization and Stemming.",
          keyPoints: [
            "Stemming is heuristic suffix stripping; produces non-words.",
            "Lemmatization uses morphological dictionaries and POS tags; produces valid lemmas."
          ],
          content: `### Lemmatization vs. Stemming

| Feature | Stemming | Lemmatization |
| :--- | :--- | :--- |
| **Method** | Heuristic suffix slicing (Porter) | Full morphological analysis + Dictionary |
| **Output** | Truncated stem (*"studi"*, *"comput"*) | Valid dictionary word (*"study"*, *"compute"*) |
| **Context** | Context-free (ignores POS) | Context-dependent (requires POS tag) |
| **Speed** | Very fast string operations | Slower due to lexical lookups |`
        };

      case 8:
        return {
          summary: "Need for Edit Distance in computational linguistics.",
          keyPoints: [
            "Measures string dissimilarity by counting insertions, deletions, substitutions.",
            "Essential for spell correction and speech recognition evaluation."
          ],
          content: `### Need for Edit Distance
**Edit Distance (Levenshtein Distance)** is necessary because string equality is binary (True/False); it cannot quantify degrees of similarity:
1. **Spelling Correction:** Identifies intended words when users make typos (e.g., suggesting *"graffe"* $\\rightarrow$ *"giraffe"* based on distance = 1).
2. **ASR Evaluation:** Computes **Word Error Rate (WER)** between spoken reference and transcribed hypothesis.
3. **DNA Alignment:** Matches biological genetic sequences.`
        };

      case 9:
        return {
          summary: "Difference between tokenization and stemming.",
          keyPoints: [
            "Tokenization segments text into discrete word units.",
            "Stemming reduces word tokens to their truncated morphological roots."
          ],
          content: `### Tokenization vs. Stemming
- **Tokenization:** Operates at the **document/sentence level** to segment continuous character streams into discrete word and punctuation tokens (\`"I am walking"\` $\\rightarrow$ \`["I", "am", "walking"]\`).
- **Stemming:** Operates at the **individual word level** to strip affixes and reduce words to root stems (\`"walking"\` $\\rightarrow$ \`"walk"\`).

> **Pipeline Order:** Tokenization runs first; stemming runs on the resulting tokens.`
        };

      case 10:
        return {
          summary: "Using regular expressions to extract specific strings from documents.",
          keyPoints: [
            "Character classes, quantifiers, and capturing groups isolate target text.",
            "Precompiled regex filters structured patterns instantaneously."
          ],
          content: `### Extracting Strings via Regular Expressions
Regular expressions isolate specific target strings by combining character classes, quantifiers, and capturing groups:
- **Capturing Groups (\`(...)\`):** Isolate the desired sub-string from surrounding boilerplate:
  - *Pattern:* \`Invoice\\s*#:\\s*(\\d+)\`
  - *Target Text:* *"Your Invoice #: 94821 is ready"* $\\rightarrow$ Captures: \`"94821"\`.
- Precompiled regex scans entire multi-gigabyte documents in linear $O(n)$ time.`
        };

      case 11:
        return {
          summary: "Definition of a corpus and listing of landmark NLP corpora.",
          keyPoints: [
            "A corpus is a structured electronic collection of texts.",
            "Landmark corpora: Brown, Penn Treebank, British National Corpus, Common Crawl."
          ],
          content: `### Existing Landmark Corpora in NLP
A **Corpus** is a structured, principled electronic repository of natural language texts.

### Prominent Existing Corpora:
1. **Brown Corpus:** First general balanced American English corpus (1M words, 15 genres).
2. **Penn Treebank (PTB):** Wall Street Journal stories annotated with syntactic parse trees and POS tags.
3. **British National Corpus (BNC):** 100M-word balanced sample of written and spoken British English.
4. **Common Crawl:** Petabyte-scale open web crawl used for modern LLM pretraining.`
        };

      case 12:
        return {
          summary: "The basic need of regular expressions in search activities.",
          keyPoints: [
            "Enables flexible, pattern-based search beyond rigid exact-string matching.",
            "Supports wildcards, optional characters, and range matching."
          ],
          content: `### Need of Regular Expressions in Search
Standard keyword search fails when the exact character string is unknown or varies:
1. **Pattern Matching vs. Literal Search:** Regex allows searching for abstract patterns (e.g., finding any valid telephone number without knowing the digits in advance).
2. **Wildcards & Optional Elements:** Searches for morphological variants: \`colou?r\` matches both *"color"* and *"colour"*.
3. **Range Matching:** Matches numerical ranges: \`[1-9][0-9]{3}\` matches all 4-digit years.`
        };

      case 13:
        return {
          summary: "Using character ranges in regular expressions with examples.",
          keyPoints: [
            "Square brackets with hyphens specify ranges of characters.",
            "Examples for lowercase, uppercase, digits, and hexadecimal."
          ],
          content: `### Character Ranges in Regular Expressions
Character ranges are defined inside square brackets \`[ - ]\` using the ASCII range hyphen:
1. \`[a-z]\`: Matches any single lowercase English letter.
2. \`[A-Z]\`: Matches any single uppercase English letter.
3. \`[0-9]\`: Matches any single numeric digit (equivalent to \`\\d\`).
4. \`[a-fA-F0-9]\`: Matches any valid single hexadecimal character.

*Example:* \`[A-Z][a-z]+\` matches any capitalized word (e.g., *"London"*, *"Smith"*).`
        };

      case 14:
        return {
          summary: "Explanation of * and + quantifier symbols in regular expressions.",
          keyPoints: [
            "* is the Kleene star: matches zero or more repetitions.",
            "+ is the Kleene plus: matches one or more repetitions."
          ],
          content: `### Quantifier Symbols: * and +

| Symbol | Name | Meaning | Concrete Example | Matches |
| :---: | :---: | :---: | :---: | :---: |
| **\`*\`** | Kleene Star | Matches **zero or more** occurrences | \`ab*c\` | *"ac"*, *"abc"*, *"abbc"*, *"abbbc"* |
| **\`+\`** | Kleene Plus | Matches **one or more** occurrences | \`ab+c\` | *"abc"*, *"abbc"* (fails on *"ac"*) |

> **Rule:** \`R+\` is mathematically equivalent to \`R(R*)\`.`
        };

      case 15:
        return {
          summary: "Explanation of Disjunction, Grouping, and Precedence in regex.",
          keyPoints: [
            "Disjunction is alternation (pipe '|').",
            "Grouping binds sub-expressions (parentheses '()').",
            "Precedence defines operation evaluation order."
          ],
          content: `### Disjunction, Grouping, and Precedence
1. **Disjunction (\`|\`):** Specifies logical alternation (OR). \`cat|dog\` matches either *"cat"* or *"dog"*.
2. **Grouping (\`(...)\`):** Enforces scope boundaries: \`guar(an)?tee\` makes the \`an\` substring optional.
3. **Precedence Hierarchy:** Governs the order of operations:
   - Highest: Parentheses \`()\`
   - Next: Quantifiers \`*\`, \`+\`, \`?\`, \`{n,m}\`
   - Next: Concatenation (sequential characters)
   - Lowest: Disjunction \`|\` (e.g., \`cat|dog\` means \`(cat)|(dog)\`, NOT \`ca(t|d)og\`).`
        };

      case 16:
        return {
          summary: "Definitions of utterance, disfluencies, and lemma.",
          keyPoints: [
            "Utterance: spoken language spoken between pauses.",
            "Disfluency: interruptions in spoken speech flow ('um', false starts).",
            "Lemma: canonical base dictionary form of a word."
          ],
          content: `### Utterance, Disfluencies, and Lemma
1. **Utterance:** The natural spoken language equivalent of a written sentence, defined as a continuous stretch of speech preceded and followed by silence.
2. **Disfluencies:** Interruptions in the fluent flow of natural spoken language, including filled pauses (*"um"*, *"uh"*), restarts, repetitions, and false starts (*"I want to... I need a ticket"*).
3. **Lemma:** The canonical base or citation form of a lexeme chosen by convention to represent a word in dictionaries (e.g., *"sing"* is the lemma for *sings, sang, sung*).`
        };

      case 17:
        return {
          summary: "Definition and formula of Heaps' Law (Herdan's Law).",
          keyPoints: [
            "Empirical power law relating vocabulary size V to corpus size N.",
            "Formula: V = k * N^beta, showing sub-linear vocabulary growth."
          ],
          content: `### Heaps' Law (Herdan's Law)
**Heaps' Law** is an empirical power law in computational linguistics that models how the vocabulary size $|V|$ grows as a function of the total number of tokens $N$ in a corpus:

$$|V| = k \\cdot N^\\beta$$

- $|V|$: Vocabulary size (number of distinct word types).
- $N$: Total number of word tokens in the text corpus.
- $k, \\beta$: Empirical constants where $10 \\le k \\le 100$ and $0.4 \\le \\beta \\le 0.6$ (typically $\\beta \\approx 0.5$).
- **Key Insight:** Vocabulary growth never plateaus to a constant, but grows sub-linearly with text size as the square root of $N$.`
        };

      case 18:
        return {
          summary: "Definition of an NLP dataset and its fundamental properties.",
          keyPoints: [
            "A dataset is a curated collection of examples for training and evaluating models.",
            "Key properties: Balance, Representativeness, Size, Quality/Inter-annotator agreement."
          ],
          content: `### NLP Dataset & Key Properties
An **NLP Dataset** is a structured, curated sample of linguistic data utilized for training, validating, and testing machine learning models.

### Key Properties of Quality Datasets:
1. **Representativeness:** Reflects real-world distributions of genres, dialects, and vocabulary.
2. **Label Quality & Inter-Annotator Agreement (Cohen's $\\kappa$):** Measures consistency among human annotators.
3. **Balance:** Ensures fair representation across positive and negative classes to prevent classification bias.
4. **Volume & Coverage:** Sufficient token counts to mitigate statistical data sparsity.`
        };

      case 19:
        return {
          summary: "Definition of text normalization with a concrete example.",
          keyPoints: [
            "Transforming non-standard text into a uniform canonical format.",
            "Concrete example showing contraction expansion, case folding, and lemmatization."
          ],
          content: `### Text Normalization with Example
**Text Normalization** is the process of converting unstructured, noisy text variants into a standard, uniform representation:

### Concrete Example:
- **Raw Input:** *"The children weren't playing in London's parks."*
- **Step 1 (Contraction Expansion):** *"The children were not playing in London's parks."*
- **Step 2 (Punctuation & Clitic Separation):** \`["The", "children", "were", "not", "playing", "in", "London", "'s", "parks", "."]\`
- **Step 3 (Lemmatization & Lowercasing):** \`["the", "child", "be", "not", "play", "in", "London", "'s", "park", "."]\`
All irregular plurals (*children* $\\rightarrow$ *child*) and verbs (*playing* $\\rightarrow$ *play*) are mapped to lemmas.`
        };

      case 20:
        return {
          summary: "The critical necessity of normalizing word formats in NLP.",
          keyPoints: [
            "Prevents identical words with different casings/inflections from being treated as separate features.",
            "Collapses data sparsity and ensures consistent retrieval in search and classification."
          ],
          content: `### Need of Normalizing Word Formats
Normalizing word formats is necessary because machine learning models treat character strings literally:
1. **Eliminates False Distinctness:** Without normalization, the computer treats *"run"*, *"Run"*, *"RUN"*, and *"running"* as 4 completely unrelated features.
2. **Maximizes Statistical Counts:** By collapsing all variants into a single root, empirical count statistics are concentrated, dramatically reducing model parameter variance.
3. **Ensures Search Recall:** Guarantees that search queries for *"travel"* retrieve documents containing *"traveling"*, *"traveler"*, and *"traveled"`
        };
    }
  }

  return null;
}
