import { QuestionData, GeneratedAnswer } from "./types";

export function getAcad40Unit5Answer(q: QuestionData): GeneratedAnswer | null {
  const { part, qNo } = q;

  // ==========================================
  // PART A (10 MARKS)
  // ==========================================
  if (part === "PART A") {
    switch (qNo) {
      case 1:
        return {
          summary: "Comprehensive strategies for optimizing the accuracy of Markov Models in POS Tagging and Text Generation: higher-order states, smoothing, and feature augmentation.",
          keyPoints: [
            "Transition from first-order bigram HMMs to second-order trigram HMMs to capture richer syntactic context.",
            "Incorporate Kneser-Ney or Witten-Bell smoothing to prevent zero emission probabilities on rare words.",
            "Subword morphological emission handling (prefixes, suffixes, capitalization) for Out-Of-Vocabulary tokens.",
            "Use Discriminative Sequence Models (Maximum Entropy Markov Models - MEMMs, Conditional Random Fields - CRFs) to avoid label bias."
          ],
          content: `## 1. Introduction: Improving Markov Model Accuracy
While standard first-order Hidden Markov Models (HMM) provide an elegant, mathematically tractable framework for sequence labeling, standard maximum likelihood parameter estimates suffer from **finite-horizon limitations**, **label bias**, and **severe zero-frequency data sparsity**.

\`\`\`
STANDARD HMM (First-Order):
State(t-1) ──► State(t) ──► Emission(w_t)  (Context: Only 1 prior tag)

OPTIMIZED HMM (Second-Order + Morphology):
State(t-2) ──┐
             ▼
State(t-1) ──► State(t) ──► Emission(w_t) + Suffix Features ("-ing", "-tion", Capitalized)
\`\`\`

---

## 2. Key Optimization Strategies

### 1. Higher-Order Markov Transitions (Trigram HMMs)
- **First-Order HMM:** Assumes $P(t_i | t_1, \\dots, t_{i-1}) = P(t_i | t_{i-1})$ (Bigram).
- **Second-Order HMM (e.g., TnT Tagger by Brants, 2000):** Conditions transitions on the **two preceding tags**:
  $$P(t_i | t_{i-1}, t_{i-2})$$
  Linearly interpolated with bigram and unigram tag distributions:
  $$P(t_i | t_{i-1}, t_{i-2}) = \\lambda_1 P_{\\text{MLE}}(t_i | t_{i-1}, t_{i-2}) + \\lambda_2 P_{\\text{MLE}}(t_i | t_{i-1}) + \\lambda_3 P_{\\text{MLE}}(t_i)$$
  This boosts POS tagging accuracy from ~94% to **96.7%**.

### 2. Sophisticated Morphological Emission for OOV Words
- When an unknown word $w \\notin V$ appears, standard HMMs assign zero emission probability $P(w | t) = 0$.
- **Remedy:** Model unknown word emissions using suffix and orthographic features:
  $$P(w | t) = P(\\text{Capitalized} | t) \\cdot P(\\text{Suffix}_{1:3}(w) | t) \\cdot P(\\text{HasDigits} | t)$$
  A word ending in *"-tion"* receives near 100% emission probability under the \`NN\` state.

### 3. Transitioning to Discriminative CRFs (Solving Label Bias)
- Generative HMMs model $P(W, T) = P(T) P(W | T)$, requiring normalization at each state.
- **Linear-Chain Conditional Random Fields (CRF):** Directly model the conditional posterior $P(T | W)$ globally over the entire sequence using a single partition function $Z(W)$, eliminating the **Label Bias Problem** and allowing arbitrary non-independent contextual features.

---

## 3. Exam Summary
To maximize Markov model accuracy: elevate from first-order to **second-order trigram transitions**, interpolate with **deleted interpolation**, handle unknown words via **subword morphological emission probabilities**, or transition to **discriminative Linear-Chain CRFs**.`
        };

      case 3:
        return {
          summary: "Techniques for detecting and mitigating Overfitting in Markov Models, covering smoothing, state-space pruning, and Bayesian Dirichlet priors.",
          keyPoints: [
            "Overfitting occurs when high-order HMMs memorize training corpus noise and assign zero probability to valid unseen sequences.",
            "Add-k and Witten-Bell smoothing regularize emission distributions.",
            "Deleted Interpolation dynamically optimizes smoothing weights on held-out validation sets.",
            "Bayesian HMMs incorporate Dirichlet prior distributions over transition and emission matrices."
          ],
          content: `## 1. The Overfitting Problem in Markov Models
In Markov models, overfitting occurs when maximum likelihood parameter estimates ($MLE$) fit the idiosyncratic training sample too tightly. This manifests when higher-order models (trigrams, 4-grams) allocate all probability mass to observed sequences, assigning **zero probability to valid unseen grammatical combinations**.

---

## 2. Mathematical Mitigation Techniques

\`\`\`
Training Data ──► [MLE Parameter Estimation] ──► Overfitted Model (Assigns P=0 to test text)
                               │
                               ▼
        [Regularization & Smoothing Interventions]
        1. Deleted Interpolation (Lambda Optimization)
        2. Dirichlet Priors (MAP Estimation)
        3. State Space Pruning / Tying
                               │
                               ▼
            Regularized Robust Markov Model
\`\`\`

### 1. Deleted Interpolation (Jelinek-Mercer Smoothing)
- Rather than relying solely on high-variance trigram counts, regularize parameters by blending with low-variance bigram and unigram models:
  $$P_{\\text{smooth}}(t_i | t_{i-1}, t_{i-2}) = \\lambda_1 \\frac{C(t_{i-2}, t_{i-1}, t_i)}{C(t_{i-2}, t_{i-1})} + \\lambda_2 \\frac{C(t_{i-1}, t_i)}{C(t_{i-1})} + \\lambda_3 \\frac{C(t_i)}{N}$$
- The weights $\\lambda_1, \\lambda_2, \\lambda_3$ are learned via the Expectation-Maximization (EM) algorithm on a held-out validation set to guarantee generalization.

### 2. Maximum A Posteriori (MAP) Estimation with Dirichlet Priors
- Instead of raw MLE, treat transition rows $A_i$ and emission rows $B_j$ as random variables governed by a **Dirichlet Prior**:
  $$P(A_i | \\alpha) = \\frac{1}{B(\\alpha)} \\prod_{j=1}^N a_{ij}^{\\alpha_j - 1}$$
- The MAP estimate acts as pseudocount regularization:
  $$\\hat{a}_{ij} = \\frac{C(s_i, s_j) + \\alpha_j - 1}{\\sum_k C(s_i, s_k) + \\sum_k (\\alpha_k - 1)}$$

---

## 3. Exam Summary
Overfitting in Markov models is mitigated by **Deleted Interpolation** across N-gram orders, **MAP estimation using Dirichlet pseudocount priors**, and **entropy-based state space pruning** to eliminate noisy, low-frequency state transitions.`
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
          summary: "Comprehensive technical exposition of the Three Fundamental Problems for Hidden Markov Models: Likelihood Evaluation, Optimal State Decoding, and Parameter Learning.",
          keyPoints: [
            "Problem 1: Likelihood Evaluation - Compute P(O|lambda) using the Forward-Backward Algorithm in O(T*N^2) time.",
            "Problem 2: Decoding - Find the most probable hidden state sequence Q* using the Viterbi Algorithm.",
            "Problem 3: Learning / Parameter Estimation - Adjust parameters lambda=(A, B, pi) to maximize P(O|lambda) using the Baum-Welch (Expectation-Maximization) Algorithm.",
            "Defines the entire computational foundation of HMM theory (Lawrence Rabiner, 1989)."
          ],
          content: `## 1. Introduction: The Canonical HMM Framework
A **Hidden Markov Model (HMM)** is formally defined by the parameter tuple:
$$\\lambda = \\langle A, B, \\pi \\rangle$$
Where $A$ is the state transition probability matrix ($a_{ij} = P(q_t = s_j | q_{t-1} = s_i)$), $B$ is the emission probability matrix ($b_j(k) = P(o_t = v_k | q_t = s_j)$), and $\\pi$ is the initial state distribution ($\\pi_i = P(q_1 = s_i)$).

In his seminal 1989 paper, Lawrence Rabiner formalized HMM theory around **Three Fundamental Questions**.

\`\`\`
                           THE THREE FUNDAMENTAL HMM PROBLEMS
        ┌───────────────────────────────┼───────────────────────────────┐
        ▼                               ▼                               ▼
Problem 1: EVALUATION           Problem 2: DECODING             Problem 3: LEARNING
"How likely is observation O?"   "What hidden states produced O?" "How to estimate parameters?"
Algorithm: Forward-Backward     Algorithm: Viterbi              Algorithm: Baum-Welch (EM)
Complexity: O(T · N^2)          Complexity: O(T · N^2)          Complexity: Iterative EM
\`\`\`

---

## 2. In-Depth Technical Breakdown of the Three Problems

### Problem 1: Evaluation (Likelihood Determination)
- **Problem Statement:** Given the model $\\lambda = (A, B, \\pi)$ and an observation sequence $O = o_1, o_2, \\dots, o_T$, compute the total probability $P(O | \\lambda)$.
- **Brute-Force Infeasibility:** Summing over all possible hidden state sequences requires $O(2T \\cdot N^T)$ operations—computationally impossible ($N=10, T=100 \\implies 10^{100}$).
- **Algorithmic Solution:** The **Forward Algorithm** uses dynamic programming to sum probabilities along an $N \\times T$ lattice:
  $$\\alpha_t(j) = \\left[ \\sum_{i=1}^N \\alpha_{t-1}(i) \\cdot a_{ij} \\right] b_j(o_t)$$
  Total likelihood: $P(O | \\lambda) = \\sum_{i=1}^N \\alpha_T(i)$ computed in strictly **$O(T \\cdot N^2)$ polynomial time**.

### Problem 2: Decoding (Uncovering the Optimal Hidden State Sequence)
- **Problem Statement:** Given model $\\lambda$ and observation sequence $O$, discover the single best, most probable sequence of hidden states $Q^* = q_1^*, q_2^*, \\dots, q_T^*$ that generated $O$.
- **Application:** In POS Tagging, finding the exact sequence of tags for a sentence of words.
- **Algorithmic Solution:** The **Viterbi Algorithm** replaces the summation in the Forward algorithm with a **maximization operation**, recording backpointers $\\psi_t(j)$ to trace the single highest-probability path:
  $$v_t(j) = \\max_{1 \\le i \\le N} \\left[ v_{t-1}(i) \\cdot a_{ij} \\right] b_j(o_t)$$
  $$\\psi_t(j) = \\arg\\max_{1 \\le i \\le N} \\left[ v_{t-1}(i) \\cdot a_{ij} \\right]$$

### Problem 3: Learning / Parameter Estimation (Training)
- **Problem Statement:** Given an observation sequence $O$ (and no known hidden state annotations), adjust the model parameters $\\lambda = (A, B, \\pi)$ to maximize the likelihood $P(O | \\lambda)$.
- **Algorithmic Solution:** The **Baum-Welch Algorithm** (a special instance of the **Expectation-Maximization / EM** algorithm):
  1. *E-Step:* Compute expected state occupancy counts $\\gamma_t(i)$ and state transition counts $\\xi_t(i, j)$ using the Forward and Backward variables.
  2. *M-Step:* Re-estimate parameters $\\hat{A}, \\hat{B}, \\hat{\\pi}$ by computing relative frequencies of expected counts.
  3. Iterates until log-likelihood converges to a local maximum.

---

## 3. Summary Matrix

| Problem | Goal | Core Mathematical Operation | Classical Algorithm | Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **1. Likelihood** | $P(O \\mid \\lambda)$ | Sum over state lattice: $\\sum$ | Forward Algorithm | $O(T \\cdot N^2)$ |
| **2. Decoding** | $\\arg\\max_Q P(Q \\mid O, \\lambda)$ | Max over paths + Backtrace: $\\max$ | Viterbi Algorithm | $O(T \\cdot N^2)$ |
| **3. Learning** | $\\arg\\max_\\lambda P(O \\mid \\lambda)$ | Expectation-Maximization hill-climb | Baum-Welch (EM) | Iterative $O(k \\cdot T \\cdot N^2)$ |

---

## 4. Exam Summary
Rabiner's 3 problems define HMM computation: **Problem 1 (Evaluation)** is solved by the **Forward Algorithm** ($\sum$); **Problem 2 (Decoding)** is solved by the **Viterbi Algorithm** ($\max$ + backtrace); and **Problem 3 (Learning)** is solved by the **Baum-Welch EM Algorithm**.'`
        };

      case 2:
        return {
          summary: "Comprehensive mathematical definition of the Markov Model and the two fundamental Markov Assumptions (First-Order Markov Property and Output Independence).",
          keyPoints: [
            "A Markov Chain models a stochastic process where transitions depend only on the immediate past state.",
            "First-Order Markov Assumption: P(q_t | q_1, ..., q_{t-1}) = P(q_t | q_{t-1}).",
            "Output Independence Assumption: P(o_t | q_1, ..., q_T, o_1, ..., o_T) = P(o_t | q_t).",
            "Transforms intractable exponential state spaces into tractable linear lattices."
          ],
          content: `## 1. Definition of a Markov Model
A **Markov Model** is a probabilistic graphical model that describes a sequence of possible events in which the probability of each event depends only on the state attained in the previous event. Named after Russian mathematician Andrey Markov, it models stochastic sequential processes.

---

## 2. The Two Foundational Markov Assumptions

\`\`\`
       [State q_{t-1}] ────────► [State q_t] ────────► [State q_{t+1}]
              │                         │
     (First-Order Markov)      (Output Independence)
              │                         │
              ▼                         ▼
   Transitions depend ONLY    Emission depends ONLY
   on immediate predecessor   on current state q_t:
    P(q_t | q_{t-1})                 P(o_t | q_t)
\`\`\`

### 1. The First-Order Markov Assumption (Transition Property)
- **Formal Definition:** The conditional probability distribution of the state at time $t$ depends **solely on the state at time $t-1$**, being completely conditionally independent of all earlier historical states $q_1, q_2, \\dots, q_{t-2}$:
  $$\\mathbf{P(q_t \\mid q_1, q_2, \\dots, q_{t-1}) = P(q_t \\mid q_{t-1})}$$
- **Time Invariance (Stationarity):** The transition probabilities are constant over time:
  $$P(q_t = s_j \\mid q_{t-1} = s_i) = a_{ij} \\quad \\forall t$$

### 2. The Output Independence Assumption (Emission Property)
- **Formal Definition:** In a Hidden Markov Model, the probability of observing an output token $o_t$ at time $t$ depends **solely on the current hidden state $q_t$** that generated it, being completely conditionally independent of all other states and all other past/future observations:
  $$\\mathbf{P(o_t \\mid q_1, \\dots, q_T, o_1, \\dots, o_T) = P(o_t \\mid q_t) = b_j(o_t)}$$

---

## 3. Joint Probability Under the Markov Assumptions
Because of these two assumptions, the full joint probability of a hidden state sequence $Q$ and observation sequence $O$ factors cleanly into:
$$P(O, Q) = \\prod_{t=1}^T P(q_t | q_{t-1}) P(o_t | q_t) = \\pi_{q_1} b_{q_1}(o_1) \\prod_{t=2}^T a_{q_{t-1}, q_t} b_{q_t}(o_t)$$

---

## 4. Exam Summary
A Markov model simplifies language sequences via two assumptions: **The First-Order Markov Assumption** ($P(q_t|q_{t-1})$, conditioning only on the immediate prior state) and **The Output Independence Assumption** ($P(o_t|q_t)$, emissions depend only on the current state).`
        };

      case 3:
        return {
          summary: "In-depth mathematical contrast between Emission Probability and Transition Probability in Hidden Markov Models, explaining their operational roles in POS tagging.",
          keyPoints: [
            "Transition Probability a_ij = P(q_t = s_j | q_{t-1} = s_i) models grammatical syntax (tag-to-tag syntax).",
            "Emission Probability b_j(k) = P(o_t = v_k | q_t = s_j) models lexical realization (tag-to-word dictionary lookup).",
            "Estimated via Maximum Likelihood relative frequency counts from tagged treebanks.",
            "Viterbi dynamically multiplies transitions and emissions to decode optimal POS sequences."
          ],
          content: `## 1. Introduction: Two Orthogonal Probability Matrices
In a Hidden Markov Model $\\lambda = \\langle A, B, \\pi \\rangle$, the system's stochastic behavior is governed by two fundamentally distinct, orthogonal probability distributions: **Transition Probabilities ($A$)** and **Emission Probabilities ($B$)**.

\`\`\`
TRANSITION MATRIX A (Syntax):           EMISSION MATRIX B (Lexicon):
P(Tag_t | Tag_{t-1})                     P(Word_t | Tag_t)
e.g., P(Noun | Determiner) = 0.65       e.g., P("bear" | Noun) = 0.002
      P(Verb | Determiner) = 0.01             P("bear" | Verb) = 0.0004
\`\`\`

---

## 2. In-Depth Mathematical Contrast

### 1. Transition Probability ($A$)
- **Formal Definition:** The conditional probability of transitioning from hidden state $s_i$ at time $t-1$ to hidden state $s_j$ at time $t$:
  $$a_{ij} = P(q_t = s_j \\mid q_{t-1} = s_i)$$
- **Stochastic Constraint:** Each row of the $N \\times N$ transition matrix must sum to $1$:
  $$\\sum_{j=1}^N a_{ij} = 1.0 \\quad \\forall i$$
- **Role in POS Tagging:** Encodes **grammatical syntax**. For example, it learns that an Adjective is highly likely to be followed by a Noun ($a_{\\text{JJ}, \\text{NN}} \\approx 0.60$), but very unlikely to be followed by a Verb ($a_{\\text{JJ}, \\text{VB}} \\approx 0.02$).

### 2. Emission Probability ($B$)
- **Formal Definition:** The conditional probability that hidden state $s_j$ emits or generates the specific observed vocabulary symbol $v_k$:
  $$b_j(k) = P(o_t = v_k \\mid q_t = s_j)$$
- **Stochastic Constraint:** For each hidden state, emissions across all vocabulary words $V$ sum to $1$:
  $$\\sum_{k=1}^{|V|} b_j(k) = 1.0 \\quad \\forall j$$
- **Role in POS Tagging:** Encodes **lexical dictionary likelihood**. It models how likely a specific tag is to produce a given word (e.g., $P(\\text{"bank"} | \\text{NN}) = 0.001$, while $P(\\text{"the"} | \\text{NN}) = 0.0$).

---

## 3. Comparison Matrix

| Property | Transition Probability ($a_{ij}$) | Emission Probability ($b_j(k)$) |
| :--- | :--- | :--- |
| **Dimensions** | $N \\times N$ (Square state matrix) | $N \\times |V|$ (State $\\times$ Vocabulary) |
| **Conditioning** | State conditioned on prior State | Word conditioned on current State |
| **Linguistic Function** | Models **Syntactic Grammar** (Word Order) | Models **Lexical Semantics** (Dictionary lookup) |
| **MLE Formula** | $\\frac{C(t_{i-1}, t_i)}{C(t_{i-1})}$ | $\\frac{C(t_i, w_i)}{C(t_i)}$ |

---

## 4. Exam Summary
**Transition probabilities ($a_{ij}$)** govern the grammatical movement between hidden tags ($P(t_i|t_{i-1})$), while **emission probabilities ($b_j(k)$)** govern the generation of observable surface words from those tags ($P(w_i|t_i)$).`
        };

      case 8:
      case 9:
        return {
          summary: "Comprehensive technical formulation of the Forward and Backward variables in HMMs, illustrated via the classic Soft Drink Machine Markov example.",
          keyPoints: [
            "Forward variable alpha_t(i) computes P(o_1 ... o_t, q_t = s_i | lambda) via forward dynamic programming.",
            "Backward variable beta_t(i) computes P(o_{t+1} ... o_T | q_t = s_i, lambda) via backward dynamic programming.",
            "Classic Soft Drink Machine: States = {Cola (C), Iced Tea (T)}; Observations = {lemon, cola}.",
            "Used together in the Baum-Welch algorithm to compute posterior state occupancy probabilities."
          ],
          content: `## 1. The Forward and Backward Trellis Variables
In Hidden Markov Models, solving Problem 1 (Likelihood Evaluation) and Problem 3 (Learning) requires computing probabilities across partial paths. The **Forward ($\\alpha$)** and **Backward ($\\beta$)** algorithms accomplish this via dynamic programming on an $N \\times T$ lattice.

---

## 2. Mathematical Formulations

\`\`\`
FORWARD VARIABLE α_t(j):                    BACKWARD VARIABLE β_t(i):
Joint probability of partial observations    Conditional probability of future observations
o_1 ... o_t and ending in state s_j:        o_{t+1} ... o_T given current state s_i:
α_t(j) = P(o_1 ... o_t, q_t = s_j | λ)      β_t(i) = P(o_{t+1} ... o_T | q_t = s_i, λ)
\`\`\`

### 1. Forward Variable ($\\alpha$)
1. **Initialization ($t = 1$):**
   $$\\alpha_1(i) = \\pi_i \\cdot b_i(o_1), \\quad 1 \\le i \\le N$$
2. **Induction ($t = 2 \\dots T$):**
   $$\\alpha_t(j) = \\left[ \\sum_{i=1}^N \\alpha_{t-1}(i) \\cdot a_{ij} \\right] b_j(o_t), \\quad 1 \\le j \\le N$$
3. **Termination:**
   $$P(O | \\lambda) = \\sum_{i=1}^N \\alpha_T(i)$$

### 2. Backward Variable ($\\beta$)
1. **Initialization ($t = T$):**
   $$\\beta_T(i) = 1.0, \\quad 1 \\le i \\le N$$
2. **Induction ($t = T-1, T-2 \\dots 1$):**
   $$\\beta_t(i) = \\sum_{j=1}^N a_{ij} \\cdot b_j(o_{t+1}) \\cdot \\beta_{t+1}(j), \\quad 1 \\le i \\le N$$
3. **Termination:**
   $$P(O | \\lambda) = \\sum_{i=1}^N \\pi_i \\cdot b_i(o_1) \\cdot \\beta_1(i)$$

---

## 3. Concrete Example: The Soft Drink Machine
Consider the classic Eisner (2002) soft drink vending machine:
- **Hidden States ($Q$):** $\\{s_1 = \\text{Cola Preference (C)}, \\ s_2 = \\text{Iced Tea Preference (T)}\\}$.
- **Observations ($V$):** $\\{o_1 = \\text{cola flavor (c)}, \\ o_2 = \\text{lemon flavor (l)}\\}$.
- **Model Parameters:**
  - $\\pi = [0.7, 0.3]$
  - $A = \\begin{bmatrix} 0.7 & 0.3 \\\\ 0.4 & 0.6 \\end{bmatrix}$ (Transitions: C $\\rightarrow$ C: 0.7, C $\\rightarrow$ T: 0.3, etc.)
  - $B = \\begin{bmatrix} 0.6 & 0.4 \\\\ 0.1 & 0.9 \\end{bmatrix}$ (Emissions: C emits lemon with 0.4; T emits lemon with 0.9)

### Walkthrough for Observation Sequence: $O = [\\text{lemon}, \\text{cola}]$
1. **$t = 1$ (Observation = lemon):**
   - $\\alpha_1(C) = \\pi_C \\cdot b_C(\\text{lemon}) = 0.7 \\cdot 0.4 = \\mathbf{0.28}$
   - $\\alpha_1(T) = \\pi_T \\cdot b_T(\\text{lemon}) = 0.3 \\cdot 0.9 = \\mathbf{0.27}$
2. **$t = 2$ (Observation = cola):**
   - $\\alpha_2(C) = [\\alpha_1(C) a_{CC} + \\alpha_1(T) a_{TC}] \\cdot b_C(\\text{cola}) = [0.28(0.7) + 0.27(0.4)] \\cdot 0.6 = [0.196 + 0.108] \\cdot 0.6 = \\mathbf{0.1824}$
   - $\\alpha_2(T) = [\\alpha_1(C) a_{CT} + \\alpha_1(T) a_{TT}] \\cdot b_T(\\text{cola}) = [0.28(0.3) + 0.27(0.6)] \\cdot 0.1 = [0.084 + 0.162] \\cdot 0.1 = \\mathbf{0.0246}$
3. **Total Likelihood:**
   $$P(O | \\lambda) = \\alpha_2(C) + \\alpha_2(T) = 0.1824 + 0.0246 = \\mathbf{0.2070}$$

---

## 4. Exam Summary
The **Forward algorithm** ($\alpha_t$) moves left-to-right accumulating past observation history; the **Backward algorithm** ($\beta_t$) moves right-to-left estimating future likelihood. Combined, they yield the exact posterior state occupancy probability $\gamma_t(i) = \frac{\alpha_t(i)\beta_t(i)}{P(O|\lambda)}$.`
        };

      case 10:
        return {
          summary: "Step-by-step procedural derivation of the Viterbi Algorithm for finding the optimal hidden state sequence in Markov models.",
          keyPoints: [
            "Solves Problem 2 (Decoding) in HMMs: finds Q* that maximizes P(Q|O, lambda).",
            "Uses dynamic programming lattice of size N x T.",
            "Maintains path probabilities v_t(j) and backpointer indices psi_t(j).",
            "Backtraces from time T to time 1 to reconstruct the global optimal sequence in O(T*N^2) time."
          ],
          content: `## 1. Problem Formulation: The Decoding Task
Given an observed sequence $O = o_1, o_2, \\dots, o_T$ and model $\\lambda = (A, B, \\pi)$, find the single most probable hidden state sequence $Q^* = q_1^*, q_2^*, \\dots, q_T^*$:

$$Q^* = \\arg\\max_Q P(Q \\mid O, \\lambda) = \\arg\\max_Q P(O, Q \\mid \\lambda)$$

---

## 2. The Four Stages of the Viterbi Algorithm

\`\`\`
Step 1: Initialization ──► v_1(j) = π_j · b_j(o_1), ψ_1(j) = 0
Step 2: Recursion      ──► v_t(j) = max_i [ v_{t-1}(i) · a_{ij} ] · b_j(o_t)
                           ψ_t(j) = argmax_i [ v_{t-1}(i) · a_{ij} ]
Step 3: Termination    ──► Best Path Score = max_i [ v_T(i) ]
                           q_T* = argmax_i [ v_T(i) ]
Step 4: Backtrace      ──► q_t* = ψ_{t+1}(q_{t+1}*) for t = T-1 down to 1
\`\`\`

---

## 3. Detailed Algorithmic Specification

### 1. Initialization ($t = 1$):
For each state $j \\in \\{1, \\dots, N\\}$:
$$v_1(j) = \\pi_j \\cdot b_j(o_1)$$
$$\\psi_1(j) = 0$$

### 2. Recursion ($t = 2, 3, \\dots, T$):
For each state $j \\in \\{1, \\dots, N\\}$:
$$v_t(j) = \\max_{1 \\le i \\le N} \\left[ v_{t-1}(i) \\cdot a_{ij} \\right] b_j(o_t)$$
$$\\psi_t(j) = \\arg\\max_{1 \\le i \\le N} \\left[ v_{t-1}(i) \\cdot a_{ij} \\right]$$

### 3. Termination:
$$P^* = \\max_{1 \\le i \\le N} v_T(i)$$
$$q_T^* = \\arg\\max_{1 \\le i \\le N} v_T(i)$$

### 4. Backtracking (Path Readout):
Trace backward from time $t = T-1$ down to $1$:
$$q_t^* = \\psi_{t+1}(q_{t+1}^*)$$

---

## 4. Log-Space Implementation (Mandatory for Numerical Stability)
Because multiplying probabilities causes floating-point underflow, production implementations use **log-probabilities**:
$$V_t(j) = \\max_{1 \\le i \\le N} \\left[ V_{t-1}(i) + \\log a_{ij} \\right] + \\log b_j(o_t)$$

---

## 5. Exam Summary
The **Viterbi Algorithm** solves HMM decoding in **$O(T \\cdot N^2)$ time** by calculating lattice path maximums $v_t(j)$ and following backpointers $\\psi_t(j)$ from $q_T^*$ back to $q_1^*$.`
        };

      case 16:
        return {
          summary: "Precise mathematical calculation and comparison of two POS tag sequences for 'The bear is on the move': P(AT NN BEZ IN AT NN) vs P(AT NN BEZ IN AT VB), demonstrating why the HMM correctly chooses Noun.",
          keyPoints: [
            "Classic Manning & Schütze Chapter 10 example on pages 347-350.",
            "Sentence: 'The bear is on the move.' with two competing tag sequences for 'move': NN (Noun) vs VB (Verb).",
            "Under the HMM: Sequence probability is the product of transition and emission probabilities.",
            "Result: P(AT NN BEZ IN AT NN) >> P(AT NN BEZ IN AT VB) because the transition P(VB | AT) is near zero (Verbs do not follow Articles in English)."
          ],
          content: `## 1. Problem Specification
We are tasked with computing and comparing the joint probabilities of two candidate Part-of-Speech tag sequences for the sentence:
> **Sentence:** *"The bear is on the move."*

- **Sequence 1 ($T_1$):** \`AT NN BEZ IN AT NN\` (*"move"* tagged as **Noun**)
- **Sequence 2 ($T_2$):** \`AT NN BEZ IN AT VB\` (*"move"* tagged as **Verb**)

*(Tag notation from Brown Corpus: \`AT\` = Article/Determiner, \`NN\` = Singular Noun, \`BEZ\` = "is", \`IN\` = Preposition, \`VB\` = Base Verb).*

---

## 2. Mathematical Formulation Under the First-Order HMM

The joint probability of a tag sequence $T = t_1, \\dots, t_6$ and words $W = w_1, \\dots, w_6$ is:
$$P(W, T) = \\prod_{i=1}^6 P(t_i | t_{i-1}) \\cdot P(w_i | t_i)$$

Notice that for the first 5 words (*"The bear is on the"*), both hypotheses share the **exact identical prefix tags and emissions**:
- $t_1 = \\text{AT}$ ("The")
- $t_2 = \\text{NN}$ ("bear")
- $t_3 = \\text{BEZ}$ ("is")
- $t_4 = \\text{IN}$ ("on")
- $t_5 = \\text{AT}$ ("the")

Therefore, the decision ratio between $T_1$ and $T_2$ depends **strictly on the final token "move"**:

$$\\frac{P(W, T_1)}{P(W, T_2)} = \\frac{P(\\text{NN} | \\text{AT}) \\cdot P(\\text{"move"} | \\text{NN})}{P(\\text{VB} | \\text{AT}) \\cdot P(\\text{"move"} | \\text{VB})}$$

---

## 3. Empirical Probabilities (Manning & Schütze, Brown Corpus)

From empirical corpus frequency counts in the Brown Corpus:
1. **Transition Probabilities:**
   - $P(\\text{NN} | \\text{AT}) \\approx \\mathbf{0.64}$ (Articles are followed by Nouns 64% of the time).
   - $P(\\text{VB} | \\text{AT}) \\approx \\mathbf{0.00001}$ (Articles are almost **never** directly followed by base verbs in English!).
2. **Emission Probabilities:**
   - $P(\\text{"move"} | \\text{NN}) \\approx \\mathbf{0.0004}$
   - $P(\\text{"move"} | \\text{VB}) \\approx \\mathbf{0.002}$ (In isolation, *"move"* is more frequently a verb than a noun).

---

## 4. Final Numerical Comparison

$$\\text{Score}(T_1) \\propto P(\\text{NN} | \\text{AT}) \\cdot P(\\text{"move"} | \\text{NN}) = 0.64 \\cdot 0.0004 = \\mathbf{0.000256} = \\mathbf{2.56 \\times 10^{-4}}$$

$$\\text{Score}(T_2) \\propto P(\\text{VB} | \\text{AT}) \\cdot P(\\text{"move"} | \\text{VB}) = 0.00001 \\cdot 0.002 = \\mathbf{0.00000002} = \\mathbf{2.0 \\times 10^{-8}}$$

### Ratio:
$$\\frac{\\text{Score}(T_1)}{\\text{Score}(T_2)} = \\frac{2.56 \\times 10^{-4}}{2.0 \\times 10^{-8}} \\approx \\mathbf{12,800}$$

---

## 5. Exam Summary & Linguistic Conclusion
Sequence 1 (\`AT NN BEZ IN AT NN\`) is approximately **12,800 times more probable** than Sequence 2.
Even though *"move"* is more frequently used as a verb in isolation, the syntactic transition probability $P(\\text{VB} | \\text{AT})$ after the article *"the"* is virtually impossible in English, enabling the HMM to correctly disambiguate *"move"* as a **Noun**.`
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
          summary: "Definition of a Hidden Markov Model (HMM).",
          keyPoints: [
            "Statistical Markov model where underlying states are unobservable (hidden).",
            "Defined by parameter tuple lambda = (A, B, pi)."
          ],
          content: `### Definition of a Hidden Markov Model (HMM)
A **Hidden Markov Model (HMM)** is a statistical sequence model in which the system being modeled is assumed to be a Markov process with unobservable (**hidden**) states:
- The actual states ($q_1, \\dots, q_T$) cannot be directly viewed.
- Each hidden state stochastically generates observable output symbols ($o_1, \\dots, o_T$).
- Formally defined by the parameter tuple: $\\mathbf{\\lambda = \\langle A, B, \\pi \\rangle}$ (Transition matrix $A$, Emission matrix $B$, Initial state vector $\\pi$).`
        };

      case 2:
        return {
          summary: "Distinguishing Visible Markov Models from Hidden Markov Models.",
          keyPoints: [
            "In Visible Markov Models, states correspond 1-to-1 with observable events.",
            "In Hidden Markov Models, states are latent and emit observations stochastically."
          ],
          content: `### Visible vs. Hidden Markov Models

| Dimension | Visible Markov Model (VMM) | Hidden Markov Model (HMM) |
| :--- | :--- | :--- |
| **States** | Directly observable in data | Unobservable / Latent |
| **Observation** | The state IS the observation ($S_t = O_t$) | States emit observations probabilistically |
| **Decoding** | Trivial (read directly from data) | Requires Viterbi dynamic programming |
| **Example** | N-gram word sequences | POS tagging (words are seen; tags are hidden) |`
        };

      case 3:
        return {
          summary: "Definition and properties of the Markov assumption.",
          keyPoints: [
            "State transitions depend only on the immediate previous state.",
            "Time-invariance property ensures stationarity."
          ],
          content: `### Markov Assumption and Properties
1. **First-Order Markov Property:** The probability of entering state $q_t$ depends **solely on the immediately preceding state $q_{t-1}$**, ignoring all earlier history:
   $$P(q_t \\mid q_1, q_2, \\dots, q_{t-1}) = P(q_t \\mid q_{t-1})$$
2. **Stationarity (Time Invariance):** The transition probabilities do not change over time:
   $$P(q_t = s_j \\mid q_{t-1} = s_i) = a_{ij} \\quad \\forall t$$`
        };

      case 8:
        return {
          summary: "Difference between Arc-Emission and State-Emission HMMs.",
          keyPoints: [
            "State-emission HMMs emit symbols from nodes (Moore machine).",
            "Arc-emission HMMs emit symbols along transitions (Mealy machine)."
          ],
          content: `### Arc-Emission vs. State-Emission HMMs
- **State-Emission HMM (Moore Machine):** Output observations are emitted directly by the **states** themselves. The probability is $b_j(o_t) = P(o_t | q_t = s_j)$. (Standard formulation in NLP/Rabiner).
- **Arc-Emission HMM (Mealy Machine):** Output observations are emitted along the **directed transition arcs** between states. The probability is $b_{ij}(o_t) = P(o_t | q_{t-1} = s_i, q_t = s_j)$. (Common in Speech Recognition FSTs).`
        };

      case 18:
        return {
          summary: "Step-by-step implementation process of the Viterbi algorithm.",
          keyPoints: [
            "Dynamic programming on an N x T trellis.",
            "Initialization, Induction with max and argmax, Termination, Backtrace."
          ],
          content: `### Step-by-Step Viterbi Algorithm Implementation
1. **Initialization:** Compute initial state scores:
   $$v_1(j) = \\pi_j \\cdot b_j(o_1), \\quad \\psi_1(j) = 0$$
2. **Recursive Induction:** For $t = 2 \\dots T$, compute path max and backpointer:
   $$v_t(j) = \\max_{i=1}^N \\left( v_{t-1}(i) \\cdot a_{ij} \\right) \\cdot b_j(o_t), \\quad \\psi_t(j) = \\arg\\max_{i=1}^N \\left( v_{t-1}(i) \\cdot a_{ij} \\right)$$
3. **Termination:** Find global path maximum $q_T^* = \\arg\\max_i v_T(i)$.
4. **Backtracking:** Trace backpointers $\\psi$ from $t = T-1$ down to $1$: $q_t^* = \\psi_{t+1}(q_{t+1}^*)$.`
        };

      case 20:
        return {
          summary: "Definition of a POS tagger and classification of major tagger types.",
          keyPoints: [
            "A tagger assigns grammatical categories to tokens.",
            "Classified into Rule-Based, Probabilistic/Stochastic (HMM), Transformation-Based (Brill), and Neural (BiLSTM-CRF)."
          ],
          content: `### Taggers & Classification
A **Tagger** is an automated NLP software component that reads a token sequence and assigns each token its corresponding grammatical category (**Part of Speech**).

### Major Types of Taggers:
1. **Rule-Based Taggers:** Use hand-crafted linguistic rules and morphological dictionary lookups.
2. **Probabilistic / Stochastic Taggers:** HMMs and Maximum Entropy models selecting tags via $P(T|W)$.
3. **Transformation-Based Learning (Brill Tagger):** Starts with naive tagging and applies error-correcting rules iteratively.
4. **Neural Taggers:** Bidirectional LSTM-CRF and Transformer models learning contextual representations.`
        };
    }
  }

  return null;
}
