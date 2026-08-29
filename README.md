# The Semiotic Web Protocol

**A Reference Implementation for Deterministic, Verifiable Comprehension**

**Version 1.0** | August 2026

---

## Abstract

The Semiotic Web Protocol is a federated epistemic architecture that replaces statistical text prediction with cryptographically verified, atomic units of meaning called *tokums*. Each tokum carries complete provenance, context, and verification state, enabling AI systems to structurally distinguish between verified knowledge and epistemic absence, a state formalized as **Semantic Zero**.

The protocol is implemented as a layered system on W3C standards: RDF 1.2/RDF-star for semantic representation, SPARQL 1.2 for querying, PROV-O for provenance, and DIDs for agent identity, with cryptographic integrity provided by an append-only ledger. Agent capability interfaces provide the operational substrate for managing, governing, and resolving conflicting claims and vocabularies, thereby grounding meaning in **epistemic utility**, demonstrated through use, survival of falsification, and successful action.

---

## Core Architecture

### The Epistemic Stack

```
┌─────────────────────────────────────────────────────────┐
│              APPLICATION / AGENT LAYER                  │
│   Orchestrators • Communicators • Economists            │
│   Verifiers • ML Executors • Intent Executors           │
│   Validator Operators                                   │
└─────────────────────────┬───────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│            SEMANTIC ZERO / EPISTEMIC ENGINE             │
│   Gap Detection • Qualification • Refusal               │
│   Conflict Resolution • Vocabulary Governance           │
└─────────────────────────┬───────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│          CWP (COMPREHENSION WEB PROTOCOL)               │
│   CCI Resolution • CTI Exchange • Capability Discovery  │
│   Trust • Promises • Epistemic Games                    │
└─────────┬──────────────────┬───────────────────┬────────┘
          ▼                  ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│    Semantic     │ │   Promise /     │ │   Agent /       │
│    Registry     │ │   Authority     │ │   Capability    │
│                 │ │   Engine        │ │   Registry      │
│ CCI • Vocabular-│ │ Epistemic Games │ │ DIDs • SBTs     │
│ ies • Versions  │ │                 │ │ Capability Map  │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         └───────────────────┼───────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────┐
│                     RDF 1.2 / RDF-STAR                  │
│      Concepts • Propositions • CTI Reifiers             │
│      Context • Provenance • Capability Metadata         │
└─────────────────────────┬───────────────────────────────┘
                          ▼
                    SPARQL 1.2
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   KNOWLEDGE GRAPH LAYER                 │
│             Local • Domain • Federated Graphs           │
└─────────────────────────┬───────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│                CRYPTOGRAPHIC LEDGER LAYER               │
│     Signed Events • Hashes • Ordering • Timestamps      │
│     Vocabulary Decisions • CTI Commitments              │
│     Capability Registrations • Game Outcomes            │
└─────────────────────────────────────────────────────────┘
```

### Central Invariant

Never silently convert an epistemic gap into a semantic assertion.

```
NO VERIFIED CTI    ≠   FALSE
SIGNED ASSERTION   ≠   TRUTH
AUTHORITY          ≠   METAPHYSICAL CERTAINTY
CONSENSUS          ≠   FACT
CAPABILITY CLAIM   ≠   CAPABILITY DEMONSTRATED
```

---

## Semantic Layer

### CCI: Canonical Concept Identity

A CCI is an immutable identifier for a concept, derived from a versioned controlled vocabulary. The vocabulary itself is an epistemic object; agents select it through voluntary promises, not central authority.

```turtle
geo:Paris
    a skos:Concept ;
    skos:prefLabel "Paris"@en ;
    skos:definition "The municipality of Paris, France."@en ;
    skos:inScheme geo:GeographyV4 .
```

### CTI: Contextual Tokum Instance

A CTI is a cryptographic seal of a real-world observation, formulated as a W3C RDF-star triple. It distinguishes **what** was claimed from **who** claimed it, **when**, and **why**.

```turtle
:cti_1847
    a tok:ContextualTokumInstance ;
    rdf:reifies << geo:Paris geo:capitalOf geo:France >> ;
    tok:observer :Alice ;
    tok:vocabulary geo:GeographyV4 ;
    tok:context geo:PoliticalGeography ;
    tok:observedAt "2026-08-25T20:30:01Z"^^xsd:dateTime ;
    tok:evidence :FrenchGovDoc123 ;
    tok:verificationStatus tok:Verified ;
    tok:trustWeight "0.97"^^xsd:decimal ;
    tok:capability tok:VerificationCapability ;
    tok:signature :AliceSignature ;
    tok:ledgerCommitment :tx1847 .
```

**Required Fields:** ID, proposition (RDF-star reified triple), observer (DID), context, timestamp, evidence, vocabulary, capability, signature, provenance, verification status, ledger commitment.

### Relationship: CCI → CTI

A CCI is the **concept** (type). A CTI is a **contextual assertion** about that concept (instance). Multiple CTIs can reference the same CCI, representing different observers, contexts, or times.

| Layer | Example |
|-------|---------|
| **CCI** | "Paris is a concept" (universal) |
| **Proposition** | "Paris is the capital of France" (relationship) |
| **CTI** | "Alice asserts that Paris is the capital of France" (particular) |

---

## Epistemic Layer

### Semantic Zero Engine

Semantic Zero is a first-class machine-readable state representing the boundary of verified knowledge. It is not "false" or "nothing found", it is a structural refusal with an auditable boundary declaration.

**Zero States:**

| State | Description |
|-------|-------------|
| `ZERO_UNKNOWN` | No qualifying evidence exists |
| `ZERO_UNRESOLVED` | Competing interpretations exist |
| `ZERO_CONFLICT` | Authoritative sources disagree |
| `ZERO_OUT_OF_SCOPE` | Query falls outside vocabulary/domain |
| `ZERO_REJECTED` | Evidence failed validation |
| `ZERO_PENDING` | Evidence acquisition in progress |

**Semantic Zero Response:**

```json
{
  "state": "ZERO_UNKNOWN",
  "query": "<<geo:Paris geo:capitalOf geo:Germany>>",
  "vocabulary": "geo:GeographyV4",
  "trustPolicy": "policy:v7",
  "ledgerState": "block:18492771",
  "reason": "NO_QUALIFYING_CTI"
}
```

### Semantic Light Cone of Care

Every query executes against an explicit knowledge boundary: domain, vocabulary, trust policy, agent identity, ledger state, available sources. This boundary, the agent's Semantic Light Cone of Care, makes the scope of any Semantic Zero declaration auditable.

---

## Agent Capability Layer

### Capability Taxonomy

Agents are defined by composable capability interfaces that enable specific epistemic strategies. Each capability is registered on-chain and bound to the agent's DID.

#### 1. Orchestration & Workflow

**Frameworks:** LangGraph / LangChain
**Role:** Workflow Orchestrator
**Epistemic Strategy:** Manages multi-step reasoning, delegation, and conditional branching in epistemic games.

```typescript
interface IOrchestrator {
  graph: StateGraph;
  checkpointer: ICheckpointer;
  nodes: Node[];
  edges: ConditionalEdge[];
  resume(sessionId: string): State;
}
```

#### 2. Decentralized Communication

**Framework:** Fetch.ai / uAgents
**Role:** Autonomous Communicator
**Epistemic Strategy:** Enables agent discovery, message passing, and coordination for resolving distributed claims.

```typescript
interface IAutonomousAgent {
  wallet: Wallet;
  address: DID;
  endpoint: URL;
  register(): void;
  send(destination: DID, message: Model): void;
  onInterval(period: number, handler: Function): void;
}
```

#### 3. Agent Economies

**Framework:** Autonolas / Olas
**Role:** Economic Participant
**Epistemic Strategy:** Uses tokenized incentives to align agent behavior with epistemic utility.

```typescript
interface IEconomicAgent {
  stake: veOLAS;
  service: Service;
  consensusMechanism: ConsensusProtocol;
  participateGovernance(proposal: Proposal): Vote;
}
```

#### 4. Verifiable Inference

**Frameworks:** EigenLayer / AgentKit
**Role:** Verifiable Inference Provider
**Epistemic Strategy:** Provides cryptographically verifiable claims about inference results.

```typescript
interface IVerifiableInference {
  generateText(prompt: string): VerifiableResult;
  verifyProof(proof: Proof): boolean;
}

interface IVerifiableLogging {
  log(data: unknown): VerifiableLogEntry;
  queryLogs(options: object): LogEntry[];
}
```

**Critical Constraint:** A TEE can cage execution; a ZK proof can show computation happened. Neither automatically answers which model ran, whether the prompt was swapped, or whether the output was truncated. CTIs provide the missing epistemic layer.

#### 5. Zero-Knowledge ML

**Frameworks:** Giza / Ritual
**Role:** Provable ML Executor
**Epistemic Strategy:** Enables verification of ML computations without revealing inputs.

```typescript
interface IProvableML {
  model: zkMLModel;
  prove(inputs: Input): Proof;
  verify(proof: Proof): boolean;
  execute(inputs: Input): Output;
}
```

#### 6. Intent Execution

**Frameworks:** SUAVE / Flashbots
**Role:** Intent Executor
**Epistemic Strategy:** Observes pending state to construct strategies for resolving conflicting claims.

```typescript
interface IIntentExecutor {
  submitIntent(intent: Intent): void;
  accessPendingState(): State;
  buildBundle(txs: Transaction[]): Bundle;
  submitToBuilder(bundle: Bundle): void;
}
```

#### 7. Validator Operations

**Framework:** Jito / Solana
**Role:** Validator Operator
**Epistemic Strategy:** Manages infrastructure that underpins the ledger layer.

```typescript
interface IValidatorOperator {
  client: JitoClient;
  optimizeVote(): void;
  managePoH(): void;
  deployViaAI(prompt: string): void;
}
```

### Unified Agent Capability Schema

```turtle
:agent_Alice
    a tok:Agent ;
    tok:did "did:example:alice" ;
    tok:capabilities [
        a tok:OrchestrationCapability ;
        tok:topology tok:Supervisor ;
        tok:checkpointer tok:SQLiteCheckpointer ;
    ] ;
    tok:capabilities [
        a tok:CommunicationCapability ;
        tok:protocol tok:uAgents ;
        tok:almanac "0x..." ;
    ] ;
    tok:capabilities [
        a tok:EconomicCapability ;
        tok:staking tok:veOLAS ;
        tok:service "0x..." ;
    ] ;
    tok:capabilities [
        a tok:VerifiableInferenceCapability ;
        tok:proofType tok:zkTLS ;
    ] .
```

### Framework Mapping

| System | Defining Capability | Role | Interface |
|--------|---------------------|------|-----------|
| LangGraph / LangChain | Stateful orchestration | Workflow Orchestrator | IOrchestrator |
| Fetch.ai / uAgents | Decentralized communication | Autonomous Communicator | IAutonomousAgent |
| Autonolas / Olas | Agent economies | Economic Participant | IEconomicAgent |
| EigenLayer / AgentKit | Verifiable inference | Verifiable Inference Provider | IVerifiableInference |
| Giza / Ritual | ZK-provable ML | Provable ML Executor | IProvableML |
| SUAVE / Flashbots | Intent execution | Intent Executor | IIntentExecutor |
| Jito / Solana | Validator optimization | Validator Operator | IValidatorOperator |

---

## Governance Layer

### Promise-Theoretic Authority

Authority emerges from agents' voluntary promises, not central command. A vocabulary provider promises stability and interpretation; agents accept, assess, and potentially reject those promises.

```
Authority(V, D, A) = f(
    relevance,
    promise_fulfillment,
    evidence_quality,
    historical_accuracy,
    agent_independence,
    adoption,
    adversarial_survival
)
```

### Epistemic Games

When competing vocabularies or claims exist, agents engage in an epistemic game. Capability interfaces define the moves available to each agent type:

| Agent Role | Moves in Epistemic Game |
|------------|------------------------|
| Orchestrator | Propose, support, coordinate subagents |
| Communicator | Challenge, cross-examine, provide evidence |
| Economic Participant | Stake on outcomes, vote |
| Verifiable Inference Provider | Provide cryptographic proof |
| Provable ML Executor | Verify computations |
| Intent Executor | Observe pending state, build strategies |
| Validator Operator | Commit to ledger state |

**Game Protocol:** Propose → Support → Challenge → Provide Evidence → Cross-examine → Revise → Withdraw → Accept. Terminates when one interpretation achieves authoritative status or the system declares `ZERO_UNRESOLVED`.

### Agent Identity (DIDs)

Agents use **Decentralized Identifiers (DIDs)**, the W3C standard for self-sovereign identity. DIDs provide portable, self-sovereign, cryptographically verifiable identity independent of any platform.

### Agent Reputation (SBTs)

**Soulbound Tokens (SBTs)** are non-transferable tokens bound to an agent's DID. They represent earned reputation, credentials, and track record:
- Verification credentials (CTI corroboration)
- Promise fulfillment
- Governance weight
- Capability-specific achievements

SBTs prevent sybil attacks by making reputation non-transferable and earned.

---

## Ledger Layer

### Commitment Model

Do **not** put the complete knowledge graph on-chain. Use a two-tier model: the ledger stores cryptographic commitments (hashes, signatures, ordering) to CTIs, vocabulary versions, promises, assessments, disputes, and game outcomes. The actual RDF knowledge graph remains off-chain and queryable.

**Transaction Format:**

```json
{
  "eventType": "CTI_ASSERTION",
  "ctiId": "cti:1847",
  "payloadHash": "sha256:...",
  "agent": "did:example:alice",
  "capability": "VerificationCapability",
  "vocabulary": "geo:GeographyV4",
  "timestamp": "2026-08-25T20:30:01Z",
  "signature": "..."
}
```

### Ledger Events

| Category | Events |
|----------|--------|
| **Semantic** | VOCABULARY_PROPOSED, CCI_REGISTERED, CCI_DEPRECATED |
| **Epistemic** | CTI_ASSERTED, CTI_CHALLENGED, CTI_CORROBORATED, CTI_VERIFIED, CTI_REJECTED |
| **Capability** | CAPABILITY_REGISTERED, CAPABILITY_UPGRADED, CAPABILITY_REVOKED |
| **Promise** | PROMISE_MADE, PROMISE_ACCEPTED, PROMISE_FULFILLED, PROMISE_BREACHED |
| **Governance** | AUTHORITY_PROPOSED, AUTHORITY_ACCEPTED, AUTHORITY_CHALLENGED |
| **Game** | GAME_INITIATED, GAME_MOVE, GAME_RESOLVED |
| **Boundary** | SEMANTIC_ZERO_DECLARED, SEMANTIC_ZERO_RESOLVED |

---

## Pragmatic Foundation

The system is built on a pragmatic theory of epistemic value:

> A claim's epistemic value is proportional to its demonstrated utility, its ability to generate accurate predictions, enable successful action, and survive falsification attempts.

**Epistemic value is demonstrated through use, not declared by authority.**

- **CCIs** provide stable anchors so utility can be tracked over time.
- **CTIs** provide auditable records so utility can be measured.
- **Semantic Zero** provides honest recognition of epistemic boundaries.
- **Agent Capabilities** provide the operational substrate for managing, governing, and resolving conflicting claims and vocabularies.
- **Epistemic Games** provide the mechanism for resolving conflicts through structured adversarial testing.
- **SBTs** provide non-transferable track records so utility is earned.
- **The ledger** provides an immutable history of utility.

---

## Standards & Implementation

| Component | Technology |
|-----------|------------|
| Concept identity | SKOS / OWL |
| Propositions | RDF 1.2 triples |
| Contextual assertions | RDF-star reifiers |
| Provenance | PROV-O |
| Validation | SHACL |
| Query | SPARQL 1.2 |
| Agent identity | DIDs / Verifiable Credentials |
| Agent reputation | Soulbound Tokens (SBTs) |
| Integrity | Cryptographic signatures |
| History | Append-only ledger (off-chain RDF, on-chain commitments) |
| Capability interfaces | TypeScript / JSON Schema |

---

## Implementation Priorities

### Phase 1: Foundation
1. Vocabulary Registry (SKOS + OWL)
2. CCI Registry
3. RDF 1.2 Store with RDF-star

### Phase 2: Core
4. CTI Schema with RDF-star Reifiers
5. Signature Service (DIDs)
6. SPARQL Query Service

### Phase 3: Capabilities
7. Agent Capability Registry
8. Capability Interface Definitions (TypeScript)
9. Framework Adapters (LangGraph, Fetch.ai, etc.)

### Phase 4: Governance
10. Promise/Authority Evaluator
11. Agent Registry with SBTs
12. Epistemic Game Protocol

### Phase 5: Integration
13. Semantic Zero Engine
14. AI Integration Layer
15. CWP (Comprehension Web Protocol)

---

## Strategic Positioning

The Semiotic Web Protocol is **not** a replacement for RDF, blockchains, ontologies, or LLMs. It is an **epistemic protocol** that combines them into a system where:

- Concepts have stable, versioned identities
- Claims have accountable contextual instances
- Evidence has complete provenance
- Agents have typed, verifiable capabilities
- Semantic authorities emerge through explicit commitments and assessment
- Conflicting claims are resolved through structured epistemic games
- Absence of verified knowledge is a first-class machine-readable state

**Every reasoning step is fully traceable and auditable.**

---

## References

1. Tokum.ai Architecture Documentation
2. RDF 1.2 / RDF-star Specification (W3C Candidate Recommendation)
3. SPARQL 1.2 Specification (W3C Working Draft)
4. W3C PROV-O Provenance Ontology
5. SKOS Simple Knowledge Organization System
6. W3C Decentralized Identifiers (DIDs)

---

## License

MIT

---

**The Semiotic Web Protocol**
Version 1.0 | August 2026